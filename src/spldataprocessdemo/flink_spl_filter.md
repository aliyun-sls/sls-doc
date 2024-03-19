# 阿里云Flink SQL基于SPL实现行过滤
## 背景
在阿里云Flink配置SLS作为源表时，默认会消费SLS的Logstore数据进行动态表的构建，在消费的过程中，可以指定起始时间点，消费的数据也是指定时间点以后的全量数据；在特定场景中，往往只需要对某类特征的日志或者日志的某些字段进行分析处理，此类需求可以通过Flink SQL的WHERE和SELECT完成，这样做有两个问题：1. Connector 从源头拉取了过多不必要的数据行或者数据列造成了网络的开销，2. 这些不必要的数据需要在Flink中进行过滤投影计算，这些清洗工作并不是数据分析的关注的重点，造成了计算的浪费；对于这种场景，有没有更好的办法呢？
## 方案原理
* 未配置SPL语句时：Flink会拉取SLS的全量日志数据（包含所有列、所有行）进行计算，如图。
![图1](/src/public/img/sqldataprocessdemo/flink_spl_filter1.png)
* 配置SPL语句时：SPL可以对拉取到的数据如果SPL语句包含过滤及列裁剪等，Flink拉取到的是进行过滤和列裁剪后部分数据进行计算，如图。
![图2](/src/public/img/sqldataprocessdemo/flink_spl_filter2.png)
## 在Flink中使用SLS SPL
接下来以一个Nginx日志为例，来介绍基于SLS SPL的能力来使用Flink。为了便于演示，这里在Flink控制台配置SLS的源表，然后开启一个连续查询以观察效果。在实际使用过程中，可以直接修改SLS源表，保留其余分析和写出逻辑。
接下来介绍下阿里云Flink中使用SPL实现行过滤与列裁剪功能。
### 在SLS准备数据
* 开通SLS，在SLS创建Project，Logstore，并创建具有消费Logstore的权限的账号AK/SK。
* 当前Logstore数据使用SLS的的SLB七层日志模拟接入方式产生模拟数据，其中包含10多个字段。
![图3](/src/public/img/sqldataprocessdemo/flink_spl_filter3.png)
模拟接入会持续产生随机的日志数据，日志内容示例如下：
  ```
  {
    "__source__": "127.0.0.1",
    "__tag__:__receive_time__": "1706531737",
    "__time__": "1706531727",
    "__topic__": "slb_layer7",
    "body_bytes_sent": "3577",
    "client_ip": "114.137.195.189",
    "host": "www.pi.mock.com",
    "http_host": "www.cwj.mock.com",
    "http_user_agent": "Mozilla/5.0 (Windows NT 6.2; rv:22.0) Gecko/20130405 Firefox/23.0",
    "request_length": "1662",
    "request_method": "GET",
    "request_time": "31",
    "request_uri": "/request/path-0/file-3",
    "scheme": "https",
    "slbid": "slb-02",
    "status": "200",
    "upstream_addr": "42.63.187.102",
    "upstream_response_time": "32",
    "upstream_status": "200",
    "vip_addr": "223.18.47.239"
  }
  ```
  Logstore中slbid字段有两种值：**slb-01**和**slb-02**，对15分钟的日志数据进行slbid统计，可以发现slb-01与slb-02数量相当。
  ![图4](/src/public/img/sqldataprocessdemo/flink_spl_filter4.png)

## 行过滤场景
在数据处理中过滤数据是一种常见需求，在Flink中可以使用filter算子或者SQL中的where条件进行过滤，使用非常方便；但是在Flink使用filter算子，往往意味着数据已经通过网络进入Flink计算引擎中，全量的数据会消耗着网络带宽和Flink的计算性能，这种场景下，SLS SPL为Flink SLS Connector提供了一种支持过滤“下推”的能力，通过配置SLS Connector的query语句中，过滤条件，即可实现过滤条件下推。避免全量数据传输和全量数据过滤计算。
 ![图5](/src/public/img/sqldataprocessdemo/flink_spl_filter5.png)
### 创建SQL作业
在阿里云Flink控制台创建一个空白的SQL的流作业草稿，点击下一步，进入作业编写
![图6](/src/public/img/sqldataprocessdemo/flink_spl_filter6.png)
在作业草稿中输入如下创建临时表的语句：
```
CREATE TEMPORARY TABLE sls_input(
  request_uri STRING,
  scheme STRING,
  slbid STRING,
  status STRING,
  `__topic__` STRING METADATA VIRTUAL,
  `__source__` STRING METADATA VIRTUAL,
  `__timestamp__` STRING METADATA VIRTUAL,
   __tag__ MAP<VARCHAR, VARCHAR> METADATA VIRTUAL,
  proctime as PROCTIME()
) WITH (
  'connector' = 'sls',
  'endpoint' ='cn-beijing-intranet.log.aliyuncs.com',
  'accessId' = '${ak}',
  'accessKey' = '${sk}',
  'starttime' = '2024-01-21 00:00:00',
  'project' ='${project}',
  'logstore' ='test-nginx-log',
  'query' = '* | where slbid = ''slb-01'''
);
```
* 这里为了演示方便，仅设置**request_uri**、**scheme**、**slbid**、**status**和一些元数据字段作为表字段。
* **{ak}**、**\${sk}**、**${project}** 替换为具有Logstore消费权限的账号。
* endpoint：填写同地域的SLS的私网地址。
* query：填写SLS的SPL语句，这里填写了SPL的过滤语句：**\* | where slbid = ''slb-01''**，注意在阿里云Flink的SQL作业开发中，字符串需要使用英文单引号进行转义。
### 连续查询及效果
在作业中输入分析语句，按照slbid进行聚合查询，动态查询会根据日志的变化，实时刷新数字
```python
SELECT slbid, count(1) as slb_cnt FROM sls_input GROUP BY slbid
```
点击右上角调试按钮，进行调试，可以看到结果中 slbid的字段值，始终是**slb-01**。
![图7](/src/public/img/sqldataprocessdemo/flink_spl_filter7.png)
可以看出设置了SPL语句后，sls_input仅包含slbid=‘slb-01’的数据，其他不符合条件的数据被过滤掉了。