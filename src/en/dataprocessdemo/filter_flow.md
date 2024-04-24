# Filter flow logs that record Internet traffic

Virtual Private Cloud (VPC) provides the flow log feature. For more information about how to enable the flow log feature, see [Enable a flow log](https://www.alibabacloud.com/help/en/doc-detail/173648.html).

Each log records the specified 5-tuple of network traffic. If you want to obtain traffic in specified CIDR blocks, you can use the data transformation feature to filter the traffic.

This topic describes how to use the data transformation feature to filter the Internet traffic.

## Go to the data transformation page and execute a data transformation statement IDE

![](/img/dataprocessdemo/IP地址相关/flow1.png)

![](/img/dataprocessdemo/IP地址相关/flow2.png)

## Use the data transformation feature to filter the traffic

```python
e_if(e_not_has("srcaddr"), e_drop())
e_if(e_not_has("dstaddr"), e_drop())

e_if(op_not(e_match("srcaddr", grok(r'%{IP}'))), e_drop());
e_if(op_not(e_match("dstaddr", grok(r'%{IP}'))), e_drop());

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

## Click Save as Transformation Job.

![](/img/dataprocessdemo/IP地址相关/flow3.png)
