# Add a filter to a dashboard

You can add a filter to a dashboard. Then, you can use the filter to refine query results or replace placeholder variables with specific values. A filter is used to modify query statements or replace placeholder variables for all charts on a dashboard. Each chart displays the query and analysis result of a query statement, which is in the **[search query]** | **[sql query]** format. After a filter is added, a new query statement is executed.

## Filter type

Currently, you can set the filter type to Filter and Variable Replacement.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677486800238-75b40c7b-7812-4235-8b95-64fb73eb1607.png#clientId=ud5c859b4-702b-4&from=paste&height=70&id=u3e74f027&name=image.png&originHeight=70&originWidth=374&originalType=binary&ratio=2&rotation=0&showTitle=false&size=13290&status=done&style=none&taskId=u0d5e8965-7f44-4fa0-ba32-b70794b4f75&title=&width=374)

### Filter

Use a key-value pair as a filter condition. The filter condition is added before a query statement by using the **AND** or **NOT** operator. For example, if you set the **Key Value** parameter to **Value1**, **Key: Value1** is **automatically** added to the query statement of all charts. The query statement after you configure the **Key Value** parameter is **Key: Value1 AND [search query] | [sql query]**, which indicates that the system queries logs that contain **Key:Value1** in the result of the [search query] | [sql query] query statement. You can specify multiple values for the **Key Value** parameter. For example, if you set the **Key Value** parameter to **Value2** and **Value3**, **Key: Value2 OR Key: Value3** is **automatically** added to the query statement of all charts. The query statement after you configure the **Key Value** parameter is **Key: Value2 OR Key: Value3 AND [search query] | [sql query]**, which indicates that the system queries logs that contain **Key:Value2** or **Key: Value3** in the result of the [search query] | [sql query] query statement.

### Variable Replacement

Use a placeholder variable and the value of the placeholder variable. If the dashboard contains a chart for which the same variable is configured, the variable in the query statement of the chart is replaced with the value of the specified variable. This applies to all charts for which the same variable is configured. In most cases, you can **manually** add xxx $\{ \{ Key|defaultValue \} \} xxx to configure a variable. The **Key Value** parameter is used as a variable, and **defaultValue** is the default value of the **Key Value** parameter. If you do not specify a value for the **Key Value** parameter, the default value **defaultValue** takes effect. For example, if you set the **Key Value** parameter to **Value**, **$\{ \{ Key|defaultValue \} \}** in the query statement of all charts is replaced with **Value**. If you do not specify a value for the **Key Value** parameter, **$\{ \{ Key|defaultValue \} \}** in the query statement of all charts is replaced with **defaultValue**.

### Filter configurations

