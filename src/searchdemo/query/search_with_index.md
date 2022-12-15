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

## 日志样例
|字段名|类型|样例|
|--|--|--|
| Status | long|200 , 400 ...|
| RequestId|text|639AF8452D912CE7628EF545 , 639AF8452D912CE7628EF542 ...|
|ResourceName|text|Pic1, Pic2, Text1, VideoN ...|
|Path|text|/mock1.host.com/route1, /mock2.host.com/route2 ...|
|UA|text|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36|

注：默认分词符为 __, '";=()[]{}?@&<>/:\n\t\r__

## 精确查询
* 查询404的状态码
```sql
Status: 404
```
* 查询大于200的状态码
```sql
Status > 200
```
* 查询特定的请求ID
```sql
RequestId: 639AF8452D912CE7628EF545
```

## 

## 模糊查询
* 查询所有text相关资源的日志
```sql
ResourceName: text*
```
* 查询UA中含有Mo开头la结尾的词
```sql
UA: mo*la
```
* 查询包含以mozi开头，以la结尾，中间还有一个字符的词的日志
```sql
UA: mozi?la
```

* 查询4xx的状态码
```sql
Status in [400 499]
```

## 短语查询
想查询path为 mock1.host.com的日志时，由于配置了分词符，在请求时会讲查询语句进行分词来查询，导致可能查询到 mock2.host.com, mock3.host.com等，如果想精确查找可参考下方语句
* 查询所有text相关资源的日志
```
Path: #"mock1.host.com"
```

## FAQ
1. 模糊查询不支持后缀匹配，更多需求可考虑选择分析或者扫描语句
2. 短语查询实现为先分词查询然后再对短语进行过滤，所以其不支持 __not__ 条件，且后面也不支持跟随 __分析语句__ 进行分析
