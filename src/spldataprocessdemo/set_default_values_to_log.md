# 为日志不存在的字段填充默认值
使用COALESCE为不存在的字段填充默认值
* 输入数据
  ```
  server_protocol: 100
  ```
* SPL语句：如果server_protocol存在则y为server_protocol的值，如果server_protocol1不存在则x为200。
  ```python
  * | extend x=COALESCE(server_protocol1, '200') | extend y=COALESCE(server_protocol, '200')
  ```
* 输出结果
  ```python
  server_protocol: 100
  x: 200
  y: 100
  ```