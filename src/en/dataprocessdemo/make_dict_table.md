# Build dictionaries and tables for data enrichment

Dictionaries and tables are two major types of data structures used for data enrichment. This topic describes common methods for building dictionaries and tables and compares the advantages and disadvantages of different building methods.

## Build dictionaries

- Build a dictionary directly

  ```python
  e_dict_map(
  	{"400": "error", "200": "ok", "*": "other"},
  	"status",
  	"message"
  )
  ```

- Build a dictionary from data configuration items

  ```python
  e_dict_map(
  	res_local("http_code_map"),
  	"status",
  	"message"
  )
  ```

  where, `http_code_map` is an advanced task configuration item. Its values are as follows:

  ```
    {"400": "error", "200": "ok", "*": "other"}
  ```

- Build a dictionary from a table. Use the tab_to_dict` function to build a dictionary from a table.Details on how to build a table are available in later part of this topic.

  ```python
  e_dict_map(
  	tab_to_dict(
  		tab_parse_csv("status_code,status_info\n400,error\n200,ok\n*,other"),
  		"status_code",
  		"status_info"
  	),
  	"status",
  	"message"
  )
  ```

- Build a dictionary by using the dct_make function

  ```python
  e_dict_map(
  	dct_make("400", "error", "200",  "ok", "*",  "other"),
  	"status",
  	"message"
  )
  ```

- Build a dictionary by using another expression

  ```python
  e_dict_map(
  	json_parse(
  		v("http_code_map")
  	),
  	"status",
  	"message"
  )
  ```

  where, the data mappings are obtained from the `http_code_map` field in source logs.

**The following table compares these dictionary building methods.**

| Method                                                     | advantage                                                                                                                                                  | disadvantage                                                                                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Build a dictionary directly                                | This method is intuitive, simple, and easy to use.                                                                                                         | The rules will be lengthy if too much content is involved.                                                                      |
| The rules will be lengthy if too much content is involved. | We recommend that you use this method if the dictionary contains a large amount of data and is frequently modified. This method features easy maintenance. | A dictionary built in this method is not scalable or reusable across tasks. In addition, it does not support automatic updates. |
| Build a dictionary from a table                            | Featuring flexible maintenance, this method is used in advanced scenarios.                                                                                 | You need to build and maintain a table for building a dictionary, making the configuration process complex.                     |
| Build a dictionary by using the dct_make function          | You can build a dictionary based on dynamic logic in specific scenarios.                                                                                   | This method is relatively advanced and difficult to maintain.                                                                   |
| Build a dictionary by using another expression             | This method is used to dynamically extract data mappings from fields in log events. It applies in specific scenarios.                                      | This method is relatively advanced and difficult to maintain.                                                                   |

## Build tables

- Build a table from a text file

  ```python
  e_table_map(
  	tab_parse_csv("city,name,age\nshanghai,aliyun,10\ncity:nanjing,Maki,18"),
  	"name",
  	["city", "age"]
  )
  ```

- Build a dictionary from data configuration items

  ```python
  e_search_table_map(
  	tab_parse_csv(
  		res_local("table_info")
  	),
  	"name",
  	["city", "age"]
  )
  ```

  where, `table_info` is a task configuration item in data transformation rules. Its values are as follows:

  ```
  content,name,age
  shanghai,aliyun,10
  nanjing,Maki,18
  ```

- Build a table from an ApsaraDB for RDS database

  ```python
  e_table_map(
  	tab_parse_csv(
  		res_rds_mysql(...database="db", table="city")
  	),
  	"name",
  	["city", "age"]
  )
  ```

  The `city` table in the ApsaraDB for RDS database contains the following information:

  ```
  content,name,age
  shanghai,aliyun,10
  nanjing,Maki,18
  ```

- Build a table from another Logstore

  ```python
  e_table_map(
  	res_log_logstore_pull(
  		...,
  		project="project_name",
  		logstore="logstore_name",
  		fields=["city","name","age"]
  	),
  	,
  	"name",
  	["city", "age"]
  )
  ```

  The specified Logstore contains the following log events:

  ```
  "log1"
  {
  "city": "shanghai",
  "name": "aliyun",
  "age": "10"
  }
  "log2"
  {
  "city": "city:nanjing and data > 100",
  "name": "Maki",
  "age": "18"
  }
  ```

**The following table compares these table building methods.**

| Method | Advantages |
Disadvantages |
| ------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Build a table from a text file | This method is intuitive, simple, and easy to use. | The rules will be lengthy if too much content is involved.A table built in this method is difficult to maintain, scale up, or reuse. |
| Build a dictionary from data configuration items | We recommend that you use this method if the dictionary contains a large amount of data and is frequently modified. This method features easy maintenance. | A table built in this method is not scalable or reusable across tasks. |
| Build a table from an ApsaraDB for RDS database |We recommend that you use this method if the dictionary contains a large amount of data and is frequently modified. This method features easy maintenance._ This method supports automatic updates._ This method supports automatic updates. | You need to connect to an external ApsaraDB for RDS database for building a table, making the configuration process complex. |
| Build a table from another Logstore | This method is used to read data in real time. Featuring flexible maintenance, this method is used in advanced scenarios. | You need to connect to another Logstore for building a table, making the configuration process complex. |
