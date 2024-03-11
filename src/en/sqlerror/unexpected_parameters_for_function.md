# Unexpected parameters (bigint) for function url_decode. Expected: url_decode(varchar(x)) 
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Unexpected parameters (bigint) for function url_decode. Expected: url_decode(varchar(x)) 

## 错误描述
SQL语句中存在语法错误，使用SQL函数时，输入的参数类型不正确。

## 可能原因
- 该函数需要接收一个字符串类型的参数，但是输入的参数类型为bigint。
- 这类错误可能出现在不同的函数中，不一定是*url_decode*，也有可能是*regexp_like*，但错误原因是确定且一样的：使用SQL函数时，输入的参数类型不正确。

## 解决方法
将输入的参数转换为字符串类型后再传递给url_decode函数。可以使用CAST或CONVERT函数将bigint类型的参数转换为字符串类型的参数，或者直接在调用该函数时使用引号将参数括起来，将其转换为字符串类型。  
例如：
```SQL
SELECT url_decode(CAST(bigint_param AS varchar(20))) -- 使用CAST函数将bigint类型参数转换为字符串类型

SELECT url_decode('123456789') -- 若参数是字面量，可以直接将参数括起来，将其转换为字符串类型

```