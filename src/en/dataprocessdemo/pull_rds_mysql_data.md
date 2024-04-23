# 从 RDS MySQL 数据库获取数据进行数据富化

日志服务数据加工功能支持从阿里云 RDS MySQL 数据库获取数据，结合数据 Transformation rule，进行数据富化。

**Note**

- RDS MySQL 实例与日志服务 Project 需处于同一地域，否则无法获取数据。

- 如果您要使用 RDS 内网地址访问 RDS MySQL 数据库获取数据，进行数据富化，可参见[使用 RDS 内网地址访问 RDS MySQL 数据库](https://help.aliyun.com/document_detail/162753.htm?spm=a2c4g.11186623.0.0.6e4c385bQ7Qjb5#task-2479452)。

## 结合 e_table_map 函数进行数据富化

本示例介绍使用 e_table_map 函数和 res_rds_mysql 函数完成数据富化的方法。

- 原始数据

  - RDS MySQL 数据库表中的数据样例如下表所示。

  | province | city | population | cid | eid   |
  | -------- | ---- | ---------- | --- | ----- |
  | 上海     | 上海 | 2000       | 1   | 00001 |
  | 天津     | 天津 | 800        | 1   | 00002 |
  | 北京     | 北京 | 4000       | 1   | 00003 |
  | 河南     | 郑州 | 3000       | 2   | 00004 |
  | 江苏     | 南京 | 1500       | 2   | 00005 |

  - 日志服务 Logstore 中的日志样例如下所示。

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
  通过日志服务 Logstore 中的 cid 字段和 RDS MySQL 数据库表中 cid 字段进行匹配，只有 cid 字段的值完全相同，才能匹配成功。匹配成功后，返回 RDS MySQL 数据库表中的 province、city 和 population 字段和字段值，与 Logstore 中的数据拼接，生成新的数据。
  **Note**

  - 日志字段的值和 RDS MySQL 数据库表字段的值进行等值匹配时，如果 RDS MySQL 数据库表字段存在多个相同的值（例如 RDS MySQL 数据库表有多个值为 1 的 cid 字段。），e_table_map 函数只获取匹配到的第一行数据。
  - e_table_map 函数只支持单行匹配，如果您要实现多行匹配，将匹配到的数据组合成新的日志，可使用 e_search_table_map 函数，详情请参见[结合 e_search_map_table 函数进行数据富化](https://help.aliyun.com/document_detail/135243.html#section-e98-4bk-03e)。
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

  在 res_rds_mysql 函数中配置 RDS MySQL 数据库相关信息，详情请参见[res_rds_mysql](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.0.0.6e4c34363VG5JI#section-49h-ufh-ptu)。

- Transformation result

  ```
  time:"1566379109"
  data:"test-one"
  cid:"1"
  eid:"00001"
  province:"上海"
  city:"上海"
  population:"2000"

  time:"1566379111"
  data:"test_second"
  cid:"1"
  eid:"12345"
  province:"上海"
  city:"上海"
  population:"2000"

  time:"1566379111"
  data:"test_three"
  cid:"2"
  eid:"12345"
  province:"河南"
  city:"郑州"
  population:"3000"

  time:"1566379113"
  data:"test_four"
  cid:"2"
  eid:"12345"
  province:"河南"
  city:"郑州"
  population:"3000"
  ```

## 结合 e_search_map_table 函数进行数据富化

本示例介绍使用 e_search_map_table 函数和 res_rds_mysql 函数完成数据富化的方法。

- 原始数据

  - RDS MySQL 数据库表中的数据样例如下表所示。

  | content       | name   | age |
  | ------------- | ------ | --- |
  | city~=n\*     | aliyun | 10  |
  | province~=su$ | aliyun | 18  |
  | city:nanjing  | vicky  | 20  |

  - 日志服务 Logstore 中的日志样例如下所示。
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    ```

- Transformation rule
  根据指定的 RDS MySQL 数据库表中的字段值（例如 content 字段的值）去匹配日志字段，其中指定的 RDS MySQL 数据库表中的字段值为 Key-Value 形式，Key 对应日志字段，Value 为正则表达式，对应日志字段的值。根据匹配结果，将相关字段和字段值与 Logstore 中的数据拼接，生成新的数据。
  ```
  Note
  1、在res_rds_mysql函数中配置RDS MySQL数据库相关信息，详情请参见res_rds_mysql。
  2、content字段为RDS MySQL数据库表中的字段，使用该字段的值去匹配日志字段，支持正则匹配、完全匹配、模糊匹配等形式，具体匹配规则请参见e_search。
  ```
  - 单行匹配
    匹配到 RDS MySQL 数据库表中一行数据就返回。
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
  - 多行匹配
    遍历 RDS MySQL 数据库表中的所有数据行，将匹配到的数据全部添加到指定字段中。
    **Note** 语法中增加如下两个参数。
    - multi_match=True：开启多行匹配。
    - multi_join=","：匹配到多个值时使用逗号（,）进行组合。
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
  - 单行匹配
    例如：匹配日志中字段值符合 n\*表达式的 city 字段，匹配成功后，返回 RDS MySQL 数据库表中的 name 字段和字段值，生成一条新的日志。
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    name:aliyun
    ```
  - 多行匹配
    例如：匹配日志中字段值符合 n\*表达式的 city 字段，符合 su$表达式的 province 和是否包含 nanjing 的 city 字段。其中~=后面是正则表达式，冒号（:）表示是否包含该字段。匹配成功后，返回 RDS MySQL 数据库表中的 name 字段和对应的三个字段值，多个字段值用逗号（,），生成一条新的日志。
    ```
    time:1563436326
    data:123
    city:nanjing
    province:jiangsu
    name:aliyun,Maki,vicky
    ```
