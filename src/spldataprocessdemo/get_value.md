# 值提取
动态键值对之间以及关键字与值之间有明确标识，如a=b或a="cxxx"日志格式的，使用parse-kv函数，示例如下。
* 原始日志
  ```
  content1:  k1="helloworld",the change world, k2="good"
  ```
* SPL这种情况下使用parse-kv函数，提取内容不包括the change world：
  ```python
  * | parse-kv -delims=',\s' content1
  ```
* 加工结果提取后的日志为：
  ```
  content1:  k1="helloworld",the change world, k2="good"
  k1: helloworld
  k2: good
  ```