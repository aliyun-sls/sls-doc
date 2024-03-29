# 使用Java消费组基于SPL消费日志
本文介绍通过Java消费组的方式，设置SPL语句来消费Logstore中的数据，通过消费组（ConsumerGroup）消费数据无需关注日志服务的实现细节及消费者之间的负载均衡、故障转移（Failover）等，只需要专注于业务逻辑。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。
  **重要** 
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
## 使用SPL消费数据
以Java SDK为例实现消费组消费数据。
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
      <artifactId>loghub-client-lib</artifactId>
      <version>0.6.47</version>
    </dependency>
    ```
2. 创建Main.java文件。创建一个消费组并启动一个消费者线程，该消费者会从指定的Logstore中消费数据。管理消费组的代码示例，请参见[使用Java SDK管理消费组](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-java-to-manage-consumer-groups#section-g08-zi5-l1q)、[使用Python SDK管理消费组](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-python-to-manage-consumer-groups)。
    ```java
    import com.aliyun.openservices.loghub.client.ClientWorker;
    import com.aliyun.openservices.loghub.client.config.LogHubConfig;
    import com.aliyun.openservices.loghub.client.exceptions.LogHubClientWorkerException;

    public class SPLConsumer {
        // 日志服务的服务接入点，请您根据实际情况填写。
        private static String Endpoint = "cn-hangzhou.log.aliyuncs.com";
        // 日志服务项目名称，请您根据实际情况填写。请从已创建项目中获取项目名称。
        private static String Project = "your_project";
        // 日志库名称，请您根据实际情况填写。请从已创建日志库中获取日志库名称。
        private static String Logstore = "your_logstore";
        // 消费组名称，请您根据实际情况填写。您无需提前创建，该程序运行时会自动创建该消费组。
        private static String ConsumerGroup = "consumerGroupX";
        // 本示例从环境变量中获取AccessKey ID和AccessKey Secret。。
        private static String AccessKeyId = System.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID");
        private static String AccessKeySecret = System.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET");


        public static void main(String[] args) throws LogHubClientWorkerException, InterruptedException {
            // consumer_1是消费者名称，同一个消费组下面的消费者名称必须不同。不同消费者在多台机器上启动多个进程，均衡消费一个Logstore时，消费者名称可以使用机器IP地址来区分。
            // maxFetchLogGroupSize用于设置每次从服务端获取的LogGroup最大数目，使用默认值即可。您可以使用config.setMaxFetchLogGroupSize(100);调整，取值范围为(0,1000]。
            LogHubConfig config = new LogHubConfig(ConsumerGroup, "consumer_1", Endpoint, Project, Logstore, AccessKeyId, AccessKeySecret, LogHubConfig.ConsumePosition.BEGIN_CURSOR, 1000);
            // setQuery可以设置消费过程中的SLS SPL语句
            config.setQuery("* | where cast(body_bytes_sent as bigint) > 14000");
            ClientWorker worker = new ClientWorker(new SPLLogHubProcessorFactory(), config);
            Thread thread = new Thread(worker);
            // Thread运行之后，ClientWorker会自动运行，ClientWorker扩展了Runnable接口。
            thread.start();
            Thread.sleep(60 * 60 * 1000);
            // 调用Worker的Shutdown函数，退出消费实例，关联的线程也会自动停止。
            worker.shutdown();
            // ClientWorker运行过程中会生成多个异步的任务。Shutdown完成后，请等待还在执行的任务安全退出。建议设置sleep为30秒。
            Thread.sleep(30 * 1000);
        }
    }
    ```
3. 创建SPLLogHubProcessor.java文件。
    ```java
    import com.aliyun.openservices.log.common.FastLog;
    import com.aliyun.openservices.log.common.FastLogContent;
    import com.aliyun.openservices.log.common.FastLogGroup;
    import com.aliyun.openservices.log.common.FastLogTag;
    import com.aliyun.openservices.log.common.LogGroupData;
    import com.aliyun.openservices.loghub.client.ILogHubCheckPointTracker;
    import com.aliyun.openservices.loghub.client.exceptions.LogHubCheckPointException;
    import com.aliyun.openservices.loghub.client.interfaces.ILogHubProcessor;

    import java.util.List;

    public class SPLLogHubProcessor implements ILogHubProcessor {
        private int shardId;
        // 记录上次持久化Checkpoint的时间。
        private long mLastSaveTime = 0;

        // initialize 方法会在 processor 对象初始化时被调用一次
        public void initialize(int shardId) {
            this.shardId = shardId;
        }

        // 消费数据的主逻辑，消费时的所有异常都需要处理，不能直接抛出。
        public String process(List<LogGroupData> logGroups, ILogHubCheckPointTracker checkPointTracker) {
            // 打印已获取的数据。
            for (LogGroupData logGroup : logGroups) {
                FastLogGroup fastLogGroup = logGroup.GetFastLogGroup();
                System.out.println("Tags");
                for (int i = 0; i < fastLogGroup.getLogTagsCount(); ++i) {
                    FastLogTag logTag = fastLogGroup.getLogTags(i);
                    System.out.printf("%s : %s\n", logTag.getKey(), logTag.getValue());
                }
                for (int i = 0; i < fastLogGroup.getLogsCount(); ++i) {
                    FastLog log = fastLogGroup.getLogs(i);
                    System.out.println("--------\nLog: " + i + ", time: " + log.getTime() + ", GetContentCount: " + log.getContentsCount());
                    for (int j = 0; j < log.getContentsCount(); ++j) {
                        FastLogContent content = log.getContents(j);
                        System.out.println(content.getKey() + "\t:\t" + content.getValue());
                    }
                }
            }
            long curTime = System.currentTimeMillis();
            // 每隔30秒，写一次Checkpoint到服务端。如果30秒内发生Worker异常终止，新启动的Worker会从上一个Checkpoint获取消费数据，可能存在少量的重复数据。
            try {
                if (curTime - mLastSaveTime > 30 * 1000) {
                    // 参数为true表示立即手动将Checkpoint更新到服务端。此外，默认每60秒会自动将内存中缓存的Checkpoint更新到服务端。
                    checkPointTracker.saveCheckPoint(true);
                    mLastSaveTime = curTime;
                } else {
                    // 参数为false表示将Checkpoint缓存在本地，可被自动更新Checkpoint机制更新到服务端。
                    checkPointTracker.saveCheckPoint(false);
                }
            } catch (LogHubCheckPointException e) {
                e.printStackTrace();
            }
            return null;
        }

        // 当Worker退出时，会调用该函数，您可以在此处执行清理工作。
        public void shutdown(ILogHubCheckPointTracker checkPointTracker) {
            // 将Checkpoint立即保存到服务端。
            try {
                checkPointTracker.saveCheckPoint(true);
            } catch (LogHubCheckPointException e) {
                e.printStackTrace();
            }
        }
    }
    ```
4. 创建 SPLLogHubProcessorFactory.java 文件。
    ```java
    import com.aliyun.openservices.loghub.client.interfaces.ILogHubProcessor;
    import com.aliyun.openservices.loghub.client.interfaces.ILogHubProcessorFactory;

    class SPLLogHubProcessorFactory implements ILogHubProcessorFactory {
        public ILogHubProcessor generatorProcessor() {
            // 生成一个消费实例。注意：每次调用 generatorProcessor 方法，都应该返回一个新的 SPLLogHubProcessor 对象。
            return new SPLLogHubProcessor();
        }
    }
    ```
5. 运行Main.java。
以模拟消费Nginx日志为例，打印日志如下：
    ```
    Log: 5, time: 1708957557, GetContentCount: 16
    body_bytes_sent    :    14088
    client_ip    :    183.190.148.128
    host    :    www.gsn.mock.com
    http_host    :    www.rw.mock.com
    http_user_agent    :    Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36
    request_length    :    2286
    request_method    :    POST
    request_time    :    63
    request_uri    :    /request/path-1/file-3
    scheme    :    https
    slbid    :    slb-01
    status    :    200
    upstream_addr    :    122.156.160.142
    upstream_response_time    :    13
    upstream_status    :    200
    vip_addr    :    180.176.205.168
    upstream_addr    :    60.31.134.235
    upstream_response_time    :    16
    upstream_status    :    200
    vip_addr    :    58.212.38.56
    --------
    Log: 4, time: 1708843517, GetContentCount: 16
    body_bytes_sent    :    14270
    client_ip    :    106.46.3.151
    host    :    www.bk.mock.com
    http_host    :    www.zpa.mock.com
    http_user_agent    :    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10
    request_length    :    3808
    request_method    :    GET
    request_time    :    32
    request_uri    :    /request/path-0/file-3
    scheme    :    https
    slbid    :    slb-01
    status    :    200
    upstream_addr    :    210.16.132.192
    upstream_response_time    :    19
    Tags
    __receive_time__ : 1708957570
    __receive_time__ : 1708957570
    --------
    Log: 0, time: 1708957567, GetContentCount: 16
    body_bytes_sent    :    14709
    client_ip    :    175.172.248.64
    upstream_status    :    200
    vip_addr    :    210.15.47.218
    --------
    ```