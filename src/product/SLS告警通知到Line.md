日志服务告警是SLS提供的一站式告警监控、降噪、事务管理、通知分派的智能运维平台，能够完美地支持开发运维、IT运维、安全运维、智能运维以及商务运维等场景下监控告警的需求。SLS的告警包含了语音、短信、邮件、钉钉、通用Webhook以及函数计算等通知渠道。
![image.png](/img/src/product/SLS告警通知到Line/ae69a168ffb17fda9a479c254e417bdc73c063c2bcbcc6b2ff072aba68cae65b.png)
## 背景
Line是一款由NHN Japan（韩国Naver Corporation公司的子公司）在日本推出的即时通信软件，在日韩拥有较大的用户规模。Line支持构建机器人，并且通过API给机器人推送消息，添加了机器人的用户以及群聊就可以接收到机器人推送的消息。但是由于Line的服务器位于海外，SLS的告警无法直接发送通知。
对于这样的需求，用户往往需要自己提供一个Webhook服务，一方面这个服务可以对于告警消息进行二次加工处理，另一方面这个服务也可以转发SLS发送的请求。阿里云的FC(函数计算)服务可以很好地满足上述场景，用户可以在海外区域创建FC函数，在函数中进行简单地开发就可以完成上述需求。
FC可以拓展SLS支持的通用Webhook通知渠道的一些能力，包括以下两点：

- 对告警通知内容定制化强烈，有较为复杂的加工处理需求
- 海外网络不通，SLS无法直接发送告警通知到海外的一些webhook服务
## 操作步骤
#### 1.在Line开发者平台构建机器人
Line有两种自定义的通知方式，一种是Line Notify（官方的一个通知服务），一种是自定义机器人。下面分别说明这两种方式的设置步骤。

- **Line Notify**。

