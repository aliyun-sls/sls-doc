package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"

	sls "github.com/aliyun/aliyun-log-go-sdk"

	"github.com/IBM/sarama"
)

type Config struct {
	Project         string `json:"Project"`
	Endpoint        string `json:"Endpoint"`
	Port            int    `json:"Port"`
	AccessKeyId     string `json:"AccessKeyId"`
	AccessKeySecret string `json:"AccessKeySecret"`

	Topic        string `json:"Topic"`
	Query        string
	SplQueryFile string `json:"SplQueryFile"`
	Group        string `json:"ConsumerGroup"`
	Logstore     string
	Broker       string
}

var (
	configFile = flag.String("f", "", "Path of json config file. (Must be provided)")
	subCommand = ""
)

func getBroker(project string, endPoint string, port int) string {
	return fmt.Sprintf("%s.%s:%d", project, endPoint, port)
}

func getLogstore(topic string) (string, error) {
	if !strings.Contains(topic, ".") {
		return "", fmt.Errorf("topic should contain dot(.)")
	}

	splited := strings.Split(topic, ".")
	if len(splited) != 2 {
		return "", fmt.Errorf("topic should contain only one dot(.)")
	}

	idNum, err := strconv.ParseInt(splited[1], 10, 64)
	if err != nil {
		fmt.Println(splited[1])
		fmt.Println(err)
		return "", fmt.Errorf("topic should match ${logstore}.{number}, the number is 0-31")
	}

	if idNum > 32 {
		return "", fmt.Errorf("topic id number is to large")
	}

	return splited[0], nil
}

func readConfigFile(filename string) (*Config, error) {

	config := &Config{}

	jsonRaw, err := ioutil.ReadFile(filename)

	if err != nil {
		fmt.Fprintf(os.Stderr, "File read error: %s", err.Error())
		return nil, err
	}

	err = json.Unmarshal(jsonRaw, config)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Json error: %s", err.Error())
		return nil, err
	}

	logstore, err := getLogstore(config.Topic)
	if err != nil {
		fmt.Fprintf(os.Stderr, "bad topic name: %s", err.Error())
		return nil, err
	}
	config.Logstore = logstore

	if config.SplQueryFile != "" {
		splContent, err := ioutil.ReadFile(filename)
		if err != nil {
			return nil, err
		}
		config.Query = string(splContent)
	}

	config.Broker = getBroker(config.Project, config.Endpoint, config.Port)

	return config, nil
}

func ParseCommandLineConfig() *Config {
	if len(os.Args) == 1 {
		printUsage()
		os.Exit(-1)
	}

	subCommand = os.Args[1]
	os.Args = os.Args[1:]
	flag.Parse()

	if configFile == nil || *configFile == "" {
		fmt.Fprintf(os.Stderr, "config file path is not provided.\n\n")
		printUsage()
		os.Exit(-1)
	}

	config, err := readConfigFile(*configFile)

	if err != nil {
		os.Exit(-1)
	}
	return config
}

func InfoVirtualTopic(config *Config, topic string) error {

	saramaConf, err := CreateSaramaConfig(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}

	admin, err := sarama.NewClusterAdmin([]string{
		config.Broker},
		saramaConf)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}
	defer admin.Close()

	configResource := &sarama.ConfigResource{
		Type:        sarama.TopicResource,
		Name:        topic,
		ConfigNames: nil,
	}

	topicConfigs, err := admin.DescribeConfig(*configResource)

	for _, topicConfig := range topicConfigs {
		if topicConfig.Name == "query" {
			println("Topic: " + topic)
			println("Query: " + topicConfig.Value)
		}
	}

	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}

	return nil
}

func CreateSaramaConfig(config *Config) (*sarama.Config, error) {
	versionStr := "2.1.0"
	version, err := sarama.ParseKafkaVersion(versionStr)
	if err != nil {
		return nil, err
	}

	saramaConf := sarama.NewConfig()
	saramaConf.Version = version

	saramaConf.Net.TLS.Enable = true
	saramaConf.Net.SASL.Enable = true
	saramaConf.Net.SASL.User = config.Project
	saramaConf.Net.SASL.Password = fmt.Sprintf("%s#%s", config.AccessKeyId, config.AccessKeySecret)
	saramaConf.Net.SASL.Mechanism = "PLAIN"

	saramaConf.Consumer.Fetch.Default = 1024 * 1024

	return saramaConf, nil
}

