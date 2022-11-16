# 介绍
本文介绍Map映射函数和运算符的基本语法及示例。

# 函数示例
日志服务支持如下Map映射函数和运算符。
>在日志服务分析语句中，表示字符串的字符必须使用单引号（''）包裹，无符号包裹或被双引号（""）包裹的字符表示字段名或列名。例如：'status'表示字符串status，status或"status"表示日志字段status。


|                                         函数名称                                         |                   语法                    |                                        说明                                        |
|--------------------------------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------------------------------|
| [下标运算符](#下标运算符)          | \[ *x* \]                               | 获取Map中目标键的值。                                                                     |
| [cardinality函数](#cardinality函数)  | cardinality( *x* )                      | 计算Map的大小。                                                                        |
| [element_at函数](#element_at函数)   | element_at( *x* , *key* )               | 获取Map中目标键的值。                                                                     |
| [histogram函数](#histogram函数)    | histogram( *x* )                        | 对查询和分析结果进行分组，返回结果为JSON格式。                                                        |
| [histogram_u函数](#histogram_u函数)  | histogram_u( *x* )                      | 对查询和分析结果进行分组，返回结果为多行多列格式。                                                        |
| [map函数](#map函数)          | map()                                   | 返回一个空Map。                                                                        |
| [map函数](#map函数)          | map( *x* , *y* )                        | 将两个数组映射为一个Map。                                                                   |
| [map_agg函数](#map_agg函数)      | map_agg( *x* , *y* )                    | 将 *x* 和 *y* 映射为一个Map。 *x* 为Map中的键， *y* 为Map中的键值。当 *y* 存在多个值时，随机提取一个值作为键值。        |
| [map_concat函数](#map_concat函数)   | map_concat( *x* , *y* ...)              | 将多个Map合并为一个Map。                                                                  |
| [map_filter函数](#map_filter函数)   | map_filter( *x* , *lambda_expression* ) | 结合Lambda表达式，用于过滤Map中的元素。                                                         |
| [map_keys函数](#map_keys函数)     | map_keys( *x* )                         | 提取Map中所有的键，并以数组形式返回。                                                             |
| [map_values函数](#map_values函数)   | map_values( *x* )                       | 提取Map中所有键的值，并以数组形式返回。                                                            |
| [multimap_agg函数](#multimap_agg函数) | multimap_agg( *x* , *y* )               | 将 *x* 和 *y* 映射为一个Map。 *x* 为Map中的键， *y* 为Map中的键值，键值为数组格式。当 *y* 存在多个值时，提取所有的值作为键值。 |


# 案例
下标运算符 
--------------------------

下标运算符用于获取Map中的目标键的值。

```sql
[x]
```



| 参数  |       说明       |
|-----|----------------|
| *x* | 参数值为varchar类型。 |



任意数据类型。

日志服务数据加工日志中etl_context字段值为map类型，您可以使用下标运算符获取etl_context字段值中project的值。

* 字段样例

  ```sql
  etl_context: {
  project:"datalab-148****6461-cn-chengdu"
  logstore:"internal-etl-log"
  consumer_group:"etl-83****4d1965"
  consumer:"etl-b2d40ed****c8d6-291294"
  shard_id:"0" }
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT try_cast(json_parse(etl_context) AS map(varchar, varchar))['project']
  ```

  

* 查询和分析结果

  ![下标运算符](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0652678261/p303793.png)




cardinality函数 
----------------------------------

cardinality函数用于计算Map的大小。

```sql
cardinality(x)
```



| 参数  |     说明     |
|-----|------------|
| *x* | 参数值为map类型。 |



bigint类型。

使用histogram函数获取各个请求方法对应的请求数量，再通过cardinality函数获取请求方法的种类数。

* 查询和分析语句

  ```sql
  * |
  SELECT
    histogram(request_method) AS request_method,
    cardinality(histogram(request_method)) AS "kinds"
  ```

  

* 查询和分析结果

  ![cardinality](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0652678261/p296534.png)




element_at函数 
---------------------------------

element_at函数用于获取Map中目标键的值。

```sql
element_at(x, key)
```



|  参数   |     说明     |
|-------|------------|
| *x*   | 参数值为map类型。 |
| *key* | Map中的一个键。  |



任意数据类型。

使用histogram函数获取各个请求方法对应的请求数量，然后通过element_at函数获取DELETE字段的值。

* 查询和分析语句

  ```sql
  * |
  SELECT
    histogram(request_method) AS request_method,
    element_at(histogram(request_method),'DELETE') AS "count"
  ```

  

* 查询和分析结果

  ![element_at](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/1652678261/p303259.png)




histogram函数 
--------------------------------

histogram函数用于对查询和分析结果进行分组，返回结果为JSON格式。类似于`* | SELECT count(*) GROUP BY ` *x* 。

```sql
histogram(x)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为任意数据类型。 |



map类型。

使用histogram函数获取各个请求方法对应的请求数量。

* 查询和分析语句

  ```sql
  * | SELECT histogram(request_method) AS request_method
  ```

  

* 查询和分析结果

  ![histogram](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9832296261/p242188.png)




histogram_u函数 
----------------------------------

histogram_u函数用于对查询和分析结果进行分组，返回结果为多行多列。

```sql
histogram_u(x)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为任意数据类型。 |



bigint类型。

使用histogram_u函数获取各个请求方法对应的请求数量，并以柱形图展示查询和分析结果。

* 查询和分析语句

  ```sql
  *|SELECT  histogram_u(request_method) as request_method
  ```

  

* 查询和分析结果

  ![histogram_u](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9832296261/p242220.png)




map函数 
--------------------------

map函数用于返回一个空Map或者将两个数组映射为一个Map。

* 返回一个空Map。

  ```sql
  map()
  ```

  

* 将两个数组映射为一个Map。

  ```sql
  map(x,y) 
  ```

  




| 参数  |      说明      |
|-----|--------------|
| *x* | 参数值为array类型。 |
| *y* | 参数值为array类型。 |



map类型。

* 示例1：class字段表示班级，number字段表示班级人数，字段值为array类型。现使用map函数将两个字段的值（两个数组）映射为一个Map，将班级和班级人数一一对应。
  * 字段样例

    ```sql
    class:["class01","class02","class03","class04","class05"]
    number:[49,50,45,47,50]
    ```

    
  
  * 查询和分析语句

    ```sql
    * | SELECT map(try_cast(json_parse(class) AS array(varchar)) ,try_cast(json_parse(number) AS array(bigint)))
    ```

    
  
  * 查询和分析结果

    ![map](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/1652678261/p303301.png)
  

  

* 示例2：返回一个空Map。
  * 查询和分析语句

    ```sql
    *| SELECT map()
    ```

    
  
  * 查询和分析结果

    ![map](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/1652678261/p303267.png)
  

  




map_agg函数 
------------------------------

map_agg函数用于将 *x* 和 *y* 映射为一个Map。 *x* 为Map中的键， *y* 为Map中的键值。当 *y* 存在多个值时，随机提取一个值作为键值。

```sql
map_agg(x, y)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为任意数据类型。 |
| *y* | 参数值为任意数据类型。 |



map类型。

提取request_method字段值和request_time字段值，然后映射为一个Map。request_method字段值为Map中的键，request_time字段值为Map中的键值。

* 字段样例

  ```sql
  request_method:POST
  request_time:80
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT map_agg(request_method,request_time)
  ```

  

* 查询和分析结果

  ![map_agg](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4951288261/p242224.png)




map_concat函数 
---------------------------------

map_concat函数用于将多个Map合并为一个Map。

```sql
map_concat(x, y)
```



| 参数  |     说明     |
|-----|------------|
| *x* | 参数值为map类型。 |
| *y* | 参数值为map类型。 |



map类型。

日志服务数据加工日志中etl_context字段值和progress字段值都为map类型，您可以使用map_concat函数将这两个字段值合并为一个Map。

* 字段示例

  ```sql
  etl_context: {
   project:"datalab-148****6461-cn-chengdu"
   logstore:"internal-etl-log"
   consumer_group:"etl-83****4d1965"
   consumer:"etl-b2d40ed****c8d6-291294"
   shard_id:"0" }
  progress: {
   accept:3
   dropped:0
   delivered:3
   failed:0 }
  ```

  

* 查询和分析语句

  ```sql
  * |
  SELECT
    map_concat(
      cast (
        json_parse(etl_context) AS map(varchar, varchar)
      ),
      cast (json_parse(progress) AS map(varchar, varchar))
    )
  ```

  

* 查询和分析结果
  
  ![map_concat](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4188188261/p297065.png)




map_filter函数 
---------------------------------

map_filter函数和Lambda表达式结合，用于过滤Map中的元素。

```sql
map_filter(x, lambda_expression)
```



|               参数               |                                          说明                                          |
|--------------------------------|--------------------------------------------------------------------------------------|
| *x*                            | 参数值为map类型。                                                                           |
| *lambda_expression_expression* | Lambda表达式。更多信息，请参见[Lambda表达式](t13128.html#reference-zwt-jmq-zdb)。 |



map类型。

将两个数组映射为一个新的Map，且Map中的键值不为null。其中`(k, v) -> v is not null`为Lambda表达式。

* 查询和分析语句

  ```sql
  * | SELECT map_filter(map(array[10, 20, 30], array['a', NULL, 'c']), (k, v) -> v is not null)
  ```

  

* 查询和分析结果

  ![map_filter](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4188188261/p303830.png)




map_keys函数 
-------------------------------

map_keys函数用于提取Map中所有的键，并以数组形式返回。

```sql
map_keys(x)
```



| 参数  |     说明     |
|-----|------------|
| *x* | 参数值为map类型。 |



array类型。

日志服务数据加工日志中etl_context字段值为map类型，您可以使用map_keys函数提取etl_context字段值中所有的键。

* 字段样例

  ```sql
  etl_context: {
  project:"datalab-148****6461-cn-chengdu"
  logstore:"internal-etl-log"
  consumer_group:"etl-83****4d1965"
  consumer:"etl-b2d40ed****c8d6-291294"
  shard_id:"0" }
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT map_keys(try_cast(json_parse(etl_context) AS map(varchar, varchar)))
  ```

  

* 查询和分析结果

  ![map_keys](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/1652678261/p303746.png)




map_values函数 
---------------------------------

map_values函数用于提取Map中所有键的值，并以数组形式返回。

```sql
map_values(x)
```



| 参数  |     说明     |
|-----|------------|
| *x* | 参数值为map类型。 |



array类型。

日志服务数据加工日志中etl_context字段值为map类型，您可以使用map_values函数提取etl_context字段值中所有键的值。

* 字段样例

  ```sql
  etl_context: {
  project:"datalab-148****6461-cn-chengdu"
  logstore:"internal-etl-log"
  consumer_group:"etl-83****4d1965"
  consumer:"etl-b2d40ed****c8d6-291294"
  shard_id:"0" }
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT map_values(try_cast(json_parse(etl_context) AS map(varchar, varchar)))
  ```

  

* 查询和分析结果

  ![map_values](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/1652678261/p303314.png)




multimap_agg函数 
-----------------------------------

multimap_agg函数用于将 *x* 和 *y* 映射为一个Map。 *x* 为Map中的键， *y* 为Map中的键值，键值为数组格式。当 *y* 存在多个值时，提取所有的值作为键值。

```sql
multimap_agg(x, y)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为任意数据类型。 |
| *y* | 参数值为任意数据类型。 |



map类型。

提取request_method字段和request_time字段的所有值，然后映射为一个Map。request_method字段值为Map中的键，request_time字段值为Map中的键值，键值为数组格式。

* 字段样例

  ```sql
  request_method:POST
  request_time:80
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT multimap_agg(request_method,request_time)
  ```

  

* 查询和分析结果

  ![multimap_agg](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4951288261/p242228.png)