# 如何添加多 Y 轴线图

当您需要在一个线图 Pro 中添加不同种类或不同数量级的数据时，可在线图中添加多 Y 轴。本文介绍添加多 Y 轴线图的操作步骤。

## Y 轴独立出现的影响因素

当需要在线图 Pro 中画两条线或者多条线的时候，它们是共享同一个 Y 轴或者出现多个 Y 轴受到多个因素的影响，下面列举了所有影响因素，它们会共同作用确定某一个字段是否出现单独的 Y 轴

1. y 轴 id
   ![picture 14](/img/src/visulization/doubley/420e1bbbcebd9cac4e51a097564a47014287b17c710bc57ae3348bce444a3a93.png)

2. y 轴方向
   ![picture 15](/img/src/visulization/doubley/4aad2607ecd8998eb2d97fa2cf21f31d2b380749d925f2c68a54dc17a2e5fd7d.png)

3. 标准配置中的格式化
   ![picture 16](/img/src/visulization/doubley/4fad047e0e526b452d4d9eaec1f8264788999f3cb54281260cccf2ac424a86ae.png)

4. 标准配置中的单位
   ![picture 17](/img/src/visulization/doubley/633885e989caa904189a64603d711c1e2ae7683f89d6c6f22afc2f2f8b5d989e.png)

## 原始日志如下

![picture 1](/img/src/visulization/doubley/8800764585643fbf4fc770845e496fe8f50c303feeecd3e251be8f448cfecb5e.png)

## 单个查询分析操作场景

统计每分钟来自上海、杭州地域的请求数量，然后通过线图展示其变化趋势。

