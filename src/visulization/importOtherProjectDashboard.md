# 导入仪表盘最佳实践
当您需要跨Project复制仪表盘时，可通过导入功能实现。本文将通过具体场景介绍如何跨project导入仪表盘。
## 前提条件
已创建源仪表盘。具体操作，请参见[创建仪表盘](https://help.aliyun.com/document_detail/59324.htm#concept-osm-1nq-zdb)。
## 导入配置
通过配置相应的配置项，可以实现一键导入仪表盘。
![image.png](/img/src/visulization/importOtherProjectDashboard/4a3d7d153429472af412228829099a49a6deb091ecfc3d585d2770e3cd7be629.png)

**配置项说明：**
| 参数 | 说明 |
| --- | --- |
| **源Project** | 选择源仪表盘所在的Project。 |
| **源仪表盘** | 选择待导入的源仪表盘。 |
| **仪表盘名称** | 设置新仪表盘的名称。 |
| **Logstore替换** | 如果新仪表盘需要依赖当前Project中的Logstore，则您可以将源仪表盘所依赖的Logstore替换为当前Project下的目标Logstore。 |

## 使用场景：导入不同project下的仪表盘
源仪表盘：**simulator-nginx-demo** > **线图-显示柱状**
![image.png](/img/src/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
目标Project：**wt-copy-nginx**

**操作步骤：**
1. 登录[日志服务控制台](https://sls.console.aliyun.com/)。
2. 在Project列表区域，单击目标Project。
3. 在左侧导航栏中，选择**仪表盘 > 仪表盘列表**。
4. 在**仪表盘**区域右侧，选择 **+** > **导入仪表盘**。
5. 配置相关参数
源project：**simulator-nginx-demo**
源仪表盘：**线图-显示柱状**
仪表盘名称：**线图-显示柱状copy**
logstore替换：**nginx-access-log** 替换为 **wt-nginx-access-log**
![image.png](/img/src/visulization/importOtherProjectDashboard/9efea9a74efd81308ede28539a1712a8c21807367abb16ed16dce31257869af3.png)

6. 点击导入，倒入成功后，系统将跳转至仪表盘页面。
![image.png](/img/src/visulization/importOtherProjectDashboard/e4c39a1d3909f3d75c6e88abc0d7c8384310bbcc6e47a4609342e47bb84cb91b.png)