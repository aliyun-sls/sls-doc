# 使用Python消费组基于SPL消费日志
本文介绍通过Python消费组的方式，设置SPL语句来消费Logstore中的数据，通过消费组（ConsumerGroup）消费数据无需关注日志服务的实现细节及消费者之间的负载均衡、故障转移（Failover）等，只需要专注于业务逻辑。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。
  **重要** 
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
## 使用SPL消费数据
以Python SDK为例实现消费组消费数据。
1. 创建项目目录spl_consumer_demo，在目录下安装日志服务SDK。 
    ```shell
    pip install -U aliyun-log-python-sdk
    ```
2. 在spl_consumer_demo目录下创建main.py文件。创建一个消费组并启动一个消费者线程，该消费者会从指定的Logstore中消费数据。其中AK、SK配置在环境变量中，query字段填写SPL语句。
    ```python
    import os
    import time

    from aliyun.log.consumer import *
    from aliyun.log import *


    class SPLConsumer(ConsumerProcessorBase):
        shard_id = -1
        last_check_time = 0

        def initialize(self, shard):
            self.shard_id = shard

        def process(self, log_groups, check_point_tracker):
            for log_group in log_groups.LogGroups:
                items = []
                for log in log_group.Logs:
                    item = dict()
                    item['time'] = log.Time
                    for content in log.Contents:
                        item[content.Key] = content.Value
                    items.append(item)
                log_items = dict()
                log_items['topic'] = log_group.Topic
                log_items['source'] = log_group.Source
                log_items['logs'] = items

                print(log_items)

            current_time = time.time()
            if current_time - self.last_check_time > 3:
                try:
                    self.last_check_time = current_time
                    check_point_tracker.save_check_point(True)
                except Exception:
                    import traceback
                    traceback.print_exc()
            else:
                try:
                    check_point_tracker.save_check_point(False)
                except Exception:
                    import traceback
                    traceback.print_exc()

            # None means succesful process
            # if need to roll-back to previous checkpoint，return check_point_tracker.get_check_point()
            return None

        def shutdown(self, check_point_tracker):
            try:
                check_point_tracker.save_check_point(True)
            except Exception:
                import traceback
                traceback.print_exc()


    def sleep_until(seconds, exit_condition=None, expect_error=False):
        if not exit_condition:
            time.sleep(seconds)
            return

        s = time.time()
        while time.time() - s < seconds:
            try:
                if exit_condition():
                    break
            except Exception:
                if expect_error:
                    continue
            time.sleep(1)

    def spl_consumer_group():
        # 日志服务的服务接入点。此处以杭州为例，其它地域请根据实际情况填写。
        endpoint = os.environ.get('ALIYUN_LOG_SAMPLE_ENDPOINT', 'cn-hangzhou.log.aliyuncs.com')

        # 本示例从环境变量中获取AccessKey ID和AccessKey Secret。
        access_key_id = os.environ.get('ALIBABA_CLOUD_ACCESS_KEY_ID', '')
        access_key = os.environ.get('ALIBABA_CLOUD_ACCESS_KEY_SECRET', '')

        project = 'test-project'
        logstore = 'test-nginx-log'

        # 消费组名称。您无需提前创建，SDK会自动创建该消费组。
        consumer_group = 'consumer-group'
        consumer_name = "consumer-group-name"
        query = "* | where cast(cdn_in as bigint) > 70"

        # 在消费组中创建2个消费者消费数据。
        option = LogHubConfig(endpoint,
                              access_key_id,
                              access_key,
                              project,
                              logstore,
                              consumer_group,
                              consumer_name,
                              query=query,
                              cursor_position=CursorPosition.BEGIN_CURSOR,
                              heartbeat_interval=6,
                              data_fetch_interval=1)

        print("*** start to consume data...")
        client_worker = ConsumerWorker(SPLConsumer, consumer_option=option)
        client_worker.start()

        time.sleep(10000)


    if __name__ == '__main__':
        spl_consumer_group()
    ```
3. 在spl_consumer_demo目录下运行main.py，查看结果
    ```python
    python main.py
    ```