# 介绍
本文介绍URL函数的基本语法和示例。

# 函数示例
日志服务支持如下URL函数。
**注意**

* URL格式为`[protocol:][//host[:port]][path][?query][#fragment]`。

* 在日志服务分析语句中，表示字符串的字符必须使用单引号（''）包裹，无符号包裹或被双引号（""）包裹的字符表示字段名或列名。例如：'status'表示字符串status，status或"status"表示日志字段status。





|                                          函数名称                                          |                       语法                        |         说明          |
|----------------------------------------------------------------------------------------|-------------------------------------------------|---------------------|
| [url_encode函数](#url_encode函数)            | url_encode( *x* )                               | 对URL进行编码。           |
| [url_decode函数](#url_decode函数)            | url_decode( *x* )                               | 对URL进行解码。           |
| [url_extract_fragment函数](#url_extract_fragment函数)  | url_extract_fragment( *x* )                     | 从URL中提取Fragment信息。  |
| [url_extract_host函数](#url_extract_host函数)      | url_extract_host( *x* )                         | 从URL中提取Host信息。      |
| [url_extract_parameter函数](#url_extract_parameter函数) | url_extract_parameter( *x* , *parameter name* ) | 从URL的查询部分中提取指定参数的值。 |
| [url_extract_path函数](#url_extract_path函数)      | url_extract_path( *x* )                         | 从URL中提取访问路径信息。      |
| [url_extract_port函数](#url_extract_port函数)      | url_extract_port( *x* )                         | 从URL中提取端口信息。        |
| [url_extract_protocol函数](#url_extract_protocol函数)  | url_extract_protocol( *x* )                     | 从URL中提取协议信息。        |
| [url_extract_query函数](#url_extract_query函数)     | url_extract_query( *x* )                        | 从URL中提取查询部分的信息。     |


# 案例
url_encode函数 
---------------------------------

url_encode函数用于对URL进行编码。

```sql
url_encode(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

对url字段的值进行编码。

* 字段样例

  ```sql
  url:https://homenew.console.aliyun.com/home/dashboard/ProductAndService
  ```

  

* 查询和分析语句

  ```sql
  * | select url_encode(url)
  ```

  

* 查询和分析结果

  ![url_encode](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/6912832361/p296965.png)




url_decode函数 
---------------------------------

url_decode函数对URL进行解码。

```sql
url_decode(x)
```



| 参数  |       说明       |
|-----|----------------|
| *x* | 参数值为编码过的URL地址。 |



varchar类型。

对url字段值进行解码。

* 字段样例

  ```sql
  url:http%3A%2F%2Fwww.aliyun.com%3A80%2Fproduct%2Fsls
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_decode(url) AS decode
  ```

  

* 查询和分析结果

  ![url_decode](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/2039486261/p297005.png)




url_extract_fragment函数 
-------------------------------------------

url_extract_fragment函数用于从URL中提取Fragment信息。

```sql
url_extract_fragment(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取Fragment信息。

* 字段样例

  ```sql
  url:https://sls.console.aliyun.com/#/project/dashboard-demo/categoryList
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_fragment(url)
  ```

  

* 查询和分析结果

  ![url_extract_fragment](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/6912832361/p296971.png)




url_extract_host函数 
---------------------------------------

url_extract_host函数用于从URL中提取Host信息。

```sql
url_extract_host(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取Host信息。

* 字段样例

  ```sql
  url:https://homenew.console.aliyun.com/home/dashboard/ProductAndService
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_host(url) AS host
  ```

  

* 查询和分析结果

  ![url_extract_host](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/3039486261/p296968.png)




url_extract_parameter函数 
--------------------------------------------

url_extract_parameter函数用于从URL的查询部分中提取指定参数的值。

```sql
url_extract_parameter(x, parameter name)
```



|        参数        |       说明       |
|------------------|----------------|
| *x*              | 参数值为具体的URL地址。  |
| *parameter name* | URL查询部分中的参数名称。 |



varchar类型。

从url字段值中提取accounttraceid参数的值。

* 字段样例

  ```sql
  url:https://sls.console.aliyun.com/lognext/project/dashboard-all/logsearch/nginx-demo?accounttraceid=d6241a173f88471c91d3405cda010ff5ghdw
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_parameter(url,'accounttraceid') AS accounttraceid
  ```

  

* 查询和分析结果

  ![url_extract_parameter](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/3039486261/p297109.png)




url_extract_path函数 
---------------------------------------

url_extract_path用于从URL中提取访问路径信息。

```sql
url_extract_path(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取访问路径信息。

* 字段样例

  ```sql
  url:https://sls.console.aliyun.com/lognext/project/dashboard-all/logsearch/nginx-demo?accounttraceid=d6241a173f88471c91d3405cda010ff5ghdw
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_path(url) AS path
  ```

  

* 查询和分析结果

  ![url_extract_path](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/3039486261/p296972.png)




url_extract_port函数 
---------------------------------------

url_extract_port函数用于从URL中提取端口信息。

```sql
url_extract_port(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取端口信息。

* 字段样例

  ```sql
  url:http://localhost:8080/lognext/profile
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_port(url) AS port
  ```

  

* 查询和分析结果

  ![url_extract_port](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/3039486261/p297148.png)




url_extract_protocol函数 
-------------------------------------------

url_extract_protocol用于从URL中提取协议信息。

```sql
url_extract_port(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取协议信息。

* 字段样例

  ```sql
  url:https://homenew.console.aliyun.com/home/dashboard/ProductAndService
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_protocol(url) AS protocol
  ```

  

* 查询和分析结果

  ![url_extract_protocol](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/3039486261/p296969.png)




url_extract_query函数 
----------------------------------------

url_extract_query函数用于从URL中提取查询部分的信息。

```sql
url_extract_query(x)
```



| 参数  |      说明       |
|-----|---------------|
| *x* | 参数值为具体的URL地址。 |



varchar类型。

从url字段值中提取查询部分的信息。

* 字段样例

  ```sql
  url:https://sls.console.aliyun.com/lognext/project/dashboard-all/logsearch/nginx-demo?accounttraceid=d6241a173f88471c91d3405cda010ff5ghdw
  ```

  

* 查询和分析语句

  ```sql
  * | SELECT url_extract_query(url)
  ```

  

* 查询和分析结果

  ![url_extract_query](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/7912832361/p297104.png)