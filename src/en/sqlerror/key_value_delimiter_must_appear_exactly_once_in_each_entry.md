# Key-value delimiter must appear exactly once in each entry. Bad input: '*'
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Key-value delimiter must appear exactly once in each entry. Bad input: 'label_oxford_gaodun_c'

## 错误描述
每个条目中的键值分隔符必须出现一次。

## 可能原因
在输入中的某个键值对中，分隔符出现了不止一次，或者没有出现，导致系统无法解析该键值对。

## 解决方法
首先，请检查输入中的键值对格式是否正确，确保每个键值对中只有一个分隔符，并且分隔符两侧都有正确的键和值。如果问题依然存在，可以考虑使用更为严谨的数据格式或者查看相关文档寻求帮助。另外，也可以通过查看错误提示前后的代码上下文，尝试找到问题所在。如果问题依然存在，可以向SLS提工单寻求帮助。