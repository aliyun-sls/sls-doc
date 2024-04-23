# Query logs in the console

![](/img/searchdemo/scan_sdk_demo_on_web_console.jpg)

# Query logs by using SDK for Java

## Maven dependency
```
<!-- https://mvnrepository.com/artifact/com.aliyun.openservices/aliyun-log -->
<dependency>
    <groupId>com.aliyun.openservices</groupId>
    <artifactId>aliyun-log</artifactId>
    <version>0.6.76</version>
</dependency>
```

## Sample code

```java
public void doScan() throws LogException {
    Client cli = new Client("fill SLS endpoint here", "fill your accessKeyId here", "fill your accessKeySecret here");
    String project = "fill your SLS project here";
    String logstore = "fill your SLS logsotre here";
    int fromTime = 1671154200; // event-time, [from, to)
    int toTime = 1671154200 + 3600; // event-time, [from, to)
    String query = "Status:404 | where ErrorCode = 'ConsumerGroupNotExist'"; // No contextual fields are returned.
    // String query = "Status:404 | where ErrorCode = 'ConsumerGroupNotExist' | with_pack_meta"; // Contextual fields are returned.
    int totalCount = 0;
    boolean reverse = false; // Search from beginning to end.
    // boolean reverse = true; // Search from end to beginning.
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
Expected output:

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

## Contextual query

Scan syntax：`{Index Search Query} | {Scan Query}`，logs with no contextual fields are returned.。

To obtain logs with contextual fields, you can use the following syntax: `{Index Search Query} | {Scan Query} | with_pack_meta`

Sample contextual fields:：
```
__pack_meta__: 3|MTY3MTExNTcxMDM2ODE3ODE3NQ==|518|73
__tag__:__pack_id__: 7154B46F35F6D009-141
```

Q：With contextual fields of a log, how do I query the previous and next logs of the log in a raw log file?

A：see[GetContextLogs](https://help.aliyun.com/document_detail/152116.html)。

# SDK parameters

| reverse | forward | offset | action |
|---------|---------|--------|------|
| false | true | 0 or the endOffset returned in the last response endOffset | Turns page from the smaller timestamp to the larger timestamp |
| true | true | 0 or the endOffset returned in the last response endOffset | Turns page from the larger timestamp to the smaller timestamp |
| false | false | The total number of logs hit by the index or the beginOffset returned in the last response beginOffset | Turns page from the larger timestamp to the smaller timestamp |
| true | false | The total number of logs hit by the index or the beginOffset returned in the last response beginOffset | Turns page from the smaller timestamp to the larger timestamp |

Q: How do I obtain the total number of logs hit by the index?

A: You can call the GetHistorgram operation in a search statement that is before the vertical bar (\|). For example, you can call the operation in the Status:404 statement.