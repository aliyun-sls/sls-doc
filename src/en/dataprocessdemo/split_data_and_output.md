# 复制和分发数据

日志服务支持对每一个源 Logstore 配置一个加工任务，实现数据复制后分发到不同 Logstore。本文介绍数据复制后分发到不同 Logstore 的典型场景和操作方法。

## 场景说明

某数据分析公司需要将 Logstore 中的每一条数据进行复制，并根据内容分别分发到两个 Logstore。对此需求，可通过日志服务数据加工的复制和分发功能完成，包括使用 e_set 函数设置 tags 标签，并使用 e_split 函数按照 tags 标签将数据分裂，再使用 e_output 函数分发到不同 Logstore。其基本逻辑如下图所示。
![split](/img/dataprocessdemo/p228486.png)
在操作前，确保您已完成如下操作。

- 已完成 target-a、target-b 的性能评估和规划。例如评估 Shard 数量。更多信息，请参见[性能指南](https://help.aliyun.com/document_detail/135496.htm?spm=a2c4g.11186623.2.6.729765fdl9EAWW#concept-2055068)。

- 已创建 target-a、logstore-a、target-b 和 logstore-b。更多信息，请参见[管理 Project](https://help.aliyun.com/document_detail/48984.htm?spm=a2c4g.11186623.2.7.729765fdl9EAWW#concept-mxk-414-vdb)和[管理 Logstore](https://help.aliyun.com/document_detail/48990.htm?spm=a2c4g.11186623.2.8.729765fdl9EAWW#concept-xkb-zh5-vdb)。

## 操作步骤

1. 登录[日志服务控制台](https://sls.console.aliyun.com)[日志服务控制台](https://partners-intl.console.aliyun.com/#/sls)。

2. 在 **全部 Project** 区域，单击目标 Project。

3. 在 **日志存储** \> **日志库** 页签中，单击目标 Logstore。

4. 在查询和分析页面的右上角单击 **数据加工** ，进入数据加工模式。

5. 在数据加工编辑框中输入如下加工语句。

   ```python
   e_set("tags","target-a","target-b")
   e_split("tags")
   e_if(op_eq(v("tags"), "target-a"), e_output("target-a"))
   e_if(op_eq(v("tags"), "target-b"), e_output("target-b"))
   e_drop()
   ```

   - 通过 e_set 函数为原始日志设置 target-a 和 target-b 标签。更多信息，请参见[e_set](https://help.aliyun.com/document_detail/125487.htm?spm=a2c4g.11186623.2.10.293765fdzgnMo1#section-7cr-8gz-by2)。

   - 通过 e_split 函数将日志数据进行分裂。更多信息，请参见[e_split](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.11.293765fdzgnMo1#section-urg-dob-o79)。

   - 通过 e_output 函数将日志分发到 target-a 和 target-b。更多信息，请参见[e_output](https://help.aliyun.com/document_detail/0.htm?spm=a2c4g.11186623.2.12.293765fdzgnMo1#section-zi7-wtp-30c)。

   - e_drop()表示将不满足条件的日志丢弃，不进行分发。更多信息，请参见[e_drop](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.13.293765fdzgnMo1#section-sn7-4pm-kly)。

6. 单击 **预览数据** 。

   您可以看到原始日志已增加 tags 标签，并且 tags 为 target-a 的数据将被分发到 target-a，tags 为 target-b 的数据将被分发到 target-b。![](/img/dataprocessdemo/p228492.png)

7. 单击 **保存数据加工** 。

8. 在 **创建数据加工规则** 页面，配置如下参数。

   1. 配置基本信息。

      | 参数     | 说明                                                                 |
      | -------- | -------------------------------------------------------------------- |
      | 规则名称 | 数据加工规则的名称。输入 test。                                      |
      | 授权方式 | 授予日志服务读取源日志库中数据的权限。以默认角色为例，选择默认角色。 |

   2. 配置 target-a 存储目标。

      | 参数         | 说明                                                              |
      | ------------ | ----------------------------------------------------------------- |
      | 目标名称     | 存储目标名称。输入 target-a。                                     |
      | 目标 Region  | 目标 Project 所在地域。                                           |
      | 目标 Project | target-a 所属的 Project 名称。输入 target-a。                     |
      | 目标库       | Logstore 名称。输入 logstore-a。                                  |
      | 授权方式     | 授予日志服务读写 target-a 的权限。 以默认角色为例，选择默认角色。 |

   3. 配置 target-b 存储目标。

      | 参数         | 说明                                                              |
      | ------------ | ----------------------------------------------------------------- |
      | 目标名称     | 存储目标名称。输入 target-b。                                     |
      | 目标 Region  | 目标 Project 所在地域。选择华东 1（杭州）。                       |
      | 目标 Project | target-b 所属的 Project 名称。输入 target-b。                     |
      | 目标库       | Logstore 名称。输入 logstore-b。                                  |
      | 授权方式     | 授予日志服务读写 target-b 的权限。 以默认角色为例，选择默认角色。 |

   4. 配置加工时间范围。

      | 参数     | 说明                                                                      |
      | -------- | ------------------------------------------------------------------------- |
      | 时间范围 | 加工的时间范围。 选择所有，即表示对 Logstore 中的数据从开始时间持续加工。 |

9. 单击 **确定** 。

## 执行结果

- 打开 target-a 项目，在 **日志存储** \> **日志库** 页签中选择 logstore-a 日志库，您可以看到分发过来的数据。![](/img/dataprocessdemo/p228506.png)

- 打开 target-b 项目，在 **日志存储** \> **日志库** 页签中选择 logstore-b 日志库，您可以看到分发过来的数据。![](/img/dataprocessdemo/p228518.png)
