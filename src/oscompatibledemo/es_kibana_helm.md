## 说明

本文主要扩展sls-kibana helm chart在多云场景下的安装方法。

如果是阿里云ACK的话，可以直接参考 [sls kibana对接](https://help.aliyun.com/zh/sls/user-guide/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service)

## 在Azure云上部署sls-kibana helm chart


* 准备values.yaml文件如下
```
kibana:
  serviceType: ClusterIP # 对应service中的Type，可设ClusterIP，LoadBalancer
#  serviceAnnotation: # 对应service中annotation
#    service.beta.kubernetes.io/azure-load-balancer-internal: 'true'
#    service.beta.kubernetes.io/azure-load-balancer-internal-subnet: "xxx-subnet"
  ingressClass: nginx # 根据实际安装的ingress controller修改, 如果为空表示不使用ingress
  ingressDomain: #可以为空，如果需要通过域名访问kibana，可以设置该值
  ingressPath: /kibana/ # 必填，访问时的子路径
  # 如果ingressDomain非空, 那么ingressPath支持设置为/
  #i18nLocale: en # 设置Kibana的语言，默认为英文，如果需要中文可以设置值为zh-CN

elasticsearch:
  password: aStrongPass  # 请根据实际情况修改es的密码，同时也是kibana的访问密码，对应账号为elastic
  diskStorageSize: 16Gi
  diskStorageClassName: managed-csi # 设置storageClass名称
  
repository:
  region: cn-hangzhou
  # 镜像所在区域，中国固定设置为cn-hangzhou 海外固定设置为ap-southeast-1；会使用公网拉取镜像

sls:
  - project: k8s-log-c5****** # sls的project
    endpoint: cn-huhehaote.log.aliyuncs.com # sls project对应的endpoint
    accessKeyId: 具有sls访问权限的accessKeyId
    accessKeySecret: 具有sls访问权限的accessKeySecret
  #  alias: etl-logs # 可选，如果觉得project名在kibana中显示太长，可以设置别名
  #  kibanaSpace: default  # 可选，指定index pattern创建在哪个space下; 不存在则自动创建
  #  logstoreFilters: "*" # 可选，过滤哪些logstore自动创建index pattern创建,多个pattern用逗号分隔，比如 "access*,error*"，注意加上双引号。

  # 如果有第二个继续按上面的格式添加
  #- project: etl-dev2 # sls的project
  #  endpoint: cn-huhehaote.log.aliyuncs.com # sls project对应的endpoint
  #  accessKeyId: 具有sls访问权限的accessKeyId
  #  accessKeySecret: 具有sls访问权限的accessKeySecret
  #  alias: etl-logs2 # 可选，如果觉得project名在kibana中显示太长，可以设置别名
  #  kibanaSpace: default  # 可选，指定index pattern创建在哪个space下; 不存在则自动创建
  #  logstoreFilters: "*" # 可选，过滤哪些logstore自动创建index pattern创建,多个pattern用逗号分隔，比如 "access*,error*"，注意加上双引号

#kproxy:
#  maxAllowTimeRangeSeconds: 900 # 限制允许查询的时间范围，默认不限制
```


* 创建好namespace
```
kubectl create namespace sls-kibana
```

* 执行安装命令
```
helm install sls-kibana \
 https://sls-kproxy.oss-cn-hangzhou.aliyuncs.com/sls-kibana-1.5.5.tgz \
  -f values.yaml --namespace sls-kibana
```
