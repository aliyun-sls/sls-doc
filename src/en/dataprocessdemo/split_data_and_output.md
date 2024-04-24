# Replicate and distribute data

Simple Log Service allows you to replicate data from a source Logstore to a destination Logstore. To replicate the data, you can create a data transformation job for the source Logstore.This topic describes how to replicate data from a source Logstore to a destination Logstore in a typical scenario.

## Scenario Note

A data analytics company wants to replicate all log entries from a source Logstore and distribute the log entries to two destination Logstores.The replication and distribution features of Simple Log Service allow the company to use the e_set function to specify tags, use the e_split function to categorize the log entries based on the tags that you specify, and then use the e_output function to distribute each category of log entries to the destination Logstore that matches the tag for the category.The following figure shows the basic logic of the replication and distribution features.
![split](/img/dataprocessdemo/p228486.png)

- A project named target-a and a Logstore named logstore-a are created. A project named target-b and a Logstore named logstore-b are created.For example, evaluate the number of shards in each of these Logstores.For more information, see [Performance guide](https://www.alibabacloud.com/help/en/doc-detail/135496.htm?spm=a2c4g.11186623.2.6.729765fdl9EAWW#concept-2055068).

- A project named target-a and a Logstore named logstore-a are created. A project named target-b and a Logstore named logstore-b are created.For more information, see [Manage a project](https://www.alibabacloud.com/help/en/doc-detail/48984.htm?spm=a2c4g.11186623.2.7.729765fdl9EAWW#concept-mxk-414-vdb) and [Manage a Logstore](https://www.alibabacloud.com/help/en/doc-detail/48990.htm?spm=a2c4g.11186623.2.8.729765fdl9EAWW#concept-xkb-zh5-vdb).

## Procedure

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com).(https://partners-intl.console.aliyun.com/#/sls)。

2. In the **Projects** section, click Destination Project。

3. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click

4. In the upper-right corner of the query and analysis page, click **Data Transformation**.

5. In the code editor, enter a data transformation statement.

   ```python
   e_set("tags","target-a","target-b")
   e_split("tags")
   e_if(op_eq(v("tags"), "target-a"), e_output("target-a"))
   e_if(op_eq(v("tags"), "target-b"), e_output("target-b"))
   e_drop()
   ```

   - Use the e_set function to specify target-a and target-b as tags for raw log entries.For more information, see[e_set](https://www.alibabacloud.com/help/en/doc-detail/125487.htm?spm=a2c4g.11186623.2.10.293765fdzgnMo1#section-7cr-8gz-by2).

   - Use the e_split function to categorize raw log entries based on the tags that you specify.For more information, see[e_split](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.2.11.293765fdzgnMo1#section-urg-dob-o79)。

   - Use the e_output function to distribute the log entries that are categorized by the e_split function to the target-a and target-b storage destinations.For more information, see[e_output](https://www.alibabacloud.com/help/en/doc-detail/0.htm?spm=a2c4g.11186623.2.12.293765fdzgnMo1#section-zi7-wtp-30c)。

   - Use the e_drop() function to specify conditions. If a log entry does not meet the specified conditions, the log entry is dropped and is not distributed.For more information, see[e_drop](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.2.13.293765fdzgnMo1#section-sn7-4pm-kly).

6. click **Preview data** 。

On the Transformation Results tab, the specified tags are added to raw log entries. The raw log entries with the target-a tag are distributed to the target-a storage destination, and the raw log entries with the target-b tag are distributed to the target-b storage destination.![](/img/dataprocessdemo/p228492.png)

7. Click **Save as Transformation Job**

8. In the **Create Data Transformation Job** panel, configure the following parameters.

   1. Configure the basic parameters.

      | parameter            | Note                                                                                                                 |
      | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
      | Job Name             | The name of the data transformation job.Example: test.                                                               |
      | Authorization Method | The method that is used to authorize Simple Log Service to read data from the source Logstore.Example: Default Role. |

   2. Configure the parameters for the target-a storage destination.

      | parameter            | Note                                                                                                                                                                |
      | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
      | Destination Name     | The name of the storage destination.Example: target-a。                                                                                                             |
      | Destination Region   | The region in which the destination project resides.                                                                                                                |
      | Destination Project  | The name of the destination project.                                                                                                                                |
      | Target Store         | The name of the destination Logstore.                                                                                                                               |
      | Authorization Method | The method that is used to authorize Simple Log Service to read data from and write data to the logstore-a Logstore of the target-a project. Example: Default Role. |

   3. target-b Storage Destination

   | parameter            | Note                                                                                                              |
   | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
   | Destination Name     | The name of the storage destination.输入 target-b。                                                               |
   | Destination Region   | The region in which the destination project resides.In this example, the China (Hangzhou) region is used.         |
   | Destination Project  |                                                                                                                   |
   | Target Store         | Logstore name logstore-b。                                                                                        |
   | Authorization Method | Authorizes Simple Log Service to read data from and write data to the logstore-b Logstore. Example: Default Role. |

   4. Specify a time range for data transformation.

      | parameter  | Note                                                                                                                                                                 |
      | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
      | Time Range | The time range for data transformation. If you select All, Simple Log Service transforms all data in the source Logstore from the start of the specified time range. |

9. Click **OK**. 。

## Result

- In the Projects section, click the target-a project. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the logstore-a Logstore. Then, you can view the log entries that are distributed to the logstore-a Logstore.![](/img/dataprocessdemo/p228506.png)

- In the Projects section, click the target-b project. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the logstore-b Logstore. Then, you can view the log entries that are distributed to the logstore-a Logstore.![](/img/dataprocessdemo/p228518.png)
