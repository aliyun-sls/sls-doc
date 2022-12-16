# 控制台查询

![](/img/searchdemo/scan_sdk_demo_on_web_console.jpg)

# Java SDK 代码访问

Maven 依赖：
```
<!-- https://mvnrepository.com/artifact/com.aliyun.openservices/aliyun-log -->
<dependency>
    <groupId>com.aliyun.openservices</groupId>
    <artifactId>aliyun-log</artifactId>
    <version>0.6.76</version>
</dependency>
```

代码样例：

```java
public void doScan() throws LogException {
    Client cli = new Client("fill SLS endpoint here", "fill your accessKeyId here", "fill your accessKeySecret here");
    String project = "fill your SLS project here";
    String logstore = "fill your SLS logsotre here";
    int fromTime = 1671154200; // event-time, [from, to)
    int toTime = 1671154200 + 3600; // event-time, [from, to)
    String query = "Status:404 | where ErrorCode = 'ConsumerGroupNotExist'";
    int totalCount = 0;
    boolean reverse = false; // 从前向后查找
    // boolean reverse = true; // 从后向前查找
    boolean forward = true;
    int offset = 0;
    while (true) {
        GetLogsResponse resp = cli.GetLogs(project, logstore, fromTime, toTime, "", query, 100, offset, reverse, forward, "mode=scan;");
        for (QueriedLog log : resp.getLogs()) {
            System.out.println(log.GetLogItem().ToJsonString());
        }
        System.out.println("[response of this scan]\tbegin offset: " + resp.GetBeginOffset() + "\tend offset: " + resp.GetEndOffset() + "\tresult logs: " + resp.getLogs().size() + "\tis finished: " + resp.IsScanAll());
        totalCount += resp.getLogs().size();
        if (resp.IsScanAll()) {
            break;
        }
        offset = forward ? (int)resp.GetEndOffset() : (int)resp.GetBeginOffset();
    }
    System.out.println("totally scanned logs\t: " + totalCount);
}

```

日志输出：

```
[response of this scan]	begin offset: 0	end offset: 13659	result logs: 100	is finished: false
[response of this scan]	begin offset: 13659	end offset: 28999	result logs: 100	is finished: false
[response of this scan]	begin offset: 28999	end offset: 43476	result logs: 100	is finished: false
[response of this scan]	begin offset: 43476	end offset: 66376	result logs: 100	is finished: false
[response of this scan]	begin offset: 66376	end offset: 80627	result logs: 100	is finished: false
[response of this scan]	begin offset: 80627	end offset: 94962	result logs: 100	is finished: false
[response of this scan]	begin offset: 94962	end offset: 108820	result logs: 100	is finished: false
[response of this scan]	begin offset: 108820	end offset: 111960	result logs: 22	is finished: true
totally scanned logs	: 722
```

# SDK 参数说明

| reverse | forward | offset | 行为 |
|---------|---------|--------|------|
| false | true | 0 或上次请求响应的 endOffset | 从前（时间戳小）往后（时间戳大）翻页 |
| true | true | 0 或上次请求响应的 endOffset | 从后（时间戳大）往前（时间戳小）翻页 |
| false | false | 索引命中的日志总数（对竖线前查询语句调用 GetHistorgram 后去）或上次请求响应的 beginOffset | 从后（时间戳大）往前（时间戳小）翻页 |
| true | false | 索引命中的日志总数（对竖线前查询语句调用 GetHistorgram 后去）或上次请求响应的 beginOffset | 从前（时间戳小）往后（时间戳大）翻页 |