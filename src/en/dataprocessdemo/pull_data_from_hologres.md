## Pull data from a Hologres database for data enrichment

This topic describes how to use resource functions to pull data from a Hologres database for data enrichment.

# Use the e_search_table_map function to enrich log data

- Raw data

  - Hologres Sample data records in a table of a database

  | product_id | product_name | product_price | product_sales_number | sex  |
  | ---------- | ------------ | ------------- | -------------------- | ---- |
  | 2          | lipstick     | 288           | 2219                 | girl |
  | 5          | watch        | 1399          | 265                  | boy  |
  | 6          | mac          | 4200          | 265                  | boy  |
  | 3          | mouse        | 20            | 2583                 | boy  |
  | 1          | basketball   | 35            | 3658                 | boy  |
  | 4          | notebook     | 9             | 5427                 | girl |

  - Sample log in a Logstore of Simple Log Service

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

- Transformation rule
  Compare the sex field in the Logstore and the sex field in the Hologres database. Both fields match only when the sex values are the same.If both fields match, the value of the product_name field is pulled from the Hologres database and concatenated with the log data in the Logstore into new data.
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
  **Note** To ensure data security and network stability, we recommend that you access the Hologres database over a virtual private cloud (VPC).You can obtain the endpoint from the network configurations of the Hologres instance and use the endpoint to access a Hologres database over a VPC. After you obtain the endpoint, replace the value of the address field with the endpoint.
- Transformation result

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
