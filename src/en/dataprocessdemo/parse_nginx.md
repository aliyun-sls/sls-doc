# Parse NGINX logs

NGINX access logs record the detailed information about user access requests. You can parse NGINX access logs to monitor and analyze your business.

**Note**

- You can combine regular expressions and the Grok function to parse logs.
- You can customize regular expressions or the Grok function to parse NGINX logs that are in a custom format.

## Use regular expressions to parse NGINX access logs that contain a success status code

The following example shows how to use regular expressions to parse NGINX access logs that contain a success status code.

- Raw log entries
  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.254.254
  __tag__:__receive_time__:  1563443076
  content: 192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
  ```
- Requirements
  - Requirement 1: Extract the code、ip、datetime、protocol、request、sendbytes、refere、useragent、verb from the NGINX logs.
  - Requirement 2: Extract the uri_proto、uri_domain、uri_param field from the request field.
  - Requirement 3: Extract the curi_path、uri_query from the uri_param logs.
- SLS DSL orchestration
  - General orchestration
    ```python
    """Step 1: Parse the NGINX logs."""
    e_regex(
      "content",
      r'(?P<ip>\d+\.\d+\.\d+\.\d+)( - - \[)(?P<datetime>[\s\S]+)\] \"(?P<verb>[A-Z]+) (?P<request>[\S]*) (?P<protocol>[\S]+)["] (?P<code>\d+) (?P<sendbytes>\d+) ["](?P<refere>[\S]*)["] ["](?P<useragent>[\S\s]+)["]'
    )
    """Step 2: Parse the field obtained in Step 1."""
    e_regex(
      'request',
      r'(?P<uri_proto>(\w+)):\/\/(?P<uri_domain>[a-z0-9.]*[^\/])(?P<uri_param>(.+)$)'
    )
    """Step 3: Parse the uri_param field obtained in Step 2."""
    e_regex(
      'uri_param',
      r'(?P<uri_path>\/\_[a-z]+[^?])\?(?<uri_query>(.+)$)'
    )
    ```
  - Specific orchestration and the transformation results
    - Orchestration specific to Requirement 1
      ```python
      e_regex(
        "content",
        r'(?P<ip>\d+\.\d+\.\d+\.\d+)( - - \[)(?P<datetime>[\s\S]+)\] \"(?P<verb>[A-Z]+) (?P<request>[\S]*) (?P<protocol>[\S]+)["] (?P<code>\d+) (?P<sendbytes>\d+) ["](?P<refere>[\S]*)["] ["](?P<useragent>[\S\s]+)["]'
      )
      ```
    - Transformation result
    ```
    __source__:  192.168.0.1
    __tag__:  __receive_time__:  1563443076
    code:  200
    content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"httpversion:  1.1
    datetime:  04/Jan/2019:16:06:38 +0800
    ip:  192.168.0.2
    protocol:  HTTP/1.1
    refere:  -
    request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
    sendbytes:  273932
    useragent:  Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)
    verb:  GET
    ```
    - Orchestration specific to Requirement 2 (Parse the request field)
      ```python
      e_regex(
        'request',
        r'(?P<uri_proto>(\w+)):\/\/(?P<uri_domain>[a-z0-9.]*[^\/])(?P<uri_param>(.+)$)'
      )
      ```
      Sub-result
      ```
      uri_param: /_astats?application=&inf.name=eth0
      uri_domain: example.aliyundoc.com
      uri_proto: http
      ```
    - Orchestration specific to Requirement 3 (Parse the uri_param field)
      ```python
        e_regex(
          'uri_param',
          r'(?P<uri_path>\/\_[a-z]+[^?])\?(?<uri_query>(.+)$)'
        )
      ```
      Sub-result
      ```
      uri_path: /_astats
      uri_query: application=&inf.name=eth0
      ```
- Transformation result
  ```
  __source__:  192.168.0.1
  __tag__:  __receive_time__:  1563443076
  code:  200
  content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"httpversion:  1.1
  datetime:  04/Jan/2019:16:06:38 +0800
  ip:  192.168.0.2
  protocol:  HTTP/1.1
  refere:  -
  request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
  sendbytes:  273932
  uri_domain:  example.aliyundoc.com
  uri_proto:  http
  uri_param: /_astats?application=&inf.name=eth0
  uri_path: /_astats
  uri_query: application=&inf.name=eth0
  useragent:  Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)
  verb:  GET
  ```
