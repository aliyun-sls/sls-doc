# Use the e_dict_map and e_search_dict_map functions to enrich log data

This topic describes how to enrich log data by using the e_dict_map and e_search_dict_map functions.

## Use the e_dict_map function to enrich log data

This section describes how to use the e_dict_map function to enrich log data.

- Raw log entries

  ```
  http_host:  example.com
  http_status:  300
  request_method:  GET

  http_host:  example.org
  http_status:  200
  request_method:  POST

  http_host:  example.net
  http_status:  400
  request_method:  GET

  http_host:  aliyundoc.com
  http_status:  500
  request_method:  GET
  ```

- Data transformation requirements
  Transform the status codes in the http_status field into data of the Text type and add the transformed data to the status_desc field.

- Transformation rule
  ```python
  e_dict_map(
    {"400": "Request error", "500": "Server error", "300": "Jump", "200": "success"},
    "http_status",
    "status_desc"
  )
  ```
  **Note** The preceding transformation rule includes only four HTTP status codes. For more information, see [HTTP Status Codes](https://www.restapitutorial.com/httpstatuscodes.html?spm=a2c4g.11186623.0.0.7f753c11xuX1KY).If the value of the http_status field is 401 or 404, the corresponding value must be included in the source dictionary. Otherwise, the data mapping will fail.
- Transformation result

  ```
  http_host:  example.com
  http_status:  300
  request_method:  GET
  status_desc: Jump

  http_host:  example.org
  http_status:  200
  request_method:  POST
  status_desc: success

  http_host:  example.net
  http_status:  400
  request_method:  GET
  status_desc: Request error

  http_host:  aliyundoc.com
  http_status:  500
  request_method:  GET
  status_desc: Server error
  ```

## Use the e_search_dict_map function to enrich log data

Use the e_search_dict_map function to enrich log data

- Raw log entries

  ```
  http_host:  example.com
  http_status:  200
  request_method:  GET
  body_bytes_sent: 740

  http_host:  example.org
  http_status:  200
  request_method:  POST
  body_bytes_sent: 1123

  http_host:  example.net
  http_status:  404
  request_method:  GET
  body_bytes_sent: 711

  http_host:  aliyundoc.com
  http_status:  504
  request_method:  GET
  body_bytes_sent: 1822
  ```

- Data transformation requirements
  Add a field named type to each log entry. The value of this field is decided based on the values of the http_status and body_bytes_sent fields in each log entry.
  - If the value of the http_status field matches the 2XX pattern and the value of the body_bytes_sent field is less than 1000 in a log entry, set the value of the type field added to the log entry to Normal.
  - If the value of the http_status field matches the 2XX pattern and the value of the body_bytes_sent field is equal to or greater than 1000 in a log entry, set the value of the type field added to the log entry to Too long.
  - If the value of the http_status field in a log entry matches the 3XX pattern, set the value of the type field added to the log entry to Redirect.
  - If the value of the http_status field in a log entry matches the 4XX pattern, set the value of the type field added to the log entry to Error.
  - If the value of the http_status field in a log entry does not match either of the preceding patterns, set the value of the type field added to the log entry to Others.
- Transformation rule

  ```python
  e_search_dict_map({
      'http_status~="2\d+" and body_bytes_sent < 1000': "normal",
      'http_status~="2\d+" and body_bytes_sent >= 1000': "Long warning",
      'http_status~="3\d+"': "redirect", 'http_status~="4\d+"': "error",  "*": "other"
    },
    "http_status",
    "type"
  )
  ```

  If you want to use a dictionary to enrich your log data, you can create a dictionary by using braces ({}) or based on resources allocated to the task, Object Storage Service (OSS) resources, and tables. For more information, see [Build dictionaries](https://www.alibabacloud.com/help/en/doc-detail/135224.htm?spm=a2c4g.11186623.0.0.7f753c11xuX1KY#section-6pi-yyp-s8b).

- Transformation result

  ```
  type: normal
  http_host:  example.com
  http_status:  200
  request_method:  GET
  body_bytes_sent: 740

  type: Too long
  http_host:  example.org
  http_status:  200
  request_method:  POST
  body_bytes_sent: 1123

  type: error
  http_host:  example.net
  http_status:  404
  request_method:  GET
  body_bytes_sent: 711

  type: other
  http_host:  aliyundoc.com
  http_status:  504
  request_method:  GET
  body_bytes_sent: 1822
  ```
