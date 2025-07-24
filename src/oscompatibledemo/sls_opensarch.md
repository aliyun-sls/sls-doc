## 对接OpenSearch

## Docker Compose方式

### 前提
* 一台内存>8G的机器
* Docker版本>=1.18

### 已知限制
Opensearch的鉴权粒度比较细(支持到非常具体的API名字以及列的权限)，而SLS的index映射到OpenSearch后只能支持对读权限的校验，只要当前用户具有`indices:data/read/search` 权限，则认为有读权限。

该限制意味着，OpenSearch对接SLS的场景，只能做当前用户是否能读进行权限校验，更细粒度的读权限控制（比如某个读的api或者精确到列的读）无法支持（暂时受限于实现方式没有办法支持）

### 部署操作

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

# 如果有更多project，可以继续加； 注意超过6个的话，docker-compose.yml中引用也要加
#SLS_ENDPOINT2=cn-huhehaote.log.aliyuncs.com
#SLS_PROJECT2=etl-dev2
#SLS_ACCESS_KEY_ID2=xxx
#SLS_ACCESS_KEY_SECRET2=xxx
#SLS_PROJECT_ALIAS2=etl-dev2 # 可选，如果觉得SLS_PROJECT名字太长，可以设置一下别名
#SLS_LOGSTORE_FILTERS2="test*log" # 可选，过滤哪些logstore自动创建index pattern创建,多个pattern用逗号分隔，比如 "access*,error*"，注意加上双引号
```

3. 创建`docker-compose.yaml` 文件，内容如下(下面内容不需要修改，变量已经引用.env的配置)
```
services:
  opensearch:
    image: opensearchproject/opensearch:2.4.1
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms2G -Xmx2G"
      - "DISABLE_SECURITY_PLUGIN=false"
      - ADMIN_PASSWORD=${ES_PASSWORD}
    volumes:
      - ./data:/usr/share/opensearch/data
    command: >
      bash -c '
        echo "Generating internal_users.yml...";
        HASH=$(/usr/share/opensearch/plugins/opensearch-security/tools/hash.sh -p $${ADMIN_PASSWORD} | tail -1);
        echo "_meta:" > /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  type: \"internalusers\"" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  config_version: 2" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "admin:" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  hash: \"$${HASH}\"" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  reserved: true" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  backend_roles:" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  - \"admin\"" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "  description: \"Admin user\"" >> /usr/share/opensearch/config/opensearch-security/internal_users.yml
        echo "internal_users.yml generated successfully";
        exec /usr/share/opensearch/opensearch-docker-entrypoint.sh
      '

  kproxy:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5
    environment:
      - ES_ENDPOINT=https://opensearch:9200

      - ECS_ROLE_NAME=${ECS_ROLE_NAME}
      # 第一个sls project
      - SLS_ENDPOINT=${SLS_ENDPOINT}
      - SLS_PROJECT=${SLS_PROJECT}
      - SLS_LOGSTORE_FILTERS=${SLS_LOGSTORE_FILTERS}
      - SLS_PROJECT_ALIAS=${SLS_PROJECT_ALIAS}
      - SLS_ACCESS_KEY_ID=${SLS_ACCESS_KEY_ID}
      - SLS_ACCESS_KEY_SECRET=${SLS_ACCESS_KEY_SECRET}

      # 第二个sls project
      - SLS_ENDPOINT2=${SLS_ENDPOINT2}
      - SLS_PROJECT2=${SLS_PROJECT2}
      - SLS_LOGSTORE_FILTERS2=${SLS_LOGSTORE_FILTERS2}
      - SLS_PROJECT_ALIAS2=${SLS_PROJECT_ALIAS2}
      - SLS_ACCESS_KEY_ID2=${SLS_ACCESS_KEY_ID2}
      - SLS_ACCESS_KEY_SECRET2=${SLS_ACCESS_KEY_SECRET2}

      - SLS_ENDPOINT3=${SLS_ENDPOINT3}
      - SLS_PROJECT3=${SLS_PROJECT3}
      - SLS_LOGSTORE_FILTERS3=${SLS_LOGSTORE_FILTERS3}
      - SLS_PROJECT_ALIAS3=${SLS_PROJECT_ALIAS3}
      - SLS_ACCESS_KEY_ID3=${SLS_ACCESS_KEY_ID3}
      - SLS_ACCESS_KEY_SECRET3=${SLS_ACCESS_KEY_SECRET3}

      - SLS_ENDPOINT4=${SLS_ENDPOINT4}
      - SLS_PROJECT4=${SLS_PROJECT4}
      - SLS_LOGSTORE_FILTERS4=${SLS_LOGSTORE_FILTERS4}
      - SLS_PROJECT_ALIAS4=${SLS_PROJECT_ALIAS4}
      - SLS_ACCESS_KEY_ID4=${SLS_ACCESS_KEY_ID4}
      - SLS_ACCESS_KEY_SECRET4=${SLS_ACCESS_KEY_SECRET4}

      - SLS_ENDPOINT5=${SLS_ENDPOINT5}
      - SLS_PROJECT5=${SLS_PROJECT5}
      - SLS_LOGSTORE_FILTERS5=${SLS_LOGSTORE_FILTERS5}
      - SLS_PROJECT_ALIAS5=${SLS_PROJECT_ALIAS5}
      - SLS_ACCESS_KEY_ID5=${SLS_ACCESS_KEY_ID5}
      - SLS_ACCESS_KEY_SECRET5=${SLS_ACCESS_KEY_SECRET5}

      - SLS_ENDPOINT6=${SLS_ENDPOINT6}
      - SLS_PROJECT6=${SLS_PROJECT6}
      - SLS_LOGSTORE_FILTERS6=${SLS_LOGSTORE_FILTERS6}
      - SLS_PROJECT_ALIAS6=${SLS_PROJECT_ALIAS6}
      - SLS_ACCESS_KEY_ID6=${SLS_ACCESS_KEY_ID6}
      - SLS_ACCESS_KEY_SECRET6=${SLS_ACCESS_KEY_SECRET6}
      # 如有更多，可以继续加，最多255个
      - IS_OPENSEARCH=true
    depends_on:
      - opensearch

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:2.4.1
    ports:
      - 5601:5601
    environment:
      - OPENSEARCH_HOSTS=http://kproxy:9201
      - OPENSEARCH_USERNAME="admin"
      - OPENSEARCH_PASSWORD=${ES_PASSWORD}
      - OPENSEARCH_SECURITY_ENABLED="true"
    depends_on:
      - kproxy

  # 这个服务组件是可选的，作用是自动创建kibana index pattern
  index-patterner:
    image: sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/kproxy:2.1.5
    command: /usr/bin/python3 -u /workspace/create_index_pattern.py
    depends_on:
      - opensearch-dashboards
    environment:
      - KPROXY_ENDPOINT=http://kproxy:9201
      - KIBANA_ENDPOINT=http://opensearch-dashboards:5601
      - KIBANA_USER=admin
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

