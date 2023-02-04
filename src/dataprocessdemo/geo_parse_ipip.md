# 从OSS获取IPIP库进行IP地址数据富化 

日志服务数据加工功能支持从OSS获取IPIP库数据，对日志中的IP地址进行富化，补充IP地址所属的国家、省、市等信息。

## 前提条件

* 已创建访问密钥（AccessKey），用于访问OSS Bucket，详情请参见[为RAM用户创建访问密钥](https://help.aliyun.com/document_detail/116401.htm?spm=a2c4g.11186623.2.5.65432740sPRgUI#task-188766)。

  推荐创建一个只读权限的AccessKey，用于从OSS获取文件；一个只写权限的AccessKey，用于上传文件到OSS。授权策略详情请参见[RAM Policy概述](https://help.aliyun.com/document_detail/100680.htm?spm=a2c4g.11186623.2.6.65432740sPRgUI#concept-y5r-5rm-2gb)。

* 已从IPIP.NET官网下载IP地址文件，并上传到OSS，详情请参见[上传文件](https://help.aliyun.com/document_detail/31886.htm?spm=a2c4g.11186623.2.7.65432740sPRgUI#concept-zx1-4p4-tdb)。

  推荐使用只写权限的AccessKey进行上传。


## 背景信息

IPIP.NET提供全球IP地址数据库，可以帮助您精确查找、确定全球范围内的IP地理位置。您可以从IPIP.NET官网下载IP地址文件，上传至OSS。在数据加工过程中，如果您希望根据日志中的IP地址获取国家、省、市等信息，您可以通过[res_oss_file](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.2.8.65432740sPRgUI#section-mlb-osw-xzd)函数从OSS上获取IPIP库数据，然后使用[geo_parse](https://help.aliyun.com/document_detail/125412.htm?spm=a2c4g.11186623.2.9.65432740sPRgUI#section-a6e-5e9-q0c)函数解析IP地址，最后使用[e_set](https://help.aliyun.com/document_detail/125487.htm?spm=a2c4g.11186623.2.10.65432740sPRgUI#section-7cr-8gz-by2)函数将解析结果中的新字段添加到日志中，实现数据富化。

## 实践案例 

* 原始日志

      ip: 1.2.3.4

  
* 加工规则

      e_set("geo",geo_parse(v("ip"), ip_db=res_oss_file(endpoint='http://oss-cn-hangzhou.aliyuncs.com',
                                                       ak_id=res_local("AK_ID"),
                                                       ak_key=res_local("AK_KEY"),
                                                       bucket='your bucket', file='ipipfree.ipdb',
                                                       format='binary',change_detect_interval=200)

  

  res_oss_file函数重要字段说明如下表所示。


  | 字段     | 说明                                                         |
  | -------- | ------------------------------------------------------------ |
  | endpoint | OSS访问域名。更多信息，请参见[访问域名和数据中心](https://help.aliyun.com/document_detail/31837.htm?spm=a2c4g.11186623.2.11.65432740sPRgUI#concept-zt4-cvy-5db)。 |
  | ak_id    | 具备读OSS权限的AccessKey ID。 出于安全考虑，建议配置为res_local("AK_ID")，表示从高级参数配置中获取。高级参数配置操作步骤请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.12.65432740sPRgUI#task-1181217)。![](/img/dataprocessdemo/IP地址相关/高级参数配置.png) |
  | ak_key   | 具备读OSS权限的AccessKey Secret。 出于安全考虑，建议配置为res_local("AK_KEY")表示从高级参数配置中获取。 |
  | bucket   | 用于存储IP地址文件的OSS Bucket。                             |
  | file     | 您已上传的IP地址文件的名称。                                 |
  | format   | 使用res_oss_file函数从OSS获取IPIP库数据时，文件输出格式需设置为format='binary'。 |

  

* 加工结果

      ip: 1.2.3.4
      city: 杭州市
      province: 浙江省
      country: 中国

  



