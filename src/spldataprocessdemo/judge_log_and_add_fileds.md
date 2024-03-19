# 判断日志并增加字段
一般情况下，推荐您使where和extend组合指令进行。
  ```python
  * | where <bool-expression> | extend <output>=<expression> |...
  ```
  示例如下所示：
  * 输入数据
    ```python
    status1: 200
    status2: 404
    ```
  * SPL语句
    ```python
    * | where status1='200'| extend status1_info='normal' | where status2='404'| extend status2_info='error'
    ```
  * 输出结果
    ```
    status1: 200
    status2: 404
    status1_info: normal
    status2_info: error
    ```
