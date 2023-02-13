复制和分发数据 
============================

日志服务支持对每一个源Logstore配置一个加工任务，实现数据复制后分发到不同Logstore。本文介绍数据复制后分发到不同Logstore的典型场景和操作方法。

场景说明 
-------------------------

某数据分析公司需要将Logstore中的每一条数据进行复制，并根据内容分别分发到两个Logstore。对此需求，可通过日志服务数据加工的复制和分发功能完成，包括使用e_set函数设置tags标签，并使用e_split函数按照tags标签将数据分裂，再使用e_output函数分发到不同Logstore。其基本逻辑如下图所示。
![split](/img/dataprocessdemo/p228486.png)
在操作前，确保您已完成如下操作。

* 已完成target-a、target-b的性能评估和规划。例如评估Shard数量。更多信息，请参见[性能指南](https://help.aliyun.com/document_detail/135496.htm?spm=a2c4g.11186623.2.6.729765fdl9EAWW#concept-2055068)。

* 已创建target-a、logstore-a、target-b和logstore-b。更多信息，请参见[管理Project](https://help.aliyun.com/document_detail/48984.htm?spm=a2c4g.11186623.2.7.729765fdl9EAWW#concept-mxk-414-vdb)和[管理Logstore](https://help.aliyun.com/document_detail/48990.htm?spm=a2c4g.11186623.2.8.729765fdl9EAWW#concept-xkb-zh5-vdb)。




操作步骤 
-------------------------

1. 登录[日志服务控制台](https://sls.console.aliyun.com)[日志服务控制台](https://partners-intl.console.aliyun.com/#/sls)。

    

2. 在 **全部Project** 区域，单击目标Project。

    

3. 在 **日志存储** \> **日志库** 页签中，单击目标Logstore。

    

4. 在查询和分析页面的右上角单击 **数据加工** ，进入数据加工模式。

    

5. 在数据加工编辑框中输入如下加工语句。
      ```
        e_set("tags","target-a","target-b")
        e_split("tags")
        e_if(op_eq(v("tags"), "target-a"), e_output("target-a"))
        e_if(op_eq(v("tags"), "target-b"), e_output("target-b"))
        e_drop()
      ```
    


    * 通过e_set函数为原始日志设置target-a和target-b标签。更多信息，请参见[e_set](https://help.aliyun.com/document_detail/125487.htm?spm=a2c4g.11186623.2.10.293765fdzgnMo1#section-7cr-8gz-by2)。

    * 通过e_split函数将日志数据进行分裂。更多信息，请参见[e_split](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.11.293765fdzgnMo1#section-urg-dob-o79)。

    * 通过e_output函数将日志分发到target-a和target-b。更多信息，请参见[e_output](https://help.aliyun.com/document_detail/0.htm?spm=a2c4g.11186623.2.12.293765fdzgnMo1#section-zi7-wtp-30c)。

    * e_drop()表示将不满足条件的日志丢弃，不进行分发。更多信息，请参见[e_drop](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.13.293765fdzgnMo1#section-sn7-4pm-kly)。

   

6. 单击 **预览数据** 。

   您可以看到原始日志已增加tags标签，并且tags为target-a的数据将被分发到target-a，tags为target-b的数据将被分发到target-b。![](/img/dataprocessdemo/p228492.png)

7. 单击 **保存数据加工** 。

    

8. 在 **创建数据加工规则** 页面，配置如下参数。

   1. 配置基本信息。

       

      | 参数     | 说明                                                         |
      | -------- | ------------------------------------------------------------ |
      | 规则名称 | 数据加工规则的名称。输入test。                               |
      | 授权方式 | 授予日志服务读取源日志库中数据的权限。以默认角色为例，选择默认角色。 |

      

   2. 配置target-a存储目标。

       

      | 参数        | 说明                                                         |
      | ----------- | ------------------------------------------------------------ |
      | 目标名称    | 存储目标名称。输入target-a。                                 |
      | 目标Region  | 目标Project所在地域。选择华东1（杭州）。                     |
      | 目标Project | target-a所属的Project名称。输入target-a。                    |
      | 目标库      | Logstore名称。输入logstore-a。                               |
      | 授权方式    | 授予日志服务读写target-a的权限。 以默认角色为例，选择默认角色。 |

      

   3. 配置target-b存储目标。

       

      | 参数        | 说明                                                         |
      | ----------- | ------------------------------------------------------------ |
      | 目标名称    | 存储目标名称。输入target-b。                                 |
      | 目标Region  | 目标Project所在地域。选择华东1（杭州）。                     |
      | 目标Project | target-b所属的Project名称。输入target-b。                    |
      | 目标库      | Logstore名称。输入logstore-b。                               |
      | 授权方式    | 授予日志服务读写target-b的权限。 以默认角色为例，选择默认角色。 |

      

   4. 配置加工时间范围。

       

      | 参数     | 说明                                                         |
      | -------- | ------------------------------------------------------------ |
      | 时间范围 | 加工的时间范围。 选择所有，即表示对Logstore中的数据从开始时间持续加工。 |

      

   

9. 单击 **确定** 。

    




执行结果
----

* 打开target-a项目，在 **日志存储** \> **日志库** 页签中选择logstore-a日志库，您可以看到分发过来的数据。![](/img/dataprocessdemo/p228506.png)

* 打开target-b项目，在 **日志存储** \> **日志库** 页签中选择logstore-b日志库，您可以看到分发过来的数据。![](/img/dataprocessdemo/p228518.png)



