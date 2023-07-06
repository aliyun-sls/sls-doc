## 查询介绍
日志服务支持秒级查询十亿到千亿级别的日志数据，并支持使用SQL对查询结果进行统计分析，或者使用Scan功能对查询结果的指定字段进行扫描查询
|语句|描述|特点|示例|
|----|----|----|----|
|查询语句|查询语句用于指定日志查询时的过滤规则，返回符合条件的日志|可单独出现，需配置索引| Status: 400|
|分析语句|分析语句可以对查询的结果进行计算或者统计，为SQL语法，竖线(\|)跟随查询语句: 查询语句\|分析语句|需结合查询语句一起使用，需配置索引|* \| SELECT status, count(*) AS PV GROUP BY status|
|扫描语句|扫描语句可以对查询的结果进行扫描计算，为SLS的Scan语法，竖线(\|)跟随查询语句: 查询语句 \| WHERE bool_expression|需配合查询语句使用,无需配置索引| * \| status:200 \| WHERE userId = '123'|
> 更详细的 __查询__ 说明参考[查询概述 - 官方文档](https://help.aliyun.com/document_detail/43772.html)

> 更详细的 __索引__ 说明参考[配置索引 - 官方文档](https://help.aliyun.com/document_detail/90732.html)

> 本文主要针对 __查询__ 语句，更详细的 __分析__ 和 __扫描(Scan)__ 使用方法可参考案例中心对应说明

## 日志场景
测试的日志场景为mock产生的nginx的access log，日志中的主要字段如下
|字段名|类型|样例|
|--|--|--|
|body_bytes_sent|long|3000|
|host| text(不分词)|www.mg.mock.com|
|http_referer|text(不分词)|www.hpw.mock.com|
|http_user_agent|text|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11|
|http_x_forwarded_for|text(不分词)|127.0.0.1|
|remote_addr|text(不分词)|127.0.0.1|
|remote_user|text|50i0(随机字符串)|
|request_length|long|2000|
|request_method|text|POST|
|request_time|long|30|
|request_url|text|/request/path-1/file-4|
|status|long|200|
|time_local|text|22/Dec/2022:09:26:43|
|upstream_response_time|double|0.5|

注：未注明分词的默认分词符为 __, '";=()[]{}?@&<>/:\n\t\r__

## 普通查询
* 查询404的状态码 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=c3RhdHVzOiA0MDQ=&queryTimeType=6windo&extendsParams=true)
```sql
status: 404
```
* 查询upstream_response_time大于0.5ms的日志 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=dXBzdHJlYW1fcmVzcG9uc2VfdGltZSA+IDAuNQ==&queryTimeType=6windo&extendsParams=true)
```sql
upstream_response_time > 0.5
```
* 查询request_time处于50-100ms的日志 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=cmVxdWVzdF90aW1lIGluIFs1MCAxMDBd&queryTimeType=6windo&extendsParams=true)
```sql
request_time in [50 100]
```
* 查询特定的host [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aG9zdDogd3d3Lm9sLm1vY2suY29t&queryTimeType=6windo&extendsParams=true)
```sql
host: www.ol.mock.com
```
## 模糊查询
* 查询remote_user以a开头的字符串 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=cmVtb3RlX3VzZXI6IGEq&queryTimeType=6windo&extendsParams=true)
```sql
remote_user: a*
```
* 查询http_user_agent中含有mo开头la结尾的词 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aHR0cF91c2VyX2FnZW50OiBtbypsYQ==&queryTimeType=6windo&extendsParams=true)
```sql
http_user_agent: mo*la
```
* 查询http_user_agent中包含以mozi开头，以la结尾，中间还有一个字符的词的日志 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aHR0cF91c2VyX2FnZW50OiBtb3ppP2xh&queryTimeType=6windo&extendsParams=true)
```sql
http_user_agent: mozi?la
```
> 当然也可以使用 __mozilla__, __mo*la__ 或者 __mozi?la__ 等直接查询而不指定字段

## 短语查询
想搜索time_local处于12月22日的日志，使用了下方的语句会发现，存在其他如time_local字段为 __17/Dec/2022:06:22:23__ 这样格式的日志，因为查询语句被分词为 __22__ 和 __Dec__, 而本条日志中同时包含两个部分，当不指定字段直接对所有字段进行查询，出现的可能性更高了。所以在查询时可以在关键词前加一个 __#__ 避免这个问题。所以可以更换为下面的查询语句
```
time_local: 22/Dec
```
所以可以更换为下面的查询语句
* 查询所有本地时间为12月22日的日志 [Playground中试试](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=dGltZV9sb2NhbDogIyIyMi9EZWMi&queryTimeType=6windo&extendsParams=true)
```
time_local: #"22/Dec"
```
> 更详细的 __短语查询__ 说明参考[短语查询 - 官方文档](https://help.aliyun.com/document_detail/416724.html)
## FAQ
1. 模糊查询不支持后缀匹配，更多需求可考虑选择分析或者扫描语句
2. 短语查询实现为先分词查询然后再对短语进行过滤，所以其不支持 __not__ 条件，且后面也不支持跟随 __分析语句__ 进行分析


<button onclick="alert('1')">test</button>