## OpenSearch+LDAP对接SLS

Opensearch默认支持对接LDAP，我们只要对opensearch进行一些配置，即可使用LDAP的方式进行认证。

1. 创建好 `config.yml`
```
---
_meta:
  type: "config"
  config_version: 2

config:
  dynamic:
    http:
      anonymous_auth_enabled: false
    authc:
      internal_auth:
        order: 0
        description: "HTTP basic authentication using the internal user database"
        http_enabled: true
        transport_enabled: true
        http_authenticator:
          type: basic
          challenge: false
        authentication_backend:
          type: internal
      ldap_auth:
        order: 1
        description: "Authenticate using LDAP"
        http_enabled: true
        transport_enabled: true
        http_authenticator:
          type: basic
          challenge: false
        authentication_backend:
          type: ldap
          config:
            enable_ssl: false
            enable_start_tls: false
            enable_ssl_client_auth: false
            verify_hostnames: true
            hosts:
            - 192.168.0.5:389 # 根据实际情况修改
            bind_dn: cn=readonly,dc=example,dc=org # 根据实际情况修改
            password: changethistoo # 根据实际情况修改
            userbase: ou=People,dc=example,dc=org # 根据实际情况修改
            usersearch: (cn={0}) # 根据实际情况修改
            username_attribute: cn # 根据实际情况修改

    authz:
      ldap_roles:
        description: "Authorize using LDAP"
        http_enabled: true
        transport_enabled: true
        authorization_backend:
          type: ldap
          config:
            enable_ssl: false
            enable_start_tls: false
            enable_ssl_client_auth: false
            verify_hostnames: true
            hosts:
            - 192.168.0.5:389 # 根据实际情况修改
            bind_dn: cn=readonly,dc=example,dc=org # 根据实际情况修改
            password: changethistoo
            userbase: ou=People,dc=example,dc=org # 根据实际情况修改
            usersearch: (cn={0}) # 根据实际情况修改
            username_attribute: cn # 根据实际情况修改
            skip_users:
              - admin
              - kibanaserver
            rolebase: ou=Groups,dc=example,dc=org # 根据实际情况修改
            rolesearch: (uniqueMember={0})
            userroleattribute: null
            userrolename: disabled
            rolename: cn # 根据实际情况修改
            resolve_nested_roles: false
```

