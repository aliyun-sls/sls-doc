# FlowLog公网流量过滤

Flowlog底层由阿里云vpc提供，开启方式参考 [开启Flowlog](https://help.aliyun.com/document_detail/173648.html)

Flowlog里包含所有流量的5元组信息，当我们只关心某一些网段流量的时候，可以通过数据加工来进行流量过滤。

下面演示如何通过数据加工过滤出公网的流量

## 进入数据加工编码IDE

![](/img/dataprocessdemo/IP地址相关/flow1.png)

![](/img/dataprocessdemo/IP地址相关/flow2.png)

## 使用数据加工进行流量过滤

```python
# 如果srcaddr和dstaddr字段不存在，则丢弃
e_if(e_not_has("srcaddr"), e_drop())
e_if(e_not_has("dstaddr"), e_drop())

# 如果srcaddr和dstaddr不符合ip格式，则丢弃
e_if(op_not(e_match("srcaddr", grok(r'%{IP}'))), e_drop());
e_if(op_not(e_match("dstaddr", grok(r'%{IP}'))), e_drop());

# 如果是私网之间互通的流量，丢弃
e_if(
	op_and(
		op_or(
			ip_cidrmatch("10.0.0.0/8", v("srcaddr")),
      		ip_cidrmatch("172.16.0.0/12", v("srcaddr")),
      		ip_cidrmatch("192.168.0.0/16", v("srcaddr"))
		),
		op_or(
			ip_cidrmatch("10.0.0.0/8", v("dstaddr")),
			ip_cidrmatch("172.16.0.0/12", v("dstaddr")),
			ip_cidrmatch("192.168.0.0/16", v("dstaddr"))
		)
	),
	e_drop()
)
```

## 保存加工任务

![](/img/dataprocessdemo/IP地址相关/flow3.png)


