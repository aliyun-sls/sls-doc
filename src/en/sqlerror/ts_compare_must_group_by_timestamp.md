# ts_compare must  gropu by timestamp,your grouping by type is :bigint
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> ts_compare must  gropu by timestamp,your grouping by type is :bigint

## 错误描述
ts_compare函数必须按timestamp类型分组

## 可能原因
您在SQL中使用ts_compare函数时，group by的列，可能是非timestamp类型的数值型或其他类型

## 解决方法
请确保ts_compare函数对应的group by列类型使用正确的timestamp类型，您可以使用from_unittime等函数将整型时间戳转换成timestamp类型。