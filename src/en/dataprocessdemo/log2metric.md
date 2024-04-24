# Use the data transformation feature to convert logs to metrics.

## Observability of the cloud-native age

The runtime data of applications includes log data, trace data, and metric data.

A log indicates a discrete event. A trace indicates an event that contains a call chain. A metric indicates an event that contains numeric measurements.


Logs, traces, and metrics are events. A system that can store events can also store the three types of data.

Simple Log Service provides the following two storage types for runtime data:Logstore and Metricstore。

- Logstore：ideal for storing logs and traces.
- Metricstore：ideal for storing Metric

Metricstores in Simple Log Service are optimized based on time series scenarios. You can use the Prometheus Query Language (PromQL) syntax that is provided by Prometheus to query data.

For more information about Metricstores, see [Metricstore](https://www.alibabacloud.com/help/en/doc-detail/171723.html). For more information about the PromQL, see [QUERYING PROMETHEUS](https://prometheus.io/docs/prometheus/latest/querying/basics/).

## Convert logs to metrics

For most applications, a log contains more information than a metric.In many scenarios, logs need to be converted to metrics.

Metrics can be considered as logs in a specific format. Simple Log Service allows you to convert logs to metrics.

You can use one of the following methods to convert logs to metrics:


- Use the Scheduled SQL feature of Simple Log Service to aggregate logs to generate metrics. The Scheduled SQL feature functions as the GROUP BY operation.
- Use the e_to_metric function to convert logs to metrics.

This topic describes how to use the e_to_metric function to convert logs to metrics.

## Introduction to the data transformation feature of Simple Log Service

The data transformation feature is the log row processing feature of Simple Log Service. The feature is designed for scenarios such as log standardization, filtering, and enrichment.

A domain-specific language (DSL) is a language (similar to Python) that is customized for real-time log row processing.Currently, more than 200 row processing functions are supported. For more information, see [Function overview](https://www.alibabacloud.com/help/en/doc-detail/159702.html).

This topic describes the function that is used to convert logs to metrics.

## Procedure

### Step1 – Create a Metricstore

Create a Metricstore that is used to receive metric data.

- Create a Metricstore in the Simple Log Service console, as shown in the following figure.


- Configure Metricstore access in Grafana. After the configurations are completed, you can use Grafana to query data in the Metricstore. Go to the homepage of Grafana.

Configuration -> Data Sources -> Add Data Source, Execute the following statement to go to the homepage of Grafana.

```
https://${Endpoint}/prometheus/${Project}/${Metricstore}/

# Endpoint、Project、 Metricstore are replaced with
```

Auth -> In the Auth section, turn on Basic auth. In the Basic Auth Details section, enter the AccessKey ID in the User field and the AccessKey secret in the Password field.

Metricstore The Metricstore is created. How do I write metric data to the Metricstore?

You can refer to the following format to write metric data. For more information, see [Encoding format](https://www.alibabacloud.com/help/en/doc-detail/171773.htm).

As shown in the previous figure, data that is written to a Metricstore must be in a specific format.

You can use the `e_to_metric` function to convert logs to metrics.

The following example shows how to convert a log to a metric by using the request_time metric in an NGINX log.

### Step2 - Convert a log to a metric

The following figure shows an NGINX log. Create a metric named request_time in the NGINX log.

- Click the Logstore in which the NGINX log is stored. On the query and analysis page, click \*Data Transformation\*\*.

- In the code editor, enter a DSL statement. After the DSL statement is executed, the `request_time` metric is generated.

The `e_to_metric` function is used to convert logs to metrics. The following figure shows the function requirements. For more information about the function, see [e_to_metric](https://www.alibabacloud.com/help/en/doc-detail/125484.html?#section-u7i-ymg-jzp).

```python
e_to_metric(names=None, labels=None, time=None)

```

Create a metric named `request_time`. The value is the name of the request_time field in the log that you want to convert. Execute the following data transformation statement:

```python
e_to_metric(names="request_time")
```

Click Preview Data to preview data transformation results.


As shown in the previous figure, the `request_time` metric is generated and the labels field is not displayed. This section will not show the labels field. For more information about how to specify the labels field, see the following section.

- Click Save as Transformation Job. Find the Storage Destination section, and select the Metricstore created in Step 1 for Target Store.

### Step3 – query Metricstore

After the data transformation job is saved, data will be written to the Metricstore after a few minutes. Then, you can query the metric in Grafana.

Enter a PromQL statement or the metric name to query the metric.

```
request_time
```


### More examples for converting logs to metrics

- Specify the labels field.

```python
e_to_metric(
    names="request_time",
    labels="slbid"
)
```

- Convert multiple logs to metrics.

```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels="slbid"
)
```

- Set multiple values for the labels field.

```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels=["slbid","scheme"]
)
```


- Metric Rename

```
e_to_metric(names=[("request_time","rt"),"upstream_response_time"],labels=["slbid","scheme"])
```

- Label Rename

```python
e_to_metric(
    names=[("request_time","rt"),"upstream_response_time"],
    labels=["slbid",("scheme","http_type")]
)
```

## Summary

This topic describes how to use the `e_to_metric` function to convert logs to metrics. This is helpful in observability scenarios.

Simple Log Service provides an overall solution for observability. Alibaba Cloud will follow the OpenTelemetry standard. If you have any questions, feel free to contact us.
