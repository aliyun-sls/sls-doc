# denied by sts or ram, action:*
**ErrorCode**
> Unauthorized

**ErrorMessage**
```
denied by sts or ram, action: log:GetLogStoreLogs, resource: acs:log:<region>:<uid>:project/<project>/logstore/<logstore>
```

## 错误描述
您当前查询的logstore在您当前身份下没有权限

## 可能原因
- 该Logstore未授权给您当前身份

## 解决方法
- 检查RAM权限，并授权该Logstore读权限给您当前身份，授权资源描述：
```
action: log:GetLogStoreLogs, resource: acs:log:<region>:<uid>:project/<project>/logstore/<logstore>
```
> 内嵌cli提供用户自助查询