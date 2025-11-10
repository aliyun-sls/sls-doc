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

注意，下面的演示是keycloak没有启用https，请在正式环境启用https

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

# 对外暴露的keycloak域名，注意需要启用https，不然第三方登录平台不支持对接
KEYCLOAK_BASE_URL='https://opensearch-keycloak.slstest.com' 

# 对外暴露的opensearch dashboard域名，也使用https暴露
OPENSEARCH_BASE_URL='https://opensearch.slstest.com' 

KEYCLOAK_SECRET='Fu8jdfasfaAI3fIonqnBeyJrpFiMfasfat' #  you can replace this

# 下面2个是用于测试keycloak账号能否登录到opensearch
TEST_USER_NAME='test_user_name'
TEST_USER_PASSWORD='test_user_password'
```

* 准备好data目录
```
mkdir data
chmod 777 data
```

* 执行 `prepare.sh`
```
bash prepare.sh
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


# KeyCloak对接第三方的SSO

这里 我们再启动一个keycloak 来扮演第三方方SSO登录角色。来演示Keycloak配置第三方平台对接的过程。

现在有2个Keycloak
* 上面最初部署的OpenSearch中的Keycloak，我们叫做Opensearch-KeyCloak
* 现在为了模拟第三方SSO而新部署的keyloak，我们把它叫做 SSO-keyCloak

整个认证链路的架构如下

```
┌─────────────────────────────────────────────────────────────────────┐
│                         完整认证流程                                  │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  用户     │
    │ (浏览器) │
    └─────┬────┘
          │ ① 访问 OpenSearch Dashboard
          ▼
    ┌─────────────────────┐
    │  OpenSearch         │
    │  Dashboard          │◀──────────────┐
    └─────┬───────────────┘               │
          │ ② 重定向到 Keycloak 登录      │ ⑧ 返回 Dashboard
          ▼                               │
    ┌─────────────────────┐               │
    │ OpenSearch-Keycloak │               │
    │  (身份代理)         │               │
    └─────┬───────────────┘               │
          │ ③ 检测未登录，显示登录选项     │
          │   - 本地账号登录               │
          │   - 第三方 SSO 登录 ──────┐    │
          ▼                          │    │
    ┌─────────────────────┐          │    │
    │  选择登录方式        │          │    │
    └─────┬───────────────┘          │    │
          │                          │    │
          ├──────────────────────────┘    │
          │ ④ 重定向到第三方 SSO           │
          ▼                               │
    ┌─────────────────────┐               │
    │  SSO-Keycloak       │               │
    │  (或其他第三方SSO)   │               │
    │  - Google           │               │
    │  - GitHub           │               │
    │  - Azure AD         │               │
    │  - 企业 LDAP/AD     │               │
    └─────┬───────────────┘               │
          │ ⑤ 用户在第三方完成认证         │
          │   (输入第三方账号密码)         │
          ▼                               │
    ┌─────────────────────┐               │
    │  认证成功            │               │
    │  返回 Token          │               │
    └─────┬───────────────┘               │
          │ ⑥ Token 返回到 OpenSearch-KC  │
          ▼                               │
    ┌─────────────────────┐               │
    │ OpenSearch-Keycloak │               │
    │  验证 Token          │               │
    │  生成 Session        │               │
    └─────┬───────────────┘               │
          │ ⑦ 认证完成，返回到 OpenSearch  │
          └───────────────────────────────┘
          
          ⑨ 用户访问数据
          ▼
    ┌─────────────────────┐
    │   OpenSearch        │
    │   (Query Engine)    │
    └─────-───────────────┘
```

## 部署SSO-Keycloak
新建一个目录
```
mkdir sso-keycloak
cd sso-keycloak
```

创建 `master-realm.json` 内容如下

```
{
  "realm": "master",
  "enabled": true,
  "sslRequired": "none"
}
```

创建文件 `keycloak-entrypoint.sh` 内容如下

```
#!/bin/bash
set -e

# Import realms with overwrite strategy
/opt/keycloak/bin/kc.sh import --file=/tmp/master-realm.json --override=true

# Start Keycloak with HTTP enabled and HTTPS strict mode disabled
exec /opt/keycloak/bin/kc.sh start-dev --http-enabled=true --hostname-strict-https=true
```

docker-compose.yaml文件如下
```
services:

  sso-keycloak:
    image: quay.io/keycloak/keycloak:21.1.1
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=<修改为真实密码>
      - KC_PROXY=edge                  # keycloak外有代理的情况下 设上这个
    volumes:
      - ./master-realm.json:/tmp/master-realm.json
      - ./keycloak-entrypoint.sh:/tmp/keycloak-entrypoint.sh
    entrypoint: ["/tmp/keycloak-entrypoint.sh"]
    ports:
      - 8081:8080
```

然后这个KeyCloak的域名也挂到带https的反向访问中，对外暴露地址为https://sso.slstest.com/

## 在SSO-KeyCloak中配置好clientId和Secret

创建好一个Realm

![](/img/oscompatibledemo/sso1.jpg)

选择对应realm，创建一个client

![](/img/oscompatibledemo/sso2.jpg)

填写clientid名称
![](/img/oscompatibledemo/sso3.jpg)

勾选client认证
![](/img/oscompatibledemo/sso4.jpg)

填写好回调的地址
![](/img/oscompatibledemo/sso5.jpg)
创建好后可以在clients中看到对应的client ID
![](/img/oscompatibledemo/sso6.jpg)
点进去可以看到对应的secret
![](/img/oscompatibledemo/sso8.jpg)
接着在这个sso-keycloak中加好一个user，方便我们后面做测试
![](/img/oscompatibledemo/sso9.jpg)


**在第三方SSO平台配置也是同样的道理，核心是配置好第三方SSO 登录后回调的地址等，然后获得2个核心的参数就是ClientID和Serect** 

## 在Opensearch-Keycloak中配置使用SSO-Keycloak

登录到 OpenSearch-Keycloak中，把上面SSO-Keycloak添加为Identity providers

![](/img/oscompatibledemo/sso11.jpg)

接着填写好 前面设置过的clientId和serect

![](/img/oscompatibledemo/sso12.jpg)


## 登录测试
打开 opensearch.slstest.com 的地址，可以看到登录页面如下

![](/img/oscompatibledemo/sso14.jpg)

![](/img/oscompatibledemo/sso15.jpg)

登录后，可以在opensearch上看到对应用户名就是sso-keycloack上的
![](/img/oscompatibledemo/sso16.jpg)
