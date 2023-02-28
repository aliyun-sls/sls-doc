# 仪表盘过滤器最佳实践
在日志服务仪表盘中添加过滤器，即对整个仪表盘进行查询过滤或变量替换操作。过滤器用于为仪表盘中的所有统计图表批量修改查询条件或替换占位符变量。每张统计图表实际为一个查询和分析语句（**[search query]** | **[sql query]**），过滤器实质上是操作该查询语句（**[search query]**）和分析语句（**[sql query]**）
## 过滤器类型
过滤器类型目前分为：过滤器 和 变量替换
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677486800238-75b40c7b-7812-4235-8b95-64fb73eb1607.png#clientId=ud5c859b4-702b-4&from=paste&height=70&id=u3e74f027&name=image.png&originHeight=70&originWidth=374&originalType=binary&ratio=2&rotation=0&showTitle=false&size=13290&status=done&style=none&taskId=u0d5e8965-7f44-4fa0-ba32-b70794b4f75&title=&width=374)
### 过滤器
通过日志字段的Key和Value进行过滤。在执行过滤器操作时，将其作为过滤条件增加到查询和分析语句前，使用 **AND** 或 **NOT** 连接。例如：在过滤器中给 **Key** 的值选择 **Value1**，则所有图表语句中会 **自动** 加上 **Key: Value1** 最终变成  **Key: Value1 AND [search query] | [sql query]** 的形式。该语句表示在原查询和分析语句的结果中，查找包含**Key:Value1**的日志。
同时 **Key** 的值可以设置多个value。例如：在过滤器中给 **Key** 的值选择 **Value2** 和 **Value3**，则所有图表语句会 **自动** 加上 **Key: Value2 OR Key: Value3** 最终变成 **Key: Value2 OR Key: Value3 AND [search query] | [sql query]** 的形式。该语句表示在原查询和分析语句的结果中，查找包含 **Key:Value2** 或者 **Key: Value3** 的日志。
### 变量替换
指定变量和变量的值。如果仪表盘中已有设置了该变量占位符的统计图表，则添加变量类型的过滤器后，自动将统计图表的查询和分析语句中的变量替换为您选择的变量值。对整个仪表盘已设置该变量的统计图表都生效。一般在查询语句中通过 **手动** 添加 xxx $\{ \{ Key|defaultValue \} \} xxx 去设置变量，**Key** 作为变量名，**defaultValue** 为默认值，在 **Key** 的值不存在的情况下生效。例如：在过滤器中给 **Key** 的值选择为 **Value**, 则所有图表语句中 **$\{ \{ Key|defaultValue \} \}** 会被替换成 **Value**; 如果不给 Key 选择值，则所有图表语句中 **$\{ \{ Key|defaultValue \} \}** 会被替换成 **defaultValue**。

