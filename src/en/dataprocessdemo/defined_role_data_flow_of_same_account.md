# Scenario 2：Use custom roles to transfer data within the same Alibaba Cloud account

Use the RAM user to create a data transformation job 时，您可以通过自定义角色完成同账号内的日志数据流转。

## Step 1：Use Alibaba Cloud Account to create Role B

1. Log on to the [RAM console] by using an Alibaba Cloud account.(https://ram.console.aliyun.com/overview)。
2. Create Role A.
   For more information, see [Create a RAM role for a trusted Alibaba Cloud service](https://www.alibabacloud.com/help/en/doc-detail/116800.htm?spm=a2c4g.11186623.0.0.16f11550FDwDIG#task-2448632).The following table describes the key parameters.
   | Key parameter| Note |
   | -------| --------- |
   | **Select Trusted Entity** | Select **Alibaba Cloud service**。 |
   | **Role Type** | Select **Normal Service Role**。|
   | **Role Name** | Enter a name for the role. Example: role-A。 |
   | Select**Normal Service Role**。 | Select **Simple Log Service**。 |

## Step 二：Use Alibaba Cloud Account 1 to grant the read permissions on the source Logstore to RAM User A

1.  Log on to the [RAM console] by using an Alibaba Cloud account.(https://ram.console.aliyun.com/overview)。
2.  Create a custom policy on the JSON tab.The policy grants the permissions to read data from the source Logstore.In this example, create a policy named **ori_read**.
    For more information, see [Create custom policies].(https://www.alibabacloud.com/help/en/doc-detail/93733.htm?spm=a2c4g.11186623.0.0.16f11ff58fILkp#task-2149286)The following table describes the key parameters.

        |Key parameter| Note |
        | -- | -- |
        |Name| Enter a name for the custom policy.Example:**ori_read** |
        | Policy content | Replace the content in the code editor with the following script.<br>For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<br><pre>{<br>  "Version": "1",<br>  "Statement": [<br>    {<br>      "Action": [<br>        "log:ListShards",<br>        "log:GetCursorOrData",<br>        "log:GetConsumerGroupCheckPoint",<br>        "log:UpdateConsumerGroup",<br>        "log:ConsumerGroupHeartBeat",<br>        "log:ConsumerGroupUpdateCheckPoint",<br>        "log:ListConsumerGroup",<br>        "log:CreateConsumerGroup",<br>      ],<br>      "Resource": [<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log",<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log/*",<br>      ],<br>      "Effect": "Allow"<br>    }<br>  ]<br>}</pre>

3.  Grant the read permissions on the source Logstore to role A.
    For more information, see [Grant permissions to a RAM role](https://www.alibabacloud.com/help/en/doc-detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters.

        | **Key parameter** | **Note** |
        | -- | -- |
        | **Authorized Scope** | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
        | **Principal** | Select **role-A** |
        | **Custom Policy** | Select**ori_read**。 |

4.  Obtain the Alibaba Cloud Resource Name (ARN) of the RAM role.
    In the **Basic Information** section on the details page of Role A, obtain the ARN of the role. Example:`acs:ram::1379******44:role/role-a`。

## Step 3：Use Alibaba Cloud Account to create Role B

1. Log on to the [RAM console] by using an Alibaba Cloud account.(https://ram.console.aliyun.com/overview)。
   2.create Role B
   For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/116800.htm?spm=a2c4g.11186623.0.0.72064450hX7Yq6#task-2448632).The following table describes the key parameters.

   | Key parameter                    | Note                                         |
   | -------------------------------- | -------------------------------------------- |
   | **Select Trusted Entity**        | Select **Alibaba Cloud service**。           |
   | **Role Type**                    | Select **Normal Service Role**。             |
   | **Role Name**                    | Enter a name for the role. Example: role-B。 |
   | Select **Normal Service Role**。 | Select **Simple Log Service**                |

## Step 4：Use Alibaba Cloud Account 2 to grant the write permissions to Role B

1.  Log on to the [RAM console] by using an Alibaba Cloud account.(https://ram.console.aliyun.com/overview)。
2.  Create a custom policy on the JSON tab.The policy grants the permissions to write data to the destination Logstores.In this example, create a policy named **write**。
    For more information, see [Create custom policies](https://www.alibabacloud.com/help/en/doc-detail/93733.htm?spm=a2c4g.11186623.0.0.720664a1umWb1J#task-2149286).The following table describes the key parameters.

        |Key parameter| Note |
        | -- | -- |
        |Name| Enter a name for the custom policy.Example:write |
        | Policy content | Replace the content in the code editor with the following script.For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<br><pre>{<br>  "Version": "1", <br>  "Statement": [ <br>   {  <br>     "Action": [  <br>       "log:Post*",<br>       "log:BatchPost*" <br>     ],<br>     "Resource": "acs:log:*:*:project/log-project-prod/logstore/access_log_output",<br>     "Effect": "Allow" <br>   }<br>  ]<br>} </pre>|

3.  Grant the write permissions on the destination Logstores torole B
    For more information, see [Grant permissions to a RAM role](https://www.alibabacloud.com/help/en/doc-detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters.
    | Key parameter| Note |
    | -------| --------- |
    | Authorized Scope | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
    | Principal | Select **role-B**|
    | Custom Policy | Select **write**。 |

4.  Obtain the Alibaba Cloud Resource Name (ARN) of the RAM role.
    In the **Basic Information** section on the details page of Role B, obtain the ARN of the role. Example:`acs:ram::1379******44:role/role-b`。

## Step 5：Use the RAM user to create a data transformation job

1. Log on to the Simple Log Service console by using the RAM user.(https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.10b94450uwe8VN)。
2. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
3. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
4. In the code editor, enter the following data transformation statement.
   For more information, see [Data processing syntax](https://www.alibabacloud.com/help/en/doc-detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584).(https://www.alibabacloud.com/help/en/doc-detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584)。
5. Preview data in advanced mode.
   a. Select **Quick**.
   You can select Quick or Advanced.For more information, see [Preview mode overview].(https://www.alibabacloud.com/help/en/doc-detail/175654.htm?spm=a2c4g.11186623.0.0.10b9708cCzGvXG#task-2565077)。
   b. 单击 Preview data in advanced mode.
   View the transformation results.

   - If the data fails to be transformed because the syntax of the transformation statement or the permissions are invalid, troubleshoot the failure as prompted.
   - If the transformed data is returned as expected, go to the next step.

6. Create a data transformation job.
   a. Click **Save as Transformation Job**.
   b.In the **Create Data Transformation Job** panel, configure the parameters and click **OK**.
   For more information about parameter configurations, see [Get started with data transformation](https://www.alibabacloud.com/help/en/doc-detail/140895.htm?spm=a2c4g.11186623.0.0.10b94b411wYwnX#task-2316153).The following table describes the key parameters.


| Key parameter                               | Note                                                              |
| ------------------------------------------- | ----------------------------------------------------------------- |
| Authorization Method                        | Select **custom roles**                                           |
| role ARN                                    | Enter for the role A. Example:`acs:ram::1379******44:role/role-a` |
| Authorization Method in Storage Destination | Select**custom roles**                                            |
| role ARN                                    | Enter for the role B. Example:`acs:ram::1379******44:role/role-b` |

After the data transformation job is created and run, data can be transferred across the two Alibaba Cloud accounts.For more information, see [Manage a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/128744.htm?spm=a2c4g.11186623.0.0.10b92b0d2iORzE#task-1580295).
