# 背景
通过[日志服务采集Kubernetes容器日志](https://help.aliyun.com/document_detail/87540.htm?spm=a2c4g.11186623.0.0.5e9a73381h5RI9#task-1797722)已经被许多用户广泛应用，用户可在创建集群时启用日志服务，快速采集Kubernetes集群的容器日志，包括容器的标准输出以及容器内的文本文件等。

- Kubernetes审计日志的使用前提请参见[通过日志服务采集Kubernetes容器日志](https://help.aliyun.com/document_detail/87540.htm#task-1797722)。
- Kubernetes事件中心的使用前提请参见[创建并使用K8s事件中心](https://help.aliyun.com/document_detail/150476.htm#task-2389213)。
- Ingress访问日志的使用前提请参见[Nginx Ingress访问日志分析与监控](https://help.aliyun.com/document_detail/86532.htm#task-1796525)。
# 限制
但是对于一个用户在多个地域下拥有多个ack集群的场景，如果用户希望将每个地域下多个ACK集群的k8s日志进行集中审计、中心化查询，就需要用户进行一定的额外操作。
## 原始模式
例如用户可以通过手动创建[数据加工](https://help.aliyun.com/document_detail/125384.html)作业的方式，将每个logstore下的日志的投递到相同的目标库中，但是这种操作方式具有以下限制：
**限制1**:  操作繁琐，对于每个地域的每个ACK集群下每一种日志类型，例如事件日志、审计日志、Ingress日志都需要专门的建立对应作业；
**限制2**:  无法实现自动化更新，当有新的ACK集群创建还需要重复以上操作，无法做到实时、自动化
## 日志审计（升级前）
针对以上问题，[日志审计](https://help.aliyun.com/document_detail/164065.html)很早就推出了[K8s日志集中审计](https://help.aliyun.com/document_detail/164065.html#section-bvc-cgj-enp)的功能，即日志审计会自动地对符合自动化条件的K8s事件日志、审计日志和Ingress日志进行集中审计、中心化查询。
![image.png](/img/src/product/多集群下K8s日志集中审计升级/1f947426a0e32b43f49cce86c4416dc095abd4f2fbf58d50d66639ded21a5851.png)
但是，使用**日志审计（升级前）**（即使中心账号已经升级[服务关联角色AliyunServiceRoleForSLSAudit](https://help.aliyun.com/document_detail/265782.htm?spm=a2c4g.11186623.0.0.535451b86PjDGi#concept-2089820)）进行K8s日志集中审计仍需要比较复杂的**单独鉴权**操作，需要经过以下三步操作，日志审计下k8s日志集中审计、中心化查询才能正确使用。
**操作1**:  用户首先需要对中心账号创建一个[sls-audit-service-monitor](https://ram.console.aliyun.com/roles/sls-audit-service-monitor)的角色；
**操作2**:  并且对[sls-audit-service-monitor](https://ram.console.aliyun.com/roles/sls-audit-service-monitor)角色授权[AliyunLogAuditServiceMonitorAccess](AliyunLogAuditServiceMonitorAccess)策略外
**操作3:**  此外，用户还需要对该角色**额外授权**对ACK下k8s project的操作权限（参考如下）
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:*",
            "Resource": [
                "acs:log:*:*:project/k8s-log-*"
            ],
            "Effect": "Allow"
        }
    ]
}
```
日志审计（升级前）虽然解决了**限制1**和**限制2**的问题，但是由于其**单独自定义鉴权**操作的复杂性，也给用户带来了一些不便，用户无法做到真正的开箱即用，集中审计，中心化查询，且自定义角色容易被用户误删、篡改，将会影响用户的使用体验。
# 真正开箱即用
## 日志审计升级后
随着日志审计中心账号鉴权从用户需要[自定义角色sls-audit-service-monitor](https://help.aliyun.com/document_detail/164069.html#section-jp5-4z3-jns)到用户一键式授权[服务关联角色AliyunServiceRoleForSLSAudit](https://help.aliyun.com/document_detail/265782.htm?spm=a2c4g.11186623.0.0.535451b86PjDGi#concept-2089820)的升级，日志审计下K8s日志采集**单独鉴权升级**也提上日程。
[日志审计](https://help.aliyun.com/document_detail/164065.html)通过和[SLS数据加工](https://help.aliyun.com/document_detail/125384.html) 深度合作后，现已支持通过[服务关联角色AliyunServiceRoleForSLSAudit](https://help.aliyun.com/document_detail/265782.htm?spm=a2c4g.11186623.0.0.535451b86PjDGi#concept-2089820) 进行自动化创建数据加工作业，自动运行数据加工Job，基于该角色进行日志消费和写入，从而做到了**真正的开箱即用**式多集群下k8s日志集中审计、中心化查询和存储，此时用户仅需中心账号首次点击授权授权[服务关联角色AliyunServiceRoleForSLSAudit](https://help.aliyun.com/document_detail/265782.htm?spm=a2c4g.11186623.0.0.535451b86PjDGi#concept-2089820)即可使用。

| **K8s日志集中审计** | **原始模式** | **日志审计开启K8s（升级前）** | **日志审计开启K8s（升级后）** |
| --- | --- | --- | --- |
| 手动创建相关作业 | 必须 | 无需 | 无需 |
| 实时自动化更新 | 不能 | 可以 | 可以 |
| 复杂自定义鉴权 | 无需 | 必须 | 无需 |

# 示例
通过在日志审计开启多ACK集群下k8s日志集中审计操作示例如下，具体事项可以参见[云产品资源覆盖](https://help.aliyun.com/document_detail/164065.html)：
![image.png](/img/src/product/多集群下K8s日志集中审计升级/2be27dda374058e8bc4b181953f7da9112cb24702f39c15d276c80f9550ff2ba.png)
多集群k8s日志集中化审计示例

![image.png](/img/src/product/多集群下K8s日志集中审计升级/3fe1e815b51d52fa9559e6f3fa3ab84651c7ea6ccb2d8cc07c08ec7b9a65700a.png)
多地域下k8s日志中心化查询示例
