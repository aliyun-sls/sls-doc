# 转换 Log 为 Metric

<table><tr><td bgcolor="#f8e5c5">本文中含有需要您注意的重要提示信息，忽略该信息可能对您的业务造成影响，请务必仔细阅读。</td></tr></table>

如果您需要监控 Log 中某字段的指标变化趋势，可以使用日志服务数据加工函数 e_to_metric 将 Log 字段转换为 Metric，通过时序库查看该指标的变化趋势。本文以 Nginx 访问日志为例 Note 如何将 Log 转化为 Metric。

## Scenario 描述

某企业在华东 1（杭州）地域创建了名为 nginx-demo 的 Logstore，用于存储 Nginx 服务的访问日志。

该企业需要监控后端服务器（Host）的每次请求耗时（request_time）和响应耗时（upstream_response_time）变化情况，并通过仪表盘展示变化趋势。

```
body_bytes_sent:1750
host:www.example.com
http_referer:www.guide.example.com
http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
http_x_forwarded_for:203.0.113.10
remote_addr:203.0.113.10
remote_user:p288
request_length:13741
request_method:GET
request_time:71
request_uri:/request/path-1/file-1
status:200
time_local:11/Aug/2021:06:52:27
upstream_response_time:0.66
```

为实现以上需求，您需要将 Log 中 request_time 和 upstream_response_time 字段转换为 Metric，并打上 Host 标签。

## Step 一：创建时序库

创建名称为 service-metric 的时序库，用于保存数据加工后的时序数据。

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/lognext/profile).
2. In the Projects section, click the desired project.
3. 在**时序存储 > 时序库**页签中，单击+图标。
4. 在**创建 MetricStore**面板，配置如下参数，单击**确定**。

| **参数**             | **Note**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MetricStore 名称** | MetricStore 名称在其所属 Project 内必须唯一，创建后不能修改。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **永久保存**         | 打开**永久保存**开关后，日志服务将永久保存采集到的时序数据。<br><table><tr><td bgcolor="#d6e7f8">**Note** 通过 SDK 方式获取数据保存时间时，如果对应值为 3650 则表示永久保存。</td></tr></table>                                                                                                                                                                                                                                                                                                                                                                                     |
| **数据保存时间**     | 日志服务采集的时序数据在 MetricStore 中的保存时间，单位为天，取值范围：15~3000。超过该时间后，时序数据会被删除。<br><table><tr><td bgcolor="#f6d8d0">**警告** 当日志保存时间达到您所设置的保存时间后，日志将被删除。</td></tr></table>仅在未打开**永久保存**开关时，需设置**数据保存时间**。<table><tr><td bgcolor="#f8e5c5">**重要** 缩短数据保存时间后，日志服务将在 1 小时内删除所有已超过保存时间的数据。但日志服务控制台首页的**存储量**（**日志**）将于次日更新。例如您原本的数据保存时间为 5 天，现修改为 1 天，则日志服务将在 1 小时内删除前 4 天的数据。</td></tr></table> |
| **Shard 数目**       | 日志服务使用 Shard 读写数据。一个 Shard 提供的写入能力为 5 MB/s、500 次/s，读取能力为 10 MB/s、100 次/s。每个 MetricStore 中最多创建 10 个 Shard，每个 Project 中最多创建 200 个 Shard。更多信息，请参见[分区（Shard）](https://help.aliyun.com/document_detail/28976.htm?spm=a2c4g.11186623.0.0.1b424c78manSeS#concept-wnn-rqn-vdb)。                                                                                                                                                                                                                                              |

## Step 二：创建数据加工任务

使用 e_to_metric 函数创建数据加工任务，并保存加工后数据到 Step 一创建的时序库。

1. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
2. In the upper-right corner of the page, specify a time range for the required log data.
   请确保在**Raw log entries**页签中有 Log。
3. In the code editor, enter the following data transformation statement.
   将 request_time 字段重命名为 RequestTime，upstream_response_time 字段重命名为 ResponseTime，并打上 host 标签。
   `python
e_to_metric(
    names=[("request_time", "RequestTime"), ("upstream_response_time", "ResponseTime")],
    labels=[("host", "hostname")],
)
`
   更多信息，请参见[e_to_metric](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.0.0.1b421283FwBl0i#section-u7i-ymg-jzp)。
4. Click **Preview Data**.
   ![预览数据1](/img/dataprocessdemo/文本解析/预览数据1.png)

5. Create a data transformation job
   a. Click **Save as Transformation Job**.
   b. 在**创建数据 Transformation rule**面板，配置如下信息，然后单击**确定**。

   | 参数                     | Note                                                                              |
   | ------------------------ | --------------------------------------------------------------------------------- |
   | **规则名称**             | The name of the data transformation job.例如 log2mectric。                        |
   | **Authorization Method** | 选择**默认角色**读取源 Logstore 数据。                                            |
   | **存储目标**             |
   | **目标名称**             | 存储目标的名称。例如 log2mectric。                                                |
   | **Destination Region**   | 选择 Destination Project 所在地域。例如华东 1（杭州）。                           |
   | **Destination Project**  | 用于存储数据 Transformation result 的 Destination Project 名称。                  |
   | **目标库**               | 用于存储数据 Transformation result 的目标 MetricStore 名称。例如 service-metric。 |
   | **Authorization Method** | 选择**默认角色**将数据 Transformation result 写入目标时序库 service-metric。      |
   | **加工范围**             |
   | **时间范围**             | 时间范围选择**所有**。                                                            |

   c. 在**创建结果**对话框，单击**确认**。

以上 Step 配置完成后，日志服务开始将 Log 加工到目标时序库 service-metric。

## Step 三：查询时序数据

1. 在左侧导航栏，选择**时序存储 > 时序库**。
2. 在时序库页签下发，选择目标时序库 service-metric。
3. 在页面右上角，单击**15 分钟（相对）**，设置查询和分析的时间范围。
   您可以选择相对时间、整点时间和自定义时间范围。
   **Note** 查询和分析结果相对于指定的时间范围来说，有 1min 以内的误差。
4. 在**查询配置**页签中，在**Metrics**下拉列表中，选择对应的监控项 RequestTime 或 ReponseTime，单击**预览**。
   - 每个 Host 的请求时间 RequestTime 变化趋势
     ![ReponseTime1](/img/dataprocessdemo/文本解析/预览数据2.jpg)
   - 每个 Host 的响应时间 ReponseTime 变化趋势
     ![ReponseTime2](/img/dataprocessdemo/文本解析/预览数据3.jpg)
