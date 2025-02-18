# Import a dashboard

The dashboard import feature allows you to easily copy a dashboard. This saves time and effort spent on recreating and configuring the dashboard. In addition, the feature ensures the consistency and accuracy of the dashboard and improves the efficiency and accuracy of data analysis. You can import a dashboard within the same project and across projects, and change a Logstore. This topic describes how to use the dashboard import feature to copy a dashboard.

## Prerequisites

A source dashboard is created. For more information, see [Create a dashboard](https://www.alibabacloud.com/help/en/doc-detail/59324.htm#concept-osm-1nq-zdb).

## Import configurations

You can import a dashboard with a few clicks by configuring parameters.
![image.png](/img/src/en/visulization/importOtherProjectDashboard/4a3d7d153429472af412228829099a49a6deb091ecfc3d585d2770e3cd7be629.png)

**The following table describes the parameters.**

| Parameter             | Description                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Source Project**    | Select the project to which the source dashboard belongs.                                                                                               |
| **Source Dashboard**      | Select the source dashboard that you want to import.                                                                                                     |
| **Dashboard Name**    | Enter a name for the new dashboard.                                                                                                       |
| **Logstore Replacement** | If the new dashboard depends on a Logstore in the current project, you can replace the Logstore on which the source dashboard depends with the dependent Logstore in the current project. |

## Scenario 1: Import a dashboard in the same project

Source Dashboard：**simulator-nginx-demo** > **线图-显示柱状** <br />
Source Logstore：**nginx-access-log**
![image.png](/img/src/en/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
Destination dashboard：**simulator-nginx-demo** > **线图-显示柱状-copy** <br />
Destination Logstore：**nginx-access-log**

**Procedure**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.
5. In the **Import Existing Dashboard** dialog box, configure the following parameters.<br />

- Source Project：**simulator-nginx-demo**<br />
- Source Dashboard：**线图-显示柱状**<br />
- Dashboard Name：**线图-显示柱状 copy**<br />

![image.png](/img/src/en/visulization/importOtherProjectDashboard/7acea442d8c63f8be3361164e9d051f9fd5f9336dc462fe60db27e00b230eb8b.png)

6. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

![image.png](/img/src/en/visulization/importOtherProjectDashboard/011c188b8974e82478f28d8a144b5ab22d7d424f2c6c8bd349750810fbcd0139.png)

## Scenario 2: Change a Logstore

Source Dashboard：**simulator-nginx-demo** > **线图-显示柱状**<br />
Source Logstore：**nginx-access-log**<br />
![image.png](/img/src/en/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
Destination dashboard：**simulator-nginx-demo** > **线图-显示柱状-copy** <br />
Destination Logstore：**test** <br />

**Procedure**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.
5. In the **Import Existing Dashboard** dialog box, configure the following parameters.

- Source Project：**simulator-nginx-demo** <br />
- Source Dashboard：**线图-显示柱状** <br />
- Dashboard Name：**线图-显示柱状 copy** <br />
- Logstore Replacement：**nginx-access-log** 替换为 **test** <br />
  ![image.png](/img/src/en/visulization/importOtherProjectDashboard/c191cd33bea63a12a0a5f38ad7a496ad56d6d17dd617419d9ddbbd44557a9870.png)

6. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

![image.png](/img/src/en/visulization/importOtherProjectDashboard/011c188b8974e82478f28d8a144b5ab22d7d424f2c6c8bd349750810fbcd0139.png)

7. Edit a chart and verify that the Logstore is changed to the destination Logstore named **test**.

![image.png](/img/src/en/visulization/importOtherProjectDashboard/a6468cb604d4408a25b0207794e328491bd469eca47266a459d06a838a23e627.png)

## Scenario 3: Import a dashboard from a project to another project

Source Dashboard：**simulator-nginx-demo** > **线图-显示柱状** <br />
Source Logstore：**nginx-access-log**<br />
![image.png](/img/src/en/visulization/importOtherProjectDashboard/fe1ed7808d138a0a1ea75534800750be4d1961e84493f9d4d01dae366dd1e9c1.png)
Destination Project：**wt-copy-nginx**<br />
Source Logstore：**wt-nginx-access-log**<br />

**Procedure**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.
5. In the **Import Existing Dashboard** dialog box, configure the following parameters.

- Source Project：**simulator-nginx-demo**<br />
- Source Dashboard：**线图-显示柱状**<br />
- Dashboard Name：**线图-显示柱状 copy**<br />
- Logstore Replacement：**nginx-access-log** Replace **wt-nginx-access-log**
  ![image.png](/img/src/en/visulization/importOtherProjectDashboard/9efea9a74efd81308ede28539a1712a8c21807367abb16ed16dce31257869af3.png)

6. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

![image.png](/img/src/en/visulization/importOtherProjectDashboard/e4c39a1d3909f3d75c6e88abc0d7c8384310bbcc6e47a4609342e47bb84cb91b.png)

7. Edit a chart and verify that the Logstore is changed to the destination Logstore named **test**.
![image.png](/img/src/en/visulization/importOtherProjectDashboard/9402b51fc48c3ef9c203432bb762c9eeb23d6aa5201b381acb9cbd4e65512d2c.png)
