# 背景
阿里云关系型数据库[**RDS**](https://help.aliyun.com/document_detail/26092.html)（Relational Database Service）是一种稳定可靠、可弹性伸缩的在线数据库服务。基于阿里云分布式文件系统和SSD盘高性能存储，**RDS**支持[**MySQL**](https://help.aliyun.com/document_detail/95798.html)、[**PostgreSQL**](https://help.aliyun.com/document_detail/95626.html)、[**SQL Server**](https://help.aliyun.com/document_detail/95623.html)、和[**MariaDB TX**](https://help.aliyun.com/document_detail/95628.html)引擎。PostgreSQL和MySQL都是最流行的开源数据库类型，PostgreSQL 和 MySQL 都有不同的用途，它们之间的选择取决于企业目标和资源。
根据[Stack Overflow 2022 开发者](https://survey.stackoverflow.co/2022/#section-most-popular-technologies-databases)调查报告数据库篇，虽然MySQL 依然是最受欢迎的的数据库。但在专业开发者群体中，PostgreSQL（46.48%）已经超越 MySQL（45.68%）夺得了第一名。
![image.png](/img/src/product/日志审计开通RDSPostgreSQL日志采集/2a606fcf95b0e6ca600fc3b663561cd09bedacf7fa522ee89f5646e801b1598c.png)
[**日志审计**](https://help.aliyun.com/document_detail/164065.html)原已支持采集RDS MySQL的审计日志（[基于SQL洞察](https://help.aliyun.com/document_detail/96123.html)）、慢日志、性能日志、错误日志，随着用户的使用深入，更多用户对RDS PostgreSQL 日志的采集也提出了需求，日志审计率先响应用户需求，现已支持RDS PostgreSQL 审计日志([基于SQL洞察](https://help.aliyun.com/document_detail/96766.html))、慢日志、错误日志。
# 操作
同RDS MySQL的采集开通方式一样，在日志审计下开通PostgreSQL**审计日志**、**慢日志**、**错误日志**的采集也只需要打开对于日志类型的开关，日志将会采集到日志审计中心project的rds_log中：
![image.png](/img/src/product/日志审计开通RDSPostgreSQL日志采集/9c21ed85539ee020bb361ae151a7e674d75998d69233c56f41a1f5f88db228a0.png)
和采集RDS MySQL一样，除了**自动化实时采集**、**跨地域**、**跨账号**日志集中审计等优点外，采集PostgreSQL日志也支持[采集策略](https://help.aliyun.com/document_detail/170316.html)、[智能冷热存储](https://help.aliyun.com/document_detail/308645.html)、[Terraform配置](https://help.aliyun.com/document_detail/166581.html)等功能，其日志字段可参考[日志字段详情](https://help.aliyun.com/document_detail/215629.html)，其他使用限制参考[云产品资源覆盖](https://help.aliyun.com/document_detail/164065.html)。
# 示例
## RDS PostgreSQL 审计日志
![image.png](/img/src/product/日志审计开通RDSPostgreSQL日志采集/11a581ec3387bd17986a528b39ce8707cc484869404998d64d114d229a25f245.png)
RDS PostgreSQL 审计日志采集示例

## RDS PostgreSQL 慢日志
![image.png](/img/src/product/日志审计开通RDSPostgreSQL日志采集/5018d9c41eab782515978a80950fc41def510f67dead60e0760efdbdf5467085.png)
RDS PostgreSQL 慢日志采集示例

## RDS PostgreSQL 错误日志
![image.png](/img/src/product/日志审计开通RDSPostgreSQL日志采集/70a6ab5ddf206627e458c3d63169e7e48fe85c0813e97adea380bcd3bdf3f9b0.png)
RDS PostgreSQL 错误日志采集示例

