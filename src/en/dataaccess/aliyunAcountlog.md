# Use Logtail to collect logs across Alibaba Cloud accounts

This topic describes how to collect logs from a server across Alibaba Cloud accounts.

## Step 1: Create a user identifier file

1. Log on to an Elastic Compute Service (ECS) instance that belongs to Alibaba Cloud Account B.
   **You must create a user identifier file on each ECS instance of ECS Cluster B.**

2. Run the following command to create a user identifier file.

- In this example, a file named the ID of Alibaba Cloud Account A is created.For more information, see [Configure a user identifier].(https://help.aliyun.com/zh/sls/user-guide/configure-a-user-identifier?spm=a2c4g.11186623.0.i7#task-arl-ynt-qy){target="_blank"}。

```
touch /etc/ilogtail/users/12****456
```

## Step 2: Create a custom identifier-based machine group

1. Create a custom identifier file for the machine group on an ECS instance.
   **You must create a custom identifier file for the machine group on each ECS instance of ECS Cluster B.**
   > a.Log on to an ECS instance that belongs to Alibaba Cloud Account B.
   > b.Create a file named /etc/ilogtail/user_defined_id in the specified directory and specify a custom identifier in the /etc/ilogtail/user_defined_id file.

- For example, if you want to set the custom identifier to application_b, specify application_b in the file and save the file.For more information about file paths, see [Create a custom identifier-based machine group].(https://help.aliyun.com/zh/sls/user-guide/create-a-custom-identifier-based-machine-group?spm=a2c4g.11186623.0.i11#concept-gyy-k3q-zdb){target="_blank"}。

2. Create a machine group in the Simple Log Service console.

   > a.Log on to the Simple Log Service console by using Alibaba Cloud Account A.
   > b.In the Projects section, click the name of the project that you want to manage.
   > c.In the left navigation pane, choose Resource > Machine Group.
   > d.On the Machine Group tab, choose More > Create Machine Group.
   > e.In the Create Machine Group panel, configure the parameters and click OK. The following figure shows the parameters.

   - In the Custom Identifier field, enter the custom identifier that you specified in Step 1.For more information about other parameters, see [Create a custom identifier-based machine group].(https://help.aliyun.com/zh/sls/user-guide/create-a-custom-identifier-based-machine-group?spm=a2c4g.11186623.0.i11#concept-gyy-k3q-zdb){target="_blank"}.
3. Check whether the heartbeat status of each server in the machine group is OK.
   > a.In the Machine Group list, click the name of the machine group that you created.。
   > b.On the Machine Group Configurations page, view the status of the machine group. You can view a list of ECS instances that use the same custom identifier. You can also view the heartbeat status of each ECS instance.。

- If the heartbeat status of an ECS instance is OK, the ECS instance is connected to Simple Log Service.If the status is FAIL, see [How do I troubleshoot an error that is related to a Logtail machine group in a host environment?].(https://help.aliyun.com/zh/sls/user-guide/create-a-custom-identifier-based-machine-group?spm=a2c4g.11186623.0.i11#concept-gyy-k3q-zdb){target="_blank"}.


## Step 3: Collect logs

1. Log on to the Simple Log Service console by using Alibaba Cloud Account A.
2. In the Import Data section, click Regular Expression - Text Log.
3. In the Select Logstore step, select a project and a Logstore, and then click Next.
4. In the Create Machine Group step, click Use Existing Machine Groups.
5. In the Machine Group Configurations step, select the machine group that you created in Step 2, move the machine group from the Source Machine Group section to the Applied Server Groups section, and then click Next.
6. Create a Logtail configuration and click Next.

- For information about the parameters, see [Collect logs in full regex mode].

> Important:

- By default, you can use only one Logtail configuration to collect each log file.The collection process of Logtail in Alibaba Cloud Account B is not stopped. In this case, the Logtail configuration of Alibaba Cloud Account A cannot take effect. To ensure that the Logtail configuration of Alibaba Cloud Account A takes effect, you can use one of the following methods:
  > Stop the collection process in Alibaba Cloud Account B. To stop the collection process, log on to the Simple Log Service console by using Alibaba Cloud Account B and remove the original Logtail configuration from the machine group.For more information, see the [Apply Logtail configurations to a machine group] section of the "Manage machine groups" topic.(https://help.aliyun.com/zh/sls/user-guide/manage-machine-groups?spm=a2c4g.11186623.0.i0#section-gqq-rp1-ry){target="_blank"}。
  > Add compulsory collection settings to the Logtail configuration of Alibaba Cloud Account A.For more information, see [What do I do if I want to use multiple Logtail configurations to collect logs from a log file?](https://help.aliyun.com/zh/sls/user-guide/what-do-i-do-if-i-want-to-use-multiple-logtail-configurations-to-collect-logs-from-a-log-file?spm=a2c4g.11186623.0.i11#concept-2180900){target="_blank"}。
- After you create the Logtail configuration, delete the original Logtail configuration of Alibaba Cloud Account B to prevent repeated collection of logs.For more information, see the [Delete Logtail configurations] section of the "Manage Logtail configurations for log collection" topic.(https://help.aliyun.com/zh/sls/user-guide/manage-logtail-configurations-for-log-collection?spm=a2c4g.11186623.0.i12#section-vgw-rm1-ry){target="_blank"}.


7. Preview data, configure indexes, and then click Next.

- By default, the full-text indexing feature is enabled for Simple Log Service.You can configure field indexes based on the collected logs in manual mode or automatic mode.For more information, see [Create indexes].

## What to do next

- If you want to migrate historical data from Alibaba Cloud Account B to the current Logstore, you can create a data transformation job in the original Logstore, and then replicate the data to the current Logstore.For more information, see [Replicate data from a Logstore].(https://help.aliyun.com/zh/sls/user-guide/replicate-data-from-a-logstore?spm=a2c4g.11186623.0.i14#task-2036148){target="_blank"}。
  > **important:**If you create a data transformation job to transform data across Alibaba Cloud accounts, you must use a custom role or an AccessKey pair to grant the required permissions for the job. In this example, a custom role is used.
  > The first Alibaba Cloud resource name (ARN) of the role is used to grant the custom role or AccessKey pair the required permissions to read data from a source Logstore.For more information about how to grant the required permissions to a Resource Access Management (RAM) role, see the [Grant the RAM role the permissions to read data from a source Logstore] section of the "Access data by using a custom role" topic.(https://help.aliyun.com/zh/sls/user-guide/access-data-by-using-a-custom-role?spm=a2c4g.11186623.0.i17#section-wms-rsm-fgd){target="_blank"}。
  > The second ARN of the role is used to grant the custom role or AccessKey pair the required permissions to write transformation results to a destination Logstore.For information about how to grant the required permissions to a RAM role, see the [Grant the RAM role the permissions to write data to a destination Logstore across Alibaba Cloud accounts] section of the "Access data by using a custom role" topic.(https://help.aliyun.com/zh/sls/user-guide/access-data-by-using-a-custom-role?spm=a2c4g.11186623.0.i18#section-5y6-5dk-etx){target="_blank"}。
