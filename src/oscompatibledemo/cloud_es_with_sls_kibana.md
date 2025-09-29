# 部署Kibana同时访问云上ES和SLS

## 目标

目前已有Kibana对接SLS的方案。如果有以下需求场景，可以考虑使用云上ES来对接
1. 希望使用云上ES来存储Kibana的Meta，提升稳定性
2. 复用已有云上ES，并做到同时访问云上ES和SLS上的数据

限制
1. 本方案暂时只适用云上ES 7.x
2. 云上ES的index pattern的名字和 SLS对接后的index pattern名字($project.$logstore)不能有冲突

## 操作步骤
### 云上ES准备，如有（则可以跳过）
要求云上ES的版本是ES 7.x

#### 创建vpc
进入阿里云vpc 在对应region创建一个vpc
https://vpc.console.aliyun.com/ 


#### 申请es
https://elasticsearch.console.aliyun.com/ 
进入es的控制台，在对应region申请es，选择内核增强版

![](/img/oscompatibledemo/cloud_es_sls_1.jpg)

具体规格如下
![](/img/oscompatibledemo/cloud_es_sls_2.jpg)


注意点：
* vpc要选择前面创建好的

#### 申请ecs
https://ecs.console.aliyun.com/
进入ecs控制台申请ecs

注意点：
* vpc要选择前面创建好的
* 镜像可以使用Aliyun Cloud Linux
* 如果需要通过公网+访问控制的方式访问Kibaba的话，建议勾选“分配公网 IPv4 地址”

### 部署Kibana同时对接云上ES和SLS

#### 依赖安装
使用docker 
```
sudo yum install -y docker
sudo yum install -y docker-compose
```

如果没有docker，也可以使用podman

```
sudo yum -y install podman podman-docker
sudo yum -y install podman-compose
```

#### 部署Kibana对接
创建一个sls-kibana目录
```
mkdir sls-kibana
cd sls-kibana
```

创建一个 `.env`文件
```
ES_ENDPOINT=https://etl-hangzhou-c.cn-hangzhou.log.aliyuncs.com/es/ # 根据实际情况修改
ES_PASSWORD=aStrongPassword  # 请根据实际情况修改

SLS_ENDPOINT=cn-huhehaote.log.aliyuncs.com
SLS_PROJECT=etl-dev-7494ab****
SLS_ACCESS_KEY_ID=xxx
SLS_ACCESS_KEY_SECRET=xxx
# ECS_ROLE_NAME="" # 如果使用ecs ram角色的方式访问，这里填具体ecs ram角色名
#SLS_PROJECT_ALIAS=etl-dev # 可选，如果觉得SLS_PROJECT名字太长，可以设置一下别名
#SLS_LOGSTORE_FILTERS="access*" # 可选，过滤哪些logstore自动创建index pattern，多个index pattern用逗号分隔，比如 "access*,error*"，注意加上双引号
#KIBANA_SPACE=default # 可选，指定索引模式（index pattern）创建在哪个space下， 不存在则自动创建。

# 如果有更多project，可以继续加； 注意超过6个的话，docker-compose.yml中引用也要加
#SLS_ENDPOINT2=cn-huhehaote.log.aliyuncs.com
#SLS_PROJECT2=etl-dev2
#SLS_ACCESS_KEY_ID2=xxx
#SLS_ACCESS_KEY_SECRET2=xxx
#SLS_PROJECT_ALIAS2=etl-dev2 # 可选，如果觉得SLS_PROJECT名字太长，可以设置一下别名
#SLS_LOGSTORE_FILTERS2="test*log" # 可选，过滤哪些logstore自动创建index pattern创建,多个pattern用逗号分隔，比如 "access*,error*"，注意加上双引号
#KIBANA_SPACE2=default # 可选，指定index parttern创建在哪个space下; 不存在则自动创建
```

创建一个文件docker-compose.yml，内容如下

