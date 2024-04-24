## [Compatibility with Kafka consumers and usage notes](./overview.md)



## Sarama-kafka-go sample code

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

func main() {

	endpoint  := "cn-beijing.log.aliyuncs.com"
	port      := "10012"
	
	version   := "2.1.0"
	project   := "test-project"                   // sls project
	topics    := "your sls logstore"              // sls logstore
	accessId  := os.Getenv("SLS_ACCESS_KEY_ID")                     // aliyun accessId
	accessKey := os.Getenv("SLS_ACCESS_KEY_SECRET")                 // aliyun accessKeySecret
	group     := "test-groupId"                   // consume group name

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
