# target of repeat operator is not specified
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> target of repeat operator is not specified

## 错误描述
重复操作符的目标未指定。

## 可能原因
这可能是正则表达式中的错误，提示重复操作符的目标未指定。重复操作符“()”用于匹配前面的字符或组的零个或多个出现，但它需要一个目标来应用重复。例如，"(a) *"表示零个或多个出现的字母"a"。如果没有指定目标，例如在"() *"中，正则表达式引擎将不知道要如何应用重复操作符，从而会抛出该错误。

## 解决方法
您需要检查正则表达式中的重复操作符“()”是否有正确的目标，并进行相应修正。  