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

##  Comparison between franz-go and confluent-kafka-go

franz-go has 857 stars on GitHub, whereas confluent-kafka-go has 3,700 stars on GitHub.
In real applications, franz-go reports fewer errors than confluent-kafka-go in case of a parameter configuration error, or even does not report errors. This increases the troubleshooting difficulty. We recommend that you use confluent-kafka-go.