登录[Line Notify配置平台](https://notify-bot.line.me/my/)，点击**Generate token**。填写服务名称后生成访问Token，复制并保存好Token。
![image.png](/img/src/product/SLS告警通知到Line/125cba7541c629e8553475ed8f9d03d0a8f4221cd862a1f2172df42e622f1710.png)

- **Line自定义机器人**。

具体可以参考[构建Line机器人](https://developers.line.biz/en/docs/messaging-api/building-bot/)。构建好了以后，生成一个Channel access token，建议设置成长期有效。然后将机器人添加为某个用户的好友或者加入某个群聊。
![image.png](/img/src/product/SLS告警通知到Line/0905ab4f1026fa4b762d40d024dd42f0fdeed7693c5eb32a3ab4397540371cef.png)
#### 2.创建FC函数
在函数计算控制台创建函数，参考[创建函数](https://help.aliyun.com/document_detail/73338.html#section-b9y-zn1-5wr)，注意选择海外的区域。在创建函数的过程中，函数的名称必须以sls-ops开头，具体可以参考[告警通知渠道](https://help.aliyun.com/document_detail/209963.html#section-y27-il6-jyw)，请求处理程序类型选择处理事件请求。该函数只是将SLS的通知转发到海外的Line的服务器，示例代码如下。如果是Line Notify这种通知形式，那么转发通知的目标服务器地址为https://notify-api.line.me/api/notify。另外，代码中的token需要替换为创建Line机器人时获取到的token。
```python
# -*- coding: utf-8 -*-
import logging
import requests

# url = 'https://notify-api.line.me/api/notify'
url = 'https://api.line.me/v2/bot/message/broadcast'
token = 'Your token'
headers = {'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Bearer ' + token}

def handler(event, context):
    resp = requests.post(url, headers=headers, data= {'message': event})
    logger = logging.getLogger()
    if resp.status_code == 200:
        logger.info('Send message successfully: '+ resp.text )
    else:
        logger.error('Failed to send message: ' + resp.text)
    return
```
#### 3.创建内容模板
在SLS告警中心添加一个内容模板，渠道选择**函数计算**，发送方式选择**逐条发送**。
![image.png](/img/src/product/SLS告警通知到Line/61f405f40cce82bf9d5b18961a5b45415e08e85f384ef6d438b0b0776ef78d3c.png)
内容模板需要设置为Line接受的固定格式，其中使用到的模板函数可以参考[内置模板函数](https://help.aliyun.com/document_detail/317767.html)。Line的两种通知方式对应的内容模板分别如下。

- Line Notify

Line Notify是通过官方的一个通知服务发送的消息，对于消息的长度限制为1000个字符，效果如下所示：
![image.png](/img/src/product/SLS告警通知到Line/d81c1baa10cfc3f9d3c197461a52d0ad7b5f164bd65b9ddbfefc1a5233bce74a.png)
对应的内容模板如下：
```
Project: {{ alert.project }}
Alert Name: {{ alert.alert_name }}
Fire Time: {{ alert.fire_time | format_date }}
Alert Time: {{ alert.alert_time | format_date }}
Status: {{ alert.status | format_status }}
Severity : {{ alert.severity | format_severity }}
Labels:
{{ alert.labels | to_list | blockquote }}

{% if alert.dashboard_url -%}
Dashboard: {{ alert.dashboard_url }}
{% endif -%}
{% if alert.query_url -%}
Query Detail: {{ alert.query_url }}
{% endif -%}
```

- Line机器人

Line机器人的消息类型有多种，适用于告警通知的有两种类型，这两种类型对应的内容模板分别如下。

   - **Text message**

这种消息类型是将所有的数据当成一个字符串发送给Line用户，效果如下图所示：
![image.png](/img/src/product/SLS告警通知到Line/4a671275cb0dc243724dba72a6f26ee72a9c562be4873d96827dd4d553a5d59f.png)
对应的内容模板如下：
```json
{
    "messages": [
        {
            "text": {{ quote("Project: " + alert.project + "\n" + "Alert Name: " + alert.alert_name + "\n" + "Fire Time: " + format_date(alert.fire_time, tz="UTC") + "\n" + "Alert Time: " + format_date(alert.alert_time, tz="UTC")+ "\n" + "Status: " + alert.status + "\n" + "Severity: " + string(alert.severity) + "\n" + "Labels: " + string(alert.labels) + "\n" +  "Query Url: "  + alert.query_url) }},
            "type": "text"
        }
    ]
}
```

   - **Template messages**

这种消息类型是支持预定义的布局，效果如下图所示。由于告警通知中常包含查询链接、免登链接等	URL，所以使用这种消息格式时可以将链接隐藏在按钮后面，但是这种类型的消息对文本长度限制为160个字符。
![image.png](/img/src/product/SLS告警通知到Line/6023e66321e59f9f346ec5b111e01d04dd9b306af2f11167dffa996c66d491ef.png)
对应的内容模板如下：
```json
{
    "messages": [
        {
            "type": "template",
            "altText": "SLS Alert",
            "template": {
                "type": "buttons",
                "text":  {{ quote( truncate("Project: " + alert.project + "\n" + "Alert Name: " + alert.alert_name + "\n" + "Fire Time: " + format_date(alert.fire_time, tz="UTC") + "\n" + "Alert Time: " + format_date(alert.alert_time, tz="UTC")+ "\n" + "Status: " + alert.status + "\n" + "Severity: " + string(alert.severity) + "\n" + "Labels: " + string(alert.labels), 160)) }}, 
                "actions": [
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": {{alert.query_url | quote}}
                    }
                ]
            }
        }
    ]
}
```
#### 4.创建并使用行动策略
创建好了内容模板后，新创建一个行动策略（可以参考[创建行动策略](https://help.aliyun.com/document_detail/207709.html)），选择第2步创建好的FC函数，内容模板选择第3步创建好的，然后再目标告警种应用创建好的行动策略。告警触发后就可以在Line客户端接受到SLS的告警消息。
 ![image.png](/img/src/product/SLS告警通知到Line/420185d885c5edc2871b613f6204231fb832194a27e2c3f6bcddbf8425ec19c2.png)

#### 
