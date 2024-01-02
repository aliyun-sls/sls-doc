# 同步定时 SQL
以下脚本主要提供了一些辅助 定时SQL 到其它Project的功能脚本

## 配置文件说明
```json
[
  {
    "target_schedule_sql_config": {
      "s_sql_job_name": "sql-1704166982-166294",
      "project": "sls-ml-demo",
      "endpoint": "cn-chengdu.log.aliyuncs.com"
    },
    "newly_job_config": {
      "description": "",
      "displayName": "",
      "fromTime": 0,
      "toTime": 0,
      "source": {
        "project": "sls-ml-demo",
        "logstore": "cdn_access_log",
        "endpoint": "cn-chengdu.log.aliyuncs.com",
        "roleArn": "acs:ram::1654218965343050:role/aliyunlogetlrole"
      },
      "destination": {
        "project": "sls-ml-demo",
        "logstore": "test_temp",
        "endpoint": "cn-chengdu-intranet.log.aliyuncs.com",
        "roleArn": "acs:ram::1654218965343050:role/aliyunlogetlrole"
      }
    }
  }
]
```

target_schedule_sql_config
+ 该字段用来描述，原始的 定时SQL 任务在的基本信息，其中 s_sql_job_name 一定要确认好，可以去SLS的控制台进行查看

newly_job_config
+ 该字段主要用来说明，将上述 定时SQL 任务复制到哪个Project中
+ description、displayName 这两个字段如果为空字符串，则使用原始的Job的相关字段进行填充
+ fromTime、toTime 这两个字段主要用来设置，新创建的任务的开始时间和结束时间，如果设置的值 <= 0，则复用原始Job的时间区间
+ source 该字段用来设置，新的Job创建在哪个Project中
+ destination 该字段用来设置，新的Job中的SQL结果数据存储到哪个Logstore中。如果 destination 和 source 在相同的Region，则设置destination中的endpoint为私网地址，可以降低流量费用

