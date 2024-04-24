# Metricstore query cases

## Basic PromQL use cases

Basic PromQL use cases(https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/metric/sls-mall-k8s-metrics)

## How to use SQL queries to query data in a Metricstore

A Metricstore supports not only PromQL statements but also allows you to use SQL statements to directly manage time series data. In the SQL statements, the table name next to the FROM clause can only be {metrics_store_name}.prom, in which {metrics_store_name} indicates the name of the Metricstore you have created. In the following cases, metric process_resident_memory_bytes is used.

[Custom SQL queries in a Metricstore](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/logsearch/sls-mall-k8s-metrics%3Fencode%3Dbase64%26queryString%3D%26metricStore%3Dtrue)

## Create an alert policy for a Metricstore

[Create an alert policy for a Metricstore demo](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/sls-mall/alertcenter)

When you create a time series alert in the alert center of Simple Log Service, you can use SQL to call a PromQL query based on the following rules:

```SQL
1. To execute an instant query, use the promql_query function in SQL. Example:
* | select promql_query('go_goroutines') from metrics limit 10000
The parameter in this function indicates the PromQL statement.


2. To execute a range query, use the promql_query_range function in SQL. Example:
* | select promql_query_range('go_goroutines', '10s') from metrics limit 10000
The first parameter in this function indicates the PromQL statement, and the second parameter indicates the step.
```
