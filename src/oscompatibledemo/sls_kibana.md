# Docker compose方式

1. 在服务器执行以下命令，创建一个名为sls-opensearch的新目录，在sls-opensearch目录下创建一个名为data子目录。更改data目录的权限，确保OpenSearch容器具有对该目录的读、写和执行权限。

```
mkdir sls-opensearch
cd sls-opensearch

mkdir data
chmod 777 data 
```

2. 创建 `.env` 文件，内容如下，请根据实际参数修改。
```
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

3. 在sls-kibana目录中创建docker-compose.yaml文件

```
wget https://sls-kproxy.oss-cn-hangzhou.aliyuncs.com/docker-compose.yaml -O docker-compose.yaml
```

4. 执行以下命令，启动服务。

```
docker compose up -d
```

5. 执行以下命令，查看服务状态。
```
docker compose ps
```
部署完成后，在浏览器中输入 http://部署Kibana的IP地址:5601


# Helm的方式部署

参考官网链接： [链接](https://help.aliyun.com/zh/sls/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service)
