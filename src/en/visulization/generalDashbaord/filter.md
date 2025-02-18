# Add a filter to a dashboard

You can add a filter to a dashboard. Then, you can use the filter to refine query results or replace placeholder variables with specific values. A filter is used to modify query statements or replace placeholder variables for all charts on a dashboard. Each chart displays the query and analysis result of a query statement, which is in the **[search query]** | **[sql query]** format. After a filter is added, a new query statement is executed.

## Filter type

Currently, you can set the filter type to Filter and Variable Replacement.

### Filter

Use a key-value pair as a filter condition. The filter condition is added before a query statement by using the **AND** or **NOT** operator. For example, if you set the **Key Value** parameter to **Value1**, **Key: Value1** is **automatically** added to the query statement of all charts. The query statement after you configure the **Key Value** parameter is **Key: Value1 AND [search query] | [sql query]**, which indicates that the system queries logs that contain **Key:Value1** in the result of the [search query] | [sql query] query statement. You can specify multiple values for the **Key Value** parameter. For example, if you set the **Key Value** parameter to **Value2** and **Value3**, **Key: Value2 OR Key: Value3** is **automatically** added to the query statement of all charts. The query statement after you configure the **Key Value** parameter is **Key: Value2 OR Key: Value3 AND [search query] | [sql query]**, which indicates that the system queries logs that contain **Key:Value2** or **Key: Value3** in the result of the [search query] | [sql query] query statement.

### Variable Replacement

Use a placeholder variable and the value of the placeholder variable. If the dashboard contains a chart for which the same variable is configured, the variable in the query statement of the chart is replaced with the value of the specified variable. This applies to all charts for which the same variable is configured. In most cases, you can **manually** add xxx $\{ \{ Key|defaultValue \} \} xxx to configure a variable. The **Key Value** parameter is used as a variable, and **defaultValue** is the default value of the **Key Value** parameter. If you do not specify a value for the **Key Value** parameter, the default value **defaultValue** takes effect. For example, if you set the **Key Value** parameter to **Value**, **$\{ \{ Key|defaultValue \} \}** in the query statement of all charts is replaced with **Value**. If you do not specify a value for the **Key Value** parameter, **$\{ \{ Key|defaultValue \} \}** in the query statement of all charts is replaced with **defaultValue**.

### Filter configurations

