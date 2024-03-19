# 使用Go SDK基于SPL消费日志
日志服务提供多语言SDK，且都支持日志服务消费接口。本文介绍普通消费日志的SDK示例及控制台的消费预览功能。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。
**重要**
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
## Go SDK基于SPL消费
本示例中，并调用PullLog接口读取日志数据，完成使用Go SDK基于SPL消费日志数据的演示。关于日志服务SDK的更多信息，请参见[日志服务SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
1. 创建项目目录spl_demo，在目录下执行
    ```shell
    go mod init spl_demo
    ```
2. 在spl_demo目录下创建main.go文件。创建一个消费组并启动一个消费者线程，该消费者会从指定的Logstore中消费数据。其中AK、SK配置在环境变量中，Query字段填写SPL语句。
    ```go 
    package main

    import (
        "fmt"
        "time"
        "os"

        sls "github.com/aliyun/aliyun-log-go-sdk"
    )

    func main() {
        client := &sls.Client{
        AccessKeyID:     os.Getenv("ALIBABA_CLOUD_ACCESS_KEY_ID"),
        AccessKeySecret: os.Getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET"),
        Endpoint:        "",
        }

        project := ""
        logstore := ""
        initCursor := "end"
        query := "* | where cast(body_bytes_sent as bigint) > 14000"

        shards, err := client.ListShards(project, logstore)
        if err != nil {
        fmt.Println("ListShards error", err)
        return
        }

        shardCursorMap := map[int]string{}
        for _, shard := range shards {
        cursor, err := client.GetCursor(project, logstore, shard.ShardID, initCursor)
        if err != nil {
        fmt.Println("GetCursor error", shard.ShardID, err)
        return
        }
        shardCursorMap[shard.ShardID] = cursor
        }

        for {
        for _, shard := range shards {
        pullLogRequest := &sls.PullLogRequest{
        Project:          project,
        Logstore:         logstore,
        ShardID:          shard.ShardID,
        LogGroupMaxCount: 10,
        Query:            query,
        Cursor:           shardCursorMap[shard.ShardID],
        }
        lg, nextCursor, err := client.PullLogsV2(pullLogRequest)
        fmt.Println("shard: ", shard.ShardID, "loggroups: ", len(lg.LogGroups), "nextCursor: ", nextCursor)
        if err != nil {
        fmt.Println("PullLogsV2 error", shard.ShardID, err)
        return
        }
        shardCursorMap[shard.ShardID] = nextCursor
        if len(lg.LogGroups) == 0 {
        // only for debug
        time.Sleep(time.Duration(3) * time.Second)
        }
        }
        }
    }
    ```
3. 运行main函数，查看输出结果
    ```
    shard:  0 loggroups:  0 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMQ==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    shard:  0 loggroups:  0 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMQ==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    shard:  0 loggroups:  0 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMQ==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    shard:  0 loggroups:  1 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMg==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    shard:  0 loggroups:  0 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMg==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    shard:  0 loggroups:  0 nextCursor:  MTY5MzMwMjMwNTIxNjcxMDcwMg==
    shard:  1 loggroups:  0 nextCursor:  MTY5MzI1NTI2ODYwNDIyNDQ2Mw==
    ```
## 备注
* 该示例使用Go SDK直接设置Logstore的Shard进行消费，该接口偏底层，仅做演示用；未考虑Shard负载均衡、故障转移（Failover），错误处理；如果没有特别的定制需求，建议使用消费组的方式进行数据消费。