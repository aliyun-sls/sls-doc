# 从OSS获取CSV文件进行数据富化

本文档介绍如何通过资源函数和映射富化函数从OSS中获取数据对日志数据进行富化。

## 实践案例

* 原始日志

  ```
  account :  Sf24asc4ladDS
  ```

* OSS CSV文件数据

  | id   | account       | nickname   |
  | ---- | ------------- | ---------- |
  | 1    | Sf24asc4ladDS | 多弗朗明哥 |
  | 2    | Sf24asc4ladSA | 凯多       |
  | 3    | Sf24asc4ladCD | 罗杰       |



* 加工规则 通过日志服务Logstore中的account字段和OSS CSV文件中的account字段进行匹配，只有account字段的值完全相同，才能匹配成功。匹配成功后，返回OSS CSV文件中的nickname字段和字段值，与Logstore中的数据拼接，生成新的数据。

  ```python
  e_table_map(
    tab_parse_csv(
      res_oss_file(
        endpoint='http://oss-cn-hangzhou.aliyuncs.com',
        ak_id=res_local("AK_ID"),
        ak_key=res_local("AK_KEY"),
        bucket='test',
        file='account.csv',
        change_detect_interval=30)
    ),
    "account","nickname")
  ```



  res_oss_file函数重要字段说明如下表所示。


  | 字段     | 说明                                                         |
  | -------- | ------------------------------------------------------------ |
  | endpoint | OSS访问域名，详情请参见[访问域名和数据中心](https://help.aliyun.com/document_detail/31837.htm?spm=a2c4g.11186623.2.11.3ae33dc46CPRr6#concept-zt4-cvy-5db)。 |
  | ak_id    | 具备读OSS权限的AccessKey ID。 出于安全考虑，建议配置为res_local("AK_ID")，表示从高级参数配置中获取。高级参数配置操作步骤请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.12.3ae33dc46CPRr6#task-1181217)。![](/img/dataprocessdemo/数据富化/高级参数设置2.png) |
  | ak_key   | 具备读OSS权限的AccessKey Secret。 出于安全考虑，建议配置为res_local("AK_KEY")，表示从高级参数配置中获取。 |
  | bucket   | 用于存储CSV文件的OSS Bucket。                                |
  | file     | 您已上传的CSV文件的名称。                                    |


* 加工结果

  ```
  account :  Sf24asc4ladDS
  nickname: 多弗朗明哥
  ```

