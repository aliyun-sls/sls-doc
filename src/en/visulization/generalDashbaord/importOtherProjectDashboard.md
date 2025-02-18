# Import a dashboard

The dashboard import feature allows you to easily copy a dashboard. This saves time and effort spent on recreating and configuring the dashboard. In addition, the feature ensures the consistency and accuracy of the dashboard and improves the efficiency and accuracy of data analysis. You can import a dashboard within the same project and across projects, and change a Logstore. This topic describes how to use the dashboard import feature to copy a dashboard.

## Prerequisites

A source dashboard is created. For more information, see [Create a dashboard](https://www.alibabacloud.com/help/en/doc-detail/59324.htm#concept-osm-1nq-zdb)。

## Import configurations

You can import a dashboard with a few clicks by configuring parameters.


**The following table describes the parameters:**

| Parameter             | Description                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Source Project**    | Select the project to which the source dashboard belongs.。                                                                                               |
| **Source Dashboard**      | Select the source dashboard that you want to import.                                                                                                     |
| **Dashboard Name**    | Enter a name for the new dashboard.                                                                                                       |
| **Logstore Replacement** | If the new dashboard depends on a Logstore in the current project, you can replace the Logstore on which the source dashboard depends with the dependent Logstore in the current project. |

## Scenario 1: Import a dashboard in the same project


**Procedure：**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)。
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.

5. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

 ![picture 7](/img/src/en/visulization/generalDashbaord/doubley09.png)


## Scenario 2: Change a Logstore

**Procedure：**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)。
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.

5. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

6. Edit a chart and verify that the Logstore is changed to the destination Logstore named **test**.


## Scenario 3: Import a dashboard from a project to another project

**Procedure：**

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/)。
2. In the **Projects** section, click the name of the project that you want to manage.
3. In the left-side navigation pane, choose **Dashboard > Dashboards**.
4. In the upper-right corner of the **Dashboard** section, choose **+ > Import Existing Dashboard**.
5. In the **Import Existing Dashboard** dialog box, configure the following parameters.
6. Click **Import**. After the dashboard is imported, the page of the imported dashboard appears.

7. Edit a chart and verify that the Logstore is changed to the destination Logstore named **test**.