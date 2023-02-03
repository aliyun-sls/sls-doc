# 构建字典与表格做数据富化

字典和表格是对数据进行富化时主要使用的两种数据结构，本文档主要介绍这两种数据结构的常见构建方式，并对比不同构建方式的优缺点。

## 字典构建 

* 直接构建

      e_dict_map({"400": "error", "200": "ok", "*": "other"}, "status", "message")

   

* 从任务配置资源构建

      e_dict_map(res_local("http_code_map"), "status", "message")

   其中`http_code_map`是任务高级配置项，值为：

      {"400": "error", "200": "ok", "*": "other"}

   

* 从表格构建 使用`tab_to_dict`从表格构建。而表格的构建参见本文后面的表格构建。


      e_dict_map(tab_to_dict(tab_parse_csv("status_code,status_info\n400,error\n200,ok\n*,other"), "status_code", "status_info"), "status", "message")

  

  

* 从字典函数构建

      e_dict_map(dct_make("400", "error", "200",  "ok", "*",  "other"), "status", "message")

   

* 从其他表达式构建

      e_dict_map(json_parse(v("http_code_map")), "status", "message")

  

  此处从源日志的`http_code_map`字段中获取映射关系。




不同字典构建方式对比。



| 构建方式           | 优点                                                 | 缺点                                         |
| ------------------ | ---------------------------------------------------- | -------------------------------------------- |
| 直接构建           | 直观、简单、方便。                                   | 如果内容较多，规则会相对冗长。且静态不灵活。 |
| 从任务配置资源构建 | 内容较多且经常修改时推荐使用，易于维护。             | 不易于扩展和跨任务复用，不支持自动刷新。     |
| 从表格构建         | 高级场景下使用，维护机制更灵活。                     | 需要构建和维护对应的表格，过程相对繁琐。     |
| 从字典函数构建     | 基于逻辑动态构建字典，特定场景下适用。               | 较为高级，不易于维护。                       |
| 从其他表达式构建   | 从日志事件的字段中动态提取映射关系，特定场景下适用。 | 较为高级，不易于维护。                       |



## 表格构建 

* 从文本构建

      e_table_map(tab_parse_csv("city,name,age\nshanghai,aliyun,10\ncity:nanjing,Maki,18"), "name",["city", "age"])

   

* 从任务配置资源构建

      e_search_table_map(tab_parse_csv(res_local("table_info")), "name",["city", "age"])

   其中`table_info`是加工规则的任务配置项，值为：

      content,name,age
      shanghai,aliyun,10
      nanjing,Maki,18

   

* 从RDS资源中构建

      e_table_map(tab_parse_csv(res_rds_mysql(...database="db", table="city")), "name",["city", "age"])

  

  RDS表格`city`的内容为：


      content,name,age
      shanghai,aliyun,10
      nanjing,Maki,18

  

  

* 从其他Logstore资源构建

      e_table_map(res_log_logstore_pull(..., project="project_name", logstore="logstore_name", fields=["city","name","age"]),, "name",["city", "age"])

  

  对应Logstore中日志事件为：


      "日志1"
      {
        "city": "shanghai",
        "name": "aliyun",
        "age": "10"
      }
      "日志2"
      {
        "city": "city:nanjing and data > 100",
        "name": "Maki",
        "age": "18"
      }

  

  




不同表格构建方式对比：



| 构建方式               | 优点                                                         | 缺点                                                   |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| 从文本构建             | 直观、简单、方便。                                           | 如果内容较多，规则会相对冗长。不易于维护、扩展和复用。 |
| 从任务配置资源构建     | 内容较多且经常修改时推荐使用，易于维护。                     | 不易于扩展和跨任务复用。不支持自动刷新。               |
| 从RDS资源构建          | * 内容较多且经常修改时推荐使用，易于维护。  * 支持自动刷新。  * 支持跨任务复用。 | 需要连接外部RDS资源，配置过程相对比较繁琐。            |
| 从其他Logstore资源构建 | 支持实时读取，维护机制更灵活，高级场景下使用。               | 需要连接其他Logstore，配置过程相对比较繁琐。           |



