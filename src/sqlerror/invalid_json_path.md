# Invalid JSON path: ...
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Invalid JSON path: '$.X-Power-Open-App-Id'

## 错误描述
非法JSON访问路径

## 可能原因
您在SQL中使用JSON函数（如json_extract、json_extract_scalar、json_size等）访问指定json路径时，未指定有效路径。

## 解决方法
- 正常指定json_path，格式为$.a.b。其中$代表当前JSON对象的根节点，半角句号.引用到待提取的节点（可级联），但是当JSON对象的字段中存在特殊字符（如.、空格、-等），例如 http.path、http path、http-path等，则需要使用中括号[]代替半角句号（.），然后使用双引号（""）包裹字段名，例如：  
```SQL
* | SELECT json_extract_scalar(request, '$["X-Power-Open-App-Id"]')
```
- 您可以参考[JSON函数](https://help.aliyun.com/document_detail/63454.html)详细使用说明，了解JSON函数和json_path的具体用法。
- 您还可以参考[如何设置json_path？](https://help.aliyun.com/document_detail/427476.htm#section-9ap-q5v-6zq)了解json_path的具体使用方式。