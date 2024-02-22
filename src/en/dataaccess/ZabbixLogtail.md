# 通过Logtail采集Zabbix数据
Zabbix作为常用的开源监控系统，提供了丰富的告警规则用于系统监控。日志服务支持将Zabbix中的监控数据采集到Logstore中。本文介绍将Zabbix数据采集到日志服务的操作步骤。

## 前提条件

- 已下载及安装Zabbix。具体操作，请参见[下载与安装Zabbix](https://www.zabbix.com/cn/download?zabbix=5.4&os_distribution=centos&os_version=8&db=mysql&ws=nginx)。
- 本教程中，将Zabbix安装在阿里云ECS上为例。
- 已创建Project和Logstore。具体操作，请参见[创建Project](https://help.aliyun.com/zh/sls/user-guide/manage-a-project?spm=a2c4g.11186623.0.i50#section-ahq-ggx-ndb)和[创建Logstore](https://help.aliyun.com/zh/sls/user-guide/manage-a-logstore?spm=a2c4g.11186623.0.i51#section-v52-2jx-ndb)。

## 步骤一：配置数据存储路径

- Zabbix会将监控数据保存在其所在的机器上，您可以根据如下步骤设置监控数据的存储路径。

1. 登录Zabbix所在服务器。
2. 打开zabbix_server.conf文件。

```
vim /etc/zabbix/zabbix_server.conf

```
3. 在zabbix_server.conf文件中，设置数据存储路径。
```
ExportDir=/tmp/
```
4. 重启Zabbix服务，使配置生效。
```
systemctl restart zabbix-server
```
- 配置生效后，Zabbix会在/tmp目录下生产文件（文件名后缀为.ndjson），用于保存监控数据。
## 步骤二：创建Logtail采集配置
1. 登录[日志服务控制台](https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.29de2b96o6sz8B){target="_blank"}。
2. 在接入数据区域，选择JSON-文本日志。
3. 选择目标Project和Logstore，单击下一步。
4. 创建机器组。
  > a. 在ECS机器页签中，选中Zabbix所在的ECS实例，单击创建。
    - 更多信息，请参见[安装Logtail（ECS实例）](https://help.aliyun.com/zh/sls/user-guide/install-logtail-on-ecs-instances?spm=a2c4g.11186623.0.i52#task-2561331)。
    - 如果Zabbix是安装在自建集群或其他云厂商服务器上，需要手动安装Logtail。更多信息，请参见[安装Logtail（Linux系统）](https://help.aliyun.com/zh/sls/user-guide/install-logtail-on-a-linux-server?spm=a2c4g.11186623.0.i62#concept-u5y-3lv-vdb)或[安装Logtail（Windows系统）](https://help.aliyun.com/zh/sls/user-guide/install-logtail-on-a-windows-server?spm=a2c4g.11186623.0.i64#concept-j22-xnv-vdb)。

> b. 安装完成后，单击确认安装完毕。
> c. 在创建机器组页面，输入名称，单击下一步。
- 日志服务支持创建IP地址机器组和用户自定义标识机器组，详细参数说明请参见[创建IP地址机器组](https://help.aliyun.com/zh/sls/user-guide/create-an-ip-address-based-machine-group?spm=a2c4g.11186623.0.i65#task-wc3-xn1-ry)和[创建用户自定义标识机器组](https://help.aliyun.com/zh/sls/user-guide/create-a-custom-identifier-based-machine-group?spm=a2c4g.11186623.0.i67#concept-gyy-k3q-zdb)。
5. 选中目标机器组，将该机器组从源机器组移动到应用机器组，单击下一步。
**重要**创建机器组后立刻应用，可能因为连接未生效，导致心跳为FAIL，您可单击自动重试。如果还未解决，请参见Logtail机器组无心跳进行排查。
6.  创建Logtail配置，单击下一步。
> Zabbix监控数据为JSON类型，所以推荐使用JSON模式进行数据采集。其中日志路径需设置为您在步骤一：配置数据存储路径中设置的数据存储路径，其他参数详情请参见[使用JSON模式采集日志](https://help.aliyun.com/zh/sls/user-guide/collect-logs-in-json-mode?spm=a2c4g.11186623.0.i69#reference-dsq-3v5-vdb)。

  ![image.png](./img/3.1.png)

7. 预览数据及创建索引，然后单击下一步。
日志服务默认开启全文索引。您也可以根据采集到的日志，手动创建字段索引，或者单击自动生成索引，日志服务将自动生成字段索引。更多信息，请参见[创建索引](https://help.aliyun.com/zh/sls/user-guide/create-indexes?spm=a2c4g.11186623.0.i70#task-jqz-v55-cfb)。


**重要**如果您要查询和分析日志，那么全文索引和字段索引必须至少启用一种。同时启用时，以字段索引为准。