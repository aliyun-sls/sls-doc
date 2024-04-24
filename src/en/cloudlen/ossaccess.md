# Use CloudLens for OSS to observe server performance metrics

:::tip CloudLens for OSS
[试用 Demo](/playground/demo.html?dest=/lognext/app/oss_lens){target="_blank"}
:::

## Prerequisite for use

1.  Activate CloudLens for OSS to access log details.

![image](/img/src/cloudlen/ossaccess/b3eb2420294a9c22322c28ce0f1e5b13b6eb98b268ff0762b07cea9ff341e01d.png)

2.  Simple Log Service automatically creates a dedicated project and a Logstore to store access logs of OSS buckets. The project is named in the oss-log-_Alibaba Cloud account ID_\-_region ID_ format. The Logstore is named oss-log-store.

For more information about detailed log fields, see [OSS log field details\_Simple Log Service-Alibaba Cloud Help Center].(https://www.alibabacloud.com/help/en/doc-detail/458773.html?spm=a2c4g.456011.0.0.5b6936cfRh5Exj#section-uzb-eoc-28t)

3.  Use scheduled SQL statements to aggregate summary information from the raw access logs of buckets and write the information to the centralized project and Logstore.

Note: OSS raw access logs are stored in different projects by region. Therefore, you must configure scheduled SQL statements for each separate project based on the region.

3.1  Real-time data of server metrics

Aggregate data such as queries per second (QPS) and latency of server requests by minute.

```
    * | select
    (__time__ - __time__%60) as logtime,
    bucket as bucket_name,
    owner_id as bucket_owner,
    ip_to_province(client_ip) as remote_province,ip_to_provider(client_ip) as remote_provider,
    vpc_addr,ip,
    sync_request as request_type,
    sum(total_qps) as total_qps,
    sum(put_qps) as put_qps,
    sum(get_qps) as get_qps,
    sum(put_throughput) as put_throughput,
    sum(get_throughput) as get_throughput,
    sum(put_latency) as put_latency,
    sum(get_latency) as get_latency,
    sum(put_server_latency) as put_server_latency,
    sum(get_server_latency) as get_server_latency
    from
    (select __time__, bucket, owner_id, client_ip, sync_request, vpc_addr,int_to_ip(cast(vpc_addr as bigint)) as ip,
     case when http_method in ('GET', 'HEAD', 'PUT', 'POST') then 1 else 0 end as total_qps,
     case when http_method in ('GET', 'HEAD') then 1 else 0 end as get_qps,
     case when http_method in ('PUT', 'POST') then 1 else 0 end as put_qps,
     case when http_method in ('GET', 'HEAD') then response_body_length else 0 end as get_throughput,
     case when http_method in ('PUT', 'POST') then request_length else 0 end as put_throughput,
     case when http_method in ('GET', 'HEAD') then response_time else 0 end as get_latency,
     case when http_method in ('PUT', 'POST') then response_time else 0 end as put_latency,
     case when http_method in ('GET', 'HEAD') then server_cost_time else 0 end as get_server_latency,
     case when http_method in ('PUT', 'POST') then server_cost_time else 0 end as put_server_latency from log )
    group by logtime, bucket_name, bucket_owner,
    remote_province, vpc_addr, request_type,remote_provider,ip limit 1000000
```

3.2  Real-time data of server metrics_read

Collect statistics on metrics such as 95th percentile, 99th percentile, rate, and bandwidth of read requests based on access logs.

```
     * and (http_method:GET or http_method:HEAD)
     |select (__time__ - __time__%60) as logtime,
    bucket as bucket_name,
    owner_id as bucket_owner, ip_to_province(client_ip) as remote_province,
    qps, get_throughput as throughput,
    case
    when get_throughput<=102400 then 'size_0_100k'
    when get_throughput>102400 and get_throughput<=204800 then 'size_100k_200k'
    when get_throughput>204800 and get_throughput<=1048576 then 'size_200k_1m'
    when get_throughput>1048576 then 'size_1m_more' else 'other'
    end as object_size_range,
    'read' as request_type,
    CAST(avg(response_time) as BIGINT) as rl_avg,
    approx_percentile(response_time, 0.95) as rl_p95,
    approx_percentile(response_time, 0.99) as rl_p99,
    case when response_time<=0 then get_throughput else get_throughput/response_time end as speed
    from
    (select __time__, bucket, owner_id, response_time,client_ip,
    case when http_method in ('GET', 'HEAD') then 1 else 0 end as qps,
    case when http_method in ('GET', 'HEAD') then response_body_length else 0 end as get_throughput from log )
    group by logtime, bucket_name,bucket_owner,object_size_range,qps,speed,request_type,throughput,remote_province limit 10000000
```

3.3  Real-time data of server metrics_write

Collect statistics on metrics such as 95th percentile, 99th percentile, rate, and bandwidth of write requests based on access logs.

```
     * and (http_method:PUT or http_method:POST)
     |select (__time__ - __time__%60) as logtime,
    bucket as bucket_name,
    owner_id as bucket_owner, ip_to_province(client_ip) as remote_province,
    qps,
    case
    when put_throughput<=102400 then 'size_0_100k'
    when put_throughput>102400 and put_throughput<=204800 then 'size_100k_200k'
    when put_throughput>204800 and put_throughput<=1048576 then 'size_200k_1m'
    when put_throughput>1048576 then 'size_1m_more' else 'other'
    end as object_size_range,
    'write' as request_type, put_throughput as throughput,
    CAST(avg(response_time) as BIGINT) as rl_avg,
    approx_percentile(response_time, 0.95) as rl_p95,
    approx_percentile(response_time, 0.99) as rl_p99,
    case when response_time<=0 then put_throughput else put_throughput/response_time end as speed
    from
    (select __time__, bucket, owner_id, response_time,client_ip,
    case when http_method in ('PUT', 'POST') then 1 else 0 end as qps,
    case when http_method in ('PUT', 'POST') then request_length else 0 end as put_throughput from log )
    group by logtime, bucket_name, bucket_owner,object_size_range,qps,speed,request_type,throughput,remote_province limit 1000000
```

### Data aggregation result by minute using scheduled SQL statements

Sample 1：

![image](/img/src/cloudlen/ossaccess/6200cdafe8d6003033fad46dd490eb59915abe0a6886ceebe94ba511ff5461f0.png)

Sample 2：

![image](/img/src/cloudlen/ossaccess/b1ffb8c661572aae13406f2a643528c4451075380a03a34b5fffa3cc74d2db95.png)

## Server latency monitoring and analysis dashboard

### User request bandwidth overview

Real-time uplink and downlink bandwidth statistics by carrier and source province

![image](/img/src/cloudlen/ossaccess/cea68ae0d3c4f4c8620f3b8a6783b1afbec6614a814503d30b260ac8f81646e4.png)

### User request rate analysis

Time series chart of user request rate and request rate distribution by file object size

![image](/img/src/cloudlen/ossaccess/858861c2eb40f031feb8eb487e52cc58cacec5aee56dd0c8b9029820d3c6d1e9.png)

### User request latency analysis

Request latency distribution by source identity

![image](/img/src/cloudlen/ossaccess/51b6566dfe1e8a83793f0c858d0b489ccf31a328e23e5963004dd6f2f99c5ddf.png)

### Monitor panes—sample SQL statements

| Pane                                                  | Sample SQL statement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uplink 95th percentile**                            | (*)\| select approx_percentile(get_throughput, 0.95) as get_p95, approx_percentile(put_throughput, 0.95) as put_p95 from (select (logtime-logtime%300) as logtime, sum(get_throughput)*8/300 as get_throughput , sum(put_throughput)\*8/300 as put_throughput from log group by logtime)                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Downlink 95th percentile**                          | (*)\| select approx_percentile(get_throughput, 0.95) as get_p95, approx_percentile(put_throughput, 0.95) as put_p95 from (select (logtime-logtime%300) as logtime, sum(get_throughput)*8/300 as get_throughput , sum(put_throughput)\*8/300 as put_throughput from log group by logtime)                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Uplink peak**                                       | (*)\| select round(max(get_throughput), 3) as get_max, round(max(put_throughput), 3) as put_max from (select (logtime-logtime%300) as logtime, sum(get_throughput)*8/300 as get_throughput , sum(put_throughput)\*8/300 as put_throughput from log group by logtime)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Downlink peak**                                     | (*)\| select round(max(get_throughput), 3) as get_max, round(max(put_throughput), 3) as put_max from (select (logtime-logtime%300) as logtime, sum(get_throughput)*8/300 as get_throughput , sum(put_throughput)\*8/300 as put_throughput from log group by logtime)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Carrier distribution（Gb/s）**                      | (*)\| select key, approx_percentile(max_throughput, 0.95) as max_p95 from (select (logtime-logtime%300) as logtime, remote_provider as key, case when sum(get_throughput)>sum(put_throughput) then sum(get_throughput)*8/300 else sum(put_throughput)\*8/300 end as max_throughput from log group by logtime, key) group by key order by max_p95 desc                                                                                                                                                                                                                                                                                                                                                      |
| **Source province**                                   | (*)\| select key, approx_percentile(max_throughput, 0.95) as max_p95 from (select (logtime-logtime%300) as logtime, remote_province as key, case when sum(get_throughput)>sum(put_throughput) then sum(get_throughput)*8/300 else sum(put_throughput)\*8/300 end as max_throughput from log group by logtime, key) group by key order by max_p95 desc                                                                                                                                                                                                                                                                                                                                                      |
| **Bandwidth trend**                                   | (*)\| select date_format(date_trunc('minute', (logtime-logtime%300)), '%Y-%m-%d %H:%i:%m') as logtime, sum(get_throughput)*8/300 as "下行带宽" , sum(put_throughput)\*8/300 as "上行带宽" from log group by logtime order by logtime limit 1000000                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Request rate**                                      | (* and request_type:read and object_size_range:size_0_100k)\| select date_format(date_trunc('minute',logtime), '%Y-%m-%d %H:%i:%m') as logtime, avg(speed)*8000 as speed from log group by logtime order by logtime limit 1000000                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Rate distribution by request size**                 | (* and request_type:read and object_size_range:size_0_100k)\| select object_size_range as "文件大小", avg(speed)*8000 as "速率" from log group by object_size_range order by "速率" desc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Read request latency trend**                        | (*)\| select l.remote_province as remote_province, r.remote_province as province, date_format(date_trunc('minute', logtime), '%Y-%m-%d %H:%i:%m') as logtime, l.latency from (select logtime, remote_province, avg(get_latency) as latency from log group by logtime, remote_province ) as l left join (select remote_province, latency, qps, qps*100.0/total as rate from (select remote_province, avg(get_latency) as latency, sum(get_qps) as qps from log group by remote_province) as a cross join (select sum(get_qps) as total from log) as b having rate>0.1 order by latency desc limit 5) as r on l.remote_province=r.remote_province having province is not null order by logtime limit 1000000 |
| **Request latency 95th percentile**                   | (\* and request_type:read and object_size_range:size_0_100k)\| select date_format(date_trunc('minute', (logtime)), '%Y-%m-%d %H:%i:%m') as logtime, avg(rl_p95) as rl_p95 from log group by logtime order by logtime limit 1000000                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Request latency 99th percentile (top 5 provinces)** | (\* and request_type:read and object_size_range:size_0_100k)\| select date_format(date_trunc('minute', logtime), '%Y-%m-%d %H:%i:%m') as logtime, remote_province , avg(rl_p99) as latency from log where remote_province in (select remote_province from (select remote_province , sum(qps) as qps from log group by remote_province order by qps desc limit 5)) and remote_province is not null group by logtime, remote_province                                                                                                                                                                                                                                                                        |
