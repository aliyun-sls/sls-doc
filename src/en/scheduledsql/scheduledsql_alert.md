# Configure alerting for Scheduled SQL

## Background
The topic describes how to configure alerting for Scheduled SQL to track Scheduled SQL jobs. This helps you detect exceptions at the earliest opportunity and ensures that the jobs can be run as expected.
## Activate task operation logs

1. Go to the details page of the project that you want to manage and click the Service Log tab. Then, click Enable Service Logs.
2. In the Modify Service Log Settings panel, turn on Job Operational Logs to enable run logs for Scheduled SQL jobs. Then, you can view the run logs of Scheduled SQL jobs in the internal-diagnostic_log Logstore of the project.
![image-64.png](/img/src/en/scheduledsql/scheduledsql_alert/scheduledsql_alert01.png)
In the Modify Service Log Settings panel, turn on Job Operational Logs to enable run logs for Scheduled SQL jobs. Then, you can view the run logs of Scheduled SQL jobs in the internal-diagnostic_log Logstore of the project.

## View the run logs of Scheduled SQL jobs

Go to the details page of the internal-diagnostic_log Logstore in the console and execute the following SQL statement:

```sql
* and job_type: ScheduledSQL
```

You can view the run logs of Scheduled SQL jobs and the details of each instance.
![image-66.png](/img/src/en/scheduledsql/scheduledsql_alert/scheduledsql_alert02.png)

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

### Manage action policies

On the Alert Center page, click the Notification Policy tab and then the Action Policy tab.On the Action Policy tab, you can view the built-in action policies for Scheduled SQL. Find an action policy that you want to manage and click Edit in the Actions column. In the Edit Action Policy dialog box, add notification methods on the Primary Action Policy tab.More than 10 notification methods are supported.For more information, see [Create an action policy](https://help.aliyun.com/zh/sls/user-guide/create-an-action-policy). You can also click Create on the Action Policy tab to customize an action policy for Scheduled SQL.
![image-69.png](/img/src/en/scheduledsql/scheduledsql_alert/scheduledsql_alert03.png)

### Use built-in alert rules
[Go to the Alert Center page](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690513925-248017)


On the Alert Rule tab of the Alert Center page, set filter conditions to view the built-in alert rules for Scheduled SQL.Find an alert rule that you want to manage and click Edit in the Actions column. In the Edit Alert panel, configure the alert rule.

| Configuration | Description |
| --- | --- |
| Rule name | The name of the alert rule. |
| Projects monitored | The name of the project to which the Scheduled SQL job to be monitored belongs. You can enter .* to specify all projects. |
| Jobs monitored | The name of the Scheduled SQL job to be monitored. You can enter .* to specify all Scheduled SQL jobs. |
| Action policy | The action policy configured on the Action Policy tab. By default, a built-in action policy is used. |
| Alert severity | The severity of the alert. |

