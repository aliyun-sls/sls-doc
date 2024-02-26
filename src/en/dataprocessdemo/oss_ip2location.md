# 从 OSS 获取 IP2Location 库进行 IP 地址数据富化

日志服务数据加工功能支持从 OSS 获取 IP2Location 库数据，对日志中的 IP 地址进行富化，补充 IP 地址所属的国家、省、市等信息。

## 前提条件

- 已创建访问密钥（AccessKey），用于访问 OSS Bucket，详情请参见[为 RAM 用户创建访问密钥](https://help.aliyun.com/document_detail/116401.htm?spm=a2c4g.11186623.2.5.4c87415aMxKjv2#task-188766)。

  推荐创建一个只读权限的 AccessKey，用于从 OSS 获取文件；一个只写权限的 AccessKey，用于上传文件到 OSS。授权策略详情请参见[RAM Policy 概述](https://help.aliyun.com/document_detail/100680.htm?spm=a2c4g.11186623.2.6.4c87415aMxKjv2#concept-y5r-5rm-2gb)。

- 已从 IP2Location 官网下载 IP 地址文件，并上传到 OSS，详情请参见[上传文件](https://help.aliyun.com/document_detail/31886.htm?spm=a2c4g.11186623.2.7.4c87415aMxKjv2#concept-zx1-4p4-tdb)。

  使用只写权限的 AccessKey 进行上传。

## 实践案例

- 原始日志

  ```
  ip: 19.0.0.0
  ```

- 加工规则

  ```python
  e_set("geo",
    geo_parse(v("ip"),
    ip_db=res_oss_file(
      endpoint='http://oss-cn-hangzhou.aliyuncs.com',
      ak_id=res_local("AK_ID"),
      ak_key=res_local("AK_KEY"),
      bucket='test',
      file='your ip2location bin file',
      format='binary',
      change_detect_interval=20),
      provider="ip2location"
    )
  )
  e_json("geo")
  ```

  res_oss_file 函数重要字段说明如下表所示。

  | 字段     | 说明                                                                                                                                                                                                                                                                                                                  |
  | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | endpoint | OSS 访问域名，详情请参见[访问域名和数据中心](https://help.aliyun.com/document_detail/31837.htm?spm=a2c4g.11186623.2.11.4996415aKwzQM9#concept-zt4-cvy-5db)。                                                                                                                                                          |
  | ak_id    | 具备只读 OSS 权限的 AccessKey ID。 出于安全考虑，建议配置为 res_local("AK_ID")，表示从高级参数配置中获取。高级参数配置操作步骤请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.12.4996415aKwzQM9#task-1181217)。![](/img/dataprocessdemo/IP地址相关/高级参数配置.png) |
  | ak_key   | 具备只读 OSS 权限的 AccessKey Secret。 出于安全考虑，建议配置为 res_local("AK_KEY")表示从高级参数配置中获取。                                                                                                                                                                                                         |
  | bucket   | 用于存储 IP 地址文件的 OSS Bucket。                                                                                                                                                                                                                                                                                   |
  | file     | 您已上传的 IP 地址文件的名称。                                                                                                                                                                                                                                                                                        |
  | format   | 使用 res_oss_file 函数从 OSS 获取 IP2Location 库数据时，文件输出格式需设置为 format='binary'。                                                                                                                                                                                                                        |

- 加工结果

  ```
  ip: 19.0.0.0
  city: Dearborn
  province: Michigan
  country: United States
  ```
