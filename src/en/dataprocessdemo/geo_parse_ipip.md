# 从OSS获取IPIP库进行IP地址数据富化

日志服务数据加工功能支持从OSS获取IPIP库数据，对日志中的IP地址进行富化，补充IP地址所属的国家、省、市等信息。

## 实践案例

* 原始日志

  ```
  ip: 1.2.3.4
  ```

* 加工规则

  ```python
  e_set("geo",
    geo_parse(v("ip"),
      ip_db=res_oss_file(
        endpoint='http://oss-cn-hangzhou.aliyuncs.com',
        ak_id=res_local("AK_ID"),
        ak_key=res_local("AK_KEY"),
        bucket='your bucket',
        file='ipipfree.ipdb',
        format='binary',
        change_detect_interval=200
      )
    )
  )
  ```


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

  ```
  ip: 1.2.3.4
  city: 杭州市
  province: 浙江省
  country: 中国
  ```
