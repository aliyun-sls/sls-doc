# 同步索引配置
以下示例程序主要将某个目标Logstore中的索引配置同步到其它Logstore中。
## 对应的配置文件
```json
{
  "target": {
    "endpoint": "cn-chengdu.log.aliyuncs.com",
    "project": "sls-ml-demo",
    "logstore": "cdn_access_log"
  },
  "destination": [
    {
      "endpoint": "cn-chengdu.log.aliyuncs.com",
      "project": "sls-ml-demo",
      "logstore": "test_temp"
    }
  ]
}
```

以上配置内容中，
+ target 部分对应的已经配置好索引的logstore的配置。其中endpoint最好设置为公网接入点。
+ destination 部分对应的是一个数组，数组中的每个元素表示的是待覆盖索引配置的logstore的配置，其中endpoint表示这个logstore所在地域的公网接入点。

## 相关代码
```python
# -*- coding: utf-8 -*-
import json
from aliyun.log import *

# 具备访问以上配置文件中的Logstore的权限
global_ak_id = ""  
global_ak_key = ""

client_map = {}


def get_sls_client(endpoint: str) -> LogClient:
    sls_client = LogClient(endpoint, global_ak_id, global_ak_key)
    if endpoint in client_map.keys():
        return client_map[endpoint]
    client_map[endpoint] = sls_client
    return sls_client


def get_logstore_index(endpoint: str, project: str, logstore: str) -> IndexConfig:
    sls_client = get_sls_client(endpoint)
    get_index_config_resp = sls_client.get_index_config(project, logstore)
    index_config = get_index_config_resp.get_index_config()
    return index_config


def set_logstore_index(endpoint: str, project: str, logstore: str, target_index: IndexConfig):
    """
    这里需要判断是否已经创建了Logstore的索引配置，如果没有创建索引配置，则直接创建，否则要进行更新索引配置
    """
    is_need_create_index = False
    sls_client = get_sls_client(endpoint)
    try:
        update_index_resp = sls_client.update_index(project, logstore, target_index)
        update_index_resp.log_print()
    except LogException as logE:
        if logE.get_error_code() == "InternalServerError":
            msgE = logE.get_error_message()
            if msgE == "log store index is not created":
                is_need_create_index = True
            else:
                raise logE
        else:
            raise logE
    if is_need_create_index:
        create_index_resp = sls_client.create_index(project, logstore, target_index)
        create_index_resp.log_print()


def check_logstore_item(store_item: dict):
    key_names = ["project", "logstore", "endpoint"]
    for key in key_names:
        if key not in store_item.keys():
            raise ValueError(f"logstore config miss key {key}")
        if len(store_item[key]) == "":
            raise ValueError(f"logstore config miss key [{key}]")


if __name__ == "__main__":
    # 主要设置对应配置文件的路径
    sync_store_config_path = "./sls_tools/sync_logstore_index_config.json"
    with open(sync_store_config_path, "r") as reader:
        sync_map = json.load(reader)
    target_logstore = sync_map["target"]
    check_logstore_item(target_logstore)

    destinations = sync_map["destination"]
    target_index_config = get_logstore_index(
        target_logstore["endpoint"], target_logstore["project"], target_logstore["logstore"])
    for dest_item in destinations:
        try:
            check_logstore_item(dest_item)
            set_logstore_index(dest_item["endpoint"], dest_item["project"], dest_item["logstore"], target_index_config)
            print(f"dest logstore {dest_item} update index config.")
        except Exception as e:
            print(f"dest logstore {dest_item}, failed {e}")
```
