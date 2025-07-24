## 基本说明

目前SLS Kafka兼容接口支持Kafka SDK以下场景操作
* 日志写入(kafka produer)
* 日志消费(kafka consumer)


## 兼容限制

* kafka client需要2.x版本(2.0以上)
* 针对Kafka官方SDK做过测试，对Kafka非官方SDK不保证兼容性
* 不支持事物，写入和消费只能保证At-least-once
* 一个Logstore最多支持被15个消费组消费
* 单个消费组里的Topic数了不能超过50个
* Kafka消费延迟只能通过[CloudLens For SLS](https://sls.console.aliyun.com/lognext/app/lens/sls) 来查看
* 为保证日志传输安全性，目前仅支持SASL_SSL连接协议。
* 只支持顺序消费，不支持区间消费
* 用Kafka兼容消费的时候，单Loggroup中log数目不能超过10W，超过部分会被自动截断
* 在消费逻辑中不要基于offset做延迟判断（offset会出现跳跃情况）
* Kafka消费组目前不会logstore下的消费组中看到，只能通过CloudLen For SLS看到


## 概念映射

| Kafka     | SLS      | 描述                           |
|-----------|----------|-------------------------------|
| Topic     | Logstore | Kafka Topic和SLS Logstore都表示日志写入、存储的基础单元|
| Partition | Shard    | Kafka Partition是连续的，只增不减；SLS的Shard可以分裂/合并/过期|
| Offset    | Cursor   | Kafka Offset是每条日志级别的，SLS Cursor是一批日志一个Curosr|

SLS的Kafka接口兼容会屏蔽Kafka和SLS的概念差异，将SLS的概念映射为Kafka概念，以便Kafka SDK操作。

## 权限配置

* 赋予账号只读访问日志服务(Log)的权限（AliyunLogReadOnlyAccess)

* 更精细的权限配置，可采用自定义权限策略，[参考文档](https://help.aliyun.com/document_detail/93733.htm)
以下是参考的配置策略
```
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:GetProject",
            "Resource": "acs:log:*:*:project/project名称",
            "Effect": "Allow"
        },
        {
            "Action": [
                "log:GetLogStore",
                "log:ListShards",
                "log:GetCursorOrData"
            ],
            "Resource": "acs:log:*:*:project/project名称/logstore/*",
            "Effect": "Allow"
        }
    ]
}
```

## 如何查看Kafka消费延迟查看和告警
* 登录[日志服务控制台](https://sls.console.aliyun.com/)。
* 在日志应用区域的云产品Lens页签中，单击**CloudLens for SLS**。

* 在页面左上角，选择目标Project。

## Kafka消费时字段说明

* 场景1：**如果Logstore的日志中只有一个内容字段**，例如只有content字段，那么Kafka消费到的Key为content，Value为content字段值。

* 场景2：**如果Logstore的日志中不止一个内容字段**，例如存在url和method字段，那么Kafka消费到的Key为null，Value为JSON编码后的内容，例如{"url" : "/", "method" : "get"}。

* 场景3：**如果Logstore的日志中包含字段kafka_topic、kafka_partition、kafka_offset、key和 value字段**， 则消费程序会认为该数据为您导入的Kafka数据。更多信息，请参见导入Kafka数据。为了与导入的数据前保持一致，消费时key字段和value字段将分别映射为Kafka的Key和Kafka的Value。

**说明**

* 当日志中可能存在单个字段或者多个字段时，那么消费到的Value可能是单字段值（场景1）或JSON格式的内容（场景2）。 

* 当设置消费程序所消费的Value为JSON格式，且要消费场景1中的日志时，需确保字段值为JSON格式，否则将导致消费异常。

## 费用说明
Kafka兼容功能本身不收费，本质是把Kafka的SDK操作转换为SLS API调用。因此使用Kafka SDK进行写入和消费，本身的费用和SLS SDK写入/消费的费用是一样的。具体可以参考 [SLS计费说明](https://www.aliyun.com/price/product#/sls/detail/sls)