### 过滤器配置
本部分只对关键配置进行演示。更详细的配置，请参见[过滤器配置](https://help.aliyun.com/document_detail/93647.html)。
#### Key 值

- 如果您选择**过滤器**类型，则在**Key值**中配置目标字段名。
- 如果您选择**变量替换**类型，则在**Key值**中配置目标变量名。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498576100-53b894ed-bd50-4e6e-9912-8d29066aca7b.png#clientId=ud5c859b4-702b-4&from=paste&height=56&id=u2f5d61ee&name=image.png&originHeight=76&originWidth=506&originalType=binary&ratio=2&rotation=0&showTitle=false&size=14737&status=done&style=stroke&taskId=ud3072eb1-f248-4455-a7df-a4b1a78dcc6&title=&width=371)
#### 数据列表
过滤器的数据列表由**静态列表项**和**动态列表项**构成。

- **静态列表**：设置key值对应的Value，设置的值是固定不变的，一般常用于设置初次进入仪表盘的默认值。多次单击\+，可添加多个Value。如果开启默认选中，则每次打开仪表盘时，默认使用该Value执行过滤。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498974669-b0cf2721-b3c5-4e03-bc44-5685241459dc.png#clientId=ud5c859b4-702b-4&from=paste&height=108&id=ub98a57e4&name=image.png&originHeight=216&originWidth=880&originalType=binary&ratio=2&rotation=0&showTitle=false&size=53581&status=done&style=stroke&taskId=ufbf78b93-f250-498a-bdc4-6b698f825d7&title=&width=440)

- **动态列表**：打开添加动态列表项开关，可添加动态列表项，即为Key值配置动态的Value。动态列表项为对应查询和分析语句的查询结果，在不同的时间范围，查询结果是动态变化的。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499100133-f9bd7038-8bf3-4b29-905c-3ad617a73eb7.png#clientId=ud5c859b4-702b-4&from=paste&height=356&id=u40de05d7&name=image.png&originHeight=712&originWidth=998&originalType=binary&ratio=2&rotation=0&showTitle=false&size=53941&status=done&style=stroke&taskId=u56149ca3-aac7-49cb-9e65-3fa63a49fe4&title=&width=499)
#### 查询方式
通过字段名和字段值进行过滤。在执行过滤器操作时，将其作为过滤条件增加到查询和分析语句前，使用 **AND** 或 **NOT** 进行连接，默认为 **AND**。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677498348253-cdf3c579-858c-4409-8e0a-d0aa2c2403e2.png#clientId=ud5c859b4-702b-4&from=paste&height=51&id=u853572d8&name=image.png&originHeight=72&originWidth=520&originalType=binary&ratio=2&rotation=0&showTitle=false&size=15779&status=done&style=stroke&taskId=u0a8b2e54-af8c-4b57-b14e-6d3b7032292&title=&width=370)

- **AND：Key: Value AND [search query] | [sql query]**
- **NOT**：**NOT Key: Value AND [search query] | [sql query]**
#### 自动过滤
是否过滤掉数据列表中不存在的值。过滤器的值不但可以自己从数据列表中选择一个Value，同时还可以是自己手动输入的值以及跳转到该界面时携带的值，这些值不一定在设置的数据列表中，开启自动过滤后会去掉这些不存在的值。一般还可以用于和变量替换的联合使用。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499170826-68e65b82-87ed-48a5-bdbe-c702b16d239f.png#clientId=ud5c859b4-702b-4&from=paste&height=52&id=u9a22cf7f&name=image.png&originHeight=64&originWidth=250&originalType=binary&ratio=2&rotation=0&showTitle=false&size=9308&status=done&style=stroke&taskId=ub7dccbc1-119e-4c83-8d77-e048bc2f26d&title=&width=202)
#### 全局过滤
开启全局过滤后，表示在所有字段中过滤Value，无需指定Key。关闭全局过滤，表示仅在指定的Key中过滤Value。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677499735709-5bc8e0a7-6654-4155-95cc-c9121f28c5b1.png#clientId=ud5c859b4-702b-4&from=paste&height=51&id=u81dce9c7&name=image.png&originHeight=66&originWidth=238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=9483&status=done&style=stroke&taskId=u9d8e6a18-2910-4fde-9575-6fec04d5592&title=&width=183)
例如：开启了全局过滤并选择了一个 Value，则所有图表语句会 **自动 **加上 **Value **最终变成 **Value AND [search query] | [sql query] **的形式**。**
## 使用场景
### 场景一：过滤出状态码等于200的日志
过滤出状态码等于200的日志，按照过滤器中的定义转换成语句就是 **status: 200 AND [search query] | [sql query]**，Key 等于 **status**， value 等于 **200**。
具体配置如下：

1. 在仪表盘页面，单击编辑。
2. 编辑模式下，在操作栏中，单击图标选择过滤器图标![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=g6EyP&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. 在过滤器面板中，完成如下配置，更多配置信息，请参见上文过滤器配置。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497525544-7da56b8e-f441-4610-a4f8-fed3d2bad76e.png#clientId=ud5c859b4-702b-4&from=paste&height=725&id=e5vkz&name=image.png&originHeight=1450&originWidth=1016&originalType=binary&ratio=2&rotation=0&showTitle=false&size=360993&status=done&style=none&taskId=u9cef7763-93f4-4f3f-9cae-82890b9a8b3&title=&width=508)

4. 点击确认，配置出来的过滤器如下图所示：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677500890256-1b95b23f-ec7b-46aa-a028-43096c517583.png#clientId=ud5c859b4-702b-4&from=paste&height=253&id=u4e588035&name=image.png&originHeight=430&originWidth=850&originalType=binary&ratio=2&rotation=0&showTitle=false&size=82264&status=done&style=none&taskId=u1139d894-849f-4446-96d5-0f0025075de&title=&width=500)

5. 原始查询数据如下所示

查询语句：
```sql  
 * | select status, count(*) as c group by status
```
统计不同status的数量
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501232166-9756f4ef-ea72-4319-aebb-d08d854db3b0.png#clientId=ud5c859b4-702b-4&from=paste&height=693&id=u7fb524cf&name=image.png&originHeight=1386&originWidth=3238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=828149&status=done&style=none&taskId=u55391bdf-70d5-4b34-8917-3c56b52bc8f&title=&width=1619)

6. 给过滤器中 **status** 选择 200 ，最终过滤掉 status 不等于200 的数据

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501121889-3b27446f-7a1d-4400-9dad-d94038c0e8f3.png#clientId=ud5c859b4-702b-4&from=paste&height=717&id=u945b3929&name=image.png&originHeight=1434&originWidth=3238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=777359&status=done&style=none&taskId=u02c0c5b6-79d4-48f5-8f8f-f30b6ee7c5d&title=&width=1619)
### 场景二：过滤出Nginx访问日志中，不用 GET 和 POST 访问的日志数量
过滤出Nginx访问日志中，用 GET 和 POST 访问的日志数量，按照过滤器中的定义转换成语句就是 **NOT (request_method: GET OR request_method: POST) AND [search query] | [sql query]**,Key 等于 **request_method**， value 等于 **GET** 和 **POST**。
具体配置如下：

1. 在仪表盘页面，单击编辑。
2. 编辑模式下，在操作栏中，单击图标选择过滤器图标![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=LHnqF&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. 在过滤器面板中，完成如下配置，更多配置信息，请参见上文过滤器配置。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502206868-f66245ac-cade-4a7e-a028-3be3c41c6472.png#clientId=ud5c859b4-702b-4&from=paste&height=729&id=u3f3ecb5b&name=image.png&originHeight=1458&originWidth=1012&originalType=binary&ratio=2&rotation=0&showTitle=false&size=363666&status=done&style=none&taskId=u8d22474e-1f46-45bc-a857-51534047b53&title=&width=506)

4. 点击确认，配置出来的过滤器如下图所示：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677501850020-3234a0e2-b91a-48e5-a8df-82cc83d7d2dc.png#clientId=ud5c859b4-702b-4&from=paste&height=197&id=u7183c323&name=image.png&originHeight=394&originWidth=854&originalType=binary&ratio=2&rotation=0&showTitle=false&size=76713&status=done&style=none&taskId=u1d8a6b85-c185-41a2-89ff-92556b88f0e&title=&width=427)

5. 原始查询数据如下所示
查询语句：
```sql 
* | select request_method, count(*) as c group by request_method；
```
统计不同request_method的数量
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502247649-a6b93a47-6702-4b11-a62c-2b9030f7044b.png#clientId=ud5c859b4-702b-4&from=paste&height=693&id=u7566d5cb&name=image.png&originHeight=1386&originWidth=3244&originalType=binary&ratio=2&rotation=0&showTitle=false&size=769476&status=done&style=none&taskId=u73963ca5-dbde-413d-9e60-4bb7ef330c8&title=&width=1622)

6. 给过滤器中 **request_method** 选择 POST 和 GET，过滤掉 **request_method** 中为 POST 和 GET 的日志。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677502450756-b8a85f52-3843-48ad-aba5-2eaa980c5a15.png#clientId=ud5c859b4-702b-4&from=paste&height=721&id=ubf0927da&name=image.png&originHeight=1442&originWidth=3246&originalType=binary&ratio=2&rotation=0&showTitle=false&size=801652&status=done&style=none&taskId=u2cf7c2d2-d0a3-444f-a83b-52fe164399c&title=&width=1623)
### 场景三：查看每60秒、600秒或1200秒的Nginx访问日志的访问PV
查看每60秒、600秒或1200秒的Nginx访问日志的访问PV，可以添加变量类型的过滤器，避免多次修改查询和分析语句进行查询。我们默认查询的时间刻度为60s，则查询语句为 ：
```sql
* | SELECT __time__ - __time__ % 60 as time, count(*) as count GROUP BY time ORDER BYtime
```
我们改变时间刻度其实就只需要改变 __time__ - __time__ % interval 中的 interval 就好了，因为要求默认是60，那按照变量替换型过滤器的定义，可以将语句转换成：
```sql
* | SELECT __time__ - __time__ % ${{ interval | 60 }} as time, count(*) as count GROUP BY time ORDER BYtime
```
该语句中的变量 **Key** 就是 interval，**defaultValue** 为 60
具体配置如下：

1. 在仪表盘页面，单击编辑。
2. 编辑模式下，在操作栏中，单击图标选择过滤器图标![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677497114794-be4bbcec-8a84-4b63-9672-17783d15ae48.png#clientId=ud5c859b4-702b-4&from=paste&id=QzB2w&name=image.png&originHeight=27&originWidth=30&originalType=url&ratio=2&rotation=0&showTitle=false&size=491&status=done&style=none&taskId=u890c8ee7-b252-4243-9731-26ca5457427&title=)
3. 在过滤器面板中，完成如下配置，更多配置信息，请参见上文过滤器配置。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677511806438-597c01f8-176e-439b-b5fc-da23bddbe327.png#clientId=ud5c859b4-702b-4&from=paste&height=532&id=uc4c56be7&name=image.png&originHeight=1064&originWidth=1002&originalType=binary&ratio=2&rotation=0&showTitle=false&size=275645&status=done&style=none&taskId=ub551917b-9eeb-43c1-9341-363d25a3d6c&title=&width=501)

4. 点击确认，配置出来的过滤器如下图所示：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512255369-0f44190f-ffa8-40a1-8218-b3c1b0624b97.png#clientId=ud5c859b4-702b-4&from=paste&height=152&id=u02a67d61&name=image.png&originHeight=304&originWidth=946&originalType=binary&ratio=2&rotation=0&showTitle=false&size=66542&status=done&style=none&taskId=u3ddc2e02-43fb-453e-8343-c59ef344cf4&title=&width=473)

5. 原始查询数据如下所示：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512517030-5f77a37c-6114-4fde-8a2d-11aed071de78.png#clientId=ud5c859b4-702b-4&from=paste&height=761&id=uccc13b6f&name=image.png&originHeight=1522&originWidth=2788&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1135828&status=done&style=none&taskId=ub631ee11-04fa-425e-8b2a-f4d4cfb72fd&title=&width=1394)
 可以看到图中的两个点时间间隔刚好为默认值 60。

6. 设置时间刻度为 600s 

设置 interval 为 600， 600s（10min）提前加到了静态列表中，只需要在过滤器的下拉列表中选择600（10min）即可。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677512911795-446c009d-d0f2-4a83-a2f1-60046f5c5fb1.png#clientId=ud5c859b4-702b-4&from=paste&height=722&id=u1297fe8c&name=image.png&originHeight=1444&originWidth=3600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1459687&status=done&style=none&taskId=u09aef0aa-3fcf-4321-beff-dfe26be3d0f&title=&width=1800)
可以看到图中的两个点时间间隔刚好为设置的值 600。

7. 设置时间刻度为 1200s

设置 interval 为 1200，1200并没有被我们提前放入静态列表中，我们可以通过手动输入来设置 interval 为1200
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/51156564/1677513114742-aad52da0-2b3b-4170-bf57-8b4caed60610.png#clientId=ud5c859b4-702b-4&from=paste&height=722&id=u9f4ed57b&name=image.png&originHeight=1444&originWidth=3606&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1469016&status=done&style=none&taskId=u6ae6ed35-4209-4289-bf9d-5ebee4c2aa5&title=&width=1803)
可以看到图中的两个点时间间隔刚好为设置的值 1200。