func CreateAdminClient(config *Config) (sarama.ClusterAdmin, error) {
	saramaConf, err := CreateSaramaConfig(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return nil, err
	}

	admin, err := sarama.NewClusterAdmin([]string{
		config.Broker},
		saramaConf)

	return admin, err
}

func tryConsumeWithQuery(config *Config, query string) error {
	client := sls.CreateNormalInterface(config.Endpoint, config.AccessKeyId,
		config.AccessKeySecret, "")

	shards, err := client.ListShards(config.Project, config.Logstore)
	if err != nil {
		return err
	}

	shardId := shards[0].ShardID

	cursor, err := client.GetCursor(config.Project,
		config.Logstore, shardId, "begin")
	if err != nil {
		return err
	}

	_, _, err = client.PullLogsV2(&sls.PullLogRequest{
		Project:          config.Project,
		Logstore:         config.Logstore,
		Cursor:           cursor,
		ShardID:          shardId,
		Query:            query,
		LogGroupMaxCount: 1,
		PullMode:         "scan_on_stream",
	})
	return err
}

func DeleteVirtualTopic(config *Config, topic string) error {
	adminClient, err := CreateAdminClient(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}
	defer adminClient.Close()
	err = adminClient.DeleteTopic(topic)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}

	println("OK")

	return nil
}

func CreateVirtualTopic(config *Config, topic string, query string) error {
	err := tryConsumeWithQuery(config, query)
	if err != nil {
		fmt.Println("spl query is not valid", err)
		return err
	}
	adminClient, err := CreateAdminClient(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}
	defer adminClient.Close()

	err = adminClient.CreateTopic(topic, &sarama.TopicDetail{
		NumPartitions:     1,
		ReplicationFactor: 1,
		ConfigEntries: map[string]*string{
			"query": &query,
		},
	}, false)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}

	println("OK")

	return nil
}

func DeleteConsumerGroup(config *Config, group string) error {
	adminClient, err := CreateAdminClient(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}
	defer adminClient.Close()

	err = adminClient.DeleteConsumerGroup(group)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Sarama error: %s", err.Error())
		return err
	}

	println("OK")

	return nil
}

func printUsage() {
	fmt.Fprint(os.Stderr,
		`Command usage example:
	./kafka-admin-tool create_virtual_topic -f config.json
	./kafka-admin-tool info_virtual_topic -f config.json
	./kafka-admin-tool delete_virtual_topic -f config.json
	./kafka-admin-tool delete_consumer_group -f config.json -g group_name

config.json example:
{
    "Project" : "Your SLS Project",
    "Endpoint" : "Your SLS Project's Endpoint",
    "Port" : 10012,
    "AccessKeyId" : "AliyunAccessKeyId",
    "AccessKeySecret" : "AliyunAccessKeySecret",
    "Topic" : "logstore.0",
    "SplQueryFile" : "/tmp/spl.query"
}

/tmp/spl.query exmple (use sls spl to filter error log):
* | where level = "ERROR"

}
`)
}

func main() {
	config := ParseCommandLineConfig()

	switch subCommand {
	case "create_virtual_topic":
		if config.Topic == "" {
			fmt.Fprintf(os.Stderr, "Error: Empty topic name")
		}
		err := CreateVirtualTopic(config, config.Topic, config.Query)
		if err != nil {
			os.Exit(-1)
		}
	case "info_virtual_topic":
		if config.Topic == "" {
			fmt.Fprintf(os.Stderr, "Error: Empty topic name")
		}
		err := InfoVirtualTopic(config, config.Topic)
		if err != nil {
			os.Exit(-1)
		}
	case "delete_virtual_topic":
		if config.Topic == "" {
			fmt.Fprintf(os.Stderr, "Error: Empty topic name")
		}
		err := DeleteVirtualTopic(config, config.Topic)
		if err != nil {
			os.Exit(-1)
		}
	case "delete_consumer_group":
		if config.Group == "" {
			fmt.Fprintf(os.Stderr, "Error: Empty group id")
		}
		err := DeleteConsumerGroup(config, config.Group)
		if err != nil {
			os.Exit(-1)
		}

	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n", subCommand)
		os.Exit(-1)
	}

}
