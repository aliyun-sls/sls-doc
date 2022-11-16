JSON函数 
===========================

# 介绍
本文介绍JSON函数的基本语法及示例。

# 函数示例
日志服务支持如下JSON函数。

* 在日志服务分析语句中，表示字符串的字符必须使用单引号（''）包裹，无符号包裹或被双引号（""）包裹的字符表示字段名或列名。例如：'status'表示字符串status，status或"status"表示日志字段status。

* 如果日志字段的值为JSON类型且需要展开为多行，请使用unnest语法。更多信息，请参见[UNNEST子句](t15177.html)。

* 如果字符串被解析成JSON类型失败，则返回null。





|                                         函数名称                                         |                    语法                    |                          说明                           |
|--------------------------------------------------------------------------------------|------------------------------------------|-------------------------------------------------------|
| [json_array_contains函数](#json_array_contains函数) | json_array_contains( *x* , *value* )     | 判断JSON数组中是否包含某个值。                                     |
| [json_array_get函数](#json_array_get函数)      | json_array_get( *x* , *index* )          | 获取JSON数组中某个下标对应的元素。                                   |
| [json_array_length函数](#json_array_length函数)   | json_array_length( *x* )                 | 计算JSON数组中元素的数量。                                       |
| [json_extract函数](#json_extract函数)        | json_extract( *x* , json_path)           | 从JSON对象或JSON数组中提取一组JSON值（数组或对象）。                      |
| [json_extract_scalar函数](#json_extract_scalar函数) | json_extract_scalar( *x* , *json_path* ) | 从JSON对象或JSON数组中提取一组标量值（字符串、整数或布尔值）。类似于json_extract函数。 |
| [json_format函数](#json_format函数)         | json_format( *x* )                       | 把JSON类型转化成字符串类型。                                      |
| [json_parse函数](#json_parse函数)          | json_parse( *x* )                        | 把字符串类型转化成JSON类型。                                      |
| [json_size函数](#json_size函数)           | json_size( *x* , *json_path* )           | 计算JSON对象或数组中元素的数量。                                    |


# 案例
json_array_contains函数 
------------------------------------------

json_array_contains函数用于判断JSON数组中是否包含某个值。

```sql
json_array_contains(x, value)
```



|   参数    |     说明      |
|---------|-------------|
| *x*     | 参数值为JSON数组。 |
| *value* | 数值。         |



boolean类型。

判断JSON字符串\[1, 2, 3\]中是否包含2。

* 查询和分析语句

  ```sql
  * | SELECT json_array_contains('[1, 2, 3]', 2)
  ```

  

* 查询和分析结果

  ![json_array_contains](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/8049136261/p294959.png)




json_array_get函数 
-------------------------------------

json_array_get函数用于获取JSON数组下标对应的元素。

```sql
json_array_get(x, index)
```



|   参数    |      说明      |
|---------|--------------|
| *x*     | 参数值为JSON数组。  |
| *index* | JSON下标，从0开始。 |



varchar类型。

返回JSON数组\["a", \[3, 9\], "c"\]下标为1的元素。

* 查询和分析语句

  ```sql
  * | SELECT json_array_get('["a", [3, 9], "c"]', 1)
  ```

  

* 查询和分析结果

  ![json_array_get](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9311336261/p294990.png)




json_array_length函数 
----------------------------------------

json_array_length函数用于计算JSON数组中元素的数量。

```sql
json_array_length(x)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为JSON数组。 |



bigint类型。

* 示例1：计算Results字段值中JSON元素的数量。
  * 字段样例

    ```sql
    Results:[{"EndTime":1626314920},{"FireResult":2}]
    ```

    
  
  * 查询和分析语句

    ```sql
    * | SELECT json_array_length(Results)
    ```

    
  
  * 查询和分析结果

    ![json_array_length](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/8636136261/p294953.png)
  

  

* 示例2：计算time字段值中JSON元素的数量。
  * 字段样例

    ```sql
    time:["time_local","request_time","upstream_response_time"]
    ```

    
  
  * 查询和分析语句

    ```sql
    * | SELECT json_array_length(time)
    ```

    
  
  * 查询和分析结果

    ![json_array_length](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9636136261/p294955.png)
  

  




json_extract函数 
-----------------------------------

json_extract函数用于从JSON对象或JSON数组中提取一组JSON值（数组或对象）。
**注意** 针对非法的JSON类型，json_extract函数会报错，建议您使用json_extract_scalar函数。

```sql
json_extract(x, json_path)
```



|     参数      |                 说明                 |
|-------------|------------------------------------|
| *x*         | 参数值为JSON对象或JSON数组。                 |
| *json_path* | JSON路径，格式为$.store.book\[0\].title。 |



JSON格式的string类型。

获取Results字段中EndTime字段的值。

* 字段样例

  ```sql
  Results:[{"EndTime":1626314920},{"FireResult":2}]
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT json_extract(Results, '$.0.EndTime')
  ```

  

* 查询和分析结果

  ![json_extract](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9311336261/p295024.png)




json_extract_scalar函数 
------------------------------------------

json_extract_scalar函数用于从JSON对象或JSON数组中提取一组标量值（字符串、整数或布尔值）。

```sql
json_extract_scalar(x, json_path)
```



|     参数      |                 说明                 |
|-------------|------------------------------------|
| *x*         | 参数值为JSON对象或JSON数组。                 |
| *json_path* | JSON路径，格式为$.store.book\[0\].title。 |



varchar类型。

从Results字段中获取RawResultCount字段的值，并将该值转换为bigint类型进行求和。

* 字段样例

  ```sql
  Results:[{"EndTime":1626314920},{"RawResultCount":1}]
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT sum(cast(json_extract_scalar(Results,'$.0.RawResultCount') AS bigint) )
  ```

  

* 查询和分析结果

  ![json_extract_scalar](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9311336261/p295030.png)




json_format函数 
----------------------------------

json_format函数用于将JSON类型转化成字符串类型。

```sql
json_format(x)
```



| 参数  |     说明      |
|-----|-------------|
| *x* | 参数值为JSON类型。 |



varchar类型。

将JSON数组\[1,2,3\]转换为字符串\[1, 2, 3\]。

* 查询和分析语句

  ```sql
  * | SELECT json_format(json_parse('[1, 2, 3]'))
  ```

  

* 查询和分析结果

  ![json_format](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0821046261/p294962.png)




json_parse函数 
---------------------------------

json_parse函数只用于将字符串类型转化成JSON类型，判断是否符合JSON格式。一般情况下，json_parse函数使用意义不大，如果您需要从JSON中提取值，建议使用json_extract_scalar函数。

```sql
json_parse(x)
```



| 参数  |    说明    |
|-----|----------|
| *x* | 参数值为字符串。 |



JSON类型。

将字符串\[1,2,3\]转换为JSON数组\[1, 2, 3\]。

* 查询和分析语句

  ```sql
   * | SELECT json_parse('[1, 2, 3]')
  ```

  

* 查询和分析结果

  ![json_format](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0821046261/p294962.png)




json_size函数 
--------------------------------

json_size函数用于计算JSON对象或JSON数组中元素的数量。

```sql
json_size(x, json_path)
```



|     参数      |                 说明                 |
|-------------|------------------------------------|
| *x*         | 参数值为JSON对象或JSON数组。                 |
| *json_path* | JSON路径，格式为$.store.book\[0\].title。 |



bigint类型。

返回status字段中元素的数量。

* 字段样例

  ```sql
  Results:[{"EndTime":1626314920,"FireResult":2,"RawResults":[{"_col0":"1094"}]}]
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT json_size(Results, '$.0.RawResults')
  ```

  

* 查询和分析结果
  
  ![json_size](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9311336261/p295005.png)