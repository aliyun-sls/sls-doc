## [Compatibility with Kafka consumers and usage notes](./overview.md)

## Confluent-kafka-c# parameters

| parameter        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BootstrapServers | The cluster address for initial connection, in the format of **Project.Endpoint:Port**. Configure this parameter based on the endpoint of the project. For more information, see [View endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb) <br/> -Alibaba Cloud internal network: The port number is 10011. Example: **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - Internet: The port number is 10012. Example: **project.cn-hangzhou.log.aliyuncs.com:10012** |
| SaslMechanism    | Set the value to SaslMechanism.Plain                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| SecurityProtocol | To ensure the data transmission security，**Set the value to SecurityProtocol.SaslSsl**                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| SaslUsername     | The name of the Simple Log Service project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| SaslPassword     | 配置为阿里云 AK，格式为 **{access-key-id}#{access-key-secret**。请根据实际情况，将 **{access-key-id** 替换为您的 AccessKey ID，将 **{access-key-secret}** 替换为您的 AccessKey Secret。建议使用 RAM 用户的 AK。更多信息，请参见[授权](https://www.alibabacloud.com/help/en/doc-detail/47664.htm#task-xsk-ttc-ry)                                                                                                                                                                                                         |
| GroupId          | The ID of the consumer group. You can add consumers to a consumer group. Then, you can specify the ID of the consumer group to implement load balancing, data processing, and data delivery. Example: **"kafka-test"**                                                                                                                                                                                                                                                                                                   |
| AutoOffsetReset  | 消费起始点位 常用的二个值是 AutoOffsetReset.Latest 和 AutoOffsetReset.Earliest，<br>Earliest：表示消费者从最早的可用记录开始消费。如果消费者组之前没有消费过该主题，则会从最早的可用记录开始消费。如果之前已经消费过，则会从该消费者组最后提交的偏移量开始消费。<br>Latest：表示消费者从最新的可用记录开始消费。如果消费者组之前没有消费过该主题，则只会消费该主题上生产者将来生产的消息。如果之前已经消费过，则会从该消费者组最后提交的偏移量开始消费。                                                                 |

## 环境准备

测试环境为 centos 7 环境为例子

1. 安装 dotnet core sdk
   `yum install dotnet-sdk-3.1`
2. 新建 dotnet 项目 `dotnet new console -n myconsumer -o /home/user/projects/myconsumer`
3. 安装 confluent kafka 依赖 `dotnet add package -v 1.9.4-RC1 Confluent.Kafka`

## Confluent-kafka-c# sample code

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
        //内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb
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
