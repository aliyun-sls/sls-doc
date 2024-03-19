# 删除和重命名字段
一般情况下，推荐您使project-away、project-rename指令进行删除和重命名字段
* 子场景1：删除特定字段
  ```python
  | project-away -wildcard-off <field-pattern>, ...
  ```
  示例如下所示：
  * 输入数据
    ```
    content：123
    age：23
    name：twiss
    ```
  * SPL语句
    ```python
    * | project-away age, name
    ```
  * 输出结果
    ```
    content：123
    ```
* 子场景2：重命名特定字段
  ```python
  | project-rename <output>=<field>, ...
  ```
  示例如下所示：
  * 输入数据
    ```
    content：123
    age：23
    name：twiss
    ```
  * SPL语句
    ```python
    * | project-rename new_age=age, new_name=name
    ```
  * 输出结果
    ```
    content：123
    new_age：23
    new_name：twiss
    ```