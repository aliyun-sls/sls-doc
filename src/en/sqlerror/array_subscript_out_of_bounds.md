# Array subscript out of bounds
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Array subscript out of bounds

## 错误描述
数组下标越界。

## 可能原因
您使用数组时，正在尝试访问了一个超出数组范围的索引位置。例如，访问负数索引、超出数组长度的索引等。这可能是因为SQL中存在错误的逻辑或者数据输入错误。  

## 解决方法
SQL中数组索引位置从1开始计起，请检查SQL中数组的有效长度，然后检查数组索引位置的引用情况，并确保数组的下标没有超出范围。