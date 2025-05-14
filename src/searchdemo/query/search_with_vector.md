
## 试用链接

自定义查询：打开[链接](/playground/demo.html?dest=/lognext/project/embedding-benchmark-cn-heyuan-public/logsearch/sts_log?encode%3Dbase64%26queryString%3Dbm90IGFiY2QgYW5kIHNpbWlsYXJpdHkoc2VudGVuY2UyLCflhazlronljoUnKSAgPCAwLjQ%3D%26filterInfo%3DeyJmamNvZGUiOiIoKSIsImZxIjoiIn0%3D%26queryTimeType%3D99%26startTime%3D1746720000%26endTime%3D1746806400)试用

语义聚类分析：打开[链接](/playground/demo.html?dest=/lognext/project/embedding-benchmark-cn-heyuan-public/dashboard/dashboard-1747220853385-305266?slsRegion=cn-heyuan)
![alt text](image.png)
## 向量索引概述
向量索引是信息检索和机器学习中的一种技术，旨在高效地存储和检索高维数据（如文本、图像、音频等）。通过将数据（如文本）映射到高维空间的一个点，使得语义相似的文本在高维空间中距离相近。在高维空间中，每一个数据点用一个高维向量表示，每个维度代表一个特征。

+ 距离度量：使用距离度量（如欧氏距离、余弦相似度等）来量化向量之间的相似性。

+ 向量索引：使用数据结构（如树形结构、哈希表等）构建索引，以提高搜索效率。例如，常见的向量索引包括HNSW，IVF等。

## 向量索引的优势
日志服务是一个一站式日志数据分析平台，解决日志数据的采集、处理、存储、检索分析的需求。大语言模型的兴起，对自然语言的搜索需求陡增。例如对用户问答数据，Agent和LLM的交互日志，有审计、检索、分析的需求。 为了解决大语言模型领域的语义搜索需求，SLS推出了向量索引功能。

日志服务向量索引的优势：一站式的向量嵌入 - 索引构建。在传统的解决方案中，用户需要维护向量嵌入和向量数据库两个系统。日志服务合二为一，用户无需维护复杂的架构，只需要选择嵌入模型即可。

## 配置向量索引
打开查询分析属性，在向量索引这一列中，选择对应的embedding模型后，自动开启向量索引。

## 向量搜索语法
日志服务搜索向量，返回指定距离范围内的数据，数据按照时间顺序排序。

### 语法
similarity(字段名, "搜索文本") < 距离

字段名：要搜索的字段，例如msg。

搜索文本：要搜索目标文本，例如"番茄鸡蛋"。

距离：距离范围从0到1，距离越小表示越相似。0表示最相似，1表示最不相似。

### 使用示例

`similarity("input_semantic.topic","教育") < 0.1` 表示搜索input_semantic.topic字段中跟“教育”相关，距离在0.1以内的数据。

### 混合检索
向量检索可以和关键字检索混合使用，使用and连接。例如：`error and similarity("input_semantic.summary","查询") <0.8。`

重要
混合检索只支持and 连接。

### 聚类
开启向量索引后，可以聚义向量数据进行聚类。使用语法是：

```
*| set session velox_use_io_executor=true;set session presto_velox_mix_run_not_check_linked_agg_enabled = true;
set session presto_velox_mix_run_support_complex_type_enabled=true;
set session velox_sanity_limit_enabled = false;
 with t1 as (select  sentence1   as x, "sentence1__embedding__"  as embd from log    having embd is not null  limit 1000 ),
t2 as (select cluster(array_agg(embd),'dbscan','{
  "n_clusters": "${{cluster_num|5}}",
  "max_iter": "100",
  "tol": "0.0001",
  "metric":"cosine",
  "init_mode": "dbscan"
}') as cluster_res, array_agg(x) as xs from t1),
t3 as (select label,x from t2,unnest(cluster_res.assignments,xs) as t(label,x) )
select cast(label as bigint) as "聚类id",array_join(slice((array_agg(x)),1,3),concat(chr(10),'----',chr(10))) as "主题",count(1) as pv from t3 group by label order by pv desc

```

其中cluster是聚类算法，支持kmeans和dbscan算法，算法详情参考[机器学习文档](https://help.aliyun.com/zh/sls/user-guide/spl-function)