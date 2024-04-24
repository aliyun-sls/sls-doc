# Invalid JSON path: ...

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Invalid JSON path: '$.X-Power-Open-App-Id'

## Error description

Invalid JSON access path.

## Cause

You fail to specify a valid JSON path when you use a JSON function such as json_extract, json_extract_scalar, or json_size in SQL to access the path.

## Solution

- Specify json_path in the format of $.a.b.In this format, $ specifies the root node of the current JSON object, and the half-width period (.) refers to the node to be extracted (which can be cascaded). However, if the JSON object, such as http.path, http path, or http-path, contains special characters such as a period (.), space, or hyphen (-), you need to use brackets ([]) to replace half-width periods (.), and then enclose the field name in double quotation marks ("). Sample code:

```SQL
* | SELECT json_extract_scalar(request, '$["X-Power-Open-App-Id"]')
```

- For more information about [JSON functions](https://www.alibabacloud.com/help/en/doc-detail/63454.html) and how to use json_path, see JSON functions.
- For more information about how to set json_path, see How do I set [json_path?](https://www.alibabacloud.com/help/en/doc-detail/427476.htm#section-9ap-q5v-6zq).
