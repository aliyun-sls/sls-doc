# 解析非标准的Nginx日志
## 场景一：提取日志中间的info字段值
* 根据正则表达式，从message中提取出日志的中间的info值
* 原始日志
  ```
  [{"message":"[2024-10-11 10:30:34.917962]\t[info]\t[SingleWorldService]\t[ResourceManager:Scale2, esClusterId=1001]\t[[]     ...ewewewe/ResourceServiceComponent/ResourceManager.lua:190]"}]
  ```
* DSL编排
  ```
  *| parse-regexp message, '.*[\d]{6}\]\s+\[(.*)\]\s+\[SingleWorldService\]' as info
  ```
* 加工结果
  ```
  info:info
  message:[2024-10-11 10:30:34.917962]	[info]	[SingleWorldService]	[ResourceManager:Scale2, esClusterId=1001]	[[]     ...ewewewe/ResourceServiceComponent/ResourceManager.lua:190]
  ```
## 场景二：从日志中根据正则解析特定值
* 根据正则表达式，从content中提取出RequestTime，traceId，ThreadName，LogLevel，ClassName，LineNum，LogInfo字段值
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