```
services:
  kproxy:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5
    #image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5-arm64
    depends_on:
      - es
    environment:
      - ES_ENDPOINT=${ES_ENDPOINT}

      - ECS_ROLE_NAME=${ECS_ROLE_NAME}
      # 第一个sls project
      - SLS_ENDPOINT=${SLS_ENDPOINT}
      - SLS_PROJECT=${SLS_PROJECT}
      - SLS_LOGSTORE_FILTERS=${SLS_LOGSTORE_FILTERS}
      - KIBANA_SPACE=${KIBANA_SPACE}
      - SLS_PROJECT_ALIAS=${SLS_PROJECT_ALIAS}
      - SLS_ACCESS_KEY_ID=${SLS_ACCESS_KEY_ID}
      - SLS_ACCESS_KEY_SECRET=${SLS_ACCESS_KEY_SECRET}

      # 第二个sls project
      - SLS_ENDPOINT2=${SLS_ENDPOINT2}
      - SLS_PROJECT2=${SLS_PROJECT2}
      - SLS_LOGSTORE_FILTERS2=${SLS_LOGSTORE_FILTERS2}
      - KIBANA_SPACE2=${KIBANA_SPACE2}
      - SLS_PROJECT_ALIAS2=${SLS_PROJECT_ALIAS2}
      - SLS_ACCESS_KEY_ID2=${SLS_ACCESS_KEY_ID2}
      - SLS_ACCESS_KEY_SECRET2=${SLS_ACCESS_KEY_SECRET2}

      - SLS_ENDPOINT3=${SLS_ENDPOINT3}
      - SLS_PROJECT3=${SLS_PROJECT3}
      - SLS_LOGSTORE_FILTERS3=${SLS_LOGSTORE_FILTERS3}
      - KIBANA_SPACE3=${KIBANA_SPACE3}
      - SLS_PROJECT_ALIAS3=${SLS_PROJECT_ALIAS3}
      - SLS_ACCESS_KEY_ID3=${SLS_ACCESS_KEY_ID3}
      - SLS_ACCESS_KEY_SECRET3=${SLS_ACCESS_KEY_SECRET3}

      - SLS_ENDPOINT4=${SLS_ENDPOINT4}
      - SLS_PROJECT4=${SLS_PROJECT4}
      - SLS_LOGSTORE_FILTERS4=${SLS_LOGSTORE_FILTERS4}
      - KIBANA_SPACE4=${KIBANA_SPACE4}
      - SLS_PROJECT_ALIAS4=${SLS_PROJECT_ALIAS4}
      - SLS_ACCESS_KEY_ID4=${SLS_ACCESS_KEY_ID4}
      - SLS_ACCESS_KEY_SECRET4=${SLS_ACCESS_KEY_SECRET4}

      - SLS_ENDPOINT5=${SLS_ENDPOINT5}
      - SLS_PROJECT5=${SLS_PROJECT5}
      - SLS_LOGSTORE_FILTERS5=${SLS_LOGSTORE_FILTERS5}
      - KIBANA_SPACE5=${KIBANA_SPACE5}
      - SLS_PROJECT_ALIAS5=${SLS_PROJECT_ALIAS5}
      - SLS_ACCESS_KEY_ID5=${SLS_ACCESS_KEY_ID5}
      - SLS_ACCESS_KEY_SECRET5=${SLS_ACCESS_KEY_SECRET5}

      - SLS_ENDPOINT6=${SLS_ENDPOINT6}
      - SLS_PROJECT6=${SLS_PROJECT6}
      - SLS_LOGSTORE_FILTERS6=${SLS_LOGSTORE_FILTERS6}
      - KIBANA_SPACE6=${KIBANA_SPACE6}
      - SLS_PROJECT_ALIAS6=${SLS_PROJECT_ALIAS6}
      - SLS_ACCESS_KEY_ID6=${SLS_ACCESS_KEY_ID6}
      - SLS_ACCESS_KEY_SECRET6=${SLS_ACCESS_KEY_SECRET6}
      # 如有更多，可以继续加，最多255个
  kibana:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kibana:7.17.26
    #image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kibana:7.17.26-arm64
    depends_on:
      - kproxy
    environment:
      - ELASTICSEARCH_HOSTS=http://kproxy:9201
      - ELASTICSEARCH_USERNAME=elastic
      - ELASTICSEARCH_PASSWORD=${ES_PASSWORD}
      - XPACK_MONITORING_UI_CONTAINER_ELASTICSEARCH_ENABLED=true
    ports:
      - "5601:5601"

  # 这个服务组件是可选的，作用是自动创建kibana index pattern
  index-patterner:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5
    #image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5-arm64
    command: /usr/bin/python3 -u /workspace/create_index_pattern.py
    depends_on:
      - kibana
    environment:
      - KPROXY_ENDPOINT=http://kproxy:9201
      - KIBANA_ENDPOINT=http://kibana:5601
      - KIBANA_USER=elastic
      - KIBANA_PASSWORD=${ES_PASSWORD}

      - ECS_ROLE_NAME=${ECS_ROLE_NAME}

      - SLS_PROJECT_ALIAS=${SLS_PROJECT_ALIAS}
      - SLS_ACCESS_KEY_ID=${SLS_ACCESS_KEY_ID}
      - SLS_ACCESS_KEY_SECRET=${SLS_ACCESS_KEY_SECRET}

      - SLS_PROJECT_ALIAS2=${SLS_PROJECT_ALIAS2}
      - SLS_ACCESS_KEY_ID2=${SLS_ACCESS_KEY_ID2}
      - SLS_ACCESS_KEY_SECRET2=${SLS_ACCESS_KEY_SECRET2}

      - SLS_PROJECT_ALIAS3=${SLS_PROJECT_ALIAS3}
      - SLS_ACCESS_KEY_ID3=${SLS_ACCESS_KEY_ID3}
      - SLS_ACCESS_KEY_SECRET3=${SLS_ACCESS_KEY_SECRET3}

      - SLS_PROJECT_ALIAS4=${SLS_PROJECT_ALIAS4}
      - SLS_ACCESS_KEY_ID4=${SLS_ACCESS_KEY_ID4}
      - SLS_ACCESS_KEY_SECRET4=${SLS_ACCESS_KEY_SECRET4}

      - SLS_PROJECT_ALIAS5=${SLS_PROJECT_ALIAS5}
      - SLS_ACCESS_KEY_ID5=${SLS_ACCESS_KEY_ID5}
      - SLS_ACCESS_KEY_SECRET5=${SLS_ACCESS_KEY_SECRET5}

      - SLS_PROJECT_ALIAS6=${SLS_PROJECT_ALIAS6}
      - SLS_ACCESS_KEY_ID6=${SLS_ACCESS_KEY_ID6}
      - SLS_ACCESS_KEY_SECRET6=${SLS_ACCESS_KEY_SECRET6}

      # 如有更多，可以继续加，最多255个
```

启动docker compose
```
docker compose up -d
```

检查启动状态
```
docker compose ps
```

#### 访问ecs公网地址
http://ecs的公网地址:5601 
输入es的账号密码即可访问

### 通过Kibana访问SLS

#### 进入Discovery, 访问SLS Logstore
点击左侧Discover后，选择sls的index即可访问, SLS对应到过来的index pattern名字是 ${project}.${logstore}

![](/img/oscompatibledemo/cloud_es_sls_3.jpg)
