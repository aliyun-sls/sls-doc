## [Kafka 消费兼容概述和注意事项](./overview.md)

## Sarama-kafka-go消费配置参数

| 参数                                        | 描述                                                                                                                                                                                                                                                                                                                 |
|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| brokers                                   | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb) <br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| version                                   | kafka版本，例如：2.1.0                                                                                                                                                                                                                                                                                                   |
| topics                                    | 配置为日志服务Logstore名称                                                                                                                                                                                                                                                                                                  |
| groupId                                   | 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过配置消费组id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如 **"kafka-test"**                                                                                                                                                                                                                         |
| conf.Net.TLS.Enable                       | 必须为**true**，使用TLS加密传输连接集群                                                                                                                                                                                                                                                                                          |
| conf.Net.SASL.Enable                      | 必须为**true**，启用SASL进行客户端身份校验                                                                                                                                                                                                                                                                                        |
| conf.Net.SASL.User                        | 配置为日志服务Project名称                                                                                                                                                                                                                                                                                                   |
| conf.Net.SASL.Password                    | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret}**。请根据实际情况，将 **{access-key-id}** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                  |                                                                                                                                                                                                                                                                                                                |
| conf.Net.SASL.Mechanism                   | 必须使用"PLAIN"                                                                                                                                                                                                                                                                                                        |
| conf.Consumer.Fetch.Min                   | 一次请求中拉取信息的最小byte数量，默认为1                                                                                                                                                                                                                                                                                            |
| conf.Consumer.Fetch.Default               | 一次请求中从集群拉取信息的最大byte数量，案例中为 1024 * 1024                                                                                                                                                                                                                                                                             |
| conf.Consumer.Retry.Backoff               | 读取分区失败后重试之前需要等待的时间，默认2秒钟                                                                                                                                                                                                                                                                                           |
| conf.Consumer.MaxWaitTime                 | 表示broker在Consumer.Fetch.Min字节可用之前等待的最长时间，默认250毫秒，100-500毫秒是大多数情况的合理范围                                                                                                                                                                                                                                              |
| conf.Consumer.MaxProcessingTime           | 消费者期望一条消息处理的最长时间                                                                                                                                                                                                                                                                                                   |
| conf.Consumer.Offsets.AutoCommit.Enable   | 参数指定是否自动把更新后的偏移量提交会代理，true为启用，默认情况下启用                                                                                                                                                                                                                                                                              |
| conf.Consumer.Offsets.AutoCommit.Interval | 提交更新后的偏移量的频率，如果没有启用自动提交，该参数无效，默认1s                                                                                                                                                                                                                                                                                 |
| conf.Consumer.Offsets.Initial             | 如果之前没有提交偏移量则使用的初始偏移量，默认是"OffsetNewest"，并表示使用最新的偏移量，即从最新消息开始读取。"OffsetOldest"表示使用最早的偏移量，从最早的消息开始读取                                                                                                                                                                                                                  |
| conf.Consumer.Offsets.Retry.Max           | 提交请求失败时，最多重试次数，默认为3次                                                                                                                                                                                                                                                                                               |

## Sarama-kafka-go消费代码示例

