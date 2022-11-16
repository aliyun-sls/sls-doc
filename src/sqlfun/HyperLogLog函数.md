# 介绍
HyperLogLog函数为近似聚合函数，类似于approx_distinct函数。当计算的数据量非常大时，使用HyperLogLog函数可快速返回估算结果。本文介绍HyperLogLog函数的基本语法以及示例。


# 函数示例
日志服务支持如下HyperLogLog函数。
>在日志服务分析语句中，表示字符串的字符必须使用单引号（''）包裹，无符号包裹或被双引号（""）包裹的字符表示字段名或列名。例如：'status'表示字符串status，status或"status"表示日志字段status。


|                                     函数名称                                      |         语法         |                   说明                   |
|-------------------------------------------------------------------------------|--------------------|----------------------------------------|
| [approx_set函数](#approx_set函数)       | approx_set( *x* )  | 估算 *x* 中不重复值的个数，最大标准误差默认为0.01625。      |
| [cardinality函数](#cardinality函数)      | cardinality( *x* ) | 将HyperLogLog类型的内容转换为bigint类型。          |
| [empty_approx_set函数](#empty_approx_set函数) | empty_approx_set() | 返回一个HyperLogLog类型的空值。最大标准误差默认为0.01625。 |
| [merge函数](#merge函数)            | merge( *x* )       | 聚合计算所有的HyperLogLog值。                   |


# 案例
approx_set函数 
---------------------------------

approx_set函数用于估算 *x* 中不重复值的个数，最大标准误差默认为0.01625。

```sql
approx_set(x)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为任意数据类型。 |



HyperLogLog类型。

使用approx_set函数估算每分钟的网站访问UV，返回结果为HyperLogLog编码格式。

* 查询和分析语句

  ```sql
  * |
  SELECT
    date_trunc('minute', __time__) AS Time,
    approx_set(client_ip) AS UV
  FROM  website_log
  GROUP BY
    Time
  ORDER BY
    Time
  ```

  

* 查询和分析结果
  
  ![approx_set](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9463711361/p325162.png)




cardinality函数 
----------------------------------

cardinality函数用于将HyperLogLog类型的内容转换为bigint类型。

```sql
cardinality(x)
```



| 参数  |         说明         |
|-----|--------------------|
| *x* | 参数值为HyperLogLog类型。 |



bigint类型。

使用approx_set函数估算每分钟的网站访问UV，返回结果为HyperLogLog类型。然后使用cardinality函数将HyperLogLog类型转换为bigint类型。

* 查询和分析语句

  ```sql
  * |
  SELECT
    Time,
    cardinality(UV) AS UV
  FROM  (
      SELECT
        date_trunc('minute', __time__) AS Time,
        approx_set(client_ip) AS UV
      FROM      website_log
      GROUP BY
        Time
      ORDER BY
        Time
    ) AS UV
  ```

  

* 查询和分析结果

  ![cardinality](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9463711361/p325181.png)




empty_approx_set函数 
---------------------------------------

empty_approx_set函数用于返回一个HyperLogLog类型的空值。最大标准误差默认为0.01625。

```sql
empty_approx_set()
```



HyperLogLog类型。

返回一个HyperLogLog类型的空值。

* 查询和分析语句

  ```sql
  * | SELECT  empty_approx_set()
  ```

  

* 查询和分析结果

  ![empty_approx_set](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9463711361/p325211.png)




merge函数 
----------------------------

merge函数用于聚合计算所有的HyperLogLog值。

```sql
merge(x)
```



| 参数  |         说明         |
|-----|--------------------|
| *x* | 参数值为HyperLogLog类型。 |



HyperLogLog类型。

使用approx_set函数估算每分钟的网站访问UV，使用merge函数聚合计算15分钟内所有的UV，然后使用cardinality函数将HyperLogLog类型转换为bigint类型。

* 查询和分析语句

  ```sql
  * |
  SELECT
    Time,
    cardinality(UV) AS UV,
    cardinality(merge(UV) over()) AS Total_UV
  FROM  (
      SELECT
        date_trunc('minute', __time__) AS Time,
        approx_set(client_ip) AS UV
      FROM      log
      GROUP BY
        Time
      ORDER BY
        Time
    )
  ```

  

* 查询和分析结果
  
  ![merge](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9463711361/p325227.png)