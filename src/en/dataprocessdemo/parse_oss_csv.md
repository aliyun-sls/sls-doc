# Retrieve CSV files from OSS for data enrichment

This topic describes how to use resource functions to pull data from Object Storage Service (OSS) and use mapping functions to map the data fields to data fields in Simple Log Service. This way, you can enrich log data in Simple Log Service.

## Examples

- Raw log entries

  ```
  account :  Sf24asc4ladDS
  ```

- OSS CSV file data

  | id  | account       | nickname |
  | --- | ------------- | -------- |
  | 1   | Sf24asc4ladDS | xiaoming |
  | 2   | Sf24asc4ladSA | xiaohua  |
  | 3   | Sf24asc4ladCD | xiaoc    |

- Transformation rule. Simple Log Service maps the account field in the specified Logstore to the account field in the specified CSV file. If the value of the account field in the specified OSS bucket and Logstore equals each other, the two fields are matched.Then, the nickname field and field value in the CSV file are concatenated with the fields in the specified Logstore.

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

  res_oss_file The following table describes the fields in the function.

  | filed    | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
  | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | endpoint | The endpoint that is used to access the OSS bucket. For more information, see [Regions and endpoints](https://www.alibabacloud.com/help/en/doc-detail/31837.htm?spm=a2c4g.11186623.2.11.3ae33dc46CPRr6#concept-zt4-cvy-5db).。                                                                                                                                                                                                                                             |
  | ak_id    | The AccessKey ID that has read permissions on OSS.For security concerns, we recommend that you set the value to res_local("AK_ID") in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.12.3ae33dc46CPRr6#task-1181217). |
  | ak_key   | The AccessKey secret that has read permissions on OSS. For security concerns, we recommend that you set the value to res_local("AK_KEY") in the Advanced Parameter Settings field.                                                                                                                                                                                                                                                                                         |
  | bucket   | The OSS bucket that is used to store the CSV file.                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | file     | The name of the uploaded CSV file.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

- Transformation result

  ```
  account :  Sf24asc4ladDS
  nickname: xiaoming
  ```
