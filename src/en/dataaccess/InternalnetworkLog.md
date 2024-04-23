# Collect logs from servers in a corporate intranet?

# Implementation

Logtail exchanges data with Simple Log Service, including control data, service data, and monitoring data. Control data includes the information that is related to Logtail configuration delivery and authentication. By default, service data and monitoring data are transmitted over HTTP. HTTPS is also supported.**Therefore, a proxy server must support both HTTP and HTTPS.**

NGINX is an open source and high-performance HTTP proxy server. By default, NGINX supports HTTP but does not support HTTPS because of authentication-related reasons.To enable NGINX to support HTTPS, you must install an [HTTPS patch](https://github.com/chobits/ngx_http_proxy_connect_module) for NGINX.

# Step 1: Configure a proxy server

The following procedure describes how to use NGINX to configure a server that has access to the Internet in a corporate intranet as a forward proxy server:

1.  Log on to the server that you want to configure as a forward proxy server.
2.  Download the NGINX installation package and an HTTPS patch.

```
    # Download an HTTPS patch.
    git clone https://github.com/chobits/ngx_http_proxy_connect_module.git

    # Download the NGINX installation package and decompress the package. ${version} specifies the version of NGINX. You must replace ${version} with the actual value. For more information about the latest version of NGINX, visit [nginx: download] https://nginx.org/en/download.html
    wget http://nginx.org/download/nginx-${version}.tar.gz
    tar -xzvf nginx-${version}.tar.gz
    cd nginx-${version}/

    # Add the HTTPS patch to NGINX. ${patchfile} specifies the path to the HTTPS patch file. You must specify a patch file based on the version of NGINX. For more information, visit [ngx_http_proxy_connect_module]. https://github.com/chobits/ngx_http_proxy_connect_module/#select-patch
    patch -p1 < ../ngx_http_proxy_connect_module/patch/${patchfile}.patch

    # Install NGINX.
    ./configure --add-module=../ngx_http_proxy_connect_module
    make && make install
```

3. Add the following configurations to the nginx.conf file. You must replace ${Listening port of the proxy server} and ${DNS server address} with the actual values.

```
     server {
         listen                         ${Listening port of the proxy server};
         resolver                       ${DNS server address};

         # Specify the proxy for non-HTTP requests.
         proxy_connect;
         proxy_connect_allow            443;
         proxy_connect_connect_timeout  10s;
         proxy_connect_data_timeout     10s;

         # Specify the proxy for HTTP requests.
         location / {
             proxy_pass http://$host;
             proxy_set_header Host $host;
         }
    }
```

4.  Start the NGINX server.

# Step 2: Configure proxy-related environment variables

Two solutions are available. The following table describes the solutions.

|                | **Advantage**                                                                                          | **Disadvantage**                                                                | **Scenario**                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Scenario 1** | The configurations take effect only for the Logtail process. The impact is within an acceptable scope. | The configuration method is relatively complex.                                 | Suitable for server users who are not familiar with the overall server network.                             |
| **Scenario 2** | The configuration method is simple.                                                                    | The configurations take effect on the entire server. The impact is significant. | Suitable for server administrators who are familiar with the request status of all processes on the server. |

## Scenario 1: Configure proxy-related environment variables for the Logtail process

1.  Log on to a server in the corporate intranet.
2.  Open the /etc/init.d/ilogtaild file, add the following environment variables to the start() function, and then save the file.

```
    start()
    {
        cd $BIN_DIR
        umask $UMASK
        # Add proxy-related environment variables before $BIN_DIR/ilogtail.
        # In this example, the ALL_PROXY environment variable is added. The IP address of the proxy server is 192.168.1.0, and the listening port is 9000.
        # The server in the corporate intranet communicates with the proxy server over HTTP.
        ALL_PROXY=http://192.168.1.0:9000 $BIN_DIR/ilogtail
        RETVAL=$?
    }
```

3.  Run the following command to restart Logtail:

```
    /etc/init.d/ilogtaild restart
```

4.  Repeat Step 1 to Step 3 to configure proxy-related environment variables for the other servers in the corporate intranet.

## Repeat Step 1 to Step 3 to configure proxy-related environment variables for the other servers in the corporate intranet.

```
Note: You can use this solution if you want to forward all requests of the servers in a corporate intranet by using a proxy server. You can also use this solution if you want to forward only requests from Logtail processes by using a proxy server. To use this solution, make sure that you are familiar with the addresses to which the requests are sent from the other processes on the servers.
```

1.  Log on to a server in the corporate intranet.
2.  Run the export command to add proxy-related environment variables to the ~/.bash_profile or /etc/profile startup file. For more information about environment variables, see the [Appendix: Proxy-related environment variables] section of this topic.
3.  Run the following command to allow the environment variables to take effect. In this example, the ~/.bash_profile startup file is used.

```
    source ～/.bash_profile
```

4.  Run the following command to restart Logtail:

```
    /etc/init.d/ilogtaild restart
```

5. Repeat Step 1 to Step 4 to configure proxy-related environment variables for the other servers in the corporate intranet.

# Step 3: Test network connectivity

1.  Log on to a server in the corporate intranet.
2.  Run the following commands to test the network connectivity. In the following commands, ${region} specifies the region of the project that is used, and ${project_name} specifies the name of the project.

```
    curl http://logtail.${region}.log.aliyuncs.com
    curl https://logtail.${region}.log.aliyuncs.com
    curl http://${project_name}.${region}.log.aliyuncs.com
    curl http://ali-${region}-sls-admin.${region}.log.aliyuncs.com
```

If information similar to the following code is returned, the network is connected:

```
    {"Error":{"Code":"OLSInvalidMethod","Message":"The script name is invalid : /","RequestId":"62591BC7C08B7BD4AA99FCD4"}}
```

3. Repeat Step 1 and Step 2 to test the network connectivity of the other servers in the corporate intranet.

# Appendix: Proxy-related environment variables

```
The environment variables can be in uppercase or lowercase. The environment variables in uppercase take precedence.
```

To send HTTP and HTTPS data to the same proxy server, add the ALL_PROXY environment variable.

```
ALL\_PROXY：The address of the forward proxy server, which is used to process network data of all protocols.
```

To send HTTP and HTTPS data to different proxy servers, add the HTTP_PROXY and HTTPS_PROXY environment variables.

```
HTTP\_PROXY：Server address used to proxy HTTP protocol data

HTTPS\_PROXY：Server address used to proxy HTTPS protocol data

The address of a proxy server must be in the \[Protocol://\[Username:Password@\]\]Address\[:Port\] format.

- Protocol: the communication protocol that is used between the current server in the corporate intranet and the proxy server. Valid values: http, https, and socks5. This field is optional.If you do not configure this field,http is used by default.
- Username and Password: the username and password that are used to log on to the proxy server. These fields are optional.
- Address: the IP address of the proxy server. This field is required.
- Port: the listening port of the proxy server that is configured in the nginx.conf file. This field is optional.[3](https://help.aliyun.com/document_detail/217488.html?spm=a2c4g.28958.0.i1#step-jub-u3t-gto)。For more information, see [Step 5] in the "Configure a proxy server" section of this topic.If you do not configure this field, port 80 is used by default.

If you do not want to send specific data from a server in the corporate intranet to the proxy server, you can add the NO_PROXY environment variable. The NO_PROXY environment variable specifies the addresses to which data can be sent without using the proxy server. Separate multiple addresses with commas (,). Supported formats:

- IP addresses.
- <tag>Domain names. The domain names can start with a period (.). A domain name and its subdomains can be matched.
- \* Asterisk (*). If you specify an asterisk, the proxy server is disabled.
```
