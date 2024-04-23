# 从 OSS 获取 CSV 文件进行数据富化

本文档介绍如何通过资源函数和映射富化函数从 OSS 中获取数据对日志数据进行富化。

## 实践案例

- Raw log entries

  ```
  account :  Sf24asc4ladDS
  ```

- OSS CSV 文件数据

  | id  | account       | nickname   |
  | --- | ------------- | ---------- |
  | 1   | Sf24asc4ladDS | 多弗朗明哥 |
  | 2   | Sf24asc4ladSA | 凯多       |
  | 3   | Sf24asc4ladCD | 罗杰       |

- Transformation rule 通过日志服务 Logstore 中的 account 字段和 OSS CSV 文件中的 account 字段进行匹配，只有 account 字段的值完全相同，才能匹配成功。匹配成功后，返回 OSS CSV 文件中的 nickname 字段和字段值，与 Logstore 中的数据拼接，生成新的数据。

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

  res_oss_file 函数重要字段 Note 如下表所示。

  | 字段     | Note                                                                                                                                                                                                                                                                                                                  |
  | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | endpoint | OSS 访问域名，详情请参见[访问域名和数据中心](https://help.aliyun.com/document_detail/31837.htm?spm=a2c4g.11186623.2.11.3ae33dc46CPRr6#concept-zt4-cvy-5db)。                                                                                                                                                          |
  | ak_id    | 具备读 OSS 权限的 AccessKey ID。 出于安全考虑，建议配置为 res_local("AK_ID")，表示从高级参数配置中获取。高级参数配置 Procedure 请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.12.3ae33dc46CPRr6#task-1181217)。![](/img/dataprocessdemo/数据富化/高级参数设置2.png) |
  | ak_key   | 具备读 OSS 权限的 AccessKey Secret。 出于安全考虑，建议配置为 res_local("AK_KEY")，表示从高级参数配置中获取。                                                                                                                                                                                                         |
  | bucket   | 用于存储 CSV 文件的 OSS Bucket。                                                                                                                                                                                                                                                                                      |
  | file     | 您已上传的 CSV 文件的名称。                                                                                                                                                                                                                                                                                           |

- Transformation result

  ```
  account :  Sf24asc4ladDS
  nickname: 多弗朗明哥
  ```
