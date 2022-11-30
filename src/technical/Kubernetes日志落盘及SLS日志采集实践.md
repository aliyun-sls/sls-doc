作者：[姜止](https://yuque.antfin-inc.com/jiangzhihui.jzh)、[赖蒙](https://yuque.antfin-inc.com/laijunnan.ljn)
# 背景
Kubernetes 是主流的开源容器编排平台，用于管理容器化应用和服务。阿里云容器服务 Kubernetes 版（ACK）提供了强大的容器管理功能，是安全、可靠、稳定的企业级容器应用管理平台。
阿里云日志服务SLS是云原生观测与分析平台，为Log、Metric等数据提供大规模、低成本、实时的平台化服务。日志服务一站式提供数据采集、加工、查询与分析、可视化、告警、消费与投递等功能。日志服务SLS支持通过DaemonSet方式和Sidecar方式采集Kubernetes集群的容器日志。
本文主要介绍在容器服务不同的日志落盘方式下，SLS两种采集模式的采集流程和区别，以及在不同采集方式下如何尽量保证日志采集不丢失不重复的问题。
# Kubernetes落盘方案
## EmptyDir模式
EmptyDir是在Pod被分配到Node时创建的，它的初始内容为空，并且无需指定宿主机上对应的目录文件，因为Kubernetes会自动分配一个目录，当pod销毁时，EmptyDir中的数据也会被永久删除
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: log-v
      mountPath: /var/log/nginx     # 容器内目录
  volumes:
  - name: log-v
    emptyDir: {}
```
## HostPath模式
HostPath是将Node主机中的一个实际目录挂载到Pod中，以供容器使用，这样的设计就可以保证Pod销毁了，但是数据可以存在Node主机上
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: log-v
      mountPath: /var/log/nginx   # 容器内目录
  volumes:
  - name: log-v
    hostPath:
      path: /log/nginx          # 指定宿主机目录
      type: Directory
```
## PVC模式
PersistentVolumeClaim（PVC）是由用户进行存储的请求。 它类似于pod。 Pod消耗节点资源，PVC消耗PV资源。Pod可以请求特定级别的资源（CPU和内存）。PVC可以请求特定的存储大小和访问模式。
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nginx-claim
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: local-storage
---
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: log-v
      mountPath: /var/log/nginx   # 容器内目录
  volumes:
  - name: log-v
    persistentVolumeClaim:
      claimName: nginx-claim
```
## 优缺点对比
| 
 | 特点 | 优点 | 缺点 |
| --- | --- | --- | --- |
| EmptyDir | 
1. 数据写入ECS  /var/lib/docker/目录下
2. 日志总大小通过应用配置日志轮转控制
3. 如果容器重建漂移，目录会自动清理
 | 
1. 配置最简单，不需要指定宿主机目录，通过Kubernetes自动分配
2. 不存在hostpath的文件路径冲突场景
 | 
1. 有风险打满ECS磁盘，接近打满磁盘时，Kubernetes 有自动机制会驱逐POD，影响应用稳定性
2. 需要依赖应用配置日志轮转的方式控制日志大小，依赖业务行为
 |
| HostPath | 
1. 数据写入ECS ，写入目录由应用配置时指定
2. 日志总大小通过应用配置日志轮转控制
3. 如果容器重建漂移，原ECS中的文件仍会存在
 | 
1. 文件安全性增加，除非磁盘损坏或ECS故障无法恢复，否则不会丢失日志数据
2. 配置较PVC简单
 | 
1. 如果同一个应用的pod数量大于ACK节点数量，多个pod的日志会写入同一个日志文件，造成内容混乱，因此同一应用的POD需要严格分散在不同节点，资源利用率低，该问题需要通过设置subPathExpr来解决
2. POD重启后，原ECS上的日志无法被应用管理，存在打满ECS系统盘的风险，需要额外的文件清理工具
 |
| PVC | 
1. 日志文件单独挂盘，写入网络云盘，不落到ECS本地盘
2. POD重建漂移后，云盘会一起漂移
 | 
1. 不会有打爆ECS盘的风险，不影响ACK节点
2. 相比hostpath不需额外的日志清理工具
3. 无需保证ACK节点数大于应用POD数量
 | 
1. 资源开销大，每个pod单独为日志挂盘，考虑到磁盘预留会浪费更多的磁盘资源
2. 复杂度提高，每个pod单独挂盘，pvc数量多，增加运维管理成本
 |

# SLS容器日志采集方案
## SLS-Logtail数据采集可靠性
Logtail在采集日志时，定期将采集的点位（CheckPoint）信息保存到本地，如果遇到服务器意外关闭、进程崩溃等异常情况时，Logtail重启后会从上一次记录的位置开始采集数据，尽可能保证数据不丢失。Logtail会根据启动参数配置文件中配置进行工作，如果资源占用超过限定值5分钟以上，则Logtail会强制重启，重启后可能会产生一定的数据重复。
Logtail内部采用了很多机制提升日志采集可靠性，但并不能保证日志一定不会丢失。以下情况可能造成日志丢失：

- Logtail未运行且日志轮转多次。
- 日志轮转速度极快，例如1秒轮转1次。
- 日志采集速度长期无法达到日志产生速度。

**Logtail参数配置**
由于Logtail容器重启时可能会因丢失checkpoint信息等而造成采集重复或丢失，如果想要保证采集不丢失，需要将checkpoint等文件持久化存储。
首先配置固化采集器自身的配置文件，官方建议同时修改checkpoint文件、user_log_config文件和docker_file_cache_path文件的保存路径，并将宿主机挂载到此路径，在k8s中的配置实践如下。

- 创建/var/run/logtail 目录 。
- 修改logtail-ds的环境变量，增加 check_point_filename=/var/run/logtail/logtail_check_point；user_config_file_path=/var/run/logtail/user_log_config.json；docker_file_cache_path=/var/run/logtail/docker_path_config.json。
| **参数** | **环境变量** | **优先级** | **支持版本** |
| --- | --- | --- | --- |
| **check_point_filename** | **check_point_filename**或**ALIYUN_LOGTAIL_CHECK_POINT_PATH** | 如果您通过环境变量和配置文件修改了Logtail启动参数，以环境变量为准。 | Logtail 0.16.36及以上版本 |
| **docker_file_cache_path** | **docker_file_cache_path** | 如果您通过环境变量和配置文件修改了Logtail启动参数，以配置文件为准。 | Logtail 0.16.54及以上版本 |
| **user_config_file_path** | **user_config_file_path** | 如果您通过环境变量和配置文件修改了Logtail启动参数，以配置文件为准。 | Logtail 0.16.56及以上版本 |

## 通过Logtail DaemonSet采集容器文本日志
DaemonSet 确保全部（或者某些）节点上运行一个 Pod 的副本。 当有节点加入集群时， 也会为他们新增一个 Pod 。 当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。通过Daemonset的方式部署logtail可确保每个worker节点均存在一个logtail的pod，该logtail负责该节点上所有容器日志的采集。Daemonset部署模式也是阿里云ACK集群中sls logtail日志采集的默认形态。
![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/dabaa0b1af25dc21f4df69f667e6f6e7db96e450d28f22526bcd8f5474821ffe.png)
### 配置EmptyDir模式采集
上文Kubernetes落盘方案-EmptyDir模式中已介绍EmptyDir的配置方式，此处介绍SLS的采集配置。
#### SLS采集配置

1. 在**接入数据**区域，选择**Kubernetes-文件**。
2. 选择目标Project和Logstore。
3. 选择**使用现有机器组，**将该机器组从**源机器组**移动到**应用机器组**。
:::warning
注：ACK集群创建并安装Logtail组件后，日志服务自动创建名为**k8s-group-${your_k8s_cluster_id}**的机器组，当ACK集群节点有扩容或缩容等变化时，会同步更新该机器组中的机器列表
:::

4. 根据表单填写相应的采集路径，正则解析等，其中重点是选择打开**是否为Docker文件。**该开关打开时，sls会认为配置的日志路径是日志在容器中的路径，若关闭该开关则认为是节点路径![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/83851d1bda41782a4047e5827ca6be289e3634b5682cbd19670386bb853e29a0.png)
### 配置HostPath模式采集
#### Kubernetes配置
如上文在**Kubernetes落盘方案-优缺点**对比中所述，采用HostPath模式，如果同一个应用的pod数量大于ACK节点数量，多个pod的日志会写入同一个日志文件造成内容混乱，因此同一应用的POD需要严格分散在不同节点，资源利用率低，需要通过设置subPathExpr来解决。为了区分不同pod，在Kubernetes的pod配置中，将Pod信息先使用Downward API设置到环境变量上，再通过subPathExpr将其设置为subPath的名称。

- 在pod spec中，存在对应的volume mount配置，subPathExpr为环境变量中的pod name。
```
volumeMounts:
  - name: workdir1
    mountPath: /logs
    subPathExpr: $(POD_NAME)
```

- 在pod spec中，同时存在volume mount对应的volume。
```
volumes:
  - name: workdir1
    hostPath:
      path: /mnt
      type: DirectoryOrCreate  # 注：type必须是DirectoryOrCreate
```
该配置通过subPathExpr渲染使得宿主机目录中带上POD名称，确保不同POD的日志文件分散存放，完成配置后节点中会存在如下路径，/mnt/${pod_name}。
#### SLS采集配置
采取logtail直接采集日志在宿主机上的路径，绕过容器采集，保证日志采集完整性。
:::warning
当SLS配置了容器中的日志路径并进行采集时，K8s worker节点宕机场景下，POD在其他worker上重建，故障worker节点重启后其他未采集完的数据将无法再采集，因为POD已漂移，logtail无法再找到日志路径，因此我们可以采取logtail直接采集日志在宿主机上的路径。
:::

- 在**接入数据**区域，选择**正则-文本日志**。
- 选择目标Project和Logstore。
- 选择**使用现有机器组，并将ACK集群的机器组**从源机器组移动到应用机器组。

![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/4fc5944a73bb7e22498616b0c748b29e317cba909b83764d926ac58a3a124411.png)

- 是否为Docker文件采集选项需要关闭，即采集宿主机上日志路径![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/9e4ec2b47a6c6f268856223ca7dd4f79fffdaf692a9e94439fbe2197b3b467fd.png)
- 由于sls的logtail的pod创建之初就已经通过hostpath的方式将宿主机的根目录挂载到了容器中的logtail_host目录中，故采集该目录下的文件就等同于采集宿主机上的文件，即将logtail_host+上一步在k8s中配置的路径组合：**/logtail_host/mnt/**，然后根据实际需求，不同pod的采集路径可根据pod name进行相应调整。

![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/82a2ecc419409e529222448ef99d7e3f9a2fd106347bbaf241146ca7f094a7c8.png)
![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/4421adff76c5473d3414a40aaffe468b1a1cdf2f7dd6487627b895774c0ec2f1.png)
#### 注意事项
POD重启后，原ECS上的日志无法被应用管理，存在打满ECS系统盘的风险，需要额外的文件清理工具
### 配置PVC模式采集
K8s集群只需要在页面操作pv的创建和挂载即可，无需额外的手动配置
#### SLS采集配置
首先和hostpath模式下的采集类似，先将logtail的checkpoint信息等关键信息使用hostpath的方式固化到宿主机，然后进行接入

- 在**接入数据**区域，选择**正则-文本日志**。
- 选择目标Project和Logstore。
- 选择**使用现有机器组，并将ACK集群的机器组**从源机器组移动到应用机器组。

![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/4fc5944a73bb7e22498616b0c748b29e317cba909b83764d926ac58a3a124411.png)

- 对否为Docker文件采集选项需要关闭![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/9e4ec2b47a6c6f268856223ca7dd4f79fffdaf692a9e94439fbe2197b3b467fd.png)
- 在日志路径上，与hostpath配置类似，由于sls的logtail的pod创建之初就已经通过hostpath的方式将宿主机的根目录挂载到了容器中的logtail_host目录中，故采集该目录下的文件就等同于采集宿主机上的文件，即将logtail_host+宿主机上的路径组合。pv模式下宿主机挂载到pod中的完整路径为：/var/lib/kubelet/pods/${pod id}/volumes/kubernetes.io~csi/${存储卷名}/mount。由于pod id会受pod迁移的影响，故实际在SLS路径配置中可将${pod id}简化为**，sls上的配置最终路径为：**/logtail_host/var/lib/kubelet/pods/**/volumes/kubernetes.io~csi/${存储卷名}/mount/**，然后根据实际需求，不同的卷可根据存储卷名进行调整
#### 注意事项
若pod漂移，pv会跟着漂移到新的node节点上，新的node节点上的logtail的checkpoint信息并不准确，可能会造成部分数据的重复采集
**通过Sidecar采集容器文本日志**
通过Sidecar模式采集日志，依赖于Logtail容器和业务容器共享的日志目录。业务容器将日志写入到共享目录中，Logtail通过监控共享目录中日志文件的变化并采集日志。

![image.png](/img/src/technical/Kubernetes日志落盘及SLS日志采集实践/3a22d18d00624088fa63e684ceb55c7752d08531668e577f6033e814b8829269.png)

使用Sidecar模式后，SLS上的采集配置相对较简单，由于Sidecar容器和pod中的其他容器共享目录。故logtail采集配置中的路径设置为目标容器的路径，同时关闭是否为Docker文件采集选项即可。
通过Sidecar采集容器日志，需要将checkpoint固化到PV中以保证POD重启后采集数据不丢失不重复。使用Sidecar模式每个应用POD都会产生一个Logtail容器，且每个logtail都会占用CPU和内存资源，这部分是维护成本和资源开销是额外需要考虑的。
**Sidecar采集配置示例**
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  containers:
  - name: nginx  # 主容器
    image: nginx:latest
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: log-v
      mountPath: /var/log/nginx   # 容器内目录
  - name: logtail
    image: registry.cn-hangzhou.aliyuncs.com/log-service/logtail:latest
    env:
      # aliuid
      - name: "ALIYUN_LOGTAIL_USER_ID"
        value: "165421******3050"
      # 自定义标识机器组配置
      - name: "ALIYUN_LOGTAIL_USER_DEFINED_ID"
        value: "nginx-log-sidecar"
      # 启动配置（用于选择Logtail所在Region）
      - name: "ALIYUN_LOGTAIL_CONFIG"
        value: "/etc/ilogtail/conf/cn-hangzhou/ilogtail_config.json"
    # 和主容器共享volume
    volumeMounts:
    - name: log-v
      mountPath: /var/log/nginx
    # 健康检查
    livenessProbe:
      exec:
        command:
        - /etc/init.d/ilogtaild
        - status
      initialDelaySeconds: 30
      periodSeconds: 30      
  volumes:
  - name: log-v
    persistentVolumeClaim:
      claimName: nginx-claim
```
