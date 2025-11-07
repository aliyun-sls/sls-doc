import sys
import json
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime

kibanaEndpoint = ''
kibanaUser = ''
kibanaPassword = ''
kibanaSpace = ''

def print_with_time(message):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{current_time}] {message}")

def get_index_pattern_id(space, pattern_name):
    """根据index pattern名称获取其ID"""
    page = 1
    per_page = 100
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
                break
            
            for pattern in saved_objects:
                if pattern["attributes"]["title"] == pattern_name:
                    return pattern["id"]
            
            total = response_data.get("total", 0)
            if page * per_page >= total:
                break
            
            page += 1
        else:
            print_with_time(f"Failed to get index patterns. Status code: {response.status_code}")
            return None
    
    return None

def get_index_pattern_details(space, pattern_id):
    """获取index pattern的详细信息"""
    uri = f"{kibanaEndpoint}/api/saved_objects/index-pattern/{pattern_id}"
    if space != "default":
        uri = f"{kibanaEndpoint}/s/{space}/api/saved_objects/index-pattern/{pattern_id}"
    
    headers = {
        "kbn-xsrf": "true",
        "Content-Type": "application/json"
    }
    
    response = requests.get(
        uri,
        auth=kibanaAuth,
        headers=headers
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        print_with_time(f"Failed to get index pattern details. Status code: {response.status_code}")
        return None

def update_runtime_fields(space, pattern_id, new_runtime_fields):
    """更新index pattern的runtime fields"""
    # 先获取现有的index pattern信息
    pattern_details = get_index_pattern_details(space, pattern_id)
    if not pattern_details:
        print_with_time("Failed to get index pattern details")
        return (False, {}, [])
    
    attributes = pattern_details.get("attributes", {})
    
    # 获取现有的runtime fields
    existing_runtime_mappings = {}
    if "runtimeFieldMap" in attributes:
        try:
            existing_runtime_mappings = json.loads(attributes["runtimeFieldMap"])
        except:
            existing_runtime_mappings = attributes["runtimeFieldMap"]
    
    # 获取所有现有字段（包括普通字段）
    existing_fields = set()
    if "fields" in attributes:
        try:
            fields_data = json.loads(attributes["fields"])
            for field in fields_data:
                if "name" in field:
                    existing_fields.add(field["name"])
        except:
            pass
    
    # 检查冲突并过滤掉与已存在的非runtime字段同名的runtime fields
    fields_to_add = {}
    skipped_fields = []
    
    for field_name, field_config in new_runtime_fields.items():
        # 如果字段已存在且不是runtime field，则跳过
        if field_name in existing_fields and field_name not in existing_runtime_mappings:
            skipped_fields.append(field_name)
            print_with_time(f"Warning: Field '{field_name}' already exists as a non-runtime field, skipping...")
        else:
            fields_to_add[field_name] = field_config
    
    # 如果所有字段都被跳过了
    if not fields_to_add:
        if skipped_fields:
            print_with_time("All runtime fields were skipped due to conflicts with existing fields")
        return (True, {}, skipped_fields)
    
    # 合并新的runtime fields
    existing_runtime_mappings.update(fields_to_add)
    
    # 更新index pattern
    uri = f"{kibanaEndpoint}/api/saved_objects/index-pattern/{pattern_id}"
    if space != "default":
        uri = f"{kibanaEndpoint}/s/{space}/api/saved_objects/index-pattern/{pattern_id}"
    
    headers = {
        "kbn-xsrf": "true",
        "Content-Type": "application/json"
    }
    
    payload = {
        "attributes": {
            "runtimeFieldMap": json.dumps(existing_runtime_mappings)
        }
    }
    
    response = requests.put(
        uri,
        auth=kibanaAuth,
        headers=headers,
        json=payload
    )
    
    if response.status_code == 200:
        print_with_time(f"Successfully updated runtime fields for pattern {pattern_id}")
        if skipped_fields:
            return (True, fields_to_add, skipped_fields)
        return (True, fields_to_add, [])
    else:
        print_with_time(f"Failed to update runtime fields. Status code: {response.status_code}")
        print_with_time(f"Response: {response.text}")
        return (False, {}, [])

def print_help():
    print('''
Usage: python %s kibana_config.json runtime_fields_config.json

kibana_config.json example:
{
    "url" : "http://192.168.1.1:5601",
    "user" : "elastic",
    "password" : "thePassword",
    "space" : "default"
}

runtime_fields_config.json example:
{
    "index_pattern_name": "logstash-*",
    "runtime_fields": {
        "hour_of_day": {
            "type": "long"
        },
        "day_of_week": {
            "type": "keyword"
        }
    }
}

''' % sys.argv[0])

try:
    if len(sys.argv) < 3:
        print_help()
        sys.exit(1)
    
    # 读取kibana配置
    configFile = sys.argv[1]
    kbnConfig = json.loads(open(configFile, 'r').read())
    
    kibanaEndpoint = kbnConfig['url']
    kibanaUser = kbnConfig['user']
    kibanaPassword = kbnConfig['password']
    kibanaSpace = kbnConfig['space']
    
    # 读取runtime fields配置
    runtimeFieldsFile = sys.argv[2]
    runtimeFieldsConfig = json.loads(open(runtimeFieldsFile, 'r').read())
    
    index_pattern_name = runtimeFieldsConfig['index_pattern_name']
    runtime_fields = runtimeFieldsConfig['runtime_fields']
    
except Exception as ex:
    print_help()
    print_with_time(f"Error: {str(ex)}")
    sys.exit(1)

# 执行添加runtime fields
kibanaAuth = HTTPBasicAuth(kibanaUser, kibanaPassword)

print_with_time(f"Looking for index pattern: {index_pattern_name}")
pattern_id = get_index_pattern_id(kibanaSpace, index_pattern_name)

if pattern_id:
    print_with_time(f"Found index pattern ID: {pattern_id}")
    print_with_time(f"Processing {len(runtime_fields)} runtime field(s)...")
    
    success, added_fields, skipped = update_runtime_fields(kibanaSpace, pattern_id, runtime_fields)
    
    if success:
        if added_fields:
            print_with_time("Runtime fields operation completed successfully!")
            print_with_time(f"Added fields: {', '.join(added_fields.keys())}")
        if skipped:
            print_with_time(f"Skipped fields (conflicts with existing non-runtime fields): {', '.join(skipped)}")
        if not added_fields and not skipped:
            print_with_time("No changes made")
    else:
        print_with_time("Failed to add runtime fields")
        sys.exit(1)
else:
    print_with_time(f"Index pattern '{index_pattern_name}' not found")
    sys.exit(1)