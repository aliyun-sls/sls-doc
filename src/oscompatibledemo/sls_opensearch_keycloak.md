# 背景介绍

本文介绍如何通过opensearch+keycloak对接sls,  解决2个核心问题
1. 以Kibana的使用习惯，访问SLS
2. 支持多种SSO登录的方案

# 方案优势

将 OpenSearch 与 Keycloak 对接后，您实际上是将 OpenSearch 的认证职责“外包”给了 Keycloak。而 Keycloak 作为一个专业的身份和访问管理解决方案，其核心功能就是充当一个身份代理（Identity Broker）。
```
[第三方SSO平台] <---> [Keycloak] <---> [OpenSearch]
(例如： Google, GitHub, Azure AD, 企业AD)
```


# 部署示范

下载已经制作好的docker compose文件，并解压
```
wget https://sls-kproxy.oss-cn-hangzhou.aliyuncs.com/opensearch-keycloak-kproxy.tar.gz
tar -xzvf opensearch-keycloak-kproxy.tar.gz
cd opensearch-keycloak-kproxy
```


* 修改 `.env` 文件， 把下面值修改为真实值
```
ES_PASSWORD=aStrongPassword
SLS_ENDPOINT=cn-zhangjiakou-spe.log.aliyuncs.com
SLS_PROJECT=etl-spe
SLS_ACCESS_KEY_ID=$SLS_ACCESS_KEY_ID
SLS_ACCESS_KEY_SECRET=$SLS_ACCESS_KEY_SECRET
```

* 修改 `prepare.sh` 中这些变量值
```
KEYCLOAK_BASE_URL='http://192.168.1.1:8980' # 根据实际情况修改，结尾不带/
OPENSEARCH_BASE_URL='http://192.168.1.1:5892' # 根据实际情况修改，结尾不带/

KEYCLOAK_SECRET='Fu8jdfasfaAI3fIonqnBeyJrpFiMfasfat' #  you can replace this
TEST_USER_NAME='test_user_name'
TEST_USER_PASSWORD='test_user_password'
```

* 执行 `prepare.sh`
```
bash prepare.sh
```

* 准备data目录文件
```
mkdir data
chmod 777 data
```

* 启动docker compose
```
docker compose up -d
```

* 查看docker compose状态

```
docker compose ps
```

* 访问对应$OPENSEARCH_BASE_URL
* 然后 使用 对应的TEST_USER_NAME 和 TEST_USER_PASSWORD对应的值登录


# KeyCloak对接SSO

接下来可以在登录KeyCloak地址，配置对接具体的IDP。 具体可以参考KeyCloak官网 https://www.keycloak.org/




