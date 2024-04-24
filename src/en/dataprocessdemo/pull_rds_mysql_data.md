# Obtain data from an ApsaraDB RDS for MySQL database for data enrichment

The data transformation feature of Simple Log Service allows you to obtain data from ApsaraDB RDS for MySQL databases and enrich the data based on data transformation rules.

**Note**

- RDS MySQL The instance on which your ApsaraDB RDS for MySQL database is created must reside in the same region as your Simple Log Service project. Otherwise, you cannot obtain data from the database.

- You can access and obtain data from an ApsaraDB RDS for MySQL database by using an internal endpoint of the instance on which the database is created. For more information, see [Obtain data from an ApsaraDB RDS for MySQL database over the internal network](https://www.alibabacloud.com/help/en/doc-detail/162753.htm?spm=a2c4g.11186623.0.0.6e4c385bQ7Qjb5#task-2479452).

## Use the e_search_map_table function to enrich data

In this example, the e_search_map_table and res_rds_mysql functions are used to enrich data.

- Raw data

  - RDS MySQL Sample data records in a table of a database

  | province | city      | population | cid | eid   |
  | -------- | --------- | ---------- | --- | ----- |
  | shanghai | shanghai  | 2000       | 1   | 00001 |
  | tianjin  | tianjin   | 800        | 1   | 00002 |
  | beijing  | beijing   | 4000       | 1   | 00003 |
  | henan    | zhengzhou | 3000       | 2   | 00004 |
  | jiangsu  | nanjing   | 1500       | 2   | 00005 |

  - Sample log in a Logstore of Simple Log Service

    ```
    time:"1566379109"
    data:"test-one"
    cid:"1"
    eid:"00001"

    time:"1566379111"
    data:"test_second"
    cid:"1"
    eid:"12345"

    time:"1566379111"
    data:"test_three"
    cid:"2"
    eid:"12345"

    time:"1566379113"
    data:"test_four"
    cid:"2"
    eid:"12345"
    ```

- Transformation rule
  Compare the sex field in the Logstore and the sex field in the Hologres database. Both fields match only when the sex values are the same.If both fields match, the value of the product_name field is pulled from the Hologres database and concatenated with the log data in the Logstore into new data.
  **Note**

  - If multiple values of a field are matched in the table, the e_table_map function obtains only the first data record. In this example, the cid field in the table has multiple values of 1.
  - e_table_map The e_table_map function supports only single-row matching. If you want to implement multi-row matching and combine the matched data into a new log, you can use the e_search_table_map function. For more information, see [Use the e_search_map_table function to enrich data](https://www.alibabacloud.com/help/en/doc-detail/135243.html#section-e98-4bk-03e).
    ```python
    e_table_map(
      res_rds_mysql(
        address="rds-host",
        username="mysql-username",
        password="xxx",
        database="xxx",
        table="xx",
        refresh_interval=60
      ),
      "cid",
      ["province","city","population"]
    )
    ```

For more information about how to configure an ApsaraDB RDS for MySQL database in the res_rds_mysql function, see [res_rds_mysql](https://www.alibabacloud.com/help/en/doc-detail/129401.htm?spm=a2c4g.11186623.0.0.6e4c34363VG5JI#section-49h-ufh-ptu).

- Transformation result

  ```
  time:"1566379109"
  data:"test-one"
  cid:"1"
  eid:"00001"
  province:"shanghai"
  city:"shanghai"
  population:"2000"

  time:"1566379111"
  data:"test_second"
  cid:"1"
  eid:"12345"
  province:"shanghai"
  city:"shanghai"
  population:"2000"

  time:"1566379111"
  data:"test_three"
  cid:"2"
  eid:"12345"
  province:"henan"
  city:"zhengzhou"
  population:"3000"

  time:"1566379113"
  data:"test_four"
  cid:"2"
  eid:"12345"
  province:"henan"
  city:"zhengzhou"
  population:"3000"
  ```

## Use the e_search_map_table function to enrich data

In this example, the e_search_map_table and res_rds_mysql functions are used to enrich data.

- Raw data

  - RDS MySQL Sample data records in a table of a database

  | content       | name   | age |
  | ------------- | ------ | --- |
  | city~=n\*     | aliyun | 10  |
  | province~=su$ | aliyun | 18  |
  | city:nanjing  | vicky  | 20  |

  - Sample log in a Logstore of Simple Log Service
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    ```

- Transformation rule
  You can configure a transformation rule to match the values of the content field in the table against the log in the Logstore. The values are key-value pairs. A key corresponds to a field name in the log. A value corresponds to a field value in the log and is a regular expression.The system concatenates the related fields and field values in the table based on the matching result with the log to generate a new log.
  ```
  Note
  1、For more information about how to configure an ApsaraDB RDS for MySQL database in the res_rds_mysql function, seeres_rds_mysql。
  2、The content field is included in the table. When the system matches the values of the field against the log, various matching modes are supported, such as regular expression match, exact match, and fuzzy match. For more information about matching rules, see。
  ```
  - Single-row matching
    The system returns the transformation result when one data record in the table matches the log.
    ```python
    e_search_table_map(
      res_rds_mysql(
        address="rds-host",
        username="mysql-username",
        password="xxx",
        database="xxx",
        table="xx",
        refresh_interval=60
      ),
      "content",
      "name"
    )
    ```
  - Multi-row matching
    The system traverses all data records in the table and adds all matched data to the specified field.
    **Note** The following parameter settings are required:
    - multi_match=True：enables multi-row matching.
    - multi_join=","：concatenates multiple matched values with commas (,).
      ```python
      e_search_table_map(
        res_rds_mysql(
          address="rds-host",
          username="mysql-username",
          password="xxx",
          database="xxx",
          table="xx",
          refresh_interval=60
        ),
        "content",
        "name",
        multi_match=True,
        multi_join=","
      )
      ```
- Transformation result
  - Single-row matching
    In this example, the system checks whether the value of the city field in the log matches the n\* expression. If the match is successful, the system returns the name field and field value for the matched data record in the table to generate a new log.
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    name:aliyun
    ```
  - Multi-row matching
    In this example, the system checks whether the value of the city field in the log matches the n\* expression, whether the value of the province field in the log matches the su$ expression, and whether the value of the city field in the log includes nanjing.In this example, a regular expression is preceded by ~=. The colon (:) indicates whether the followed string is included.If the match is successful, the system returns the name field and three values of the field in the table, and concatenates the returned data with the log to generate a new log. The values are separated by commas (,).
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    name:aliyun,Maki,vicky
    ```
