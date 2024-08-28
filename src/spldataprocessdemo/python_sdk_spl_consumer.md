# 使用Python消费组基于SPL消费日志
日志服务提供多语言SDK，且都支持日志服务消费接口。本文介绍通过Python消费组的方式，设置SPL语句来消费Logstore中的数据，通过消费组（ConsumerGroup）消费数据无需关注日志服务的实现细节及消费者之间的负载均衡、故障转移（Failover）等，只需要专注于业务逻辑。
## 前提条件
* 已创建RAM用户并完成授权。具体操作，请参见[创建RAM用户并完成授权](https://help.aliyun.com/zh/sls/using-the-openapi-example#78541bf01a5df)。
* 已配置环境变量**ALIBABA_CLOUD_ACCESS_KEY_ID**和**ALIBABA_CLOUD_ACCESS_KEY_SECRET**。具体操作，请参见[配置环境变量](https://help.aliyun.com/zh/sls/using-the-openapi-example#8e83951026slv)。
**重要**
  * 阿里云账号的AccessKey拥有所有API的访问权限，建议您使用RAM用户的AccessKey进行API访问或日常运维。
  * 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
* 已安装SDK开发环境。具体操作，请参见[SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
## Python SDK基于SPL消费
本示例中，并调用PullLog接口读取日志数据，完成使用Go SDK基于SPL消费日志数据的演示。关于日志服务SDK的更多信息，请参见[日志服务SDK参考](https://help.aliyun.com/zh/sls/developer-reference/overview-of-log-service-sdk#reference-n3h-2sq-zdb)。
1. 创建项目目录spl_demo，在目录下安装日志服务SDK
    ```shell
    pip install -U aliyun-log-python-sdk
    ```
2. 在spl_demo目录下创建main.py文件。创建一个消费组并启动一个消费者线程，该消费者会从指定的Logstore中消费数据。其中AK、SK配置在环境变量中，query字段填写SPL语句。
    ```python
    # encoding: utf-8

    import time
    import os
    from aliyun.log import *

    def main():
        # 日志服务的服务接入点。此处以杭州为例，其它地域请根据实际情况填写。
        endpoint = 'cn-hangzhou.log.aliyuncs.com'
        # 本示例从环境变量中获取AccessKey ID和AccessKey Secret。
        access_key_id = os.environ.get('ALIBABA_CLOUD_ACCESS_KEY_ID', '')
        access_key = os.environ.get('ALIBABA_CLOUD_ACCESS_KEY_SECRET', '')
        # Project名称。
        project_name = 'aliyun-test-project'
        # Logstore名称。
        logstore_name = 'aliyun-test-logstore'
        query = '* | where cast(cdn_in as bigint) > 70'
        init_cursor = 'end'
        log_group_count = 10

        # 创建日志服务Client。
        client = LogClient(endpoint, access_key_id, access_key)

        cursor_map = {}
        # 列举logstore的shards
        res = client.list_shards(project_name, logstore_name)
        res.log_print()
        shards = res.shards

        # 获取初始cursor
        for shard in shards:
            shard_id = shard.get('shardID')
            res = client.get_cursor(project_name, logstore_name, shard_id, init_cursor)
            cursor_map[shard_id] = res.get_cursor()

        # 循环读取每个shard的数据
        while True:
            for shard in shards:
                shard_id = shard.get('shardID')
                res = client.pull_logs(project_name, logstore_name, shard_id, cursor_map.get(shard_id), log_group_count, query=query)
                res.log_print()
                if cursor_map[shard_id] == res.next_cursor: 
                    # only for debug 
                    time.sleep(3)
                else:
                    cursor_map[shard_id] = res.next_cursor


    if __name__ == '__main__':
        main()

    ```
3. 运行main函数，查看输出结果

## 说明
* 该示例使用Python SDK直接设置Logstore的Shard进行消费，该接口偏底层，仅做演示用；未考虑Shard负载均衡、故障转移（Failover），错误处理；如果没有特别的定制需求，建议使用消费组的方式进行数据消费。