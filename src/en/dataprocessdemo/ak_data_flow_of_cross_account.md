# Scenario 5：Use AccessKey pairs to transfer data across different Alibaba Cloud accounts

When you use a Resource Access Management (RAM) user to create a data transformation job, you can specify AccessKey pairs to transfer data across different Alibaba Cloud accounts.

## Step 1: Use Alibaba Cloud Account 1 to obtain the AccessKey pair of RAM User S

1. Log on to the [RAM console] by using an Alibaba Cloud account 1.(https://ram.console.aliyun.com/overview)。
2. Obtain the AccessKey pair of RAM User S.
For more information, see [Create an AccessKey pair for a RAM user](https://help.aliyun.com/document_detail/215905.htm?spm=a2c4g.11186623.0.0.2f5c4bebZ0UBih#task-188766).
  <table><tr><td bgcolor="#d6e7f8"><b>Note</b><br>The AccessKey secret of a RAM user is displayed only when you create the AccessKey pair for the RAM user. You cannot query the AccessKey secret after the AccessKey pair is created. Keep your AccessKey secret confidential.<br>If the AccessKey pair of a RAM user is disclosed or lost, you must create another AccessKey pair. You can create a maximum of two AccessKey pairs for a RAM user. </td></tr></table>

## Step 2: Use Alibaba Cloud Account 2 to obtain the AccessKey pair of RAM User T

1. Log on to the [RAM console] by using Alibaba Cloud Account 2.(https://ram.console.aliyun.com/overview)。
2. Obtain the AccessKey pair of RAM User T.
   For more information, see [Create an AccessKey pair for a RAM user].(https://help.aliyun.com/document_detail/215905.htm?spm=a2c4g.11186623.0.0.2f5c4bebZ0UBih#task-188766)。

   <table><tr><td bgcolor="#d6e7f8"><b>Note</b><br>The AccessKey secret of a RAM user is displayed only when you create the AccessKey pair for the RAM user. You cannot query the AccessKey secret after the AccessKey pair is created. Keep your AccessKey secret confidential.<br>If the AccessKey pair of a RAM user is disclosed or lost, you must create another AccessKey pair. You can create a maximum of two AccessKey pairs for a RAM user. </td></tr></table>

## If the AccessKey pair of a RAM user is disclosed or lost, you must create another AccessKey pair. You can create a maximum of two AccessKey pairs for a RAM user.

1. Log on to the [RAM console] by using an Alibaba Cloud account 1.(https://ram.console.aliyun.com/overview)。
2. Create a custom policy on the JSON tab.The policy grants the permissions to read data from the source Logstore.In this example, create a policy named **ori_read**.s
   For more information, see [Create custom policies](https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.720664a1umWb1J#task-2149286).Key parameter:

| Key parameter  | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Enter a name for the custom policy.Example:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **ori_read**   |
| Policy content | Replace the content in the code editor with the following script.<br>For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<pre>{<br> "Version": "1",<br> "Statement": [<br> {<br> "Action": [<br> "log:ListShards",<br> "log:GetCursorOrData",<br> "log:GetConsumerGroupCheckPoint",<br> "log:UpdateConsumerGroup",<br> "log:ConsumerGroupHeartBeat",<br> "log:ConsumerGroupUpdateCheckPoint",<br> "log:ListConsumerGroup",<br> "log:CreateConsumerGroup",<br> ],<br> "Resource": [<br> "acs:log:*:*:project/log-project-prod/logstore/access_log",<br> "acs:log:*:*:project/log-project-prod/logstore/access_log/*",<br> ],<br> "Effect": "Allow"<br> }<br> ]<br>}</pre> |

3. Grant the read permissions on the source Logstore to RAM User S.
   For more information, see [Grant permissions to a RAM role](https://help.aliyun.com/document_detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters.
   | Key parameter| Note |
   | -------| --------- |
   | **Authorized Scope** | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
   | **Principal** | Select**RAM User S**。 |
   | **Custom Policy** | Select**ori_read**。 |

## Step 4：Use Alibaba Cloud Account 2 to grant the write permissions on the destination Logstores to RAM User T.

1. Log on to the [RAM console](https://ram.console.aliyun.com/overview) by using Alibaba Cloud Account 2.
2. Create a custom policy on the JSON tab.The policy grants the permissions to write data to the destination Logstores.In this example, create a policy named**write**。
   For more information, see [Create custom policies](https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.720664a1umWb1J#task-2149286).The following table describes the key parameters:

| Key parameter  | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Enter a name for the custom policy.Example:**write**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Policy content | Replace the content in the code editor with the following script.<br>For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<br><pre>{<br> "Version": "1", <br> "Statement": [ <br> { <br> "Action": [ <br> "log:Post*",<br> "log:BatchPost*" <br> ],<br> "Resource": "acs:log:\*:\_:project/log-project-prod/logstore/access_log_output",<br> "Effect": "Allow" <br> }<br> ]<br>} </pre> |

3. Grant the read permissions on the source Logstore to RAM User T.
   For more information, see [Grant permissions to a RAM role](https://help.aliyun.com/document_detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters:
   | Key parameter| Note |
   | -------| --------- |
   | **Authorized Scope** | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
   | **Principal** | Select**User T**。|
   | **Custom Policy** | Select**write**。 |

## Step 5: Use the RAM user to create a data transformation job

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.10b94450uwe8VN) by using the RAM user.
2. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
3. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
4. In the code editor, enter the following data transformation statement.
   For more information, see [Data processing syntax].(https://help.aliyun.com/document_detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584)。
5. Preview data.
   a. Select **Quick**.
   You can select Quick or Advanced.For more information, see [Preview mode overview](https://help.aliyun.com/document_detail/175654.htm?spm=a2c4g.11186623.0.0.10b9708cCzGvXG#task-2565077).
   b. Click Preview Data.
   View the transformation results.

   - If the data fails to be transformed because the syntax of the transformation statement or the permissions are invalid, troubleshoot the failure as prompted.
   - If the transformed data is returned as expected, go to the next step.

6. Create a data transformation job.
   a. Click **Save as Transformation Job**.
   b. In the **Create Data Transformation Job** panel, configure the parameters and click **OK**.
   For more information about parameter configurations, see [Get started with data transformation](https://help.aliyun.com/document_detail/140895.htm?spm=a2c4g.11186623.0.0.10b94b411wYwnX#task-2316153).The following table describes the key parameters:
   Create Data Transformation Job 1](/img/dataprocessdemo/配置数据加工/创建 Transformation rule 1.png)
   the AccessKey pair of RAM User S.

   | Key parameter                               | Note                               |
   | ------------------------------------------- | ---------------------------------- |
   | Authorization Method                        | Select **AccessKey**               |
   | AccessKey ID                                | RAM User S of the AccessKey ID     |
   | AccessKey Secret                            | RAM User S of the AccessKey Secret |
   | Authorization Method in Storage Destination | Select**AccessKey**                |
   | AccessKey ID                                | RAM User T of the AccessKey ID     |
   | AccessKey Secret                            | RAM User T of the AccessKey Secret |

After the data transformation job is created and run, data can be transferred across the two Alibaba Cloud accounts.For more information, see [Manage a data transformation job](https://help.aliyun.com/document_detail/128744.htm?spm=a2c4g.11186623.0.0.10b92b0d2iORzE#task-1580295).
