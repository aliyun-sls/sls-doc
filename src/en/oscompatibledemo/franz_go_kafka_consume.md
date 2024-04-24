## [Compatibility with Kafka consumers and usage notes](./overview.md)

## Franz-go parameters

| parameter         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| kgo.SeedBrokers   | The cluster address for initial connection, in the format of **Project.Endpoint:Port**. Configure this parameter based on the endpoint of the project. For more information, see [View endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb).<br/> - Alibaba Cloud internal network: The port number is 10011. Example: **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - Internet: The port number is 10012. Example: **project.cn-hangzhou.log.aliyuncs.com:10012** |
| kgo.ConsumerGroup | The ID of the consumer group. You can add consumers to a consumer group. Then, you can specify the ID of the consumer group to implement load balancing, data processing, and data delivery. Example:**"kafka-test"**                                                                                                                                                                                                                                                                                                     |
| kgo.ConsumeTopics | The name of the Simple Log Service **Logstore**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| kgo.SASL          | To ensure the data transmission security, **set the value to SASL_SSL**                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| User              | The name of the Simple Log Service **Project**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Pass              | The AccessKey pair of your Alibaba Cloud account, in the **{access-key-id}#{access-key-secret}** format. Replace **{access-key-id}** with your AccessKey ID and **{access-key-secret}** with your AccessKey secret. We recommend that you use the AccessKey pair of a Resource Access Management (RAM) user. For more information, see [Create a RAM user and authorize the RAM user to access Simple Log Service](https://www.alibabacloud.com/help/en/doc-detail/47664.htm#task-xsk-ttc-ry)                             |
| kgo.Dialer        | If you use the Simple Authentication Security Layer (SASL) protocol, you must configure this parameter. Otherwise, consumption fails. For more information, see [franz-go on GitHub](https://github.com/twmb/franz-go/blob/master/examples/sasl/sasl_ssl_plain/sasl_ssl_plain.go)                                                                                                                                                                                                                                         |

## Franz-go sample code

```go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
        "os"
	"github.com/twmb/franz-go/pkg/kgo"
	"github.com/twmb/franz-go/pkg/sasl/plain"
	"net"
	"time"
)

func main() {
	project         := "project"
	logstore        := "logstore"
	endpoint        := "cn-hangzhou.log.aliyuncs.com"
	port            := "10012"
	//内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb
	//endpoint = "cn-hangzhou-intranet.log.aliyuncs.com"
	//port     = "10011"
	groupId         := "kafka-test"
	accessKeyID     := os.Getenv("SLS_ACCESS_KEY_ID")
        accessKeySecret := os.Getenv("SLS_ACCESS_KEY_SECRET")

 	//using sasl we must add tisDialer
	tlsDialer := &tls.Dialer{NetDialer: &net.Dialer{Timeout: 10 * time.Second}}
	seeds := []string{fmt.Sprintf("%s.%s:%s", project, endpoint, port)}

	//get Kgo client
	client, err := kgo.NewClient(
		kgo.SeedBrokers(seeds...),
		kgo.ConsumerGroup(groupId),
		kgo.ConsumeTopics(logstore),
		kgo.SASL(plain.Auth{
			User: project,
			Pass: fmt.Sprintf("%s#%s", accessKeyID, accessKeySecret),
		}.AsMechanism()),
		kgo.Dialer(tlsDialer.DialContext),
	)

	if err != nil {
		panic(err)
	}
	defer client.Close()
	ctx := context.Background()

	for {
		fetches := client.PollFetches(ctx)
		if errs := fetches.Errors(); len(errs) > 0 {
			panic(fmt.Sprint(errs))
		}

		iter := fetches.RecordIter()
		for !iter.Done() {
			record := iter.Next()
			fmt.Println(string(record.Value), "from an iterator!")
		}
	}
}
```

## Franz-go 与 Confluent-kafka-go 简单对比

Franz-kafka-go 目前 github star 数为 857 ,Confluent-kafka-go 目前 github star 数为 3.7k , 实际使用过程中 franz-kafka-go
如果参数配置有误,能返回的报错信息相比后者少很多,甚至完全不报错,此时排查起来有较大的难度,建议使用 confluent-kafka-go
