# 导入仪表盘最佳实践

使用导入仪表盘功能，您可以轻松地复制仪表盘，省去重新构建和配置的时间和精力。同时，该功能确保仪表盘的一致性和准确性，提高数据分析的效率和准确性。导入功能支持同 project 导入、跨 project 导入 和 修改 logstore。
本文将通过具体场景为您介绍如何使用导入功能来复制仪表盘。

## 前提条件

已创建源仪表盘。具体操作，请参见[创建仪表盘](https://www.alibabacloud.com/help/en/doc-detail/59324.htm#concept-osm-1nq-zdb)。

## 导入配置

通过配置相应的配置项，可以实现一键导入仪表盘。
![image.png](/img/src/visulization/importOtherProjectDashboard/4a3d7d153429472af412228829099a49a6deb091ecfc3d585d2770e3cd7be629.png)

**配置项说明：**

| 参数              | 说明                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **源 Project**    | 选择源仪表盘所在的 Project。                                                                                               |
| **源仪表盘**      | 选择待导入的源仪表盘。                                                                                                     |
| **仪表盘名称**    | 设置新仪表盘的名称。                                                                                                       |
| **Logstore 替换** | 如果新仪表盘需要依赖当前 Project 中的 Logstore，则您可以将源仪表盘所依赖的 Logstore 替换为当前 Project 下的目标 Logstore。 |

## 使用场景一：导入相同 project 下的仪表盘

源仪表盘：**simulator-nginx-demo** > **线图-显示柱状** <br />
源 logstore：**nginx-access-log**
![image.png](/img/src/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
目标仪表盘：**simulator-nginx-demo** > **线图-显示柱状-copy** <br />
目标 logstore：**nginx-access-log**

**操作步骤：**

1. 登录[日志服务控制台](https://sls.console.aliyun.com/)。
2. 在 Project 列表区域，单击目标 Project。
3. 在左侧导航栏中，选择**仪表盘 > 仪表盘列表**。
4. 在**仪表盘**区域右侧，选择 **+ > 导入仪表盘**。
5. 配置相关参数<br />

- 源 project：**simulator-nginx-demo**<br />
- 源仪表盘：**线图-显示柱状**<br />
- 仪表盘名称：**线图-显示柱状 copy**<br />

![image.png](/img/src/visulization/importOtherProjectDashboard/7acea442d8c63f8be3361164e9d051f9fd5f9336dc462fe60db27e00b230eb8b.png)

6. 点击导入，导入成功后，系统将跳转至仪表盘页面。

![image.png](/img/src/visulization/importOtherProjectDashboard/011c188b8974e82478f28d8a144b5ab22d7d424f2c6c8bd349750810fbcd0139.png)

## 使用场景二：修改 logstore

源仪表盘：**simulator-nginx-demo** > **线图-显示柱状**<br />
源 logstore：**nginx-access-log**<br />
![image.png](/img/src/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
目标仪表盘：**simulator-nginx-demo** > **线图-显示柱状-copy** <br />
目标 logstore：**test** <br />

**操作步骤：**

1. 登录[日志服务控制台](https://sls.console.aliyun.com/)。
2. 在 Project 列表区域，单击目标 Project。
3. 在左侧导航栏中，选择 **仪表盘 > 仪表盘列表**。
4. 在**仪表盘**区域右侧，选择 **+ > 导入仪表盘**。
5. 配置相关参数

- 源 project：**simulator-nginx-demo** <br />
- 源仪表盘：**线图-显示柱状** <br />
- 仪表盘名称：**线图-显示柱状 copy** <br />
- logstore 替换：**nginx-access-log** 替换为 **test** <br />
  ![image.png](/img/src/visulization/importOtherProjectDashboard/c191cd33bea63a12a0a5f38ad7a496ad56d6d17dd617419d9ddbbd44557a9870.png)

6. 点击导入，导入成功后，系统将跳转至仪表盘页面。

![image.png](/img/src/visulization/importOtherProjectDashboard/011c188b8974e82478f28d8a144b5ab22d7d424f2c6c8bd349750810fbcd0139.png)

7. 编辑图表,查看 logstore 被修改成了目标 logstore: **test**。

![image.png](/img/src/visulization/importOtherProjectDashboard/a6468cb604d4408a25b0207794e328491bd469eca47266a459d06a838a23e627.png)

## 使用场景三：导入不同 project 下的仪表盘

源仪表盘：**simulator-nginx-demo** > **线图-显示柱状** <br />
源 logstore：**nginx-access-log**<br />
![image.png](/img/src/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
目标 Project：**wt-copy-nginx**<br />
源 logstore：**wt-nginx-access-log**<br />

**操作步骤：**

1. 登录[日志服务控制台](https://sls.console.aliyun.com/)。
2. 在 Project 列表区域，单击目标 Project。
3. 在左侧导航栏中，选择**仪表盘 > 仪表盘列表**。
4. 在**仪表盘**区域右侧，选择 **+ > 导入仪表盘**。
5. 配置相关参数

- 源 project：**simulator-nginx-demo**<br />
- 源仪表盘：**线图-显示柱状**<br />
- 仪表盘名称：**线图-显示柱状 copy**<br />
- logstore 替换：**nginx-access-log** 替换为 **wt-nginx-access-log**
  ![image.png](/img/src/visulization/importOtherProjectDashboard/9efea9a74efd81308ede28539a1712a8c21807367abb16ed16dce31257869af3.png)

6. 点击导入，导入成功后，系统将跳转至仪表盘页面。

![image.png](/img/src/visulization/importOtherProjectDashboard/e4c39a1d3909f3d75c6e88abc0d7c8384310bbcc6e47a4609342e47bb84cb91b.png)

7. 编辑图表,查看 logstore 被修改成了目标 logstore: **wt-nginx-access-log**。

![image.png](/img/src/visulization/importOtherProjectDashboard/9402b51fc48c3ef9c203432bb762c9eeb23d6aa5201b381acb9cbd4e65512d2c.png)
