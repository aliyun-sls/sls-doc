## [Kafka 消费兼容概述和注意事项](./overview.md)

## Franz-go消费配置参数

| 参数                | 描述                                                                                                                                                                                                                                                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| kgo.SeedBrokers   | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)。<br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/>  - 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| kgo.ConsumerGroup | 配置消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过配置消费组id ,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如 **"kafka-test"**                                                                                                                                                                                                                       |
| kgo.ConsumeTopics | 填写日志服务**Logstore**名称                                                                                                                                                                                                                                                                                                |
| kgo.SASL          | 为了保证数据传输的安全性，**必须使用SASL_SSL**                                                                                                                                                                                                                                                                                       |
| User              | 填写日志服务**Project**名称                                                                                                                                                                                                                                                                                                 |
| Pass              | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret}**。请根据实际情况，将 **{access-key-id}** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                   |
| kgo.Dialer        | 使用sasl必须设置这个参数,否则无法正常消费.详见[franz-go github 案例](https://github.com/twmb/franz-go/blob/master/examples/sasl/sasl_ssl_plain/sasl_ssl_plain.go)                                                                                                                                                                         |

## Franz-go消费代码示例

```go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"github.com/twmb/franz-go/pkg/kgo"
	"github.com/twmb/franz-go/pkg/sasl/plain"
	"net"
	"time"
)

var (
	project         = "project"
	accessKeyID     = "access-key-id"
	accessKeySecret = "access-key-secret"
	logstore        = "logstore"
	endpoint        = "cn-hangzhou.log.aliyuncs.com"
	port            = "10012"
	//内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb
	//endpoint = "cn-hangzhou-intranet.log.aliyuncs.com"
	//port     = "10011"
	groupId         = "kafka-test"
)

func main() {
	//using sasl we must add tisDialer
	tlsDialer := &tls.Dialer{NetDialer: &net.Dialer{Timeout: 10 * time.Second}}
	seeds := []string{fmt.Sprintf("%v.%v:%v", project, endpoint, port)}

	//get Kgo client
	client, err := kgo.NewClient(
		kgo.SeedBrokers(seeds...),
		kgo.ConsumerGroup(groupId),
		kgo.ConsumeTopics(logstore),
		kgo.SASL(plain.Auth{
			User: project,
			Pass: fmt.Sprintf("%v#%v", accessKeyID, accessKeySecret),
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

## Franz-go与Confluent-kafka-go简单对比

Franz-kafka-go 目前github star数为857 ,Confluent-kafka-go目前github star数为3.7k , 实际使用过程中franz-kafka-go
如果参数配置有误,能返回的报错信息相比后者少很多,甚至完全不报错,此时排查起来有较大的难度,建议使用confluent-kafka-go
