# Synchronize index configurations

This tool is used to synchronize index configurations from a specific Logstore to one or more other Logstores.

## Configuration file

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

In the preceding configuration file:

- The target section specifies the configurations of the Logstore for which indexes are configured.We recommend that you set the endpoint field to a public endpoint.
- The destination section is an array in which each element specifies the configurations of a Logstore whose index configurations are to be overwritten. The endpoint field specifies the public endpoint of the region in which the Logstore resides.

## Code

```python
import json
from aliyun.log import *

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
    Check whether the Logstore index configurations are available. If not, create indexes. If yes, update the index configurations.
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
