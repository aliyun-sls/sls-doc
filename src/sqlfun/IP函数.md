# 介绍
本文介绍IP函数的基本语法及示例。

# 函数示例
日志服务支持如下IP函数。
>在日志服务分析语句中，表示字符串的字符必须使用单引号（''）包裹，无符号包裹或被双引号（""）包裹的字符表示字段名或列名。例如：'status'表示字符串status，status或"status"表示日志字段status。


|  函数类型  |                                         函数名称                                         |                语法                |                     说明                     |
|--------|--------------------------------------------------------------------------------------|----------------------------------|--------------------------------------------|
| IP地址函数 | [ip_to_city函数](#ip_to_city函数)          | ip_to_city( *x* )                | 分析目标IP地址所属城市。 返回结果为城市的中文名称。                |
| IP地址函数 | [ip_to_city函数](#ip_to_city函数)          | ip_to_city( *x* , 'en')          | 分析目标IP地址所属城市。 返回结果为城市的行政区划代码。              |
| IP地址函数 | [ip_to_city_geo函数](#ip_to_city_geo函数)      | ip_to_city_geo( *x* )            | 分析目标IP地址所属城市的经纬度。此函数返回的是城市经纬度，每个城市只有一个经纬度。 |
| IP地址函数 | [ip_to_country函数](#ip_to_country函数)       | ip_to_country( *x* )             | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的中文名称。          |
| IP地址函数 | [ip_to_country函数](#ip_to_country函数)       | ip_to_country( *x* , 'en')       | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| IP地址函数 | [ip_to_country_code函数](#ip_to_country_code函数)  | ip_to_country_code( *x* )        | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| IP地址函数 | [ip_to_domain函数](#ip_to_domain函数)        | ip_to_domain( *x* )              | 判断目标IP地址是内网地址还是外网地址。                       |
| IP地址函数 | [ip_to_geo函数](#ip_to_geo函数)           | ip_to_geo( *x* )                 | 分析目标IP地址所在位置的经纬度。                          |
| IP地址函数 | [ip_to_provider函数](#ip_to_provider函数)      | ip_to_provider( *x* )            | 分析目标IP地址所对应的网络运营商。                         |
| IP地址函数 | [ip_to_province函数](#ip_to_province函数)      | ip_to_province( *x* )            | 分析目标IP地址所属省份州。 返回结果为省份州的中文名称。              |
| IP地址函数 | [ip_to_province函数](#ip_to_province函数)      | ip_to_province( *x* , 'en')      | 分析目标IP地址所属省份州。 返回结果为省份州的行政区划代码。            |
| IP网段函数 | [ip_prefix函数](#ip_prefix函数)           | ip_prefix( *x* , *prefix_bits* ) | 获取目标IP地址的前缀。                               |
| IP网段函数 | [is_prefix_subnet_of函数](#is_prefix_subnet_of函数) | is_prefix_subnet_of( *x* , *y* ) | 判断目标网段是否为某网段的子网。                           |
| IP网段函数 | [is_subnet_of函数](#is_subnet_of函数)        | is_subnet_of( *x* , *y* )        | 判断目标IP地址是否在某网段内。                           |
| IP网段函数 | [ip_subnet_max函数](#ip_subnet_max函数)       | ip_subnet_max( *x* )             | 获取IP网段中的最大IP地址。                            |
| IP网段函数 | [ip_subnet_min函数](#ip_subnet_min函数)       | ip_subnet_min( *x* )             | 获取IP网段中的最小IP地址。                            |
| IP网段函数 | [ip_subnet_range函数](#ip_subnet_range函数)     | ip_subnet_range( *x* )           | 获取IP网段范围。                                  |


# 案例
ip_to_city函数 
---------------------------------

ip_to_city函数用于分析目标IP地址所属城市。

* 返回城市的中文名称。

  ```sql
  ip_to_city(x)
  ```

  

* 返回城市的行政区划代码。

  ```sql
  ip_to_city(x,'en')
  ```

  




| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型。

统计来自不同城市的请求的平均时间、最大时间以及最大时间对应的请求ID。

* 查询和分析语句

  ```sql
  * |
  SELECT
    AVG(request_time) AS avg_request_time,
    MAX(request_time) AS max_request_time,
    MAX_BY(requestId, request_time) AS requestId,
    ip_to_city(client_ip) AS city
  GROUP BY
    city
  ```

  

* 查询和分析结果

  ![ip_to_city](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/7114436261/p295175.png)




ip_to_city_geo函数 
-------------------------------------

ip_to_city_geo函数用于分析目标IP地址所属城市的经纬度。此函数返回的是城市经纬度，每个城市只有一个经纬度。

```sql
ip_to_city_geo(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型，格式为`纬度,经度`。

统计IP地址的经纬度，确认客户端分布情况。

* 查询和分析语句

  ```sql
  * |
  SELECT
    count(*) AS PV,
    ip_to_city_geo(client_ip) AS geo
  GROUP BY
    geo
  ORDER BY
    PV DESC
  ```

  

* 查询和分析结果

  ![ip_to_city_geo](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295142.png)




ip_to_country函数 
------------------------------------

ip_to_country函数用于分析目标IP地址所属国家或地区。

* 返回国家或地区的中文名称。

  ```sql
  ip_to_country(x)
  ```

  

* 返回国家或地区的代码。

  ```sql
  ip_to_country(x,'en')
  ```

  




| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型。

统计来自不同国家或地区的请求的平均时间、最大时间以及最大时间对应的请求ID。

* 查询和分析语句

  ```sql
  * |
  SELECT
    AVG(request_time) AS avg_request_time,
    MAX(request_time) AS max_request_time,
    MAX_BY(requestId, request_time) AS requestId,
    ip_to_country(client_ip) AS country
  GROUP BY
    country
  ```

  

* 查询和分析结果

  ![延时情况](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p230160.png)




ip_to_country_code函数 
-----------------------------------------

ip_to_country_code函数用于分析目标IP地址所属国家或地区，返回国家或地区的代码。

```sql
ip_to_country_code(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型。

统计来自不同国家或地区的请求的平均时间、最大时间以及最大时间对应的请求ID。

* 查询和分析语句

  ```sql
  * |
  SELECT
    AVG(request_time) AS avg_request_time,
    MAX(request_time) AS max_request_time,
    MAX_BY(requestId, request_time) AS requestId,
    ip_to_country_code(client_ip) AS country
  GROUP BY
    country
  ```

  

* 查询和分析结果

  ![ip_to_country_code](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295148.png)




ip_to_domain函数 
-----------------------------------

ip_to_domain函数用于判断目标IP地址是内网地址还是外网地址。

```sql
ip_to_domain(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型，返回intranet或internet。

* intranet表示内网。

* internet表示外网。




统计不是来自内网的请求总数。

* 查询和分析语句

  ```sql
  * | SELECT count(*) AS PV where ip_to_domain(client_ip)!='intranet'
  ```

  

* 查询和分析结果

  ![不来自内网的请求](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5846246261/p230090.png)




ip_to_geo函数 
--------------------------------

ip_to_geo函数用于分析目标IP地址所在位置的经纬度。关于geohash函数的详细信息，请参见[地理函数](t15139.html#reference-sm3-1zx-g2b)。

```sql
ip_to_geo(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型，格式为`纬度,经度`。

统计IP地址的经纬度，确认客户端分布情况。

* 查询和分析语句

  ```sql
  * |
  SELECT
    count(*) AS PV,
    ip_to_geo(client_ip) AS geo
  GROUP BY
    geo
  ORDER BY
    PV DESC
  ```

  

* 查询和分析结果

  ![客户端分布](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p230060.png)




ip_to_provider函数 
-------------------------------------

ip_to_provider函数用于分析目标IP地址对应的网络运营商。

```sql
ip_to_provider(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型。

统计通过不同网络运营商发起的请求的平均请求时间。

* 查询和分析语句

  ```sql
  * |
  SELECT
    avg(request_time) AS avg_request_time,
    ip_to_provider(client_ip) AS provider
  GROUP BY
    provider
  ORDER BY
    avg_request_time
  ```

  

* 查询和分析结果
  
  ![运营商延时](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p230066.png)




ip_to_province函数 
-------------------------------------

ip_to_province函数分析目标IP地址所属省份州。

* 返回省份州的中文名称。

  ```sql
  ip_to_province(x)
  ```

  

* 返回省份州的行政区划代码。

  ```sql
  ip_to_province(x,'en')
  ```

  




| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP地址。 |



varchar类型。

统计请求总数Top10的省份州。

* 查询和分析语句

  ```sql
  * | SELECT count(*) as PV, ip_to_province(client_ip) AS province GROUP BY province ORDER BY PV desc LIMIT 10
  ```

  

  如果上述结果中包含了内网请求，且您希望过滤这部分请求，可参考如下查询和分析语句。

  ```sql
  * | SELECT count(*) AS PV, ip_to_province(client_ip) AS province WHERE ip_to_domain(client_ip) != 'intranet'  GROUP BY province ORDER BY PV DESC LIMIT 10
  ```

  

  

* 查询和分析结果

  ![top10省份](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p230092.png)




ip_prefix函数 
--------------------------------

ip_prefix函数用于获取目标IP地址的前缀。返回子网掩码格式的IP地址，例如192.168.1.0/24。

```sql
ip_prefix(x, prefix_bits)
```



|      参数       |    说明     |
|---------------|-----------|
| *x*           | 参数值为IP地址。 |
| *prefix_bits* | 前缀位数。     |



varchar类型。

获取client_ip字段值的IP地址前缀。

* 查询和分析语句

  ```sql
  * | SELECT ip_prefix(client_ip,24) AS client_ip
  ```

  

* 查询和分析结果

  ![ip_prefix](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295152.png)




is_prefix_subnet_of函数 
------------------------------------------

is_prefix_subnet_of函数用于判断目标网段是否为某网段的子网。

```sql
is_prefix_subnet_of(x, y)
```



| 参数  |          说明           |
|-----|-----------------------|
| *x* | 参数值为IP网段。y网段是否属于x网段内。 |
| *y* | 参数值为IP网段。             |



boolean类型。

判断client_ip字段值所在网段是否属于192.168.0.1/24网段内。

* 查询和分析语句

  ```sql
  * | SELECT is_prefix_subnet_of('192.168.0.1/24',concat(client_ip,'/24'))
  ```

  

* 查询和分析结果

  ![is_subnet_of](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295160.png)




is_subnet_of函数 
-----------------------------------

is_subnet_of函数用于判断目标IP地址是否在某网段内。

```sql
is_subnet_of(x, y)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP网段。 |
| *y* | 参数值为IP地址。 |



boolean类型。

判断client_ip字段值是否属于192.168.0.1/24网段内。

* 查询和分析语句

  ```sql
  * | SELECT is_subnet_of('192.168.0.1/24',client_ip)
  ```

  

* 查询和分析结果

  ![is_subnet_of](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295160.png)




ip_subnet_min函数 
------------------------------------

ip_subnet_min函数用于获取IP网段中的最小IP地址。

```sql
ip_subnet_min(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP网段。 |



varchar类型。

获取client_ip字段值所在网段的最小IP地址。

* 查询和分析语句

  ```sql
  * | SELECT ip_subnet_min(concat(client_ip,'/24'))
  ```

  

* 查询和分析结果

  ![ip_subnet_min](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4023436261/p295164.png)




ip_subnet_max函数 
------------------------------------

ip_subnet_max函数用于获取IP网段中最大IP地址。

```sql
ip_subnet_max(x)
```

vac

| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP网段。 |



varchar类型。

获取client_ip字段值所在网段的最大IP地址。

* 查询和分析语句

  ```sql
  * | SELECT ip_subnet_max(concat(client_ip,'/24'))
  ```

  

* 查询和分析结果

  ![ip_subnet_max](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5023436261/p295167.png)




ip_subnet_range函数 
--------------------------------------

ip_subnet_range用于获取IP网段范围。

```sql
ip_subnet_range(x)
```



| 参数  |    说明     |
|-----|-----------|
| *x* | 参数值为IP网段。 |



JSON类型。

获取client_ip字段值所在网段的范围。

* 查询和分析语句

  ```sql
  * | SELECT ip_subnet_range(concat(client_ip,'/24'))
  ```

  

* 查询和分析结果

  ![ip_subnet_range](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5023436261/p295168.png)