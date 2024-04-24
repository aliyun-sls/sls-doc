# Obtain the IPIP library from OSS and enrich IP address data

You can use the data transformation feature of Simple Log Service to obtain the IPIP library from Object Storage Service (OSS) and use the library to identify the city, state, and country to which an IP address belongs.

## Scenarios

- Raw log entries

  ```
  ip: 1.2.3.4
  ```

- Transformation rule

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

  The following table describes the fields in the res_oss_file function.

  | field    | Note                                                                                                                                                                                                                                                                                                                                                                                                                  |
  | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | endpoint | The endpoint that is used to access the OSS bucket.The endpoint that is used to access the OSS bucket.For more information, see [Regions and endpoints](https://www.alibabacloud.com/help/en/doc-detail/31837.htm?spm=a2c4g.11186623.2.11.65432740sPRgUI#concept-zt4-cvy-5db).                                                                                                                                        |
  | ak_id    | The AccessKey secret that has read permissions on OSS. For security concerns, we recommend that you set the value to res_local("AK_KEY") in the Advanced Parameter Settings field. For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.12.65432740sPRgUI#task-1181217).![](/img/dataprocessdemo/IP地址相关/高级参数配置.png) |
  | ak_key   | For security concerns, we recommend that you set the value to res_local("AK_KEY") in the Advanced Parameter Settings field.                                                                                                                                                                                                                                                                                           |
  | bucket   | The OSS bucket used to store the IP address library.                                                                                                                                                                                                                                                                                                                                                                  |
  | file     | The name of the IP address library that you have uploaded.                                                                                                                                                                                                                                                                                                                                                            |
  | format   | The format of the data obtained from the IP address library. Set the value to format='binary'。                                                                                                                                                                                                                                                                                                                       |
