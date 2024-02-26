## 从 Hologres 数据库获取数据进行富化

本文介绍如何通过资源函数从 Hologres 数据库获取数据进行数据富化。

# 使用 e_search_table_map 函数进行数据富化

- 原始数据

  - Hologres 数据库表中的数据样例如下表所示。

  | product_id | product_name | product_price | product_sales_number | sex  |
  | ---------- | ------------ | ------------- | -------------------- | ---- |
  | 2          | lipstick     | 288           | 2219                 | girl |
  | 5          | watch        | 1399          | 265                  | boy  |
  | 6          | mac          | 4200          | 265                  | boy  |
  | 3          | mouse        | 20            | 2583                 | boy  |
  | 1          | basketball   | 35            | 3658                 | boy  |
  | 4          | notebook     | 9             | 5427                 | girl |

  - 日志服务 Logstore 中的日志样例如下所示。

    ```
    __source__:192.168.2.100
    __tag__:__client_ip__:192.168.1.100
    age:22
    name:xiaoli
    profession:students
    sex:girl

    __source__:192.168.2.200
    __tag__:__client_ip__:192.168.1.200
    age:21
    name:xiaoming
    profession:students
    sex:boy
    ```

- 加工规则
  通过日志服务 Logstore 中的 sex 字段和 Hologres 数据库表中 sex 字段进行匹配，只有 sex 字段的值相同时，才能匹配成功。匹配成功后，返回 Hologres 数据库表中 product_name，与 Logstore 中的数据拼接，生成新的数据。
  ```python
  e_search_table_map(
    res_rds_mysql(
      address="rds-host",
      username="mysql-username",
      password="yourpassword",
      database="yourdatabasename",
      table="yourtablename",
      refresh_interval=60,
      connector='pgsql'
    ),
    inpt="sex",
    output_fields="product_name",
    multi_match=True,
    multi_join=","
  )
  ```
  **说明** 为了访问 Hologres 实例的安全性和稳定性，建议通过 VPC 方式访问 Hologres 数据库。您可以在 Hologres 实例的网络配置中，获取 Hologres 数据库的 VPC 访问域名，将 address 配置为该值即可。
- 加工结果

  ```
  __source__:192.168.2.100
  __tag__:__client_ip__:192.168.1.100
  __tag__:__receive_time__:1615518043
  __topic__:
  age:22
  name:xiaoli
  product_name:lipstick,notebook
  profession:students
  sex:girl

  __source__:192.168.2.200
  __tag__:__client_ip__:192.168.1.200
  __tag__:__receive_time__:1615518026
  __topic__:
  age:21
  name:xiaoming
  product_name:basketball,watch,mac,mouse
  profession:students
  sex:boy
  ```
