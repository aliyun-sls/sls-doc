# 概要

在[SLS对接Kibana](https://help.aliyun.com/zh/sls/user-guide/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service) 方案中，会自动创建Index Pattern。可能一开始没有设置好logstore过滤条件，导致创建了一些不需要的logstore pattern，这时候 可以通过脚本来批量删除一些不需要的Index Pattern


# 操作步骤

## List出需要删除的Index Pattern

准备好 kibana_config.json，然后使用  [ptn_list.py](ptn_list.py.md){target="_blank"} 来list Index Pattern
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
➜  python ptn_list.py kibana_config.json > /tmp/ptnlist.txt
```

/tmp/ptnlist.txt可能是长这样的

```
54c0d6c0-b83b-11ef-88c6-15adf26175c7	etl-dev.batch_test52
54266b80-b83b-11ef-88c6-15adf26175c7	etl-dev.batch_test51
52f369c0-b83b-11ef-88c6-15adf26175c7	etl-dev.batch_test49
538ceaa0-b83b-11ef-88c6-15adf26175c7	etl-dev.batch_test50
```

编辑这个/tmp/ptnlist.txt文件，只留下需要删除的index pattern 的行

## 执行Index Pattern删除

**注意，Index Pattern删除后对应的Dashboard等都会无法使用，请确保这些Index Pattern是没有用的。**

使用  [ptn_delete.py](ptn_delete.py.md){target="_blank"} 删除 Index Pattern


```

➜  cat /tmp/ptnlist.txt # 再看一眼 /tmp/ptnlist.txt，确认都是要删除的Index Pattern

# 执行删除
➜  python ptn_delete.py kibana_config.json /tmp/ptnlist.txt
```
