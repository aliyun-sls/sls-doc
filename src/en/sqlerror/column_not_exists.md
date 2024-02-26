# column * no longer exists
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Column '*duration*' no longer exists or type mismatch;please add the column in the index attribute

## 错误描述
您当前查询的logstore中duration列不存在

## 可能原因
- 该Logstore中没有建立duration列字段
- 该Logstore中duration列字段没有开启统计分析
![图 1](/img/src/sqlerror/column_not_exists/9a50a4a42aed9807dbfe8a5942fd2cd372402d2f42b3c7ea39c6bc8b05118440.png)  
- 该Logstore中duration列字段刚建立，元数据还未同步（分钟内完成，稍等片刻即可）
- 您确实指定错了一个不存在的列（可能是拼写错误）

## 解决方法
- 检查您指定的列是否正确，是否有拼写错误
- 检查您需要查询的目标Logstore，并确定duration列已建立索引字段，并已开启统计分析，稍等片刻重试即可

> 内嵌cli提供用户自助查询