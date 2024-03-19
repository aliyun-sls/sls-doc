# 使用Java SDK基于SPL消费
日志服务提供多语言SDK，且都支持日志服务消费接口。本文介绍普通消费日志的SDK示例及控制台的消费预览功能。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。

  **重要**
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
## Java SDK基于SPL消费
本示例中，并调用PullLog接口读取日志数据，完成使用Java SDK基于SPL消费日志数据的演示。关于日志服务SDK的更多信息，请参见[日志服务SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
1. 添加Maven依赖。
在Java项目的根目录下，打开pom.xml文件，添加以下代码：
    ```java
    <dependency>
      <groupId>com.google.protobuf</groupId>
      <artifactId>protobuf-java</artifactId>
      <version>2.5.0</version>
    </dependency>
    <dependency>
    <groupId>com.aliyun.openservices</groupId>
      <artifactId>aliyun-log</artifactId>
      <version>0.6.99</version>
    </dependency>
    ```
2. 创建PullLogsWithSPLDemo.java文件。
    ```java
    import com.aliyun.openservices.log.Client;
    import com.aliyun.openservices.log.common.*;
    import com.aliyun.openservices.log.common.Consts;
    import com.aliyun.openservices.log.exception.LogException;
    import com.aliyun.openservices.log.request.PullLogsRequest;
    import com.aliyun.openservices.log.response.ListShardResponse;
    import com.aliyun.openservices.log.response.PullLogsResponse;

    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    public class PullLogsWithSPLDemo {
        // 日志服务的服务接入点。此处以杭州为例，其它地域请根据实际情况填写
        private static final String endpoint = "cn-hangzhou.log.aliyuncs.com";
        //  本示例从环境变量中获取 AccessKey ID 和 AccessKey Secret。
        private static final String accessKeyId = System.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID");
        private static final String accessKeySecret = System.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET");
        // Project 名称
        private static final String project = "your_project";
        // LogStore 名称
        private static final String logStore = "your_logstore";

        public static void main(String[] args) throws Exception {
            // 创建日志服务 Client
            Client client = new Client(endpoint, accessKeyId, accessKeySecret);
            // 查询 LogStore 的 Shard
            ListShardResponse resp = client.ListShard(project, logStore);
            System.out.printf("%s has %d shards\n", logStore, resp.GetShards().size());
            Map<Integer, String> cursorMap = new HashMap<Integer, String>();
            for (Shard shard : resp.GetShards()) {
                int shardId = shard.getShardId();
                // 从头开始消费，获取游标。（如果是从尾部开始消费，使用 Consts.CursorMode.END）
                cursorMap.put(shardId, client.GetCursor(project, logStore, shardId, Consts.CursorMode.BEGIN).GetCursor());
            }
            try {
                while (true) {
                    // 从每个Shard中获取日志
                    for (Shard shard : resp.GetShards()) {
                        int shardId = shard.getShardId();
                        PullLogsRequest request = new PullLogsRequest(project, logStore, shardId, 1000, cursorMap.get(shardId));
                        request.setQuery("* | where cast(body_bytes_sent as bigint) > 14000");
                        request.setPullMode("scan_on_stream");
                        PullLogsResponse response = client.pullLogs(request);
                        // 日志都在日志组（LogGroup）中，按照逻辑拆分即可。
                        List<LogGroupData> logGroups = response.getLogGroups();
                        System.out.printf("Get %d logGroup from logStore:%s:\tShard:%d\n", logGroups.size(), logStore, shardId);

                        // 完成处理拉取的日志后，移动游标。
                        cursorMap.put(shardId, response.getNextCursor());
                    }
                }
            } catch (LogException e) {
                System.out.println("error code :" + e.GetErrorCode());
                System.out.println("error message :" + e.GetErrorMessage());
                throw e;
            }
        }
    }
    ```
3. 运行Main函数，查看输出结果
## 备注
* 该示例使用Java SDK直接设置Logstore的Shard进行消费，该接口偏底层，仅做演示用；未考虑Shard负载均衡、故障转移（Failover），错误处理；如果没有特别的定制需求，建议使用消费组的方式进行数据消费。