# 复制 Logstore 数据

日志服务支持对每一个源 Logstore 配置一个加工任务，实现复制 Logstore 数据。本文介绍复制 Logstore 数据的典型场景和操作方法。

## 操作步骤

1. 登录[日志服务控制台](https://sls.console.aliyun.com)[日志服务控制台](https://partners-intl.console.aliyun.com/#/sls)。

2. 在 **全部 Project** 区域，单击 project-a。

3. 在 **日志存储** \> **日志库** 页签中，单击 logstore-a。

4. 在查询和分析页面的右上角单击 **数据加工** ，进入数据加工模式。

5. 单击 **保存数据加工** 。

6. 在 **创建数据加工规则** 页面，配置如下参数。

   | 参数         | 说明                                                                                        |
   | ------------ | ------------------------------------------------------------------------------------------- |
   | 规则名称     | 数据加工规则的名称。输入 test。                                                             |
   | 授权方式     | 授予日志服务读取 logstore-a 中数据的权限。以默认角色为例，选择默认角色。                    |
   | 目标名称     | 存储目标名称。输入 test。                                                                   |
   | 目标 Region  | 目标 Project 所在地域。选择华东 1（杭州）。                                                 |
   | 目标 Project | logstore-b 所属的 Project 名称。输入 project-b。                                            |
   | 目标库       | logstore-b 名称。输入 logstore-b。                                                          |
   | 授权方式     | 授予日志服务读写 logstore-b 的权限。 以默认角色为例，选择默认角色。                         |
   | 时间范围     | 加工的时间范围。 对 Logstore 中的数据从开始位置持续加工，直到加工任务被手动停止。选择所有。 |

   更多参数配置，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.9.ec9b1353uPmG8o#task-1181217)。

7. 单击 **确定** 。

## 执行结果

打开 project-b 项目，在 **日志存储** \> **日志库** 页签中选择 logstore-b 日志库，您可以查看到从 logstore-a 复制过来的数据。![样例图片](/img/dataprocessdemo/p226660.png)
