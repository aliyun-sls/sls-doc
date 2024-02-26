# 过滤VPC流日志公网流量

在专有网络VPC控制台上开通流日志功能后，流日志将被采集到日志服务中，您可以通过日志服务对流日志进行查询、分析和排查网络故障。本文介绍通过日志服务数据加工对流日志进行公网流量过滤的操作方法。

## 操作步骤
1. 登录[日志服务控制台](https://sls.console.aliyun.com/lognext/profile)。
2. 在Project列表区域，单击目标Project。
3. 在**日志存储** > **日志库**页签中，单击目标Logstore。
4. 在查询和分析页面的右上角，单击**数据加工**，进入数据加工模式。
5. 在数据加工编辑框中，输入如下加工语句。
    ```python
    # 如果srcaddr和dstaddr字段不存在，丢弃。
    e_if(
      e_not_has("srcaddr"),
      e_drop()
    )
    e_if(
      e_not_has("dstaddr"),
      e_drop()
    )

    # 如果srcaddr和dstaddr不符合IP地址格式，丢弃。
    e_if(
      op_not(
        e_match("srcaddr", grok(r'%{IP}'))
      ),
      e_drop()
    )
    e_if(
      op_not(
        e_match("dstaddr", grok(r'%{IP}'))
      ),
      e_drop()
    )

    # 如果是内网之间互通的流量，丢弃。
    e_if(
      op_and(
        op_or(
          ip_cidrmatch("10.0.0.0/8", v("srcaddr")),
          ip_cidrmatch("172.16.0.0/12", v("srcaddr")),
          ip_cidrmatch("192.168.0.0/16", v("srcaddr"))
        ),
        op_or(ip_cidrmatch("10.0.0.0/8", v("dstaddr")),
          ip_cidrmatch("172.16.0.0/12", v("dstaddr")),
          ip_cidrmatch("192.168.0.0/16", v("dstaddr"))
        )
      ),
      e_drop()
    )
    ```
    * 通过e_if和e_not_has函数删除不存在srcaddr和dstaddr字段的日志。更多信息，请参见e_if、e_not_has和e_drop。
    * 通过e_if、op_not、e_match函数删除srcaddr和dstaddr字段不符合IP地址格式的日志。更多信息，请参见op_not和e_match。
    * 通过e_if、op_and、op_or和ip_cidrmatch函数删除内网日志。更多信息，请参见op_and、op_or和ip_cidrmatch。
6. 单击**预览数据**。
  您可以看到原始日志只保留了公共流量的流日志。
  ![流日志](/img/dataprocessdemo/数据富化/流日志.png)
7. 单击**保存数据加工**。
8. 在**创建数据加工规则**页面，配置如下参数，然后单击**确定**。
  a. 配置基本信息。
    |参数 | 说明 |
    | -------| --------- |
    | 规则名称  | 数据加工规则的名称。例如输入vpc-flowlog-public。   |
    | 授权方式  | 授予日志服务读取源日志库中数据的权限。以默认角色为例，选择默认角色。   |

    b. 配置存储目标。
    |参数 | 说明 |
    | -------| --------- |
    | 目标名称  | 存储目标名称。例如输入target-a。  |
    | 目标Region  | 目标Project所在地域。例如选择华东1（杭州）。   |
    | 目标Project  | 用于存储公网流量日志的Project名称。例如输入project-vpc-flowlog-public。  |
    | 目标库  | 用于存储公网流量日志的Logstore名称。例如输入logstore-vpc-flowlog-public。   |
    | 授权方式  | 授予日志服务读写存储目标Logstore权限。以默认角色为例，选择默认角色。  |

    c. 配置加工时间范围。
    |参数 | 说明 |
    | -------| --------- |
    | 时间范围  | 加工的时间范围。 选择所有，即表示对Logstore中的数据从开始时间持续加工。  |


    创建完成后，您可以：
    * 查看作业详情与状态，修改、启动、停止和删除作业等。具体操作，请参见[管理数据加工作业](https://help.aliyun.com/document_detail/128744.htm?spm=a2c4g.11186623.0.0.7b002f7aJzc9c6#task-1580295)。
    * 进入存储目标Logstore查看VPC流日志的公网流量。新的日志数据，只保留公网日志。
      您可以输入查询和分析语句，对公网流量的请求来源城市和目的地城市进行查询分析。例如：
      ```python
      * | select ip_to_city(srcaddr) as sourceAddr,ip_to_city(dstaddr) as dstAddr,COUNT(*) as pv group by sourceAddr,dstAddr order by pv limit 10
      ```
      ![流日志1](/img/dataprocessdemo/数据富化/流日志1.png)