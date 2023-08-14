### 背景
本文旨在向用户介绍如何开启定时SQL告警并跟踪任务执行情况,以便及时发现异常情况并确保定时SQL任务顺利执行.
### 开通任务运行日志

1. 在定时 SQL 任务所在 Project 的概览页面,点击开通服务日志.
![image-64.png](/img/src/scheduledsql/scheduledsql_alert/d3e8ed81c1183c215ea1e02842c4624f13f907f47c6b29adfde9ce5cc5d6fe7d.png)
2. 点击任务运行日志按钮，开通定时 SQL 任务运行日志.
![image-65.png](/img/src/scheduledsql/scheduledsql_alert/28e148a04cf2bb3c1b2e94c43e670bd7b61fca7d45c97b291f824872ac6386d4.png)
开启任务运行日志后，您可以在项目的 internal-diagnostic_log 中查看定时SQL的任务运行日志。

### 查看任务运行日志

在控制台查询页面输入

```sql
* and job_type: ScheduledSQL
```

可以查看定时SQL的任务运行日志，每个任务实例的执行情况均可以查看。
![image-66.png](/img/src/scheduledsql/scheduledsql_alert/ea46f4223b6cdb0e5e42509ce829179126b756c83389ad32b833a56954b6ffdd.png)

#### 字段说明
| 字段 | 说明 | 示例 |
| --- | --- | --- |
| create_time | 任务实例创建时间，单位为秒 | 1690868640 |
| error_code | 如果实例执行失败，说明失败原因码 | SQLFailed |
| error_message | 如果实例执行失败，说明失败详情 | sql syntax error |
| fallbehind | 任务触发时间和调度时间间隔，说明执行延迟，单位为秒 | 0 |
| instance_id | 任务实例标识 | 49078b63c9f6b997-601d608a6db4d-3b997c0 |
| job_name | 任务名称 | sql-1690513925-248017 |
| job_type | 任务类型 | ScheduledSQL |
| project | 任务所在项目名称 | scheduled-sql-demo |
| schedule_id | 调度配置标识 | 6f0a8b2c7d12e11695c04faf8e9b1b3f |
| schedule_time | 运势实例调度时间,单位为妙 | 1690868640 |
| source_type | 源类型 | Complete |
| status | 任务实例执行结果，可以为 FAILED 或者 SUCCEEDED | SUCCEEDED |
| succeed_lines | 如果实例成功，说明写入行数；如果实例失败，则为 0 | 100 |
| task_type | 任务类型 |  |
| trigger_time | 任务实例触发时间，单位为秒 | 1690868640 |


### 告警规则

通过监控任务执行日志，可以配置告警规则监控任务的执行情况。用户可以自定义告警规则，也可以使用内置的定时SQL告警规则。

#### 开启新版告警

在任务运行日志所在的 project，点击左侧的告警按钮打开告警中心，开启新版告警服务
![image-68.png](/img/src/scheduledsql/scheduledsql_alert/d9c03ece1b954c0852caad29874ebb7e702d4087462c2f6f943c487980de2dd7.png)

#### 行动策略

在告警管理标签页中，点击行动策略下拉框，打开编辑框。可以看到定时SQL内置的行动策略，点击修改按钮，在第一行动列表中添加想要的通知方式。支持十多种通知渠道。更多信息请参考[官方文档](https://help.aliyun.com/zh/sls/user-guide/create-an-action-policy)。用户也可以自定义 定时SQL 告警的行动策略，通过添加按钮添加新的行动策略。
![image-69.png](/img/src/scheduledsql/scheduledsql_alert/9045b295994dd77e34a01181a2b7b837241dae03f771f8c6cfc5831d0ee6cf03.png)
![image-70.png](/img/src/scheduledsql/scheduledsql_alert/f40b6c3de117222a8f45cb2b0107ac672c61c7580a5a5b465789fcff0a27924a.png)
![image-71.png](/img/src/scheduledsql/scheduledsql_alert/12a57aedb070dd92a508b4896ee2e3dac598fe65d45b2843e266d0758b5fcea1.png)
#### 内置告警
[告警中心页面链接]()
![image-73.png](/img/src/scheduledsql/scheduledsql_alert/065ce61547039081e08eee306bf9f042a9a83e581c287333b3cceef5b2b76843.png)
![image-74.png](/img/src/scheduledsql/scheduledsql_alert/c19b85b9d3d4754ea7a9ded393ae58950fcee00966b7276ee910fd600570fec7.png)

在告警中心的规则视图页面，选中SLS 定时SQL复选框，筛选出内置告警规则。点击添加按钮，在弹出窗口中填写告警配置，即可完成告警规则的配置。需要注意内置告警规则评估间隔为5分钟。

| 配置 | 说明 |
| --- | --- |
| 告警名称 | 告警实例名称 |
| 监控的Project | 需要监控的 定时SQL任务所在的 Project，.* 表示监控所有 Project |
| 监控的任务名称 | 需要监控的 定时SQL任务名称，.* 表示监控所有任务 |
| 行动策略 | 行动策略小节中配置的行动策略，默认使用内置行动策略 |
| 告警严重度 | 告警的严重程度 |


#### 自定义告警
如果内置告警规则不符合需求，也可以自定义告警规则。可以通过点击新建告警按钮，新建自定义告警。关于自定义告警的配置详情，可以参考官方文档。
![image-75.png](/img/src/scheduledsql/scheduledsql_alert/6bcc66855769c56d6219de363be49cb117030456d33972a5ac1590d3165cab6e.png)
![image-76.png](/img/src/scheduledsql/scheduledsql_alert/47f818579a35d622f83c8ef1028c8a6f6bebb209dfb45c03393916cbbcfdfdc5.png)

图中表示当15分钟内统计到的 http_status 为 500 的日志条数大于 50 条时，触发告警。并根据内置的行动规则进行告警

#### 事件管理

配置完告警规则，就可以在定时SQL任务异常时收到告警。点击告警中心页面右侧的事务视图按钮，可以查看历史告警事件配置完告警规则，就可以在定时SQL任务异常时收到告警。点击告警中心页面右侧的事务视图按钮，可以查看历史告警事件。
![image-77.png](/img/src/scheduledsql/scheduledsql_alert/370e3b5c4e2e1c0a8bdde79c6871e5b7e90311db5a6faa47baa283fb05f52761.png)
