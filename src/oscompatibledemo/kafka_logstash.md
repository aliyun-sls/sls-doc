
## 起因
原Logstash 通过 Kafka 协议向 SLS 报送数据使用的jks文件将在服务端证书更新后失效。为了避免上报数据收到影响，现有两个解决方案：

* 推荐方案1：删除 jks 配置（需 Logstash 版本 7.10.1 或更高）
* 替代方案2：更新 jks 到新的服务端证书

如果当前使用 Logstash 低于版本 7.10.1，且不便升级，则应采用方案2。

## 方案1. 删除jks证书配置(需Logstash版本>=7.10.1)

**前提**
* 确保 Logstash 版本高于或等于 7.10.1。如果低于此版本，需要升级。

**步骤**

删除logstash pipeline配置中的这两项配置

* ssl_truststore_location 
* ssl_truststore_password


![delete_logstash_cert_cfg](/img/oscompatibledemo/delete_logstash_cert_cfg.jpg)

删除后重启logstash即生效，然后到sls上观察logstore对应写入流量是否正常

## 方案2 更新jks证书

如果您的logstash版本低于7.10.1，且不方便更新logstash版本，可以使用这个方案。

**步骤**

1. 下载新的jks证书（里面包含了GlobalSign R1、R3以及后续新的根证书），替换掉原来 `/etc/client-root.truststore.jks` 下

新的jks证书下载地址： [点击下载jks证书](https://sls-kproxy.oss-cn-hangzhou.aliyuncs.com/client-root.truststore.jks) 

证书的md5为: `bbe0c4523637f489fa7664b881f32978`
证书的密码为 `123456`


2. 更新配置

注意对应的路径和密码
```
    ssl_truststore_location => "/etc/client-root.truststore.jks"
    ssl_truststore_password => "123456"
```

完整的配置样例（output部分）
```
output {
  stdout { codec => rubydebug }
  kafka {
    topic_id => "SLS_LOGSTORE"
    bootstrap_servers => "SLS_KAFKA_ENDPOINT"
    security_protocol => "SASL_SSL"
    ssl_truststore_location => "/etc/client-root.truststore.jks" #这个对应更新后的jks路径
    ssl_truststore_password => "123456"
    sasl_jaas_config => "org.apache.kafka.common.security.plain.PlainLoginModule required username='SLS_PROJECT' password='AKId#AKSec';"
    sasl_mechanism => "PLAIN"
    codec => "json"
    client_id => "kafka-logstash"
  }
}
```

重启logstash生效，然后到sls上观察logstore对应写入流量是否正常

## FAQ

### 我还有一些疑惑或操作上的困难

可通过阿里云工单来联系我们

### client-root.truststore.jks是如何生成的？

到GobalSign官网下载根证书

https://support.globalsign.com/ca-certificates/root-certificates/globalsign-root-certificates 

![global_sign_download](/img/oscompatibledemo/global_sign_download.png)
主要下载这些根证书

```
roote46.crt
Root-R1.crt
Root-R3.crt
rootr46.crt
Root-R5.crt
root-r6.crt
```

执行下面命令生成jks证书

```
#!/bin/bash

# 下载好的证书文件放到一个目录下，然后在那个目录里执行如下脚本
for i in `ls -1 *.crt`
do
    echo "yes" |  keytool -keystore client-root.truststore.jks -alias $i -import -file $i -storepass 123456
done
```

制作完成后证书查看

```
keytool -list -keystore client-root.truststore.jks
```