This section describes only the major configurations. For more information, see [Add a filter](https://www.alibabacloud.com/help/en/doc-detail/93647.html)。

#### Key Value

- If you select **Filter**, enter the field that you want to use to filter data in the **Key Value** field.
- If you select **Variable Replacement**, enter the variable that you want to use to filter data in the **Key Value** field.


#### Data list

The filter data list consists of **static list items** and **dynamic list items**.

- **Static List Items**: You must specify a fixed value for the **Key Value** parameter, and the value is generally the default value of the **Key Value** parameter for the first time you open a dashboard. You can click the plus sign (+) to add more values for the **Key Value** parameter. If you turn on **Select by Default** for a value, the value is used to filter data each time you open a dashboard.

- **Add Dynamic List Item**: If you turn on **Add Dynamic List Item**, dynamic values can be retrieved for the keys specified in the **Key Value** field. Dynamic list items are dynamic query results that are obtained by executing the specified query statement. The query results vary based on the time ranges.


#### Query Method

Add key-value pairs to filter data. Key-value pairs are added before a query statement by using the **AND** or **NOT** operator. By default, the **AND** operator is used.

- **AND：Key: Value AND [search query] | [sql query]**
- **NOT**：**NOT Key: Value AND [search query] | [sql query]**

#### Automatic Filtering

Specifies whether to filter the values that do not exist in the data list. You can specify a value in the data list for the **Key Value** parameter, manually enter a value for the **Key Value** parameter, or specify the carried value for the **Key Value** parameter. These values may not be included in the data list that you set. If you turn on **Automatic Filtering**, the values that do not exist in the data list are automatically filtered. The **Automatic Filtering** parameter is required only if you select **Filter**.

#### Global Filtering

If you want to filter values in all fields, turn on **Global Filtering**. If you want to filter values in specific fields, turn off **Global Filtering**.

For example, if you turn on **Global Filtering** and specify a value for the **Key Value** parameter, **Value** is **automatically** added to the query statement of all charts. The query statement after you configure the Key Value parameter is **Value AND [search query] | [sql query]**.

## Scenarios

### Scenario 1: Filter logs whose HTTP status codes are 200

Filter logs whose HTTP status codes are 200. Based on the filter definition, the statement is **status: 200 AND [search query] | [sql query]**. The **Key Value** parameter is **status**, and the parameter value is **200**.
To filter logs whose HTTP status codes are 200, perform the following steps:：

1. In the upper-right corner of the dashboard page, click **Edit**.
2. In edit mode, click the **Add Filter** icon.![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=g6EyP&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. In the **Filter** panel, configure the parameters, as shown in the following figure. For more information, see the "Filter configurations" section of this topic.
  ![picture 1](/img/src/en/visulization/filter/filter01.png)

4. Click **OK**. The filter is configured, as shown in the following figure.
  ![picture 1](/img/src/en/visulization/filter/filter02.png)

5. Execute the following original query statement to query logs.

Query statement:

```sql
 * | select status, count(*) as c group by status
```
The following figure shows the query result of logs whose HTTP status codes are not specified.


6. Set the **status** parameter to **200** to filter logs whose HTTP status codes are 200.

### Scenario 2: Filter the logs accessed by using GET and POST from NGINX access logs
Filter the logs accessed by using GET and POST from NGINX access logs. Based on the filter definition, the statement is **NOT (request_method: GET OR request_method: POST) AND [search query] | [sql query]**. The **Key Value** parameter is **request_method**, and the parameter value is **GET** and **POST**.
To filter logs whose HTTP status codes are 200, perform the following steps:：

1. In the upper-right corner of the dashboard page, click **Edit**.
2. In edit mode, click the **Add Filter** icon.![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=LHnqF&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. In the **Filter** panel, configure the parameters, as shown in the following figure. For more information, see the "Filter configurations" section of this topic.

 ![picture 1](/img/src/en/visulization/filter/filter03.png)

4. Click **OK**. The filter is configured, as shown in the following figure.

 ![picture 1](/img/src/en/visulization/filter/filter04.png)

5. Execute the following original query statement to query logs.
   Query statement:

```sql
* | select request_method, count(*) as c group by request_method；
```

6. Set the **request_method** parameter to POST and GET to filter the logs whose **request methods** are POST and GET.


### Scenario 3: Query the number of PVs of NGINX access logs per 60 seconds, 600 seconds, or 1,200 seconds
Scenario 3: Query the number of PVs of NGINX access logs per 60 seconds, 600 seconds, or 1,200 seconds

```sql
* | SELECT __time__ - __time__ % 60 as time, count(*) as count GROUP BY time ORDER BYtime
```

If you want to change the time interval, change the value of the variable named **interval** in **__time__ - __time__ % interval**. In this example, 60 is used. Based on the definition in a filter of the Variable Replacement type, the following query statement can be configured:

```sql
* | SELECT __time__ - __time__ % ${{ interval | 60 }} as time, count(*) as count GROUP BY time ORDER BYtime
```

In this statement, the **Key Value** parameter is the variable named **interval**, and **defaultValue** is 60.
To filter logs whose HTTP status codes are 200, perform the following steps:：

1. In the upper-right corner of the dashboard page, click **Edit**.
2. In edit mode, click the **Add Filter** icon.![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=QzB2w&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. In the **Filter** panel, configure the parameters, as shown in the following figure. For more information, see the "Filter configurations" section of this topic.

 ![picture 1](/img/src/en/visulization/filter/filter03.png)

4. Click **OK**. The filter is configured.

