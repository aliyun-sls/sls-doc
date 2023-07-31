# 如何采集企业内网服务器日志？

# 背景信息

如果您的多台服务器部署在企业内网中且没有公网访问权限，但您希望将这些服务器的日志采集到日志服务进行查询与分析，您可以通过代理模式，借由具备公网访问权限的内网服务器将其它内网服务器上的日志发送至日志服务。

您可以通过任何方式将具备公网访问权限的内网服务器配置成为正向代理服务器。本文将以[NGINX](https://www.nginx.com/resources/wiki/)为例，详细介绍如何配置正向代理服务器，以及如何通过代理模式将企业内网服务器的日志采集至日志服务。

```
注意：仅Logtail 1.5.0以上版本支持此功能
```

# 工作原理

Logtail和日志服务交互的数据主要包括管控数据、业务数据和监控数据，其中管控数据包括配置下发及鉴权等信息，通信协议包括HTTP和HTTPS，业务和监控数据默认使用HTTP协议发送。**因此，代理服务器必须能够同时代理HTTP协议数据和HTTPS协议数据。**

NGINX是一款开源的高性能HTTP代理服务器，本身支持代理HTTP协议数据，但由于鉴权等原因并不能直接代理HTTPS协议数据。为此，需要为NGINX配置[HTTPS补丁](https://github.com/chobits/ngx_http_proxy_connect_module)，从而使其能够代理HTTPS协议数据。

# 步骤一：配置代理服务器

使用NGINX将一台具有公网访问权限的企业内网服务器配置为正向代理服务器的操作步骤如下：

1.  登录待配置为正向代理服务器的机器。
    
2.  安装NGINX及HTTPS补丁，具体操作流程如下：
    
```
    # 下载HTTPS补丁
    git clone https://github.com/chobits/ngx_http_proxy_connect_module.git

    # 下载并解压NGINX，其中${version}代表NGINX的版本，最新版本可见https://nginx.org/en/download.html
    wget http://nginx.org/download/nginx-${version}.tar.gz
    tar -xzvf nginx-${version}.tar.gz
    cd nginx-${version}/

    # 将HTTPS补丁加入NGINX，其中${patchfile}和NGINX的版本有关系，详见https://github.com/chobits/ngx_http_proxy_connect_module/#select-patch
    patch -p1 < ../ngx_http_proxy_connect_module/patch/${patchfile}.patch

    # 安装NGINX
    ./configure --add-module=../ngx_http_proxy_connect_module
    make && make install
```
3.  在nginx.conf文件中添加以下配置，其中，_${端口}_和_${DNS服务器地址}_根据实际值替换：
    
```
     server {
         listen                         ${端口};
         resolver                       ${DNS服务器地址};
    
         # 用于指定非HTTP请求的代理
         proxy_connect;
         proxy_connect_allow            443;
         proxy_connect_connect_timeout  10s;
         proxy_connect_data_timeout     10s;
    
         # 用于指定HTTP请求的代理
         location / {
             proxy_pass http://$host;
             proxy_set_header Host $host;
         }
    }
```
4.  启动NGINX服务器。
    

# 步骤二：配置网络代理相关环境变量

有两种方案可供选择：

|   |  **优点**  |  **缺点**  |  **推荐使用场景**  |
| --- | --- | --- | --- |
|  **方案一**  |  配置仅对Logtail进程有效，影响面有限  |  配置方式相对复杂  |  服务器使用者，对服务器整体网络情况不太了解  |
|  **方案二**  |  配置方式简单  |  配置对整台服务器有效，影响面大  |  服务器管理员，对服务器上所有进程的网络请求状况较为了解  |

## 方案一：为Logtail进程配置代理相关环境变量

1.  登录某台企业内网服务器。
    
2.  打开/etc/init.d/ilogtaild，在start()函数中增加代理相关环境变量，然后保存：
    
```
    start()
    {
        cd $BIN_DIR
        umask $UMASK
        # 在$BIN_DIR/ilogtail前新增代理相关环境变量
        # 这里以ALL_PROXY为例，假定代理服务器地址为192.168.1.0，监听端口为9000，
        # 内网服务器与代理服务器之间通过HTTP协议进行通信
        ALL_PROXY=http://192.168.1.0:9000 $BIN_DIR/ilogtail
        RETVAL=$?
    }
```
3.  执行如下命令重启Logtail：
```
    /etc/init.d/ilogtaild restart
```
4.  重复执行步骤1~3，为其它内网服务器配置代理相关环境变量。
    

## 方案二：为整台内网服务器配置代理相关环境变量

```
注：如果您需要对内网服务器上的所有网络请求进行代理；或者，您仅需要对Logtail的网络请求进行代理，但您完全了解服务器上其它进程的网络请求发送地址，您可以考虑此种方式。否则，请使用场景一中提供的配置方法！
```

1.  登录某台企业内网服务器。
    
2.  使用export命令在启动文件~/.bash\_profile或/etc/profile中配置网络代理相关的环境变量（见附录）。
    
3.  执行如下命令使得环境变量立刻生效（以~/.bash\_profile启动文件为例）：
    
```
    source ～/.bash_profile
```
4.  执行如下命令重启Logtail:
    
```
    /etc/init.d/ilogtaild restart
```
5.  重复执行步骤1~4，为其它内网服务器配置代理相关环境变量。
    

# 步骤三：验证网络

1.  登录某台企业内网服务器。
    
2.  执行如下命令，其中${region}为目标Project所在地域，${project\_name}为目标Project名称：
    
```
    curl http://logtail.${region}.log.aliyuncs.com
    curl https://logtail.${region}.log.aliyuncs.com
    curl http://${project_name}.${region}.log.aliyuncs.com
    curl http://ali-${region}-sls-admin.${region}.log.aliyuncs.com
```
如果系统返回如下类似信息，则表示网络正常：
```
    {"Error":{"Code":"OLSInvalidMethod","Message":"The script name is invalid : /","RequestId":"62591BC7C08B7BD4AA99FCD4"}}
```
3.  重复执行步骤1~2，验证其他企业内网服务器的网络。
    

# 附录：代理相关环境变量

```
重要：下述环境变量均支持小写模式，但优先级均低于大写模式。
```

如果将HTTP和HTTPS协议数据全部发送给同一台代理服务器，可添加环境变量ALL\_PROXY。

```
ALL\_PROXY：代理服务器的地址，用于代理所有协议的网络数据
```

如果将HTTP和HTTPS协议数据分别发送至不同的代理服务器上，可添加环境变量HTTP\_PROXY和HTTPS\_PROXY。

```
HTTP\_PROXY：用于代理http协议数据的服务器地址

HTTPS\_PROXY：用于代理https协议数据的服务器地址
```

其中，代理服务器的地址需满足\[协议://\[用户名:密码@\]\]地址\[:端口\]格式。

*   协议（可选）：指定了当前服务器和代理服务器之间的通信协议，可设置为http、https或socks5。如果不设置，默认使用http。
    
*   用户名和密码（可选）：登录代理服务器的用户名和密码。
    
*   地址（必选）：代理服务器的IP地址。
    
*   端口（可选）：设置为您在nginx.conf文件中配置的代理服务器监听端口。更多信息，请参见[3](https://help.aliyun.com/document_detail/217488.html?spm=a2c4g.28958.0.i1#step-jub-u3t-gto)。如果不设置，默认使用80。
    

除此以外，您还可以配置NO\_PROXY环境变量，用于指定发往哪些地址的数据不需要经过代理服务器，多个地址之间可以用半角逗号（，）连接，支持的地址形式包括：

*   IP地址
    
*   域名（可以以半角句号（.）开头，支持匹配当前域名及其子域名。）
    
*  \*（禁用代理服务器）