# 采集企业内网服务器日志
本文以Nginx为例，介绍配置正向代理服务器以及通过代理模式将企业内网服务器日志采集到日志服务的解决方案。

# 前提条件
.已创建Project和Logstore。具体操作，请参见创建Project和创建Logstore。

.已在服务器上安装Linux Logtail 1.5.0及以上版本或Window Logtail 1.5.0.0及以上版本。具体操作，请参见安装Logtail（Linux系统）、安装Logtail（Windows系统）。

# 背景信息
如果您的多台服务器部署在企业内网中且没有公网访问权限，但您希望将这些服务器的日志采集到日志服务进行查询与分析，您可以通过代理模式，由具备公网访问权限的内网服务器将其它内网服务器上的日志发送到日志服务。您可以通过任何方式将具备公网访问权限的内网服务器配置为正向代理服务器。

# 工作原理
Logtail与日志服务交互的数据主要包括管控数据、业务数据和监控数据。其中，管控数据包括Logtail配置下发及鉴权等信息。通信协议包括HTTP和HTTPS，默认使用HTTP协议发送业务数据和监控数据。因此，代理服务器必须能够同时代理HTTP协议数据和HTTPS协议数据。

Nginx是一款开源的高性能HTTP代理服务器，本身支持代理HTTP协议数据，但由于鉴权等原因并不能直接代理HTTPS协议数据。为此，需要为Nginx配置HTTPS补丁，从而使其能够代理HTTPS协议数据。

步骤一：配置代理服务器
使用Nginx将一台具有公网访问权限的企业内网服务器配置为正向代理服务器。

登录待配置为正向代理服务器的机器。

安装Nginx及HTTPS补丁。

下载HTTPS补丁。

git clone https://github.com/chobits/ngx_http_proxy_connect_module.git
下载并解压Nginx。

其中，${version}表示Nginx版本，请根据实际情况替换。最新版本，请参见nginx: download。

wget http://nginx.org/download/nginx-${version}.tar.gz
tar -xzvf nginx-${version}.tar.gz
cd nginx-${version}/
添加HTTPS补丁到Nginx。

其中，${patchfile}为文件路径，请根据Nginx版本选择对应的文件。更多信息，请参见Select patch。

patch -p1 < ../ngx_http_proxy_connect_module/patch/${patchfile}.patch
安装Nginx。

./configure --add-module=../ngx_http_proxy_connect_module
make && make install
在nginx.conf文件中添加如下配置。

其中，${代理服务器监听端口}和${DNS服务器地址}，请根据实际情况替换。

server {
     listen                         ${代理服务器监听端口};
     resolver                       ${DNS服务器地址};

     # 用于指定非HTTP请求的代理。
     proxy_connect;
     proxy_connect_allow            443;
     proxy_connect_connect_timeout  10s;
     proxy_connect_data_timeout     10s;

     # 用于指定HTTP请求的代理。
     location / {
         proxy_pass http://$host;
         proxy_set_header Host $host;
     }
}
启动Nginx服务器。

步骤二：设置网络代理相关的环境变量
您可以通过如下两种方案设置网络代理相关的环境变量。

方案

优点

缺点

使用场景

方案一

配置仅对Logtail进程生效，影响较小。

配置方式相对复杂。

适用于服务器使用者，对服务器整体网络情况不太了解。

方案二

配置方式简单。

配置对整台服务器生效，影响较大。

适用于服务器管理员，对服务器上所有进程的网络请求状况较为了解。

方案一方案二
登录某台企业内网服务器。

打开/etc/init.d/ilogtaild文件，在start()函数中增加如下环境变量，然后保存文件。

关于环境变量的更多信息，请参见附录：网络代理相关的环境变量。

start()
{
    cd $BIN_DIR
    umask $UMASK
    # 在$BIN_DIR/ilogtail前新增代理相关环境变量。
    # 这里以ALL_PROXY为例，假设代理服务器地址为192.168.1.0，监听端口为9000。
    # 内网服务器与代理服务器之间通过HTTP协议进行通信。
    ALL_PROXY=http://192.168.1.0:9000 $BIN_DIR/ilogtail
    RETVAL=$?
}
执行如下命令重启Logtail。

/etc/init.d/ilogtaild restart
重复执行步骤1~3，为其它内网服务器设置代理相关的环境变量。

步骤三：验证网络
登录某台企业内网服务器。

执行如下命令。

下述命令中的${region}为目标Project所在地域，${project_name}为目标Project名称，请根据实际情况替换。

curl http://logtail.${region}.log.aliyuncs.com
curl https://logtail.${region}.log.aliyuncs.com
curl http://${project_name}.${region}.log.aliyuncs.com
curl http://ali-${region}-sls-admin.${region}.log.aliyuncs.com     
如果系统返回如下类似信息，表示网络正常。

{"Error":{"Code":"OLSInvalidMethod","Message":"The script name is invalid : /","RequestId":"62591BC7C08B7BD4AA99FCD4"}}
重复执行步骤1和2，验证其他企业内网服务器的网络。

附录：网络代理相关的环境变量
环境变量的配置说明如下：

重要
下述环境变量均支持小写模式，但优先级低于大写模式。

如果将HTTP和HTTPS协议数据全部发送给同一台代理服务器，可添加环境变量ALL_PROXY。

ALL_PROXY：${正向代理服务器的地址}
如果将HTTP和HTTPS协议数据分别发送至不同的代理服务器上，可添加环境变量HTTP_PROXY和HTTPS_PROXY。

HTTP_PROXY：${代理HTTP协议数据的服务器地址}
HTTPS_PROXY：${代理HTTPS协议数据的服务器地址}
其中，代理服务器的地址需满足[协议://[用户名:密码@]]地址[:端口]格式。

协议（可选）：指定了当前服务器和代理服务器之间的通信协议，可设置为http、https或socks5。如果不设置，默认使用http。

用户名和密码（可选）：登录代理服务器的用户名和密码。

地址（必选）：代理服务器的IP地址。

端口（可选）：设置为您在nginx.conf文件中配置的代理服务器监听端口。更多信息，请参见配置代理服务器中的步骤5。如果不设置，默认使用80。

另外，您还可以额外增加NO_PROXY环境变量，该变量指定发往哪些地址的数据不需要经过代理服务器，多个地址之间可以用半角逗号（，）连接，支持的地址形式包括：

IP地址

域名（可以以半角句号（.）开头，支持匹配当前域名及其子域名。）

*（禁用代理服务器）