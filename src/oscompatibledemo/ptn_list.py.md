ptn_list.py
```python
import sys
import json
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime

kibanaEndpoint= ''
kibanaUser = ''
kibanaPassword = ''
kibanaSpace = ''

def print_with_time(message):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{current_time}] {message}")
    
def getKibanaExsitIndexPatterns(space):
    page = 1
    per_page = 100  # 每页获取100条记录
    existing_patterns = {}
    headers = {
        "kbn-xsrf": "true",
        "Content-Type": "application/json"
    }
    while True:
        uri = f"{kibanaEndpoint}/api/saved_objects/_find"
        if space != "default":
            uri = f"{kibanaEndpoint}/s/{space}/api/saved_objects/_find"
        response = requests.get(
            uri,
            auth=kibanaAuth,
            headers=headers,
            params={
                "type": "index-pattern",
                "page": page,
                "per_page": per_page
            }
        )

        if response.status_code == 200:
            response_data = response.json()
            saved_objects = response_data.get("saved_objects", [])

            if not saved_objects:
                break  # 如果当前页没有获取到新的记录，停止翻页

            for pattern in saved_objects:
                existing_patterns[pattern["attributes"]["title"]] = pattern["id"]
            # existing_patterns.extend([pattern["attributes"]["title"] 
                                      # for pattern in saved_objects])

            # 检查是否还有更多的记录
            total = response_data.get("total", 0)
            if len(existing_patterns) >= total:
                break

            page += 1  # 下一页
        else:
            print_with_time(f"Failed to get existing index patterns. Status code: {response.status_code}")
            return []

    return existing_patterns

def print_help():
    print('''
Usage: python %s kibana_config.json

kibana_config.json exmplae:
{
    "url" : "http://192.168.1.1:5601",
    "user" : "elastic",
    "password" : "thePassword",
    "space" :  "default"
}

''' % sys.argv[0])
try:
    configFile = sys.argv[1]
    kbnConfig = json.loads(open(configFile, 'r').read())
    
    kibanaEndpoint=kbnConfig['url']
    kibanaUser = kbnConfig['user']
    kibanaPassword = kbnConfig['password']
    kibanaSpace = kbnConfig['space']
except Exception as ex:
    print_help()
    print(str(ex))
    sys.exit(1)

kibanaAuth = HTTPBasicAuth(kibanaUser, kibanaPassword)
existsPatterns = getKibanaExsitIndexPatterns(kibanaSpace)

for name, id in existsPatterns.items():
    print("%s\t%s" %(id, name))

```