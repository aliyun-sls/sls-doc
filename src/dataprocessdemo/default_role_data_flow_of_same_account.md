# 场景一：使用默认角色完成同账号的数据流转

使用RAM用户创建数据加工作业时，您可以通过默认角色完成同账号内的日志数据流转。

## 前提条件
* 已创建并获取源Logstore和目标Logstore的名称及Project名称。更多信息，请参见[管理Logstore](https://help.aliyun.com/document_detail/48990.htm?spm=a2c4g.11186623.0.0.3ecc2d7an0CseE#concept-xkb-zh5-vdb)和[管理Project](https://help.aliyun.com/document_detail/48984.htm?spm=a2c4g.11186623.0.0.3ecc7934xfBUY6#concept-mxk-414-vdb)。
* 已创建RAM用户，并授予RAM用户数据加工操作权限。更多信息，请参见[授予RAM用户数据加工操作权限](https://help.aliyun.com/document_detail/125779.htm?spm=a2c4g.11186623.0.0.3ecc29dbdFaP4e#task-2005445)。

## 背景信息
阿里云系统角色AliyunLogETLRole具备读取源Logstore中的数据以及将数据加工结果写入目标Logstore的权限。该角色只能由阿里云账号来进行创建和删除。

## 步骤一：使用阿里云账号创建系统角色AliyunLogETLRole
<table><tr><td bgcolor="#d6e7f8"><b>说明</b> 仅在首次配置时需要该操作。已完成授权系统角色AliyunLogETLRole的阿里云账号，无需再次授权。</td></tr></table>
RAM用户使用默认角色授权完成数据加工作业，需要确保阿里云账号下存在AliyunLogETLRole角色，否则需要通知阿里云账号对其进行创建。

1. 使用阿里云账号登录[日志服务控制台](https://sls.console.aliyun.com/lognext/profile)。
2. 授权系统角色AliyunLogETLRole。
     * 方式一
        单击[授权系统角色AliyunLogETLRole](https://ram.console.aliyun.com/role/authorization?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT&request=%7B%22Services%22%3A%5B%7B%22Service%22%3A%22Log%22%2C%22Roles%22%3A%5B%7B%22RoleName%22%3A%22AliyunLogETLRole%22%2C%22TemplateId%22%3A%22ETL%22%7D%5D%7D%5D%2C%22ReturnUrl%22%3A%22https%3A%2F%2Fsls.console.aliyun.com%22%7D)，按照向导完成授权。

     * 方式二
      在任意数据加工的**创建数据加工规则**面板中，单击**默认角色**下的[授权系统角色AliyunLogETLRole](https://ram.console.aliyun.com/role/authorization?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT&request=%7B%22Services%22%3A%5B%7B%22Service%22%3A%22Log%22%2C%22Roles%22%3A%5B%7B%22RoleName%22%3A%22AliyunLogETLRole%22%2C%22TemplateId%22%3A%22ETL%22%7D%5D%7D%5D%2C%22ReturnUrl%22%3A%22https%3A%2F%2Fsls.console.aliyun.com%22%7D)，按照向导完成授权。

## 步骤二：使用RAM用户创建数据加工作业
1. 使用RAM用户登录[日志服务控制台](https://sls.console.aliyun.com/lognext/profile)。
2. 进入数据加工页面。
  a. 在Project列表区域，单击目标Project。
  b. 在**日志存储 > 日志库**页签中，单击目标Logstore。
  c. 在查询和分析页面，单击**数据加工**。
3. 在页面右上角，选择数据的时间范围。
  请确保在**原始日志**页签中有日志数据。
4. 在编辑框中，输入数据加工语句。
  加工语句的语法请参见[数据加工语法](https://help.aliyun.com/document_detail/125439.htm?spm=a2c4g.11186623.0.0.3ecc1550YsaUQT#concept-1130584)。

5. 预览数据。
  a. 单击**快速**。
      日志服务支持快速预览和高级预览。更多信息，请参见[预览调试概述](https://help.aliyun.com/document_detail/175654.htm?spm=a2c4g.11186623.0.0.3ecc708czav3P0#task-2565077)。
  b. 单击**预览数据**。
      查看预览结果。
      * 如果加工语句错误或者权限配置错误，导致数据加工失败，请根据页面提示处理。
      * 如果确认数据加工结果无误，请执行步骤下一步。
1. 创建数据加工作业。
  a. 单击**保存数据加工**。
  b. 在**创建数据加工规则**页面，配置相关参数，然后单击**确定**。
    其中，其他参数配置请参考[数据加工快速入门](https://help.aliyun.com/document_detail/140895.htm?spm=a2c4g.11186623.0.0.3ecc4b41qzBlx8#task-2316153)。该场景中关键参数配置如下：

    ![数据加工作业1](/img/dataprocessdemo/配置数据加工/数据加工作业1.png)
     | 关键参数| 说明 |
      | -------| --------- |
      | **授权方式** | 选择**默认角色**。 |
      | **存储目标的授权方式** | 选择**默认角色**。 |



  数据加工作业创建成功并运行后，使用RAM用户创建的账号内数据流转作业完成。更多操作，请参见[管理数据加工作业](https://help.aliyun.com/document_detail/128744.htm?spm=a2c4g.11186623.0.0.3ecc2b0dnrsMRZ#task-1580295)。

