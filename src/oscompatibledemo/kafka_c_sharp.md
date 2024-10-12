## [Kafka 消费兼容概述和注意事项](./overview.md)

## Confluent-kafka-c# 消费配置参数

| 参数               | 描述                                                                                                                                                                                                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BootstrapServers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb) <br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| SaslMechanism    | 必须使用 SaslMechanism.Plain                                                                                                                                                                                                                                                                                           |
| SecurityProtocol | 为了保证数据传输的安全性，**必须使用SecurityProtocol.SaslSsl**                                                                                                                                                                                                                                                                      |
| SaslUsername     | 配置为日志服务Project名称                                                                                                                                                                                                                                                                                                   |
| SaslPassword     | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret**。请根据实际情况，将 **{access-key-id** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                    |
| GroupId          | 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过配置消费组id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如 **"kafka-test"**                                                                                                                                                                                                                         |
| AutoOffsetReset  | 消费起始点位 常用的二个值是 AutoOffsetReset.Latest 和 AutoOffsetReset.Earliest，<br>Earliest：表示消费者从最早的可用记录开始消费。如果消费者组之前没有消费过该主题，则会从最早的可用记录开始消费。如果之前已经消费过，则会从该消费者组最后提交的偏移量开始消费。<br>Latest：表示消费者从最新的可用记录开始消费。如果消费者组之前没有消费过该主题，则只会消费该主题上生产者将来生产的消息。如果之前已经消费过，则会从该消费者组最后提交的偏移量开始消费。                                                   |

## 环境准备
测试环境为centos 7环境为例子
1. 安装dotnet core sdk 
`yum install dotnet-sdk-3.1`
2. 新建dotnet项目 `dotnet new console -n myconsumer -o /home/user/projects/myconsumer` 
3. 安装 confluent kafka 依赖 `dotnet add package -v 1.9.4-RC1 Confluent.Kafka`

## Confluent-kafka-c# 消费代码示例

```c#
using System;
using System.Threading;
using Confluent.Kafka;

class Consumer
{
    public static void Main(string[] args)
    {   
        string accessKeyId = Environment.GetEnvironmentVariable("SLS_ACCESS_KEY_ID");
        string accessKeySecret = Environment.GetEnvironmentVariable("SLS_ACCESS_KEY_SECRET");
        string project = "project";
        //内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb
        //endpoint = "cn-hangzhou-intranet.log.aliyuncs.com"
        //port = "10011"
        string endpoint = "cn-shenzhen.log.aliyuncs.com";
        string port = "10012";
        string host = project + "." + endpoint + ":" + port;
        string password = accessKeyId + "#" +accessKeySecret;
        string groupId = "test002";
        string topic = "your logstore";
      
        var conf = new ConsumerConfig {
            GroupId = groupId,
            BootstrapServers = host,
            AutoOffsetReset = AutoOffsetReset.Earliest,
            SaslMechanism = SaslMechanism.Plain,
            SecurityProtocol = SecurityProtocol.SaslSsl,
            SaslUsername = project,
            SaslPassword = password
        };

       
        using (var c = new ConsumerBuilder<Ignore, string>(conf).Build())
        {
            c.Subscribe(topic);

            CancellationTokenSource cts = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) => {
                e.Cancel = true;
                cts.Cancel();
            };

            try
            {
                while (true)
                {
                    try
                    {    
                        var cr = c.Consume(cts.Token);
                        Console.WriteLine($"Consumed message '{cr.Value}' at: '{cr.TopicPartitionOffset}'.");
                    }
                    catch (ConsumeException e)
                    {
                        Console.WriteLine($"Error occured: {e.Error.Reason}");
                    }
                }
            }
            catch (OperationCanceledException)
            {
                c.Close();
            }
        }
    }
}
```
