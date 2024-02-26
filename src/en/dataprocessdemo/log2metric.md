# 使用数据加工将Log转成Metric
## 云原生时代的可观察性

我们关注应用运行起来后的运行时数据，主要有Log、Trace和Metric 这3大类。

Log是离散的事件，Trace可以认为是带请求追踪的事件，Metric是带统计量的事件。

![](/img/dataprocessdemo/特定格式处理/img1.jpg)

本质上Log、Trace、Metric都是事件，存储上满足事件存储的系统都可以用来存储这3类数据。


阿里云SLS为运行时数据提供了两种存储:Logstore和Metricstore。

* Logstore：适合存储Log和Trace
* Metricstore：适合存储Metric

SLS Metricstore针对时序场景做了大量优化，提供PromQL查询能力，支持Prometheus协议。

SLS Metricstore 详细介绍请参考[官方链接](https://help.aliyun.com/document_detail/171723.html), PromQL查询语言请参考[官方链接](https://prometheus.io/docs/prometheus/latest/querying/basics/)

## Log转Metric

很多应用的Log数据往往比Metric全面。 经常存在这样的场景: 把Log中的数据转换为Metric。

前面提到，Metric可以认为是特定格式的Log，因此在SLS里可以将Log转换为Metric。

常见的Log转Metric的方法可以有两种:

![](/img/dataprocessdemo/特定格式处理/img2.jpg)

* 聚合日志产生指标，类似sql做group by以后产生对应的统计值. 对应SLS ScheduleSQL功能
* 将日志格式做格式转换，使其符合Metric格式. 对应SLS数据加工`e_to_metric`场景

本文主要介绍第二种的场景，即日志按行处理转化为Metric的格式

## 阿里云SLS 数据加工简介

数据加工服务是SLS推出的面向日志行处理的服务，主要为日志的规整、过滤、富化等场景设计

![](/img/dataprocessdemo/特定格式处理/img3.jpg)

SLS数据加工DSL是专门为日志实时行处理定制的一套语言（类Python）。目前支持200+的行处理函数，可以参考[官网文档](https://help.aliyun.com/document_detail/159702.html)

本文主要介绍Log转Metric的函数 `e_to_metric`

## Log转Metric实战

### Step1 – 创建Metricstore

首先来建一个Metricstore用于接受指标数据

* 创建Metricstore，界面操作

![](/img/dataprocessdemo/特定格式处理/img4.jpg)

* Grafana配置访问Metricstore, 以便使用Grafana查询Metricstore数据, 进入Grafana首页

Configuration -> Data Sources -> Add Data Source, 选择Prometheus -> URL的组成格式如下
```
https://${Endpoint}/prometheus/${Project}/${Metricstore}/

# Endpoint、Project、 Metricstore分别做相应替换
```
Auth -> Basic auth要enable起来，Basic Auth Details输入阿里云AccesskeyID和AccesskeySecret


![](/img/dataprocessdemo/特定格式处理/img5.jpg)

Metricstore创建好了，那么如何向Metricstore写入指标数据呢？

可以看到下面的格式来写入, 见文档 [Metricstore格式](https://help.aliyun.com/document_detail/171773.htm)

![](/img/dataprocessdemo/特定格式处理/img6.jpg)

可以看到，Metricstore要求数据写入必须符合一定的格式，

对于Log格式转Metric格式的场景，可以使用数据加工函数`e_to_metric`来实现.


接下来以Nginx日志中的request_time等指标为例，演示如何将Log转换成Metricstore的格式

### Step2 - 第一个Log转Metric任务

先来看一下用于演示的Nginx日志, 我们的目标是将建立Nginx的`request_time`指标
![](/img/dataprocessdemo/特定格式处理/img7.jpg)

* 点开Nginx日志的logstore，进入查询分析页面后，可以看到“数据加工”的入口，点击进入

![](/img/dataprocessdemo/特定格式处理/img8.jpg)

* 看到数据加工IDE界面后，在IDE里编写DSL语句实现生成`request_time`指标

![](/img/dataprocessdemo/特定格式处理/img9.jpg)

数据加工实现日志转Metric主要由 `e_to_metric` 来实现, 函数参数要求如下，完整帮助参考 [链接](https://help.aliyun.com/document_detail/125484.html?#section-u7i-ymg-jzp)
```python
e_to_metric(names=None, labels=None, time=None)
# names字段用于指定指标名称字段，指定该字段后指标的值也会取Log中该字段名的值
# labels字段用于指定指标label字段
# time字段不填，自动使用logstore中的__time__时间
```

我们只需要建立一个指标叫`request_time`,并且指标取值也是request_time的值，因此加工语句如下
```python
e_to_metric(names="request_time")
```

点一下快速预览，看一下效果

![](/img/dataprocessdemo/特定格式处理/preview1.jpg)

可以看到生成了`request_time`指标，并且没有Label（后面有更多样例演示如何增加Label，我们先走通最简单的）

* 保存加工任务, 存储目标的目标库请选择刚才第一步创建的Metricstore

![](/img/dataprocessdemo/特定格式处理/img10.jpg)


### Step3 – 查询Metricstore

加工任务保存后，等几分钟后数据会写入Metricstore，然后可以在Grafana里查询Metric。

输入PromQL查询，直接输入metricname即可查询
```
request_time
```

![](/img/dataprocessdemo/特定格式处理/img11.jpg)

### Log转Metric - 更多样例

* 带上Label
```python
e_to_metric(
    names="request_time",
    labels="slbid"
)
```

![](/img/dataprocessdemo/特定格式处理/img12.jpg)

* 将Log中的多个值转化为指标
```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels="slbid"
)
```
![](/img/dataprocessdemo/特定格式处理/img13.jpg)

* 多个Label
```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels=["slbid","scheme"]
)
```
![](/img/dataprocessdemo/特定格式处理/img14.jpg)

* Metric重命名

```
e_to_metric(names=[("request_time","rt"),"upstream_response_time"],labels=["slbid","scheme"])
```

![](/img/dataprocessdemo/特定格式处理/img15.jpg)

* Label重命名

```python
e_to_metric(
    names=[("request_time","rt"),"upstream_response_time"],
    labels=["slbid",("scheme","http_type")]
)
```

![](/img/dataprocessdemo/特定格式处理/img16.jpg)

## 小结

本文通过数据加工的`e_to_metric`函数演示了如何将Log转化成Metric， 希望对看官的可观察性场景有帮助。

SLS提供了可观察性的整体方案，积极跟进OpenTelemetry标准，有任何问题欢迎和我们交流。

