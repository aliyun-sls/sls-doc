## [Compatibility with Kafka consumers and usage notes](./overview.md)

## Confluent-kafka-c# parameters

| parameter        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BootstrapServers | The cluster address for initial connection, in the format of **Project.Endpoint:Port**. Configure this parameter based on the endpoint of the project. For more information, see [View endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb) <br/> -Alibaba Cloud internal network: The port number is 10011. Example: **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - Internet: The port number is 10012. Example: **project.cn-hangzhou.log.aliyuncs.com:10012** |
| SaslMechanism    | Set the value to SaslMechanism.Plain                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| SecurityProtocol | To ensure the data transmission security，**Set the value to SecurityProtocol.SaslSsl**                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| SaslUsername     | The name of the Simple Log Service project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| SaslPassword     | The AccessKey pair of your Alibaba Cloud account, in the **{access-key-id}#{access-key-secret** format. Replace **{access-key-id** with your AccessKey ID and **{access-key-secret}** with your AccessKey secret. We recommend that you use the AccessKey pair of a Resource Access Management (RAM) user. For more information, see [Create a RAM user and authorize the RAM user to access Simple Log Service](https://www.alibabacloud.com/help/en/doc-detail/47664.htm#task-xsk-ttc-ry)                                                                                                                                                                                                         |
| GroupId          | The ID of the consumer group. You can add consumers to a consumer group. Then, you can specify the ID of the consumer group to implement load balancing, data processing, and data delivery. Example: **"kafka-test"**                                                                                                                                                                                                                                                                                                   |
| AutoOffsetReset  | The start position of consumption. Common values: latest and earliest. Default value: The start position of consumption. Common values: Earliest and Latest.<br>Earliest: The earliest offset is used. A consumer starts to read data from the earliest message. If no offset is committed, a consumer starts to read data from the beginning. If an offset is committed, a consumer starts to read data from the committed offset. <br>Latest: The latest offset is used. A consumer starts to read data from the latest message. If no offset is committed, a consumer starts to read data from the latest message. If an offset is committed, a consumer starts to read data from the committed offset.                              |

## Preparation

1. Install dotnet core sdk
   `yum install dotnet-sdk-3.1`
2. Install dotnet `dotnet new console -n myconsumer -o /home/user/projects/myconsumer`
3. Install the Confluent.Kafka dependency. `dotnet add package -v 1.9.4-RC1 Confluent.Kafka`

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
