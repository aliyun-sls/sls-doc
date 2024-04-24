# Simple Log Service: Trace

## Features

The Trace application (Distributed Tracing) of Simple Log Service is based on OpenTelemetry. You can use Trace to import, store, analyze, and visualize trace data. You can also configure alerts for trace data.

:::tip Trace
[Trial Demo](/playground/demo.html?dest=/lognext/trace/sls-mall/sls-mall%3Fresource=/trace/sls-mall/explorer){target="_blank"}
:::

## Benefits

- Multiple import methods: You can import trace data over multiple protocols such as OpenTelemetry, Jaeger, and Zipkin. You can import trace data in more than 10 programming languages. You can import trace data from multiple trace platforms. You can import trace data over the Internet, an Alibaba Cloud internal network, or a Global Accelerator (GA) network. An Alibaba Cloud internal network can be the classic network or a virtual private cloud (VPC).
- Compliance with OpenTelemetry Trace 1.0.
- High performance: You can import petabytes of data per day, extract and analyze relevant metrics, and sample all trace data in large-scale scenarios.
- Scalability: You can specify a custom retention period for logs. The storage capacity of a Logstore can be dynamically scaled to meet business requirements.
- Various trace-related features: You can view trace and service details, query and analyze trace data, analyze dependencies, and perform custom SQL analysis.
- High compatibility with downstream applications: Trace data and calculated metric data in Simple Log Service can be imported to various stream computing platforms and offline computing engines. You can also subscribe to data for customized processing.
- Multiple built-in artificial intelligence for IT operations (AIOps) algorithms: The application automatically analyzes the impact of trace data on performance and error rates. This helps developers identify the root causes of issues in complex environments.

## Core values

- OpenTelemetry only defines data formats and generates, collects, and sends data. It does not provide features such as analysis, visualization, and alerting. The Trace application of Simple Log Service is implemented based on the OpenTelemetry protocol. You can use the application to collect trace data from OpenTelemetry and other platforms such as Jaeger, Zipkin, and SkyWalking. The application also provides features such as trace data import, storage, analysis, visualization, alerting, and AIOps.
