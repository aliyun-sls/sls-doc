# 解析非标准的Nginx日志
## 场景一：从日志中根据正则解析特定的字符串
* 根据正则表达式，从content中提取出RequestTime,traceId,ThreadName,LogLevel,ClassName,LineNum,LogInfo字段值
* 原始日志
  ```
  content:2023-11-11 14:47:17.844 [12] [backup-test-thread] INFO com.shidsds.dus.service.BackTestService 109 | 备份缓存 1021 秒前已刷新，本次跳过：backupCache:com.shidsds.dus.service.DuuewwService:lastRefreshTime
  ```
* DSL编排
  ```python
  *| parse-regexp content, '([\d\-]{10}\s+[\d:\.]{12})\s+\[(.*)\]\s+\[([^[\]]+)\]\s+([\S]+)\s+([\S]+)\s+([\d]+)\s+\|\s+(.*)' as RequestTime,traceId,ThreadName,LogLevel,ClassName,LineNum,LogInfo
  ```
* 加工结果
  ```
  ClassName:com.shidsds.dus.service.BackTestService
  LineNum:109
  LogInfo:备份缓存 1021 秒前已刷新，本次跳过：backupCache:com.shidsds.dus.service.DuuewwService:lastRefreshTime
  LogLevel:INFO
  RequestTime:2023-11-11 14:47:17.844
  ThreadName:backup-test-thread
  content:2023-11-11 14:47:17.844 [] [backup-test-thread] INFO com.shidsds.dus.service.BackTestService 109 | 备份缓存 1021 秒前已刷新，本次跳过：backupCache:com.shidsds.dus.service.DuuewwService:lastRefreshTime
  traceId:12
  ```
## 场景二：提取日志中的info字段
* 根据正则表达式，从message中提取出日志的info值
* 原始日志
  ```
  [{"project": "ewewew", "release": "cn","environment": "ede","timestamp": "1731292244","input": "{\"type\":\"log\"}","host": "{\"name\":\"wkndkwdksk920922\"}",    "agent": "{\"dksdks_id\":\"0763232-41e0-4762-97c8-2i0jeoj2\",\"id\":\"322s2e2-f616-4b44-9210-2dde23ss\",\"name\":\"wkndkwdksk920922\",\"type\":\"filebeat\"}",    "vpcId": "vpc-uf6892ie2ey9g3dbwjh",    "log": "{\"file\":{\"path\":\"/home/user/server/Bin/log/tt/game3.log\"},\"offset\":240066}",    "message": "[2023-11-11 10:30:34.917962]\t[info]\t[SingleWorldService]\t[ResourceManager:Scale2, esClusterId=1001]\t[[]     ...ewewewe/ResourceServiceComponent/ResourceManager.lua:190]"}]
  ```
* DSL编排
  ```
  *| parse-regexp message, '.*[\d]{6}\]\s+\[(.*)\]\s+\[SingleWorldService\]' as info
  ```
