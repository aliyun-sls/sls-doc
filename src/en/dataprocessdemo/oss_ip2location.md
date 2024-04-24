# Obtain the IP2Location library from OSS and enrich IP address data

You can use the data transformation feature of Simple Log Service to obtain the IP2Location library from Object Storage Service (OSS) and use the library to identify the city, state, and country to which an IP address belongs.

## Preconditions

- AccessKey pairs are created to access an OSS bucket. For more information, see [Create an AccessKey pair for a RAM user](https://www.alibabacloud.com/help/en/doc-detail/116401.htm?spm=a2c4g.11186623.2.5.4c87415aMxKjv2#task-188766).

  We recommend that you create an AccessKey pair that has read-only permissions on the OSS bucket and an AccessKey pair that has write-only permissions on the OSS bucket. This way, you can use the first AccessKey pair to read data from the OSS bucket and use the second AccessKey pair to write data to the OSS bucket.For more information, see [RAM policies](https://www.alibabacloud.com/help/en/doc-detail/100680.htm?spm=a2c4g.11186623.2.6.4c87415aMxKjv2#concept-y5r-5rm-2gb).

- The IP2Location library is downloaded from the IPIP.NET website and uploaded to OSS. For more information, see [Upload an object](https://www.alibabacloud.com/help/en/doc-detail/31886.htm?spm=a2c4g.11186623.2.7.4c87415aMxKjv2#concept-zx1-4p4-tdb).

  We recommend that you use an AccessKey pair that has write-only permissions on OSS to upload the library.

## Examples

- Raw log entries

  ```
  ip: 19.0.0.0
  ```

- Transformation rule

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

  The following table describes the fields in the res_oss_file function.

  | field    | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | endpoint | The endpoint that is used to access the OSS bucket. For more information, see [Regions and endpoints](https://www.alibabacloud.com/help/en/doc-detail/31837.htm?spm=a2c4g.11186623.2.11.4996415aKwzQM9#concept-zt4-cvy-5db)。                                                                                                                                                                                                                                                |
  | ak_id    | The AccessKey ID that has read permissions on OSS. For security concerns, we recommend that you set the value to res_local("AK_ID") in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.12.4996415aKwzQM9#task-1181217).![](/img/dataprocessdemo/IP地址相关/高级参数配置.png) |
  | ak_key   | The AccessKey secret that has read permissions on OSS.For security concerns, we recommend that you set the value to res_local("AK_KEY") in the Advanced Parameter Settings field.                                                                                                                                                                                                                                                                                            |
  | bucket   | The OSS bucket used to store the IP address library.                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | file     | The name of the IP address library that you have uploaded.                                                                                                                                                                                                                                                                                                                                                                                                                   |
  | format   | The format of the data obtained from the IP address library. Set the value to format='binary'。                                                                                                                                                                                                                                                                                                                                                                              |

- Transformation result

  ```
  ip: 19.0.0.0
  city: Dearborn
  province: Michigan
  country: United States
  ```
