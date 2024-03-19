# 值加工
日志格式为k1:"v1\"abc"形式， 同时值加工的内容存在有双引号符号的情形，使用parse-kv函数可正常进行提取。
* 原始日志
  ```
  """
  这里的\只是普通的符号，不是转义符
  """
  content2:  k1:"v1\"abc", k2:"v2", k3:"v3"
  ```
* SPL
  ```python
  * | parse-kv -delims=',\s' -kv-sep=':' content2
  ```
* 加工结果提取后的日志为：
  ```
  content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
  k1: "v1\\"abc"
  k2: "v2"
  k3: "v3"
  ```