2. 创建好 `roles_mapping.yml`, 下面的映射关系根据实际情况做好调整

```
---

_meta:
  type: "rolesmapping"
  config_version: 2

all_access:
  reserved: false
  backend_roles:
  - "admin"
  - "Administrator"
  description: "Maps admin to all_access"

readall:
  reserved: false
  backend_roles:
  - "readall"
  - "Developers"
```

3. 对上面2个文件设置好权限

```
chmod 600 roles_mapping.yml
chown 1000:1000 roles_mapping.yml config.yml
```

4. 对上面的docker-compose.yaml文件做一下修改，添加如下内容：

```
services:
  opensearch:
    # ... 省略部分配置
    volumes:
      - ./data:/usr/share/opensearch/data
      # 主要增加下面2行
      - ./config.yml:/usr/share/opensearch/config/opensearch-security/config.yml:ro
      - ./roles_mapping.yml:/usr/share/opensearch/config/opensearch-security/roles_mapping.yml:ro
   # 省略剩下内容
```


补充， 以上OpenSearch测试用到的LDAP可以用下面这个 `docker-compose.yaml` 构建
```
services:
  openldap:
    image: osixia/openldap:1.5.0
    container_name: openldap
    command: --copy-service # seemingly required to load directory.ldif
    ports:
      - 389:389
      - 636:636
    environment:
      - LDAP_ADMIN_PASSWORD=changethis
      - LDAP_READONLY_USER=true
      - LDAP_READONLY_USER_PASSWORD=changethistoo
    volumes:
      - ./directory.ldif:/container/service/slapd/assets/config/bootstrap/ldif/custom/directory.ldif
```

directory.ldif文件内容如下
```
# --- OUs -------------------------------------

dn: ou=Groups,dc=example,dc=org
objectClass: organizationalunit
objectClass: top
ou: Groups

dn: ou=People,dc=example,dc=org
objectClass: organizationalunit
objectClass: top
ou: People


# --- People ----------------------------------

dn: cn=jroe,ou=People,dc=example,dc=org
objectClass: person
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: top
cn: jroe
userpassword: pass01
givenname: Jane
sn: Roe
mail: jroe@example.org
uid: 1001

dn: cn=jdoe,ou=People,dc=example,dc=org
objectClass: person
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: top
cn: jdoe
userpassword: pass02
givenname: John
sn: Doe
mail: jdoe@example.org
uid: 1002

dn: cn=psantos,ou=People,dc=example,dc=org
objectClass: person
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: top
cn: psantos
userpassword: pass03
givenname: Paulo
sn: Santos
mail: psantos@example.org
uid: 1003


# --- Groups ----------------------------------

dn: cn=Administrator,ou=Groups,dc=example,dc=org
objectClass: groupofuniquenames
objectClass: top
ou: Groups
cn: Administrator
uniquemember: cn=psantos, ou=People, dc=example,dc=org

dn: cn=Developers,ou=Groups,dc=example,dc=org
objectClass: groupofuniquenames
objectClass: top
ou: Groups
cn: Developers
uniquemember: cn=psantos, ou=People, dc=example,dc=org
uniquemember: cn=jroe, ou=People, dc=example,dc=org
uniquemember: cn=jdoe, ou=People, dc=example,dc=org
```

ldap测试
```
# 连接测试
ldapwhoami -x -H ldap://localhost:389 -D "cn=jroe,ou=People,dc=example,dc=org" -w pass01

# 搜索测试
ldapsearch -x -H ldap://localhost:389 -D "cn=readonly,dc=example,dc=org" -w changethistoo -b "ou=People,dc=example,dc=org"
```
