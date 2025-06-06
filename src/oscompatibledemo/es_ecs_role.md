## 前提
* 一台 ECS 实例 内存为8G及以上。Docker版本为1.18及以上。
* 设置好ecs role 参考[连接](https://help.aliyun.com/zh/ecs/user-guide/attach-an-instance-ram-role-to-an-ecs-instance), 注意需要授权好这个角色访问sls

## 编辑.env文件

1. 在服务器执行以下命令，创建一个名为sls-kibana的新目录，在sls-kibana目录下创建一个名为data子目录。更改data目录的权限，确保Elasticsearch容器具有对该目录的读、写和执行权限。


```
mkdir sls-kibana

cd sls-kibana

mkdir data
chmod 777 data 
```

2. 在sls-kibana目录创建.env文件，内容如下，请根据实际参数修改。

```
ES_PASSWORD=aStrongPassword  # 请根据实际情况修改

SLS_ENDPOINT=cn-huhehaote.log.aliyuncs.com
SLS_PROJECT=etl-dev
ECS_ROLE_NAME="ecstest" # 填写真实 ecs role

#SLS_ENDPOINT2=cn-huhehaote.log.aliyuncs.com # 第二个project
#SLS_PROJECT2=etl-dev2
```


3. 在sls-kibana目录中创建docker-compose.yaml文件，内容如下。
```
services:
  es:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/elasticsearch:7.17.26
    environment:
      - "discovery.type=single-node"
      - "ES_JAVA_OPTS=-Xms2G -Xmx2G"
      - ELASTIC_USERNAME=elastic
      - ELASTIC_PASSWORD=${ES_PASSWORD}
      - xpack.security.enabled=true
    volumes:
      # TODO 这里的./data目录需要提前建立, 确认已经mkdir data && chmod 777 data
      - ./data:/usr/share/elasticsearch/data
  kproxy:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.4
    depends_on:
      - es
    environment:
      - ES_ENDPOINT=es:9200

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
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.4
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


4. 执行以下命令，启动服务。

``` 
docker compose up -d

```

5. 执行以下命令，查看服务状态。

```
docker compose ps
```

部署完成后，在浏览器中输入http://${部署Kibana的IP地址}:5601，进入Kibana的登录页面，输入步骤二中设置的Elasticsearch的用户名和密码。
