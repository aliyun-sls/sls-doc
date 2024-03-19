# 使用Go消费组基于SPL消费日志
本文介绍通过Go消费组的方式，设置SPL语句来消费Logstore中的数据，通过消费组（ConsumerGroup）消费数据无需关注日志服务的实现细节及消费者之间的负载均衡、故障转移（Failover）等，只需要专注于业务逻辑。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。
**重要**
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
  
## 使用SPL消费数据
以Go SDK为例实现消费组消费数据。
1. 创建项目目录spl_demo，在目录下执行
    ```shell
    go mod init spl_demo
    ```
2. 在spl_demo目录下创建main.go文件。创建一个消费组并启动一个消费者线程，该消费者会从指定的Logstore中消费数据。其中AK、SK配置在环境变量中，Query字段填写SPL语句。
    ```go
    package main

    import (
        "fmt"
        "os"
        "os/signal"
        "syscall"

        sls "github.com/aliyun/aliyun-log-go-sdk"
        consumerLibrary "github.com/aliyun/aliyun-log-go-sdk/consumer"
        "github.com/go-kit/kit/log/level"
    )

    // README :
    // This is a very simple example of pulling data from your logstore and printing it for consumption, including pre-handling for logs.

    func main() {
        option := consumerLibrary.LogHubConfig{
        Endpoint:          "cn-beijing.log.aliyuncs.com",
        AccessKeyID:       os.Getenv("ALIBABA_CLOUD_ACCESS_KEY_ID"),
        AccessKeySecret:   os.Getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET"),
        Project:           "",
        Logstore:          "",
        ConsumerGroupName: "test-spl-cg",
        ConsumerName:      "test-spl-consumer",
        // This options is used for initialization, will be ignored once consumer group is created and each shard has been started to be consumed.
        // Could be "begin", "end", "specific time format in time stamp", it's log receiving time.
        CursorPosition: consumerLibrary.END_CURSOR,
        // Query is for log pre-handling before return to client, more info refer to https://www.alibabacloud.com/help/zh/sls/user-guide/rule-based-consumption
        Query: "* | where cast(body_bytes_sent as bigint) > 14000",
        }

        consumerWorker := consumerLibrary.InitConsumerWorkerWithCheckpointTracker(option, process)
        ch := make(chan os.Signal, 1)
        signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
        consumerWorker.Start()
        if _, ok := <-ch; ok {
        level.Info(consumerWorker.Logger).Log("msg", "get stop signal, start to stop consumer worker", "consumer worker name", option.ConsumerName)
        consumerWorker.StopAndWait()
        }
    }

    // Fill in your consumption logic here, and be careful not to change the parameters of the function and the return value,
    // otherwise you will report errors.
    func process(shardId int, logGroupList *sls.LogGroupList, checkpointTracker consumerLibrary.CheckPointTracker) (string, error) {
        fmt.Println(shardId, "loggroup", len(logGroupList.LogGroups))
        checkpointTracker.SaveCheckPoint(false)
        return "", nil
    }
    ```
3. 在spl_demo目录下执行命令，安装依赖
    ```
    go mod tidy
    go mod vendor
    ```
4. 运行main.go，查看结果
    ```
    go run main.go
    ```
    输入如下，可以根据自身需求调整
    ```
    0 loggroup 58
    1 loggroup 62
    0 loggroup 56
    1 loggroup 61
    0 loggroup 59
    1 loggroup 58
    0 loggroup 101
    1 loggroup 101
    ```

