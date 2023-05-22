# The specified key does not exist.
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> The specified key does not exist.

## 错误描述
这通常发生你使用OSS做外表关联查询中，访问OSS bucket失败：指定Key不存在

## 可能原因
您正在访问的OSS bucket中不存在指定的对象，可能已被删除或者从来不存在。这有可能是您指定了错误的OSS bucket端点，也可能是您指定了错误的对象Key。

## 解决方法
- 检查OSS bucket和待访问对象Key名称，确保无误。
- 前往OSS确认指定对象Key是否存在于指定的OSS bucket中。
- 如果还存在问题，您可以向SLS提交工单获得帮助。