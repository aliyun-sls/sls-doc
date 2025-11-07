# pip install aliyun-log-python-sdk
import sys
import re
import random
import json
import time
from datetime import datetime
from aliyun.log.logclient import LogClient

# 全局变量
endpoint = ""
accessKeyId = ""
accessKeySec = ""
project = ""
logstore = ""
logclient = None


# 下面是用于列探测的全局变量
columns = {}
lowerColumns = []
choiced = []
sampleValue = {}
jsonColumns = {}
doubleColumns = {}
longColumns = {}

def print_with_time(message):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{current_time}] {message}")


def addColumn(k):
    if k.lower() in lowerColumns:
        return

    if k not in columns:
        columns[k] = 0
        lowerColumns.append(k.lower())
    columns[k] += 1

def containsLetterOrDigit(string):
    pattern = r'^[a-zA-Z0-9_-]*$'
    return bool(re.match(pattern, string))


def probeColumnType(k, v):
    try:
        int(v)
        longColumns[k] = True
    except:
        try:
            float(v)
            doubleColumns[k] = True
        except:
            if k in longColumns:
                del longColumns[k]
            if k in doubleColumns:
                del doubleColumns[k]

def processLogs(logs):
    # print("logs")
    # print(logs.body['data'])
    for log in logs.body['data']:
        # print(log.body)
        for k, v in log.items():
            isJson = False
            try:
                jsonVal = json.loads(v)
                if isinstance(jsonVal, dict):
                    if k not in jsonColumns:
                        jsonColumns[k] = []
                    for jsonK, jsonV in jsonVal.items():
                        if not (isinstance(jsonV, dict) or isinstance(jsonV, list)):
                            if jsonK not in jsonColumns[k]:
                                jsonColumns[k].append(jsonK)
                if isinstance(jsonVal, dict) or isinstance(jsonVal, list):
                    isJson = True
            except:
                pass
            addColumn(k)

            if not isJson:
                if containsLetterOrDigit(v):
                    # 普通数据加入到样例中
                    sampleValue[k] = v
                probeColumnType(k, v)


def choiceColumn():
    choiceList = [i for i in list(columns.keys()) if i not in ["__source__", "__topic__"] and i not in choiced and i.find("__tag__")==-1]
    if len(choiceList) == 0:
        return "";
    nChoice = random.choice(choiceList)
    choiced.append(nChoice)
    return nChoice

def genQuery():
    query = "*"

    if len(columns) >0:
        column = choiceColumn()
        if column == "":
            return ""
        if random.choice([True, False]) and column in sampleValue:
            query = "%s NOT \"%s\"" % (column, sampleValue[column])
        else:
            query = "NOT %s" % column
    return query


def probeColumns():
    to_time = int(time.time())
    from_time = to_time - 24 * 3600

    print_with_time("Starting to probe columns...")
    for i in range(0, 100):
        query = genQuery()
        if query == "":
            break
        logs = logclient.get_log(project, logstore, query=query, from_time=from_time, to_time=to_time)
        processLogs(logs)
        if (i + 1) % 10 == 0:
            print_with_time(f"Progress: {i + 1}/100 queries processed, found {len(columns)} columns")

def generate_runtime_fields_config():
    """生成runtime fields配置"""
    runtime_fields = {}
    
    for column in columns:
        if column not in ["__source__", "__tag__:__pack_id__", "__time__"]:
            if column in jsonColumns:
                runtime_fields[column] = {"type": "keyword"}
                print_with_time(f"  - {column}: keyword (json field)")
            elif column in longColumns:
                runtime_fields[column] = {"type": "long"}
                print_with_time(f"  - {column}: long")
            elif column in doubleColumns:
                runtime_fields[column] = {"type": "double"}
                print_with_time(f"  - {column}: double")
            else:
                runtime_fields[column] = {"type": "keyword"}
                print_with_time(f"  - {column}: keyword")
    
    field_config = {
        "index_pattern_name": f"{project}.{logstore}",
        "runtime_fields": runtime_fields,
    }
    
    return field_config

def print_help():
    print('''
Usage: python %s sls_config.json project.logstore [output_file]

Arguments:
    sls_config.json    - SLS configuration file (required)
    project.logstore   - Project and logstore name separated by dot (required)
    output_file        - Output file path (optional, default: runtime_fields_config.json)

sls_config.json example:
{
    "endpoint": "cn-hangzhou.log.aliyuncs.com",
    "access_key_id": "your_access_key_id",
    "access_key_secret": "your_access_key_secret"
}

Example:
    python %s sls_config.json my-project.my-logstore
    python %s sls_config.json my-project.my-logstore /tmp/fields.json

''' % (sys.argv[0], sys.argv[0], sys.argv[0]))

# 主程序入口
if __name__ == "__main__":
    try:
        if len(sys.argv) < 3:
            print_help()
            sys.exit(1)
        
        # 读取SLS配置
        config_file = sys.argv[1]
        sls_config = json.loads(open(config_file, 'r').read())
        
        endpoint = sls_config['endpoint']
        accessKeyId = sls_config['access_key_id']
        accessKeySec = sls_config['access_key_secret']
        
        # 解析 project.logstore
        index_path = sys.argv[2]
        if '.' not in index_path:
            print_with_time("Error: project.logstore format should be 'project_name.logstore_name'")
            sys.exit(1)
        
        parts = index_path.split('.', 1)
        project = parts[0]
        logstore = parts[1]
        
        # 输出文件路径
        output_file = sys.argv[3] if len(sys.argv) > 3 else "runtime_fields_config.json"
        
    except Exception as ex:
        print_help()
        print_with_time(f"Error: {str(ex)}")
        sys.exit(1)
    
    # 创建LogClient
    logclient = LogClient(endpoint, accessKeyId, accessKeySec)
    
    print_with_time(f"SLS Endpoint: {endpoint}")
    print_with_time(f"Project: {project}")
    print_with_time(f"Logstore: {logstore}")
    print_with_time(f"Output file: {output_file}")
    print_with_time("")
    
    # 探测字段列表
    probeColumns()
    
    print_with_time("")
    print_with_time(f"Probing completed! Found {len(columns)} columns")
    print_with_time("Detected field types:")
    
    # 生成配置
    field_config = generate_runtime_fields_config()
    
    # 写出到文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(field_config, f, indent=4, ensure_ascii=False)
    
    print_with_time("")
    print_with_time(f"Runtime fields configuration has been written to: {output_file}")
    print_with_time(f"Total {len(field_config['runtime_fields'])} runtime fields generated")
    print_with_time("")
    print_with_time("You can now use this file with ptn_add_runtime_fileds.py:")
    print_with_time(f"  python ptn_add_runtime_fileds.py kibana_config.json {output_file}")