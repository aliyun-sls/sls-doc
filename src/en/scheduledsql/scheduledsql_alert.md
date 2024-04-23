# Configure alerting for Scheduled SQL

## Background
The topic describes how to configure alerting for Scheduled SQL to track Scheduled SQL jobs. This helps you detect exceptions at the earliest opportunity and ensures that the jobs can be run as expected.
## Activate task operation logs

1. Go to the details page of the project that you want to manage and click the Service Log tab. Then, click Enable Service Logs.
![image-64.png](/img/src/scheduledsql/scheduledsql_alert/d3e8ed81c1183c215ea1e02842c4624f13f907f47c6b29adfde9ce5cc5d6fe7d.png)
2. In the Modify Service Log Settings panel, turn on Job Operational Logs to enable run logs for Scheduled SQL jobs. Then, you can view the run logs of Scheduled SQL jobs in the internal-diagnostic_log Logstore of the project.
![image-65.png](/img/src/scheduledsql/scheduledsql_alert/28e148a04cf2bb3c1b2e94c43e670bd7b61fca7d45c97b291f824872ac6386d4.png)
In the Modify Service Log Settings panel, turn on Job Operational Logs to enable run logs for Scheduled SQL jobs. Then, you can view the run logs of Scheduled SQL jobs in the internal-diagnostic_log Logstore of the project.

## View the run logs of Scheduled SQL jobs

Go to the details page of the internal-diagnostic_log Logstore in the console and execute the following SQL statement:

```sql
* and job_type: ScheduledSQL
```

You can view the run logs of Scheduled SQL jobs and the details of each instance.
![image-66.png](/img/src/scheduledsql/scheduledsql_alert/ea46f4223b6cdb0e5e42509ce829179126b756c83389ad32b833a56954b6ffdd.png)

### Field Description
| Field | Description | Example |
| --- | --- | --- |
| create_time | The time when the instance was created. Unit: seconds. | 1690868640 |
| error_code | The error code returned if the instance failed. | SQLFailed |
| error_message | The error message returned if the instance failed. | sql syntax error |
| fallbehind | The time interval between the time when the instance was triggered and the scheduled time of the instance, which indicates a latency. Unit: seconds. | 0 |
| instance_id | The instance ID. | 49078b63c9f6b997-601d608a6db4d-3b997c0 |
| job_name | The name of the job. | sql-1690513925-248017 |
| job_type | The type of the job. | ScheduledSQL |
| project | The name of the project to which the job belongs. | scheduled-sql-demo |
| schedule_id | The scheduling configuration ID. | 6f0a8b2c7d12e11695c04faf8e9b1b3f |
| schedule_time | The scheduled time of the instance. Unit: seconds. | 1690868640 |
| source_type | The type of the source. | Complete |
| status | The state of the instance. Valid values: FAILED and SUCCEEDED. | SUCCEEDED |
| succeed_lines | The number of rows written if the instance was successful. If the instance failed, 0 is returned. 0 | 100 |
| task_type | The type of the job. |  |
| trigger_time | The time when the instance was triggered. Unit: seconds. | 1690868640 |


## Configure alert rules

You can configure alert rules to monitor Scheduled SQL jobs based on their run logs.You can customize alert rules or use the built-in alert rules for Scheduled SQL.

### Enable the new alerting feature

Go to the details page of the project that you want to manage. On the left-side navigation submenu, click the Alerts icon. On the Alert Center page, enable the new alerting feature.
![image-68.png](/img/src/scheduledsql/scheduledsql_alert/d9c03ece1b954c0852caad29874ebb7e702d4087462c2f6f943c487980de2dd7.png)

### Manage action policies

On the Alert Center page, click the Notification Policy tab and then the Action Policy tab.On the Action Policy tab, you can view the built-in action policies for Scheduled SQL. Find an action policy that you want to manage and click Edit in the Actions column. In the Edit Action Policy dialog box, add notification methods on the Primary Action Policy tab.More than 10 notification methods are supported.For more information, see [Create an action policy](https://help.aliyun.com/zh/sls/user-guide/create-an-action-policy). You can also click Create on the Action Policy tab to customize an action policy for Scheduled SQL.
![image-69.png](/img/src/scheduledsql/scheduledsql_alert/9045b295994dd77e34a01181a2b7b837241dae03f771f8c6cfc5831d0ee6cf03.png)
![image-70.png](/img/src/scheduledsql/scheduledsql_alert/f40b6c3de117222a8f45cb2b0107ac672c61c7580a5a5b465789fcff0a27924a.png)
![image-71.png](/img/src/scheduledsql/scheduledsql_alert/12a57aedb070dd92a508b4896ee2e3dac598fe65d45b2843e266d0758b5fcea1.png)
### Use built-in alert rules
[Go to the Alert Center page]()
![image-73.png](/img/src/scheduledsql/scheduledsql_alert/065ce61547039081e08eee306bf9f042a9a83e581c287333b3cceef5b2b76843.png)
![image-74.png](/img/src/scheduledsql/scheduledsql_alert/c19b85b9d3d4754ea7a9ded393ae58950fcee00966b7276ee910fd600570fec7.png)

On the Alert Rule tab of the Alert Center page, set filter conditions to view the built-in alert rules for Scheduled SQL.Find an alert rule that you want to manage and click Edit in the Actions column. In the Edit Alert panel, configure the alert rule.

| Configuration | Description |
| --- | --- |
| Rule name | The name of the alert rule. |
| Projects monitored | The name of the project to which the Scheduled SQL job to be monitored belongs. You can enter .* to specify all projects. |
| Jobs monitored | The name of the Scheduled SQL job to be monitored. You can enter .* to specify all Scheduled SQL jobs. |
| Action policy | The action policy configured on the Action Policy tab. By default, a built-in action policy is used. |
| Alert severity | The severity of the alert. |


### 自定义告警
如果内置告警规则不符合需求，也可以自定义告警规则。可以通过点击新建告警按钮，新建自定义告警。关于自定义告警的配置详情，可以参考官方文档。
![image-75.png](/img/src/scheduledsql/scheduledsql_alert/6bcc66855769c56d6219de363be49cb117030456d33972a5ac1590d3165cab6e.png)
![image-76.png](/img/src/scheduledsql/scheduledsql_alert/47f818579a35d622f83c8ef1028c8a6f6bebb209dfb45c03393916cbbcfdfdc5.png)

图中表示当15分钟内统计到的 http_status 为 500 的日志条数大于 50 条时，触发告警。并根据内置的行动规则进行告警

### 事件管理

配置完告警规则，就可以在定时SQL任务异常时收到告警。点击告警中心页面右侧的事务视图按钮，可以查看历史告警事件配置完告警规则，就可以在定时SQL任务异常时收到告警。点击告警中心页面右侧的事务视图按钮，可以查看历史告警事件。
![image-77.png](/img/src/scheduledsql/scheduledsql_alert/370e3b5c4e2e1c0a8bdde79c6871e5b7e90311db5a6faa47baa283fb05f52761.png)