This section describes only the major configurations. For more information, see [Add a filter](https://www.alibabacloud.com/help/en/doc-detail/93647.html)。

#### Key Value

- If you select **Filter**, enter the field that you want to use to filter data in the **Key Value** field.
- If you select **Variable Replacement**, enter the variable that you want to use to filter data in the **Key Value** field.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498576100-53b894ed-bd50-4e6e-9912-8d29066aca7b.png#clientId=ud5c859b4-702b-4&from=paste&height=56&id=u2f5d61ee&name=image.png&originHeight=76&originWidth=506&originalType=binary&ratio=2&rotation=0&showTitle=false&size=14737&status=done&style=stroke&taskId=ud3072eb1-f248-4455-a7df-a4b1a78dcc6&title=&width=371)

#### Data list

The filter data list consists of **static list items** and **dynamic list items**.

- **Static List Items**: You must specify a fixed value for the **Key Value** parameter, and the value is generally the default value of the **Key Value** parameter for the first time you open a dashboard. You can click the plus sign (+) to add more values for the **Key Value** parameter. If you turn on **Select by Default** for a value, the value is used to filter data each time you open a dashboard.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498974669-b0cf2721-b3c5-4e03-bc44-5685241459dc.png#clientId=ud5c859b4-702b-4&from=paste&height=108&id=ub98a57e4&name=image.png&originHeight=216&originWidth=880&originalType=binary&ratio=2&rotation=0&showTitle=false&size=53581&status=done&style=stroke&taskId=ufbf78b93-f250-498a-bdc4-6b698f825d7&title=&width=440)

- **Add Dynamic List Item**: If you turn on **Add Dynamic List Item**, dynamic values can be retrieved for the keys specified in the **Key Value** field. Dynamic list items are dynamic query results that are obtained by executing the specified query statement. The query results vary based on the time ranges.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499100133-f9bd7038-8bf3-4b29-905c-3ad617a73eb7.png#clientId=ud5c859b4-702b-4&from=paste&height=356&id=u40de05d7&name=image.png&originHeight=712&originWidth=998&originalType=binary&ratio=2&rotation=0&showTitle=false&size=53941&status=done&style=stroke&taskId=u56149ca3-aac7-49cb-9e65-3fa63a49fe4&title=&width=499)

#### Query Method

Add key-value pairs to filter data. Key-value pairs are added before a query statement by using the **AND** or **NOT** operator. By default, the **AND** operator is used.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498348253-cdf3c579-858c-4409-8e0a-d0aa2c2403e2.png#clientId=ud5c859b4-702b-4&from=paste&height=51&id=u853572d8&name=image.png&originHeight=72&originWidth=520&originalType=binary&ratio=2&rotation=0&showTitle=false&size=15779&status=done&style=stroke&taskId=u0a8b2e54-af8c-4b57-b14e-6d3b7032292&title=&width=370)

- **AND：Key: Value AND [search query] | [sql query]**
- **NOT**：**NOT Key: Value AND [search query] | [sql query]**

#### Automatic Filtering

Specifies whether to filter the values that do not exist in the data list. You can specify a value in the data list for the **Key Value** parameter, manually enter a value for the **Key Value** parameter, or specify the carried value for the **Key Value** parameter. These values may not be included in the data list that you set. If you turn on **Automatic Filtering**, the values that do not exist in the data list are automatically filtered. The **Automatic Filtering** parameter is required only if you select **Filter**.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499170826-68e65b82-87ed-48a5-bdbe-c702b16d239f.png#clientId=ud5c859b4-702b-4&from=paste&height=52&id=u9a22cf7f&name=image.png&originHeight=64&originWidth=250&originalType=binary&ratio=2&rotation=0&showTitle=false&size=9308&status=done&style=stroke&taskId=ub7dccbc1-119e-4c83-8d77-e048bc2f26d&title=&width=202)

#### Global Filtering

If you want to filter values in all fields, turn on **Global Filtering**. If you want to filter values in specific fields, turn off **Global Filtering**.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499735709-5bc8e0a7-6654-4155-95cc-c9121f28c5b1.png#clientId=ud5c859b4-702b-4&from=paste&height=51&id=u81dce9c7&name=image.png&originHeight=66&originWidth=238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=9483&status=done&style=stroke&taskId=u9d8e6a18-2910-4fde-9575-6fec04d5592&title=&width=183)
For example, if you turn on **Global Filtering** and specify a value for the **Key Value** parameter, **Value** is **automatically** added to the query statement of all charts. The query statement after you configure the Key Value parameter is **Value AND [search query] | [sql query]**.

## Scenarios

### Scenario 1: Filter logs whose HTTP status codes are 200

Filter logs whose HTTP status codes are 200. Based on the filter definition, the statement is **status: 200 AND [search query] | [sql query]**. The **Key Value** parameter is **status**, and the parameter value is **200**.
To filter logs whose HTTP status codes are 200, perform the following steps:：

1. In the upper-right corner of the dashboard page, click **Edit**.
2. In edit mode, click the **Add Filter** icon.![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=g6EyP&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. In the **Filter** panel, configure the parameters, as shown in the following figure. For more information, see the "Filter configurations" section of this topic.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497525544-7da56b8e-f441-4610-a4f8-fed3d2bad76e.png#clientId=ud5c859b4-702b-4&from=paste&height=725&id=e5vkz&name=image.png&originHeight=1450&originWidth=1016&originalType=binary&ratio=2&rotation=0&showTitle=false&size=360993&status=done&style=none&taskId=u9cef7763-93f4-4f3f-9cae-82890b9a8b3&title=&width=508)

4. Click **OK**. The filter is configured, as shown in the following figure.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677500890256-1b95b23f-ec7b-46aa-a028-43096c517583.png#clientId=ud5c859b4-702b-4&from=paste&height=253&id=u4e588035&name=image.png&originHeight=430&originWidth=850&originalType=binary&ratio=2&rotation=0&showTitle=false&size=82264&status=done&style=none&taskId=u1139d894-849f-4446-96d5-0f0025075de&title=&width=500)

5. Execute the following original query statement to query logs.

Query statement:

```sql
 * | select status, count(*) as c group by status
```
The following figure shows the query result of logs whose HTTP status codes are not specified.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501232166-9756f4ef-ea72-4319-aebb-d08d854db3b0.png#clientId=ud5c859b4-702b-4&from=paste&height=693&id=u7fb524cf&name=image.png&originHeight=1386&originWidth=3238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=828149&status=done&style=none&taskId=u55391bdf-70d5-4b34-8917-3c56b52bc8f&title=&width=1619)

6. Set the **status** parameter to **200** to filter logs whose HTTP status codes are 200.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501121889-3b27446f-7a1d-4400-9dad-d94038c0e8f3.png#clientId=ud5c859b4-702b-4&from=paste&height=717&id=u945b3929&name=image.png&originHeight=1434&originWidth=3238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=777359&status=done&style=none&taskId=u02c0c5b6-79d4-48f5-8f8f-f30b6ee7c5d&title=&width=1619)

### Scenario 2: Filter the logs accessed by using GET and POST from NGINX access logs
Filter the logs accessed by using GET and POST from NGINX access logs. Based on the filter definition, the statement is **NOT (request_method: GET OR request_method: POST) AND [search query] | [sql query]**. The **Key Value** parameter is **request_method**, and the parameter value is **GET** and **POST**.
To filter logs whose HTTP status codes are 200, perform the following steps:：

1. In the upper-right corner of the dashboard page, click **Edit**.
2. In edit mode, click the **Add Filter** icon.![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=LHnqF&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. In the **Filter** panel, configure the parameters, as shown in the following figure. For more information, see the "Filter configurations" section of this topic.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502206868-f66245ac-cade-4a7e-a028-3be3c41c6472.png#clientId=ud5c859b4-702b-4&from=paste&height=729&id=u3f3ecb5b&name=image.png&originHeight=1458&originWidth=1012&originalType=binary&ratio=2&rotation=0&showTitle=false&size=363666&status=done&style=none&taskId=u8d22474e-1f46-45bc-a857-51534047b53&title=&width=506)

4. Click **OK**. The filter is configured, as shown in the following figure.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501850020-3234a0e2-b91a-48e5-a8df-82cc83d7d2dc.png#clientId=ud5c859b4-702b-4&from=paste&height=197&id=u7183c323&name=image.png&originHeight=394&originWidth=854&originalType=binary&ratio=2&rotation=0&showTitle=false&size=76713&status=done&style=none&taskId=u1d8a6b85-c185-41a2-89ff-92556b88f0e&title=&width=427)

5. Execute the following original query statement to query logs.
   Query statement:

```sql
* | select request_method, count(*) as c group by request_method；
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502247649-a6b93a47-6702-4b11-a62c-2b9030f7044b.png#clientId=ud5c859b4-702b-4&from=paste&height=693&id=u7566d5cb&name=image.png&originHeight=1386&originWidth=3244&originalType=binary&ratio=2&rotation=0&showTitle=false&size=769476&status=done&style=none&taskId=u73963ca5-dbde-413d-9e60-4bb7ef330c8&title=&width=1622)

6. Set the **request_method** parameter to POST and GET to filter the logs whose **request methods** are POST and GET.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502450756-b8a85f52-3843-48ad-aba5-2eaa980c5a15.png#clientId=ud5c859b4-702b-4&from=paste&height=721&id=ubf0927da&name=image.png&originHeight=1442&originWidth=3246&originalType=binary&ratio=2&rotation=0&showTitle=false&size=801652&status=done&style=none&taskId=u2cf7c2d2-d0a3-444f-a83b-52fe164399c&title=&width=1623)

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

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677511806438-597c01f8-176e-439b-b5fc-da23bddbe327.png#clientId=ud5c859b4-702b-4&from=paste&height=532&id=uc4c56be7&name=image.png&originHeight=1064&originWidth=1002&originalType=binary&ratio=2&rotation=0&showTitle=false&size=275645&status=done&style=none&taskId=ub551917b-9eeb-43c1-9341-363d25a3d6c&title=&width=501)

4. Click **OK**. The filter is configured, as shown in the following figure.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512255369-0f44190f-ffa8-40a1-8218-b3c1b0624b97.png#clientId=ud5c859b4-702b-4&from=paste&height=152&id=u02a67d61&name=image.png&originHeight=304&originWidth=946&originalType=binary&ratio=2&rotation=0&showTitle=false&size=66542&status=done&style=none&taskId=u3ddc2e02-43fb-453e-8343-c59ef344cf4&title=&width=473)

5. Execute the following original query statement to query logs.：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512517030-5f77a37c-6114-4fde-8a2d-11aed071de78.png#clientId=ud5c859b4-702b-4&from=paste&height=761&id=uccc13b6f&name=image.png&originHeight=1522&originWidth=2788&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1135828&status=done&style=none&taskId=ub631ee11-04fa-425e-8b2a-f4d4cfb72fd&title=&width=1394)
可以看到图中的两个点时间间隔刚好为默认值 60。

6. 设置时间刻度为 600s

设置 interval 为 600， 600s（10min）提前加到了静态列表中，只需要在过滤器的下拉列表中选择 600（10min）即可。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512911795-446c009d-d0f2-4a83-a2f1-60046f5c5fb1.png#clientId=ud5c859b4-702b-4&from=paste&height=722&id=u1297fe8c&name=image.png&originHeight=1444&originWidth=3600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1459687&status=done&style=none&taskId=u09aef0aa-3fcf-4321-beff-dfe26be3d0f&title=&width=1800)
As shown in the previous figure, the time interval between the two points is 600.

7. Set the query interval to 1,200 seconds.

Set the value of the variable named **interval** to **1200**. If you do not add 1200 to the static list in advance, you must manually set the interval to 1200.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677513114742-aad52da0-2b3b-4170-bf57-8b4caed60610.png#clientId=ud5c859b4-702b-4&from=paste&height=722&id=u9f4ed57b&name=image.png&originHeight=1444&originWidth=3606&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1469016&status=done&style=none&taskId=u6ae6ed35-4209-4289-bf9d-5ebee4c2aa5&title=&width=1803)
As shown in the previous figure, the time interval between the two points is 1200.
