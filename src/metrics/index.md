# 时序库查询案例

## PromQL基础使用案例

[时序库Demo体验链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/metric/sls-mall-k8s-metrics)

## 如何在时序库中使用SQL查询

时序库不仅支持PromQL语法，同时也支持使用SQL语法直接操作时序数据。时序数据的SQL语法中，FROM的表名只能为{metrics\_store\_name}.prom，其中{metrics\_store\_name}为您已创建的MetricStore名称。以下案例都以指标“process\_resident\_memory\_bytes”为例展开。

[时序库SQL自定义查询体验链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/logsearch/sls-mall-k8s-metrics%3Fencode%3Dbase64%26queryString%3D%26metricStore%3Dtrue)


## 为时序库创建告警策略

[时序库告警页体验链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/alertcenter)

在SLS告警中心创建时序告警时，需使用SQL方式调用PromQL查询，具体规则如下：
```SQL
1. 如果要执行instant query，使用SQL中的promql_query函数，例如，
* | select promql_query('go_goroutines') from metrics limit 10000
该函数的参数表示PromQL语句。


2. 如果要执行range query，需使用SQL中的promql_query_range函数，例如，
* | select promql_query_range('go_goroutines', '10s') from metrics limit 10000
该函数中的第一个参数表示PromQL语句，第二个表示step步长。
```

