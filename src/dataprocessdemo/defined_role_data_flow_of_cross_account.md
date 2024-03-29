# 场景三：使用自定义角色完成跨账号数据流转

使用RAM用户创建数据加工作业时，您可以通过自定义角色完成跨账号的日志数据流转。

## 前提条件
* 已创建并获取源Logstore和目标Logstore的名称及Project名称。更多信息，请参见[管理Logstore](https://help.aliyun.com/document_detail/48990.htm?spm=a2c4g.11186623.0.0.3ecc2d7an0CseE#concept-xkb-zh5-vdb)和[管理Project](https://help.aliyun.com/document_detail/48984.htm?spm=a2c4g.11186623.0.0.3ecc7934xfBUY6#concept-mxk-414-vdb)。
* 已创建RAM用户，并授予RAM用户数据加工操作权限。更多信息，请参见[授予RAM用户数据加工操作权限](https://help.aliyun.com/document_detail/125779.htm?spm=a2c4g.11186623.0.0.3ecc29dbdFaP4e#task-2005445)。

## 背景信息
跨账号场景下，使用RAM用户创建数据加工作业，角色A需要具有源Logstore的读数据权限，角色B需要具有目标Logstore的写权限。因为数据加工作业运行于阿里云账号1之下，您需要修改阿里云账号2下角色B的信任策略对阿里云账号1进行授信。该场景下的授权原理如下图所示。
  ![授权原理2](/img/dataprocessdemo/配置数据加工/授权原理2.png)


## 步骤一：使用阿里云账号1创建角色A
 1. 使用阿里云账号1登录[RAM控制台](https://ram.console.aliyun.com/overview)。
  2. 创建角色A。
  具体操作，请参见[创建可信实体为阿里云服务的RAM角色](https://help.aliyun.com/document_detail/116800.htm?spm=a2c4g.11186623.0.0.16f11550FDwDIG#task-2448632)。其中关键参数配置如下：
      | 关键参数| 说明 |
      | -------| --------- |
      | **选择可信实体类型** | 选择**阿里云服务**。 |
      | **角色类型** | 选择**普通服务角色**。 |
      | **角色名称** | 输入角色名称，例如role-A。 |
      | **选择授信服务** | 选择**日志服务**。 |
## 步骤二：使用阿里云账号1为角色A授予读数据权限
1. 使用阿里云账号登录[RAM控制台](https://ram.console.aliyun.com/overview)。
2. 通过脚本编辑模式，创建自定义权限策略。该权限策略用于读取源Logstore中的数据。例如新建权限策略为**ori_read**。
具体操作，请参见[创建自定义权限策略](https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.16f11ff58fILkp#task-2149286)。其中关键参数配置如下：

    | 关键参数 | 说明 |
    | -- | -- |
    | 名称 | 输入自定义权限策略名称。例如**ori_read** |
    | 策略内容 | 将配置框中的原有脚本替换为如下内容。<br>例如：源Project名称为log-project-prod，源Logstore名称为access_log。在实际场景中，请根据实际情况替换。<pre>{<br>  "Version": "1",<br>  "Statement": [<br>    {<br>      "Action": [<br>        "log:ListShards",<br>        "log:GetCursorOrData",<br>        "log:GetConsumerGroupCheckPoint",<br>        "log:UpdateConsumerGroup",<br>        "log:ConsumerGroupHeartBeat",<br>        "log:ConsumerGroupUpdateCheckPoint",<br>        "log:ListConsumerGroup",<br>        "log:CreateConsumerGroup",<br>      ],<br>      "Resource": [<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log",<br>        "acs:log:*:*:project/log-project-prod/logstore/access_log/*",<br>      ],<br>      "Effect": "Allow"<br>    }<br>  ]<br>}</pre>|

1. 为角色A授予源Logstore读权限。
具体操作，请参见[为RAM角色授权](https://help.aliyun.com/document_detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801)。其中关键参数配置如下：

    | 关键参数| 说明 |
      | -------| --------- |
      | **授权范围** | 选择**整个云账号**。权限在当前阿里云账号内生效。 |
      | **授权主体** | 选择**role-A**。即您在[步骤一：使用阿里云账号创建角色A](https://help.aliyun.com/document_detail/448355.html#section-l8g-pgl-8rq)中创建的角色role-A。 |
      | **自定义策略** | 选择**ori_read**。 |



4. 获取RAM角色标识（ARN）。
在该角色A的**基本信息**中查看，例如```acs:ram::1379******44:role/role-a```。

## 步骤三：使用阿里云账号2创建角色B
1. 使用阿里云账号2登录[RAM控制台](https://ram.console.aliyun.com/overview)。
2. 创建角色B。
  具体操作，请参见[创建可信实体为阿里云服务的RAM角色](https://help.aliyun.com/document_detail/116800.htm?spm=a2c4g.11186623.0.0.72064450hX7Yq6#task-2448632)。其中关键参数配置如下：

    | 关键参数| 说明 |
    | -------| --------- |
    | **选择可信实体类型** | 选择**阿里云服务**。 |
    | **角色类型** | 选择**普通服务角色**。 |
    | **角色名称** | 输入角色名称，例如role-B。 |
    | **选择授信服务** | 选择**日志服务**。 |


## 步骤四：使用阿里云账号2为角色B授予写数据权限
1. 使用阿里云账号2登录[RAM控制台](https://ram.console.aliyun.com/overview)。
2. 通过脚本编辑模式，创建自定义权限策略。该权限策略用于将数据加工结果写入到目标Logstore。例如新建权限策略为**write**。
具体操作，请参见[创建自定义权限策略](https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.720664a1umWb1J#task-2149286)。其中关键参数配置如下：

  | 关键参数 | 说明 |
  | -- | -- |
  | 名称 | 输入自定义权限策略名称。例如**write** |
  | 策略内容 | 将配置框中的原有脚本替换为如下内容。<br>例如：目标Project名称为log-project-prod，目标Logstore名称为access_log_output。在实际场景中，请根据实际情况替换。<br><pre>{<br>  "Version": "1", <br>  "Statement": [ <br>   {  <br>     "Action": [  <br>       "log:Post*",<br>       "log:BatchPost*" <br>     ],<br>     "Resource": "acs:log:*:*:project/log-project-prod/logstore/access_log_output",<br>     "Effect": "Allow" <br>   }<br>  ]<br>} </pre> |

1. 为角色B授予目标Logstore写权限。
具体操作，请参见[为RAM角色授权](https://help.aliyun.com/document_detail/116147.htm?spm=a2c4g.11186623.0.0.16f12d7ayYMcWn#task-187801)。其中关键参数配置如下：
    | 关键参数| 说明 |
    | -------| --------- |
    | **授权范围** | 选择**整个云账号**。权限在当前阿里云账号内生效。 |
    | **授权主体** | 选择**role-B**。即您在[步骤三：使用阿里云账号创建角色B](https://help.aliyun.com/document_detail/448355.html#section-jp3-5x0-7bc)中创建的角色role-B。 |
    | **自定义策略** | 选择**write**。 |


4. 获取RAM角色标识（ARN）。
在该角色B的**基本信息**中查看，例如```acs:ram::1379******44:role/role-b```。
## 步骤五：使用阿里云账号2通过角色B向阿里云账号1授信
1. 使用阿里云账号2登录[RAM控制台](https://ram.console.aliyun.com/overview)。
2. 在左侧导航栏中，选择**身份管理 > 角色**。
3. 在RAM角色列表中，单击目标RAM角色，例如role-B。
4. 在**信任策略管理**页签中，单击**修改信任策略**。
5. 修改信任策略。
在**Service**配置项中添加阿里云账号1的ID。其中，请根据实际情况替换阿里云账号1的ID。您可以在[账号中心](https://account.console.aliyun.com/v2/?spm=a2c4g.11186623.0.0.1dc34450ZA4Sff#/basic-info/index)查看阿里云账号ID。该策略表示阿里云账号1有权限通过日志服务获取临时Token来操作阿里云账号2的资源。
    ```
    {
        "Statement": [
            {
                "Action": "sts:AssumeRole",
                "Effect": "Allow",
                "Principal": {
                    "Service": [
                        "阿里云账号1的ID@log.aliyuncs.com"
                    ]
                }
            }
        ],
        "Version": "1"
    }
    ```
## 步骤六：使用RAM用户创建数据加工作业
1. 使用RAM用户登录[日志服务控制台](https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.10b94450uwe8VN)。
2. 进入数据加工页面。
  a. 在Project列表区域，单击目标Project。
  b. 在**日志存储 > 日志库**页签中，单击目标Logstore。
  c. 在查询和分析页面，单击**数据加工**。
3. 在页面右上角，选择数据的时间范围。
  请确保在**原始日志**页签中有日志数据。
4. 在编辑框中，输入数据加工语句。
  加工语句的语法请参见[数据加工语法](https://help.aliyun.com/document_detail/125439.htm?spm=a2c4g.11186623.0.0.10b9708cbP33kd#concept-1130584)。
5. 预览数据。
  a. 单击**快速**。
    日志服务支持快速预览和高级预览。更多信息，请参见[预览调试概述](https://help.aliyun.com/document_detail/175654.htm?spm=a2c4g.11186623.0.0.10b9708cCzGvXG#task-2565077)。
  b. 单击预览数据。
    查看预览结果。

    * 如果加工语句错误或者权限配置错误，导致数据加工失败，请根据页面提示处理。
    * 如果确认数据加工结果无误，请执行步骤下一步。
6. 创建数据加工作业。
  a. 单击**保存数据**加工。
  b. 在**创建数据加工规则**页面，配置相关参数，然后单击**确定**。
    其中，其他参数配置请参考[数据加工快速入门](https://help.aliyun.com/document_detail/140895.htm?spm=a2c4g.11186623.0.0.10b94b411wYwnX#task-2316153)。该场景中关键参数配置如下：
       ![创建加工规则](/img/dataprocessdemo/配置数据加工/创建加工规则.png)

      | 关键参数 | 说明 |
      | -- | -- |
      | 授权方式 | 选择**自定义角色** |
      | 角色ARN | 输入角色A的ARN。例如`acs:ram::1379******44:role/role-a` |
      | 存储目标的授权方式 | 选择**自定义角色** |
      | 角色ARN | 输入角色B的ARN。例如`acs:ram::1379******44:role/role-b` |

数据加工作业创建成功并运行后，使用RAM用户创建的跨账号数据流转作业完成。更多操作，请参见[管理数据加工作业](https://help.aliyun.com/document_detail/128744.htm?spm=a2c4g.11186623.0.0.10b92b0d2iORzE#task-1580295)。