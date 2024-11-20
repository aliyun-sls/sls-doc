# ES兼容最佳实践

## QueryString最佳实践

* 指定字段的查询比不指定字段的查询友好, 不指定字段的query可能在某些情况下被翻译成sql 字段concat后再匹配，导致查询效率低下

这是友好的
```
content: "Hello World"
```

这是不友好的
```
"Hello World"
```

* 尽量少使用wildcard查询（带*匹配的查询），如果是频繁查询（比如告警）的情况下，尽量使用精准的匹配
举例说明：

这是一个友好的
```
content : "Hello World"
```

这是不友好的，因为带*会使用通配，产生硬扫
```
content : "Hello*"
```








