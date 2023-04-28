# 转换Log为Metric

<table><tr><td bgcolor="#f8e5c5">本文中含有需要您注意的重要提示信息，忽略该信息可能对您的业务造成影响，请务必仔细阅读。</td></tr></table>

如果您需要监控Log中某字段的指标变化趋势，可以使用日志服务数据加工函数e_to_metric将Log字段转换为Metric，通过时序库查看该指标的变化趋势。本文以Nginx访问日志为例说明如何将Log转化为Metric。

## 前提条件
已采集到日志数据。更多信息，请参见[数据采集](https://help.aliyun.com/document_detail/28981.htm?spm=a2c4g.11186623.0.0.1b423ddev09znR#concept-ikm-ql5-vdb)。
## 背景信息
应用程序的运行数据，主要有Log、Trace和Metric这三大类数据。Log是离散的事件，Trace可以认为是带请求追踪的事件，Metric是带统计量的事件。Log、Trace、Metric本质上都是事件，满足事件存储的系统都可以用来存储这三类数据。日志服务提供两种存储：
* Logstore
  日志服务中Log的采集、存储和查询单元。更多信息，请参见[日志库（Logstore）](https://help.aliyun.com/document_detail/48874.htm?spm=a2c4g.11186623.0.0.1b427c6f5LMb0N#concept-btb-4qn-vdb)。

* MetricStore
  日志服务中Metric的采集、存储和查询单元。日志服务MetricStore针对Metric做了大量优化，提供PromQL查询能力，支持Prometheus协议。更多信息，请参见[时序库（MetricStore）](https://help.aliyun.com/document_detail/171723.htm?spm=a2c4g.11186623.0.0.1b421665yJbaWq#concept-2538930)。

很多应用的Log数据往往比Metric全面，Metric可以认为是特定格式的Log，因此在日志服务中可以将Log转换为Metric。常见的Log转Metric的方法如下：
* 使用日志服务的Scheduled SQL功能聚合日志产生指标。更多信息，请参见[从Logstore到MetricStore](https://help.aliyun.com/document_detail/286459.htm?spm=a2c4g.11186623.0.0.1b42192cpPnZDa#task-2098745)。
* 使用数据加工e_to_metric函数将Log转换为Metric。

## 场景描述

某企业在华东1（杭州）地域创建了名为nginx-demo的Logstore，用于存储Nginx服务的访问日志。

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
为实现以上需求，您需要将Log中request_time和upstream_response_time字段转换为Metric，并打上Host标签。

## 步骤一：创建时序库
创建名称为service-metric的时序库，用于保存数据加工后的时序数据。

1. 登录[日志服务控制台](https://sls.console.aliyun.com/lognext/profile)。
2. 在Project列表区域，单击目标Project。
3. 在**时序存储 > 时序库**页签中，单击+图标。
4. 在**创建MetricStore**面板，配置如下参数，单击**确定**。


 | **参数**| **说明** |
  | -------| --------- |
  | **MetricStore名称** | MetricStore名称在其所属Project内必须唯一，创建后不能修改。 |
  | **永久保存** | 打开**永久保存**开关后，日志服务将永久保存采集到的时序数据。<br><table><tr><td bgcolor="#d6e7f8">**说明** 通过SDK方式获取数据保存时间时，如果对应值为3650则表示永久保存。</td></tr></table>|
  | **数据保存时间** | 日志服务采集的时序数据在MetricStore中的保存时间，单位为天，取值范围：15~3000。超过该时间后，时序数据会被删除。<br><table><tr><td bgcolor="#f6d8d0">**警告** 当日志保存时间达到您所设置的保存时间后，日志将被删除。</td></tr></table>仅在未打开**永久保存**开关时，需设置**数据保存时间**。<table><tr><td bgcolor="#f8e5c5">**重要** 缩短数据保存时间后，日志服务将在1小时内删除所有已超过保存时间的数据。但日志服务控制台首页的**存储量**（**日志**）将于次日更新。例如您原本的数据保存时间为5天，现修改为1天，则日志服务将在1小时内删除前4天的数据。</td></tr></table>|
  | **Shard数目** | 日志服务使用Shard读写数据。一个Shard提供的写入能力为5 MB/s、500次/s，读取能力为10 MB/s、100次/s。每个MetricStore中最多创建10个Shard，每个Project中最多创建200个Shard。更多信息，请参见[分区（Shard）](https://help.aliyun.com/document_detail/28976.htm?spm=a2c4g.11186623.0.0.1b424c78manSeS#concept-wnn-rqn-vdb)。 |



## 步骤二：创建数据加工任务
使用e_to_metric函数创建数据加工任务，并保存加工后数据到步骤一创建的时序库。

1. 进入数据加工页面。
  a. 在Project列表区域，单击目标Project。
  b. 在**日志存储 > 日志库**页签中，单击目标Logstore。
  c. 在查询和分析页面，单击**数据加工**。
2. 在页面右上角，选择数据的时间范围。
请确保在**原始日志**页签中有Log。
3. 在编辑框中，输入数据加工语句。
将request_time字段重命名为RequestTime，upstream_response_time字段重命名为ResponseTime，并打上host标签。
    ```python
    e_to_metric(
        names=[("request_time", "RequestTime"), ("upstream_response_time", "ResponseTime")],
        labels=[("host", "hostname")],
    )
    ```
    更多信息，请参见[e_to_metric](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.0.0.1b421283FwBl0i#section-u7i-ymg-jzp)。
4. 单击**预览数据**。
 ![预览数据1](/img/dataprocessdemo/文本解析/预览数据1.png)

5. 创建数据加工任务。
  a. 单击**保存数据加工**。
  b. 在**创建数据加工规则**面板，配置如下信息，然后单击**确定**。

    | 参数| 说明 |
    | -------| --------- |
    | **规则名称** | 数据加工规则的名称。例如log2mectric。 |
    | **授权方式** | 选择**默认角色**读取源Logstore数据。 |
    | **存储目标** |
    | **目标名称** | 存储目标的名称。例如log2mectric。 |
    | **目标Region** | 选择目标Project所在地域。例如华东1（杭州）。 |
    | **目标Project** | 用于存储数据加工结果的目标Project名称。 |
    | **目标库** | 用于存储数据加工结果的目标MetricStore名称。例如service-metric。 |
    | **授权方式** | 选择**默认角色**将数据加工结果写入目标时序库service-metric。 |
    | **加工范围** |
    | **时间范围** | 时间范围选择**所有**。|

    c. 在**创建结果**对话框，单击**确认**。

以上步骤配置完成后，日志服务开始将Log加工到目标时序库service-metric。

## 步骤三：查询时序数据
1. 在左侧导航栏，选择**时序存储 > 时序库**。
2. 在时序库页签下发，选择目标时序库service-metric。
3. 在页面右上角，单击**15分钟（相对）**，设置查询和分析的时间范围。
  您可以选择相对时间、整点时间和自定义时间范围。
  **说明** 查询和分析结果相对于指定的时间范围来说，有1min以内的误差。
4. 在**查询配置**页签中，在**Metrics**下拉列表中，选择对应的监控项    RequestTime或ReponseTime，单击**预览**。
     * 每个Host的请求时间RequestTime变化趋势
       ![ReponseTime1](/img/dataprocessdemo/文本解析/预览数据2.jpg)
     * 每个Host的响应时间ReponseTime变化趋势
         ![ReponseTime2](/img/dataprocessdemo/文本解析/预览数据3.jpg)