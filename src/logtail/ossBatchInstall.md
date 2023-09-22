使用场景
运维编排服务（Operation Orchestration Service，简称OOS）是阿里云提供的自动化运维平台。您可以使用自定义模板或阿里云提供的公共模板，对ECS、RDS、SLB、VPC等资源进行自动化运维。更多信息，请参见什么是运维编排服务。

当您需要在大量的阿里云ECS实例中安装、更新或卸载Logtail时，可以使用运维编排OOS进行批量自动操作。如果您的服务器是与日志服务属于不同账号的ECS、其他云厂商的服务器或自建IDC，您需要手动安装Logtail。具体操作，请参见安装Logtail（Linux系统）或安装Logtail（Windows系统）。

前提条件
至少拥有一台阿里云ECS服务器。

使用RAM用户操作时，该RAM用户需具备如下权限。

AliyunOOSFullAccess权限：为RAM用户授予AliyunOOSFullAccess权限的具体操作，请参见为RAM用户授权。

自定义权限：为RAM用户授予如下自定义权限时，需要先创建自定义策略并为RAM用户授权。具体操作，请参见创建自定义权限策略、为RAM用户授权。

{
    "Version": "1",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:DescribeTagKeys",
                "ecs:DescribeTags",
                "ecs:DescribeInstances",
                "ecs:DescribeInvocationResults",
                "ecs:RunCommand",
                "ecs:DescribeInvocations"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "oos:ListTemplates",
                "oos:StartExecution",
                "oos:ListExecutions",
                "oos:GetExecutionTemplate",
                "oos:ListExecutionLogs",
                "oos:ListTaskExecutions"
            ],
            "Resource": "*"
        }
    ]
}
操作步骤
登录运维编排OOS控制台。

在左侧导航栏中，选择自动化运维>公共模板。

在公共模板页面中，搜索LogAgent，找到批量安装日志服务插件模板，然后单击创建执行。

在创建页面，完成如下配置。

在基本信息步骤中，保持默认配置，然后单击下一步：设置参数。

在设置参数步骤中，完成如下配置，然后单击下一步：确定。

image..png重要参数说明如下：

是否覆盖LogAgent：打开是否覆盖LogAgent开关后，如果ECS实例内已存在Logtail，则将被覆盖。详细说明如下表所示。

重要
当ECS实例为Windows操作系统且使用upgrade操作时，仅支持覆盖原有的Logtail更新，是否覆盖LogAgent配置不会生效。

是否覆盖LogAgent

install（安装）

upgrade（更新）

uninstall（卸载）

覆盖LogAgent

卸载Logtail，安装最新版本。

卸载Logatil，安装最新版本。

卸载Logtail

不覆盖LogAgent

返回Logtail已存在，不会覆盖。

保留原有Logtail配置，安装最新版本，安装完成后按照之前进度继续采集。

卸载Logtail

目标实例：选择目标ECS实例。更多信息，请参见实例选取方式。

确认信息无误后，单击创建。

查看执行结果。

您可以在执行结果区域，查看在每台ECS上执行Logtail安装命令的执行状态。image.png您还可以通过查看输出、日志等内容，获取Logtail的安装目录等信息。