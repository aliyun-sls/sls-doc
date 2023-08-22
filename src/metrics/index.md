# 时序库查询案例

## PromQL基础使用案例

[时序库Demo体验链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/metric/sls-mall-k8s-metrics)

### 按label筛选指标中的特定时间线
- 查看所有进程的常驻内存情况
![图 1](/img/src/metrics/index/05fb22cee34c8397d46699269a74dc27714cd59547c16c5faeebb0aece8e2aed.png)  

- 添加特定Label的筛选条件
![图 2](/img/src/metrics/index/e8741a93df5684c44a49ad0967d7001dc7383bc3bfec19017eac77305b01ead0.png)  

- 使用正则匹配条件筛选特定Label
![图 4](/img/src/metrics/index/2aaf3d213e9904a56e78d5ba1485892e406de7fb4dbf8cfd9551f9de1bf29c5a.png)  



### 使用函数或聚合算子执行计算

- 查询各cluster中堆内存使用的最大值(max算子)
![图 5](/img/src/metrics/index/002a00481ef77359f03fefcdb93ea8a4cdecced4ff86083f4fa7b46de36041ac.png)

- 查询某个指标的时间线条数(count算子)
![图 7](/img/src/metrics/index/5b7277fec1a6a0abdd4441dbadd3ad3c71d6812ed85c0a8a9835b007cda22bda.png)  


- 查询cpu使用率(rate函数)
![图 6](/img/src/metrics/index/81d811e7ae5b0938dd3996c971352894a73ff013e18e7ae235301d8e28341105.png)  

- 查询指标各时刻相较于一分钟的增量值(delta函数)
![图 8](/img/src/metrics/index/25a0e3d1b02e4c624f03327dce50b00a8e86ad80baae9d3ccf574cfcb8fac504.png)  

- 多算子/函数嵌套查询
![图 13](/img/src/metrics/index/ad5f306026cf97974e12377a7c6c9a2b00aa5c650db0432ee6af4346f57af899.png)  



### 二元计算
- 数值间计算
![图 10](/img/src/metrics/index/387b5238762b791c1f30c5db1cc338a5e99476235754467041d66f325e1cf152.png)  


- 指标与数值间计算
![图 11](/img/src/metrics/index/54f35cbb7dee0203d88c4495a9c9a3681f6582f3d7d3d28e3c3b7d6201dd7316.png)  


- 多指标间计算
![图 9](/img/src/metrics/index/e0da93a0a7c78dc647442c69d130eee9c5844f14798ae946222e56a4ea25cd17.png)  



### 如何正确使用Subquery
rate、delta、increase、{agg}_over_time等函数仅支持在原指标上进行操作，不支持在算子或函数的结果集上进行计算，例如，
```SQL
支持以下形式
max_over_time(go_goroutines[1m]), 表示计算各时间线前一分钟指标内的最大值

但不支持以下形式
max_over_time(max(go_goroutines)[1m]), 此表达式意图先计算各时间线间的最大值，再从中选取前一分钟内的最大值。

prometheus提供了Subquery以支持上述需求，PromQL语句需改成以下形式：
max_over_time(max(go_goroutines)[1m:10s]), Subquery中[a:b]的两个参数分别表示range和step。
```

![图 12](/img/src/metrics/index/9e689d00ab784c0c0651872d5a99a90ae84e2f7045287b385abdc6cdb47ecdee.png)  




## 如何在时序库中使用SQL查询

时序库不仅支持PromQL语法，同时也支持使用SQL语法直接操作时序数据。时序数据的SQL语法中，FROM的表名只能为{metrics\_store\_name}.prom，其中{metrics\_store\_name}为您已创建的MetricStore名称。以下案例都以指标“process\_resident\_memory\_bytes”为例展开。

### 查询指标下的所有原始数据

```SQL
 *| SELECT * FROM "metrics_store_name.prom" WHERE __name__ = 'process_resident_memory_bytes' 
```  

