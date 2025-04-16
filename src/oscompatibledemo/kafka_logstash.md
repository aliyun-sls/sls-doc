
## 起因
Logstash可以通过Kafka协议上报数据到SLS，部分Logstash指定了较旧的服务端根证书。

现服务端根证书有更新，需要对logstash中引用的jks证书做更新。

## 处理方案

1. 下载新的jks证书（里面包含了GlobalSign R1、R3以及后续新的根证书）
替换掉原来 `/etc/client-root.truststore.jks` 下

新的jks证书下载地址： [jks下载地址](https://sls-kproxy.oss-cn-hangzhou.aliyuncs.com/client-root.truststore.jks) md5: bbe0c4523637f489fa7664b881f32978

2. 更新配置

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
    ssl_truststore_location => "/etc/client-root.truststore.jks"
    ssl_truststore_password => "123456"
    sasl_jaas_config => "org.apache.kafka.common.security.plain.PlainLoginModule required username='SLS_PROJECT' password='SLS_PASSWORD';"
    sasl_mechanism => "PLAIN"
    codec => "json"
    client_id => "kafka-logstash"
  }
}
```

重启logstash生效

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

正确输入如下

```
root-r1.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): EB:D4:10:40:E4:BB:3E:C7:42:C9:E3:81:D3:1E:F2:A4:1A:48:B6:68:5C:96:E7:CE:F3:C1:DF:6C:D4:33:1C:99
root-r3.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): CB:B5:22:D7:B7:F1:27:AD:6A:01:13:86:5B:DF:1C:D4:10:2E:7D:07:59:AF:63:5A:7C:F4:72:0D:C9:63:C5:3B
root-r5.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): 17:9F:BC:14:8A:3D:D0:0F:D2:4E:A1:34:58:CC:43:BF:A7:F5:9C:81:82:D7:83:A5:13:F6:EB:EC:10:0C:89:24
root-r6.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): 2C:AB:EA:FE:37:D0:6C:A2:2A:BA:73:91:C0:03:3D:25:98:29:52:C4:53:64:73:49:76:3A:3A:B5:AD:6C:CF:69
roote46.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): CB:B9:C4:4D:84:B8:04:3E:10:50:EA:31:A6:9F:51:49:55:D7:BF:D2:E2:C6:B4:93:01:01:9A:D6:1D:9F:50:58
rootr46.crt, Apr 15, 2025, trustedCertEntry,
Certificate fingerprint (SHA-256): 4F:A3:12:6D:8D:3A:11:D1:C4:85:5A:4F:80:7C:BA:D6:CF:91:9D:3A:5A:88:B0:3B:EA:2C:63:72:D9:3C:40:C9
```