## 示例代码
```python
# -*- coding: utf-8 -*-
import json
import time

from aliyun.log import *
from aliyun.log.scheduled_sql import *

global_ak_id = ""
global_ak_key = ""

client_map = {}


def get_sls_client(endpoint: str) -> LogClient:
    sls_client = LogClient(endpoint, global_ak_id, global_ak_key)
    if endpoint in client_map.keys():
        return client_map[endpoint]
    client_map[endpoint] = sls_client
    return sls_client


def check_store_item(store_item: dict):
    key_names = ["project", "logstore", "endpoint"]
    for key in key_names:
        if key not in store_item.keys():
            raise ValueError(f"logstore config miss key {key}")
        if len(store_item[key]) == "":
            raise ValueError(f"logstore config miss value [{key}]")


def get_schedule_sql_job_config(endpoint: str, project: str, ssql_job_name: str) -> dict:
    sls_client = get_sls_client(endpoint)
    ssql_job_resp = sls_client.get_scheduled_sql(project, ssql_job_name)
    ssql_job = ssql_job_resp.get_scheduled_sql()
    # print(type(ssql_job))
    # print(json.dumps(ssql_job))
    return ssql_job


def make_schedule_sql_name() -> str:
    # sql-1704166982-166294
    now_stamp = int(time.time())
    postfix = time.time_ns() % 1000000
    job_name = f"sql-{now_stamp}-{postfix}"
    return job_name


def create_schedule_sql(s_sql_config: dict):
    """
    1. 仅拷贝原始的S-SQL中的Query部分的配置，在新建任务中，需要确认对应的开始和结束时间
    2. 要判断下 source 和 destination 中的 logstore 是否在相同的Region，如果是相同的Region，则使用内网地址；
       如果是不同Region则需要使用公网地址，但是公网地址会产生费用
    """

    def make_scheduled_sql_schedule(origin_ssql_job: dict):
        origin_job_schedule = origin_ssql_job["schedule"]
        job_schedule = JobSchedule()
        job_schedule.setJobName("")
        job_schedule.setDisplayName("")
        job_schedule.setDescription("")
        job_schedule.setType(origin_job_schedule["type"])
        job_schedule.setInterval(origin_job_schedule["interval"])
        job_schedule.setDelay(origin_job_schedule["delay"])
        job_schedule.setRunImmediately(origin_job_schedule["runImmediately"])
        if "hour" in origin_job_schedule.keys():
            job_schedule.setHour(origin_job_schedule["hour"])
        if "dayOfWeek" in origin_job_schedule.keys():
            job_schedule.setDayOfWeek(origin_job_schedule["dayOfWeek"])
        if "timeZone" in origin_job_schedule.keys():
            job_schedule.setTimeZone(origin_job_schedule["timeZone"])
        if "cronExpression" in origin_job_schedule.keys():
            job_schedule.setCronExpression(origin_job_schedule["cronExpression"])
        return job_schedule

    def make_scheduled_sql_config(origin_ssql_job: dict, from_time: int, to_time: int, source_store_config: dict, dest_store_config: dict):
        source_role_arn = source_store_config["roleArn"]
        dest_role_arn = dest_store_config["roleArn"]

        origin_job_config = origin_ssql_job["configuration"]
        schedule_sql_config = ScheduledSQLConfiguration()
        schedule_sql_config.setScript(origin_job_config["script"])
        schedule_sql_config.setSqlType(origin_job_config["sqlType"])
        schedule_sql_config.setRoleArn(origin_job_config["roleArn"])
        if len(source_role_arn) > 0:
            schedule_sql_config.setRoleArn(source_role_arn)
        schedule_sql_config.setDestRoleArn(origin_job_config["destRoleArn"])
        if len(dest_role_arn) > 0:
            schedule_sql_config.setDestRoleArn(dest_role_arn)
        schedule_sql_config.setSourceLogstore(origin_job_config["sourceLogstore"])
        if len(source_store_config["logstore"]) > 0:
            schedule_sql_config.setSourceLogstore(source_store_config["logstore"])

        schedule_sql_config.setDestEndpoint(origin_job_config["destEndpoint"])
        schedule_sql_config.setDestProject(origin_job_config["destProject"])
        schedule_sql_config.setDestLogstore(origin_job_config["destLogstore"])
        schedule_sql_config.setDestRoleArn(origin_job_config["destRoleArn"])
        if len(dest_store_config["project"]) > 0:
            schedule_sql_config.setDestProject(dest_store_config["project"])
        if len(dest_store_config["logstore"]) > 0:
            schedule_sql_config.setDestLogstore(dest_store_config["logstore"])
        if len(dest_store_config["endpoint"]) > 0:
            schedule_sql_config.setDestEndpoint(dest_store_config["endpoint"])

        schedule_sql_config.setMaxRetries(origin_job_config["maxRetries"])
        schedule_sql_config.setMaxRunTimeInSeconds(origin_job_config["maxRunTimeInSeconds"])
        schedule_sql_config.setDataFormat(origin_job_config["dataFormat"])
        schedule_sql_config.setResourcePool(origin_job_config["resourcePool"])
        schedule_sql_config.setFromTime(origin_job_config["fromTime"])
        schedule_sql_config.setFromTimeExpr(origin_job_config["fromTimeExpr"])
        if from_time > 0:
            schedule_sql_config.setFromTime(from_time)
        schedule_sql_config.setToTime(origin_job_config["toTime"])
        schedule_sql_config.setToTimeExpr(origin_job_config["toTimeExpr"])
        if to_time > 0:
            schedule_sql_config.setToTime(to_time)
        schedule_sql_config.setParameters(origin_job_config["parameters"])
        return schedule_sql_config

    target_job_config = s_sql_config["target_schedule_sql_config"]
    ssql_job_name = target_job_config["s_sql_job_name"]
    project = target_job_config["project"]
    endpoint = target_job_config["endpoint"]
    ssql_job = get_schedule_sql_job_config(endpoint, project, ssql_job_name)
    newly_job_config = s_sql_config["newly_job_config"]
    source_config = newly_job_config["source"]
    dest_config = newly_job_config["destination"]
    check_store_item(source_config)
    check_store_item(dest_config)

    from_time, to_time = newly_job_config["fromTime"], newly_job_config["toTime"]
    schedule_sql_config = make_scheduled_sql_config(ssql_job, from_time, to_time, source_config, dest_config)
    job_schedule = make_scheduled_sql_schedule(ssql_job)
    scheduled_sql = ScheduledSQL()
    job_name = make_schedule_sql_name()
    scheduled_sql.setName(job_name)
    scheduled_sql.setConfiguration(schedule_sql_config)
    scheduled_sql.setSchedule(job_schedule)
    if len(newly_job_config["description"]) > 0:
        scheduled_sql.setDescription(newly_job_config["description"])
    else:
        scheduled_sql.setDescription(ssql_job["description"])
    if len(newly_job_config["displayName"]) > 0:
        scheduled_sql.setDisplayName(newly_job_config["displayName"])
    else:
        scheduled_sql.setDisplayName(ssql_job["displayName"])

    sls_client = get_sls_client(source_config["endpoint"])
    sls_client.create_scheduled_sql(source_config["project"], scheduled_sql)
    print(f"sync to \n\tsrc_project {source_config}\n\tdest_project {dest_config}\n\tjob_name {job_name}")


if __name__ == "__main__":
    sync_store_config_path = "./sls_tools/sync_ssql.json"
    with open(sync_store_config_path, "r") as reader:
        sync_map = json.load(reader)
    for ssql_config in sync_map:
        try:
            create_schedule_sql(ssql_config)
        except Exception as e:
            print(e)
```
