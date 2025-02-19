ptn_delete.py
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

def deleteKibanaIndexPattern(space, indexPatternId):
    uri = f"{kibanaEndpoint}/api/saved_objects/index-pattern/{indexPatternId}"

    if space != "default":
        uri = f"{kibanaEndpoint}/s/{space}/api/saved_objects/index-pattern/{indexPatternId}"
    headers = {
        "kbn-xsrf": "true",
    }
    ret = requests.delete(uri,
                auth=kibanaAuth,
                headers=headers)
    if ret.status_code != 200:
        print_with_time(f"Failed to delete index patterns. " + 
            f"Status code: {ret.status_code}, body: {ret.content}")
    else:
        print_with_time(f"delete indexPattern {indexPatternId} @ {space} success")

def print_help():
    print('''
Usage: python %s kibana_config.json index_pattern_ids.txt

kibana_config.json exmplae:
{
    "url" : "http://192.168.1.1:5601",
    "user" : "elastic",
    "password" : "thePassword",
    "space" :  "default"
}

index_pattern_ids.txt example content:
aa77bf10-9c17-11ef-8665-41f4399ec183	etl-dev.mytest
5a264770-a0a9-11ef-8279-7f5e6cac2855	etl-spe.es_test3
d07fc4c0-a0d4-11ef-8279-7f5e6cac2855	etl-spe.es_test5

you can use  kibana_index_pattern_list.py to get index_pattern_ids.txt file
''' % sys.argv[0])
indexPatternIds = []
try:
    configFile = sys.argv[1]
    indexPatternIdFile = sys.argv[2]
    kbnConfig = json.loads(open(configFile, 'r').read())

    kibanaEndpoint=kbnConfig['url']
    kibanaUser = kbnConfig['user']
    kibanaPassword = kbnConfig['password']
    kibanaSpace = kbnConfig['space']

    for i in open(indexPatternIdFile,'r').read().split('\n'):
        if i.strip()!="":
            id = i.split('\t')[0].split(' ')[0]
            indexPatternIds.append(id)
except Exception as ex:
    print_help()
    print(str(ex))
    sys.exit(1)


kibanaAuth = HTTPBasicAuth(kibanaUser, kibanaPassword)

for indexPatternId in indexPatternIds:
    #print_with_time("start to delete index pattern %s" % indexPatternId)
    deleteKibanaIndexPattern(kibanaSpace, indexPatternId)
```