```go
package main

// SIGUSR1 toggle the pause/resume consumption
import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/Shopify/sarama"
)

// Sarama confuration options
var (
	endpoint  = "cn-beijing.log.aliyuncs.com"
	port      = "10012"
	version   = "2.1.0"
	project   = "test-project"                   // sls project
	topics    = "your sls logstore"              // sls logstore
	accessId  = "your ak id"                     // aliyun accessId
	accessKey = "your ak secret"                 // aliyun accessKeySecret
	group     = "test-groupId"                   // consume group name
)

func main() {
	keepRunning := true
	log.Println("Starting a new Sarama consumer")

	version, err := sarama.ParseKafkaVersion(version)
	if err != nil {
		log.Panicf("Error parsing Kafka version: %v", err)
	}

	/**
	 * Construct a new Sarama confuration.
	 * The Kafka cluster version has to be defined before the consumer/producer is initialized.
	 */
	brokers := []string{fmt.Sprintf("%s.%s:%s", project, endpoint, port)}

	conf := sarama.NewConfig()
	conf.Version = version

	conf.Net.TLS.Enable = true
	conf.Net.SASL.Enable = true
	conf.Net.SASL.User = project
	conf.Net.SASL.Password = fmt.Sprintf("%s#%s", accessId, accessKey)
	conf.Net.SASL.Mechanism = "PLAIN"

	conf.Consumer.Fetch.Min = 1
	conf.Consumer.Fetch.Default = 1024 * 1024
	conf.Consumer.Retry.Backoff = 2 * time.Second
	conf.Consumer.MaxWaitTime = 250 * time.Millisecond
	conf.Consumer.MaxProcessingTime = 100 * time.Millisecond
	conf.Consumer.Return.Errors = false
	conf.Consumer.Offsets.AutoCommit.Enable = true
	conf.Consumer.Offsets.AutoCommit.Interval = 1 * time.Second
	conf.Consumer.Offsets.Initial = sarama.OffsetOldest
	conf.Consumer.Offsets.Retry.Max = 3

	/**
	 * Setup a new Sarama consumer group
	 */
	consumer := Consumer{
		ready: make(chan bool),
	}

	ctx, cancel := context.WithCancel(context.Background())
	client, err := sarama.NewConsumerGroup(brokers, group, conf)
	if err != nil {
		log.Panicf("Error creating consumer group client: %v", err)
	}

	consumptionIsPaused := false
	wg := &sync.WaitGroup{}
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			// `Consume` should be called inside an infinite loop, when a
			// server-side rebalance happens, the consumer session will need to be
			// recreated to get the new claims
			if err := client.Consume(ctx, strings.Split(topics, ","), &consumer); err != nil {
				log.Panicf("Error from consumer: %v", err)
			}
			// check if context was cancelled, signaling that the consumer should stop
			if ctx.Err() != nil {
				return
			}
			consumer.ready = make(chan bool)
		}
	}()

	<-consumer.ready // Await till the consumer has been set up
	log.Println("Sarama consumer up and running!...")

	sigusr1 := make(chan os.Signal, 1)
	signal.Notify(sigusr1, syscall.SIGUSR1)

	sigterm := make(chan os.Signal, 1)
	signal.Notify(sigterm, syscall.SIGINT, syscall.SIGTERM)

	for keepRunning {
		select {
		case <-ctx.Done():
			log.Println("terminating: context cancelled")
			keepRunning = false
		case <-sigterm:
			log.Println("terminating: via signal")
			keepRunning = false
		case <-sigusr1:
			toggleConsumptionFlow(client, &consumptionIsPaused)
		}
	}
	cancel()
	wg.Wait()
	if err = client.Close(); err != nil {
		log.Panicf("Error closing client: %v", err)
	}
}

func toggleConsumptionFlow(client sarama.ConsumerGroup, isPaused *bool) {
	if *isPaused {
		client.ResumeAll()
		log.Println("Resuming consumption")
	} else {
		client.PauseAll()
		log.Println("Pausing consumption")
	}

	*isPaused = !*isPaused
}

// Consumer represents a Sarama consumer group consumer
type Consumer struct {
	ready chan bool
}

// Setup is run at the beginning of a new session, before ConsumeClaim
func (consumer *Consumer) Setup(sarama.ConsumerGroupSession) error {
	// Mark the consumer as ready
	close(consumer.ready)
	return nil
}

// Cleanup is run at the end of a session, once all ConsumeClaim goroutines have exited
func (consumer *Consumer) Cleanup(sarama.ConsumerGroupSession) error {
	return nil
}

// ConsumeClaim must start a consumer loop of ConsumerGroupClaim's Messages().
func (consumer *Consumer) ConsumeClaim(session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	// NOTE:
	// Do not move the code below to a goroutine.
	// The `ConsumeClaim` itself is called within a goroutine, see:
	// https://github.com/Shopify/sarama/blob/main/consumer_group.go#L27-L29
	for {
		select {
		case message := <-claim.Messages():
			realUnixTimeSeconds := message.Timestamp.Unix()
			if realUnixTimeSeconds < 2000000 {
				realUnixTimeSeconds = message.Timestamp.UnixMicro() / 1000
			}

			log.Printf("Message claimed: value = %s, timestamp = %d, topic = %s", string(message.Value), realUnixTimeSeconds, message.Topic)
			session.MarkMessage(message, "")

		// Should return when `session.Context()` is done.
		// If not, will raise `ErrRebalanceInProgress` or `read tcp <ip>:<port>: i/o timeout` when kafka rebalance. see:
		// https://github.com/Shopify/sarama/issues/1192
		case <-session.Context().Done():
			return nil
		}
	}
}
```
