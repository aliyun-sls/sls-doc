
## FAQ
### Q. 有好的让我的ES平滑迁移到SLS的方案吗

有的，可以参考这个文档。 [从ES平滑迁移到SLS](https://developer.aliyun.com/article/1412611?spm=a2c6h.13148508.setting.15.19fe4f0e6ZnJ3N)


### Q. 我可以用云上ES来作为Kproxy部署的依赖吗？

A: 可以的。 具体操作可以参考这个文档 [Kibana+云上ES访问SLS的操作文档]( https://developer.aliyun.com/article/1467993?spm=a2c6h.13148508.setting.14.19fe4f0e6ZnJ3N)

不过只能复用云上的ES，不能复用云上的Kibana。 因为我们的ES兼容访问需要重新修改Kibana 指向的ES地址，
而目前云上ES使用的Kibana是不支持这样修改的。

### Q.  我可以使用Kibana 8.x来对接Kproxy吗

A: 可以的。 不过需要对Kproxy容器增加2个环境变量设置以支持

```
-e REF_HEADER_KEY=X-Elastic-Product
-e REF_HEADER_VALUE=Elasticsearch
```
