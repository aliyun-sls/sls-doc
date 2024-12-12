# 概要

本文介绍在数据迁移到SLS后，如何将原来Kibana中的dashboard迁移到SLS对接的Kibana中

# 思路

![](/img/oscompatibledemo/dashboard10.png)


* 从旧的Kibana导出dashboard的export.ndjson文件
* 把export.ndjson中的旧的index Pattern id替换成新的Kibana Index Patter Id
* 完成替换后，把export.ndjson导入到新的Kibana中



# Dashboard迁移演示

## 在ES中准备数据和Dashboard, 并导出Dashboard配置
向es1 写入数据

```
POST people/_bulk
{ "index": {} }
{ "name": "Alice", "age": 30 }
{ "index": {} }
{ "name": "Bob", "age": 25 }
{ "index": {} }
{ "name": "Charlie", "age": 35 }
```

在kibana1上基于people创建两个dashboard

![](/img/oscompatibledemo/dashboard0.png)

其中一个dashboard示例

![](/img/oscompatibledemo/dashboard1.png)

保存好Dashboard后，进入Kibana `Stack Management->Saved objects` 来导出

![](/img/oscompatibledemo/dashboard2.png)

勾选想要导出的dashboard，注意 不要勾选 `Include related objects` 

导出后dashboard的内容存在 `export.ndjson` 中


## 在SLS对接的Kibana中复用Dashboard

在sls中准备好一份相同的数据，确保字段一致

![](/img/oscompatibledemo/dashboard3.png)

新部署一套Kibana并对接SLS，参考操作链接 -> [SLS对接Kibana](https://help.aliyun.com/zh/sls/user-guide/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service)

注意，这里用的es/kbiana版本和之前的es/kibana版本保持一致

使用 `Docker Compose`或 `Helm Chart` 方案对接SLS后,会自动在Kibana中创建好相应的Index Pattern

![](/img/oscompatibledemo/dashboard4.png)


### 执行迁移

* 查看老的es中的Index Pattern的ID 

准备好 kibana_config_1.json，然后使用  [ptn_list.py](ptn_list.py.md){target="_blank"}  来list Index Pattern
```
{
    "url" : "http://xxx:5601",
    "user" : "elastic",
    "password" : "",
    "space" :  "default"
}
```
执行
```
➜  python ptn_list.py kibana_config_1.json
f06fc2b0-b82d-11ef-88c6-15adf26175c7    people
```

f06fc2b0-b82d-11ef-88c6-15adf26175c7 这个就是旧的people这个index pattern的id

在Kibana导出的dashboard配置文件 export.ndjson中可以看到对这个Index Pattern Id的引用
![](/img/oscompatibledemo/dashboard5.png)


* 在SLS对接的Kibana中找到新的Index Pattern的Id

同样使用 [ptn_list.py](ptn_list.py.md){target="_blank"} 来list 新的Kibana中Index Pattern的ID

```
# 准备好kibana_config_2.json

➜  python ptn_list.py kibana_config_2.json
ef710470-b83a-11ef-bb2b-ad198b7b763d	etl.people
```


通过sed命令批量修改 `export.ndjson` 中的ID替换

```
sed -i 's/f06fc2b0-b82d-11ef-88c6-15adf26175c7/ef710470-b83a-11ef-bb2b-ad198b7b763d/' export.ndjson
```

* 进入新的Kibana `Stack Management->Saved objects` 来将export.ndjson导入

![](/img/oscompatibledemo/dashboard6.png)

点击Import

![](/img/oscompatibledemo/dashboard7.png)

出现下面界面表示导入成功，如有报错的情况需要看报错信息，再看如何处理

![](/img/oscompatibledemo/dashboard8.png)

打开新的dashboard是否符合预期
![](/img/oscompatibledemo/dashboard9.png)


### 注意事项
* 老的ES中的字段 和 SLS中写入的字段需要一致，不然可能导致Dashboard迁移后打开报错（比如报字段不存在）