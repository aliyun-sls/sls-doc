# Scenario 1：Use a default role to transfer data within the same Alibaba Cloud account

When you use a Resource Access Management (RAM) user to create a data transformation job, you can specify a default role to transfer log data within the same Alibaba Cloud account.

## Step 1：Use an Alibaba Cloud account to create the AliyunLogETLRole system role

<table><tr><td bgcolor="#d6e7f8"><b>Note</b> This step is required for the first time you grant permissions to the AliyunLogETLRole system role.If the system role is granted the required permissions within your Alibaba Cloud account, you can skip this step.</td></tr></table>
If you want to use a RAM user that assumes the default role to create a data transformation job, make sure that the AliyunLogETLRole role exists within your Alibaba Cloud account. If the AliyunLogETLRole role does not exist in your Alibaba Cloud account, you need to contact the owner of your Alibaba Cloud account to create the role.

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/lognext/profile) by using an Alibaba Cloud account.
2. Grant permissions to the AliyunLogETLRole system role.

   - Method 1
     Click [You must authorize the system role AliyunLogETLRole].(https://ram.console.aliyun.com/role/authorization?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT&request=%7B%22Services%22%3A%5B%7B%22Service%22%3A%22Log%22%2C%22Roles%22%3A%5B%7B%22RoleName%22%3A%22AliyunLogETLRole%22%2C%22TemplateId%22%3A%22ETL%22%7D%5D%7D%5D%2C%22ReturnUrl%22%3A%22https%3A%2F%2Fsls.console.aliyun.com%22%7D),Follow the wizard to complete authorization.

   - Method 2
     In the **Create Data Transformation Job** panel, click [You must authorize the system role AliyunLogETLRole] below **Default Role**.(https://ram.console.aliyun.com/role/authorization?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT&request=%7B%22Services%22%3A%5B%7B%22Service%22%3A%22Log%22%2C%22Roles%22%3A%5B%7B%22RoleName%22%3A%22AliyunLogETLRole%22%2C%22TemplateId%22%3A%22ETL%22%7D%5D%7D%5D%2C%22ReturnUrl%22%3A%22https%3A%2F%2Fsls.console.aliyun.com%22%7D),Follow the wizard to complete authorization.

## Step 二：Use the RAM user to create a data transformation job

1. Log on to the Simple Log Service console by using the RAM user.(https://sls.console.aliyun.com/lognext/profile)。
2. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
3. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
4. In the code editor, enter the following data transformation statement.
   For more information, see [Data processing syntax](https://help.aliyun.com/document_detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584).(https://help.aliyun.com/document_detail/125439.htm?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT#concept-1130584)。

5. Preview data in advanced mode.
   a. Select **Quick**.
   You can select Quick or Advanced.For more information, see [Preview mode overview].(https://help.aliyun.com/document_detail/175654.htm?spm=a2c4g.11186623.0.0.3ecc708czav3P0#task-2565077)。
   b. Click **Preview Data**.
   View the transformation results.
   _ If the data fails to be transformed because the syntax of the transformation statement or the permissions are invalid, troubleshoot the failure as prompted.
   _ If the transformed data is returned as expected, go to the next step.
6. Create a data transformation job.
   a. Click **Save as Transformation Job**.
   b.In the **Create Data Transformation Job** panel, configure the parameters and click **OK**.
   For more information about parameter configurations, see [Get started with data transformation](https://help.aliyun.com/document_detail/140895.htm?spm=a2c4g.11186623.0.0.3ecc4b41qzBlx8#task-2316153).The following table describes the key parameters.

   ![data transformation job1](/img/dataprocessdemo/配置数据加工/数据加工作业1.png)
   | Key parameter| Note |
   | -------| --------- |
   | **Authorization Method** | Select **Default Role.**. |
   | **Authorization Method in Storage Destination** | Select **Default Role.**. |

After the data transformation job is created and run, data can be transferred across the two Alibaba Cloud accounts.For more information, see [Manage a data transformation job](https://help.aliyun.com/document_detail/128744.htm?spm=a2c4g.11186623.0.0.3ecc2b0dnrsMRZ#task-1580295)。