[示例](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/logsearch/sls-mall-k8s-metrics%3Fencode%3Dbase64%26queryString%3DKiB8IHNlbGVjdCAqIGZyb20gInNscy1tYWxsLWs4cy1tZXRyaWNzLnByb20iIHdoZXJlIF9fbmFtZV9fID0gJ3Byb2Nlc3NfcmVzaWRlbnRfbWVtb3J5X2J5dGVzJyBsaW1pdCBhbGw%3D%26metricStore%3Dtrue)

### 查询指标中instance为特定值的原始数据

```SQL
*| SELECT * FROM "metrics_store_name.prom" WHERE __name__ = 'process_resident_memory_bytes' and element_at(__labels__, 'instance')='172.20.0.143:8084' limit all
```

[示例](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/logsearch/sls-mall-k8s-metrics%3Fencode%3Dbase64%26queryString%3DKiB8IHNlbGVjdCAqIGZyb20gInNscy1tYWxsLWs4cy1tZXRyaWNzLnByb20iIHdoZXJlIF9fbmFtZV9fID0gJ3Byb2Nlc3NfcmVzaWRlbnRfbWVtb3J5X2J5dGVzJyBhbmQgZWxlbWVudF9hdChfX2xhYmVsc19fLCAnaW5zdGFuY2UnKT0nMTcyLjIwLjAuMTQzOjgwODQnIGxpbWl0IGFsbA%3D%3D%26metricStore%3Dtrue)

### 使用SQL对时序数据做聚合计算

将时间对齐到每分钟做一次max聚合计算，计算不同instance下的指标最大值。
```SQL
*| SELECT __time_nano__ FROM "metrics_store_name.prom" WHERE __name__ = 'process_resident_memory_bytes' and element_at(__labels__, 'instance')='x-abcd'
```

[示例](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/logsearch/sls-mall-k8s-metrics%3Fencode%3Dbase64%26queryString%3DKiB8IHNlbGVjdCAoX190aW1lX25hbm9fXyAtIF9fdGltZV9uYW5vX18gJSA2MDAwMDAwMCkvMTAwMDAwMC4wIGFzIHQgLCBlbGVtZW50X2F0KF9fbGFiZWxzX18sICdpbnN0YW5jZScpIGFzIGluc3RhbmNlLCBtYXgoX192YWx1ZV9fKSBhcyB2YWwgZnJvbSAic2xzLW1hbGwtazhzLW1ldHJpY3MucHJvbSIgd2hlcmUgX19uYW1lX18gPSAncHJvY2Vzc19yZXNpZGVudF9tZW1vcnlfYnl0ZXMnIGdyb3VwIGJ5IHQsIGluc3RhbmNlIGxpbWl0IGFsbA%3D%3D%26metricStore%3Dtrue)

## 为时序库创建告警策略

[时序库告警页体验链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/alertcenter)

在SLS告警中心创建时序告警时，需使用SQL方式调用PromQL查询，具体规则如下：
```SQL
1. 如果要执行instant query，使用SQL中的promql_query函数，例如，
* | select promql_query('go_goroutines') from metrics limit 10000，该函数的参数表示PromQL语句。


2. 如果要执行range query，需使用SQL中的promql_query_range函数，例如，
* | select promql_query_range('go_goroutines', '10s') from metrics limit 10000，该函数中的第一个参数表示PromQL语句，第二个表示step步长。
```

### 实例宕机
![图 15](/img/src/metrics/index/a86bd353f969c166fbd831c2b8acf3c05e4b8f163482c9bd84ccc60fb41ea0ab.png)  


### 实例的常驻内存大于8GB
![图 16](/img/src/metrics/index/1d419fb62a6503a8b450921a8366e8bbcf265795f69e8917ccdd937d6361dc3e.png)  


### CPU使用率过高
![图 17](/img/src/metrics/index/3dee211e920216761b4f57d93c320625e7fa7d656dcd9af0f6e966bd2db1010f.png)  


### Go进程中协程数量过多
![图 21](/img/src/metrics/index/b9f3731e907e66e884904a11be7e3d1bde4ffbfb4410cbb2182656596663aca4.png)  


### Gc时间过长
![图 22](/img/src/metrics/index/85c98c9bd0a92a113483b4da005c0f71042f6f9a6af1ddbf774727c9146b5baa.png)  

