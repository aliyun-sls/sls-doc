# Scenario 3：Use custom roles to transfer data across different Alibaba Cloud accounts

Use the RAM user to create a data transformation job 时，您可以通过自定义角色完成跨账号的日志数据流转。

## Step 1: Use Alibaba Cloud Account 1 to create Role A

1. Log on to the [RAM console] by using an Alibaba Cloud account 1.(https://ram.console.aliyun.com/overview)。
2. Create Role A.
   For more information, see [Create a RAM role for a trusted Alibaba Cloud service](https://www.alibabacloud.com/help/en/doc-detail/116800.htm?spm=a2c4g.11186623.0.0.16f11550FDwDIG#task-2448632).The following table describes the key parameters.
   | Key parameter| Note |
   | -------| --------- |
   | **Select Trusted Entity** | Select**Alibaba Cloud service**。 |
   | **Role Type** | Select**Normal Service Role**。 |
   | **Role Name** | Enter a name for the role. Example: role-A。 |
   | **Select Trusted Service** | Select**Simple Log Service**。 |

## Step 2：Use Alibaba Cloud Account 1 to grant the write permissions to Role B

1.  Log on to the [RAM console] by using an Alibaba Cloud account.(https://ram.console.aliyun.com/overview)。
2.  Create a custom policy on the JSON tab.The policy grants the permissions to read data from the source Logstore.In this example, create a policy named **ori_read**.
    For more information, see [Create custom policies](https://www.alibabacloud.com/help/en/doc-detail/93733.htm?spm=a2c4g.11186623.0.0.16f11ff58fILkp#task-2149286).The following table describes the key parameters.

        |Key parameter| Note |
        | -- | -- |
        |Name| Enter a name for the custom policy.Example:**ori_read** |
        | Policy content | Replace the content in the code editor with the following script.<br>For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<pre>{<br>  "Version": "1",<br>  "Statement": [<br>    {<br>      "Action": [<br>        "log:ListShards",<br>        "log:GetCursorOrData",<br>        "log:GetConsumerGroupCheckPoint",<br>        "log:UpdateConsumerGroup",<br>        "log:ConsumerGroupHeartBeat",<br>        "log:ConsumerGroupUpdateCheckPoint",<br>        "log:ListConsumerGroup",<br>        "log:CreateConsumerGroup",<br>      ],<br>      "Resource": [<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log",<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log/*",<br>      ],<br>      "Effect": "Allow"<br>    }<br>  ]<br>}</pre>|

3.  Grant the read permissions on the source Logstore to Role A.
    For more information, see [Grant permissions to a RAM role](https://www.alibabacloud.com/help/en/doc-detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters.

        | Key parameter| Note |
          | -------| --------- |
          | **Authorized Scope** | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
          | **Principal** | Select**role-A**.[Step 1：Use Alibaba Cloud Account to create Role A](https://www.alibabacloud.com/help/en/doc-detail/448355.html#section-l8g-pgl-8rq)create Role role-A。 |
          | **Custom Policy** | Select**ori_read**。 |

4.  Obtain the Alibaba Cloud Resource Name (ARN) of the RAM role.
    In the **Basic Information** section on the details page of Role A, obtain the ARN of the role. Example:`acs:ram::1379******44:role/role-a`。

## Step 3：Use Alibaba Cloud Account 2 to create Role B

1. Log on to the [RAM console](https://ram.console.aliyun.com/overview) by using Alibaba Cloud Account 2.
2. create Role B。
   For more information, see [Create a RAM role for a trusted Alibaba Cloud service].(https://www.alibabacloud.com/help/en/doc-detail/116800.htm?spm=a2c4g.11186623.0.0.72064450hX7Yq6#task-2448632)The following table describes the key parameters.

   | Key parameter                   | Note                                         |
   | ------------------------------- | -------------------------------------------- |
   | **Select Trusted Entity**       | Select**Alibaba Cloud service**。            |
   | **Role Type**                   | Select**Normal Service Role**。              |
   | **Role Name**                   | Enter a name for the role. Example: role-B。 |
   | Select**Normal Service Role**。 | Select**Simple Log Service**。               |

## Step 4：Use Alibaba Cloud Account 2 to grant the write permissions to Role B

1. Log on to the [RAM console](https://ram.console.aliyun.com/overview) by using Alibaba Cloud Account 1.
2. Create a custom policy on the JSON tab.The policy grants the permissions to write data to the destination Logstores.In this example, create a policy named**write**。
   For more information, see [Create custom policies](https://www.alibabacloud.com/help/en/doc-detail/93733.htm?spm=a2c4g.11186623.0.0.720664a1umWb1J#task-2149286).The following table describes the key parameters.

| Key parameter  | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name           | Enter a name for the custom policy.Example:**write**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Policy content | Replace the content in the code editor with the following script.<br>For example, the name of the source project is log-project-prod. The name of the source Logstore is access_log_output.You can replace the project and Logstore names based on your business requirements.<br><pre>{<br> "Version": "1", <br> "Statement": [ <br> { <br> "Action": [ <br> "log:Post*",<br> "log:BatchPost*" <br> ],<br> "Resource": "acs:log:\*:\_:project/log-project-prod/logstore/access_log_output",<br> "Effect": "Allow" <br> }<br> ]<br>} </pre> |

1. 为角色 B 授予目标 Logstore 写权限。
   For more information, see [Grant permissions to a RAM role](https://www.alibabacloud.com/help/en/doc-detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801).The following table describes the key parameters.
   | Key parameter| Note |
   | -------| --------- |
   | **Authorized Scope** | Select **Alibaba Cloud Account**.The permissions granted to the RAM user take effect on resources within the current Alibaba Cloud account. |
   | **Principal** | 选择**role-B**。即您在[Step 三：使用阿里云账号创建角色 B](https://www.alibabacloud.com/help/en/doc-detail/448355.html#section-jp3-5x0-7bc)中创建的角色 role-B。 |
   | **Custom Policy** | 选择**write**。 |

2. 获取 RAM 角色标识（ARN）。
   在该角色 B 的**基本信息**中查看，例如`acs:ram::1379******44:role/role-b`。

## Step 五：使用阿里云账号 2 通过角色 B 向阿里云账号 1 授信

1. 使用阿里云账号 2 登录[RAM 控制台](https://ram.console.aliyun.com/overview)。
2. 在左侧导航栏中，选择**身份管理 > 角色**。
3. 在 RAM 角色列表中，单击目标 RAM 角色，例如 role-B。
4. 在**信任策略管理**页签中，单击**修改信任策略**。
5. 修改信任策略。
   在**Service**配置项中添加阿里云账号 1 的 ID。其中，请根据实际情况替换阿里云账号 1 的 ID。您可以在[账号中心](https://account.console.aliyun.com/v2/?spm=a2c4g.11186623.0.0.1dc34450ZA4Sff#/basic-info/index)查看阿里云账号 ID。该策略表示阿里云账号 1 有权限通过日志服务获取临时 Token 来操作阿里云账号 2 的资源。
   `   {
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "阿里云账号1的ID@log.aliyuncs.com"
                ]
            }
        }
    ],
    "Version": "1"
}`

## Step 六：Use the RAM user to create a data transformation job

1.  Log on to the Simple Log Service console by using the RAM user.(https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.10b94450uwe8VN)。
2.  Go to the data transformation page.
    a. In the Projects section, click the desired project.
    b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
    c. On the query and analysis page, click **Data Transformation**.
3.  In the upper-right corner of the page, specify a time range for the required log data.
    Make sure that log data exists on the **Raw Logs** tab.
4.  In the code editor, enter the following data transformation statement.
    For more information, see [Data processing syntax](https://www.alibabacloud.com/help/en/doc-detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584).(https://www.alibabacloud.com/help/en/doc-detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584)。
5.  Preview data in advanced mode.
    a. Select **Quick**.
    You can select Quick or Advanced.For more information, see [Preview mode overview].(https://www.alibabacloud.com/help/en/doc-detail/175654.htm?spm=a2c4g.11186623.0.0.10b9708cCzGvXG#task-2565077)。
    b. 单击 Preview data in advanced mode.
    View the transformation results.

    - If the data fails to be transformed because the syntax of the transformation statement or the permissions are invalid, troubleshoot the failure as prompted.
    - If the transformed data is returned as expected, go to the next step.

6.  Create a data transformation job.
    a. Click **Save as Transformation Job**.
    b.In the **Create Data Transformation Job** panel, configure the parameters and click **OK**.
    For more information about parameter configurations, see [Get started with data transformation](https://www.alibabacloud.com/help/en/doc-detail/140895.htm?spm=a2c4g.11186623.0.0.10b94b411wYwnX#task-2316153).The following table describes the key parameters.


        |Key parameter| Note |
        | -- | -- |
        |Authorization Method| Select**custom roles** |
        | role ARN | Enter the ARN for role A. for example: `acs:ram::1379******44:role/role-a` |
        | Authorization Method in Storage Destination| Select**custom roles** |
        | role ARN | Enter the ARN for role B. for example:`acs:ram::1379******44:role/role-b` |

After the data transformation job is created and run, data can be transferred within the same Alibaba Cloud account.For more information, see [Manage a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/128744.htm?spm=a2c4g.11186623.0.0.10b92b0d2iORzE#task-1580295).