1. 在仪表盘页面，单击编辑。
2. 在编辑模式下，选择新建图表 > 线图 pro 图标。
3. 设置查询分析，然后单击应用。
   添加如下查询分析语句。更多信息，请参见[查询分析](https://help.aliyun.com/document_detail/339860.htm?spm=a2c4g.11186623.0.0.56145b29B9NO9c#concept-2134122)。

   ```sql
   * | select __time__ - __time__ % 60 as time, count_if(region='cn-shanghai') AS count1, count_if(region='cn-hangzhou') AS count2 GROUP BY time order by time
   ```

   ![picture 2](/img/src/visulization/doubley/38e11bd164d2fa8f3f3801d1f54bd1a89bef06e588a8bb644a9d6db97508737b.png)

   单击应用，然后在通用配置下的查询分析配置中，设置 y 轴字段为 count1，count2。设置完成后，页面中将展示上海、杭州地域的请求数及变化趋势。其中，蓝色线条表示上海地域的请求数变化趋势，绿色线条表示杭州地域的请求数变化趋势。
   如下图所示，两个地域的请求数量相差较大，共用一个 Y 轴，导致图中上海地域的请求数变化趋势展示不清晰。此时您可以通过字段配置，在线图的右侧添加一个 Y 轴，其数量级适用于上海地域的请求数。

4. 添加字段配置。
   在字段配置页签中，针对 count1 列，添加一条 Y 轴。具体参数说明，请参见[字段配置](https://help.aliyun.com/document_detail/340721.htm?spm=a2c4g.11186623.0.0.56145b29B9NO9c#section-f59-ql8-mzd)。
   ![picture 3](/img/src/visulization/doubley/6a1246921eb8c13118f796035c8ec080c47e9a4b6ce95c6a570bd32e2a83864c.png)  
   设置完成后，该线图将有两个 Y 轴，并且两个 Y 轴的数量级不同，左侧 Y 轴适用于杭州地域的请求数，右侧 Y 轴适用于上海地域的请求数，如下图所示。
   ![picture 4](/img/src/visulization/doubley/78754be375ee62579e933a7859cb173048559d46a4a1110cd58eeab8aae70efe.png)
5. 单击确定，保存统计图表。
6. 单击保存，保存仪表盘。

## 两个查询分析操作场景

统计每分钟的成功请求、失败请求数量，然后通过线图展示其变化趋势。

1. 在仪表盘页面，单击编辑。
2. 在编辑模式下，选择新建图表 > 线图 pro 图标。
3. 设置查询分析，然后单击应用。

   - 查询分析 A，统计每分钟成功请求的数量。

   ```sql
   status in [200 299] | SELECT __time__-__time__ % 60 AS Time, count(1) AS OK GROUP BY Time ORDER BY Time LIMIT 1000
   ```

   - 查询分析 B，统计每分钟失败请求的数量。

   ```sql
   NOT status in [200 299] | SELECT __time__-__time__ % 60 AS Time, count(1) AS ERROR, status GROUP BY Time, status ORDER BY Time LIMIT 1000
   ```

   ![picture 5](/img/src/visulization/doubley/1e7c10b59c4ec24d640cc7f805fe6f05c62b8edae261ca82428cc125631cafc6.png)

   单击应用后，将在同一个线图中展示两个查询分析的结果，即展示成功请求和失败请求的数量变化趋势。其中蓝色线条表示成功请求的数量变化趋势，绿色线条表示失败请求的数量变化趋势。
   如下图所示，成功请求和失败请求的数据量相差较大，共用一个 Y 轴，导致图中失败请求的数量变化趋势展示不清晰。此时您可以通过字段配置，在线图的右侧添加一个 Y 轴，其数量级适用于失败请求的数量。

   ![picture 6](/img/src/visulization/doubley/41d158aeaa553aa98ac1da9d7245a3b36ebdedd185d28afe38123b9340f81fd4.png)

4. 添加字段配置。
   在字段配置页签中，针对查询分析 B 的结果，添加一条 Y 轴。具体参数说明，请参见[字段配置](https://help.aliyun.com/document_detail/340721.htm?spm=a2c4g.11186623.0.0.56145b29B9NO9c#section-f59-ql8-mzd)。
   ![picture 7](/img/src/visulization/doubley/9420988ed93cb203a82018ac014e5b2e9952f3ede29c015c7e1a21efbf498f08.png)
   设置完成后，该线图将有两个 Y 轴，并且两个 Y 轴的数量级不同，左侧 Y 轴适用于成功请求的数量，右侧 Y 轴适用于展示失败请求的数量，如下图所示。
   ![picture 8](/img/src/visulization/doubley/0657862b2c6fc75b865b46f9e8b183893ab61ca8b4f4973fcdb2cbfd37791ed1.png)
5. 单击确定，保存统计图表。
6. 单击保存，保存仪表盘。

## 三个查询分析操作场景

统计每分钟内不同请求时长范围对应的请求数，然后通过线图展示其变化趋势。

1. 在仪表盘页面，单击编辑。
2. 在编辑模式下，选择新建图表 > 线图 pro 图标。
3. 设置查询分析，然后单击应用。

   - 查询分析 A，以统计请求时长在 10~50 秒之间的请求数。

   ```sql
   request_time in [10 50) | SELECT __time__-__time__ % 60 AS Time, count(1) AS count1, request_time GROUP BY Time, request_time ORDER BY Time LIMIT 1000
   ```

   - 查询分析 B，统计请求时长在 50~100 秒之间的请求数。

   ```sql
   request_time in [50 100) | SELECT __time__-__time__ % 60 AS Time, count(1) AS count2, request_time GROUP BY Time, request_time ORDER BY Time LIMIT 1000
   ```

   - 查询分析 C，统计请求时长在 50~100 秒之间的请求数。

   ```sql
   request_time >= 100 | SELECT __time__-__time__ % 60 AS Time, count(1) AS count3, request_time GROUP BY Time, request_time ORDER BY Time LIMIT 1000
   ```

   ![picture 9](/img/src/visulization/doubley/9a2d3c4bfd5a74a5d297e195c629297987ad0cf8cb91b05571702b4d0d02e765.png)

   单击应用后，将在同一个线图中展示三个查询分析的结果，即展示三个不同请求时长范围对应的请求数变化趋势。其中蓝色线条表示请求时长在 10~50 秒之间的请求数的变化趋势，绿色线条表示请求时长在 50~100 秒之间的请求数的变化趋势，黄色线条表示请求时长在 100 秒以上的请求数的变化趋势。
   如下图所示，各个请求时长范围对应的请求数相差较大，共用一个 Y 轴，导致图中 count2 和 count3 的数量变化趋势展示不清晰。此时您可以通过字段配置，在线图的右侧添加两个 Y 轴。

   ![picture 10](/img/src/visulization/doubley/89d2ecde777375f950fd7adf2d78c0645c9bdd74bcb876f25076405c83b20026.png)

4. 添加字段配置。
   在字段配置页签中，完成如下配置，添加两条 Y 轴。具体参数说明，请参见[字段配置](https://help.aliyun.com/document_detail/340721.htm?spm=a2c4g.11186623.0.0.56145b29B9NO9c#section-f59-ql8-mzd)。

   - 针对查询分析 B 的结果，添加一条 Y 轴。
   - 针对查询分析 C 的结果，添加一条 Y 轴。

   > 说明 在同一侧添加两条及以上 Y 轴时，需要设置 y 轴 id，不同的 id 会创建不同的 Y 轴，id 是任意字符创即可。

   ![picture 11](/img/src/visulization/doubley/342aed72689dfebefa9d73926c0a03de14ab39038117b40c49b9deed82085f2c.png)

   设置完成后，该线图将有三个 Y 轴，并且三个 Y 轴的数量级不同，分别对应三个不同请求时长范围的请求数，如下图所示。

   ![picture 13](/img/src/visulization/doubley/2e7a1ffd6a5367be284ecde81bd0d1fc1ec6649b8826f4bd57e32ce2f64399d3.png)

5. 单击确定，保存统计图表。
6. 单击保存，保存仪表盘。
