# 介绍
日志服务支持您在SQL分析语句中定义Lambda表达式，并将该表达式传递给指定函数，丰富函数的表达。本文介绍Lambda表达式的基本语法及示例。

# 函数示例
语法 
-----------------------

Lambda表达式需与函数一起使用，例如[filter函数](#%E7%A4%BA%E4%BE%8B1%EF%BC%9A%E4%BD%BF%E7%94%A8lambda%E8%A1%A8%E8%BE%BE%E5%BC%8Fx---x-is-not-null)、[reduce函数](#%E7%A4%BA%E4%BE%8B2%EF%BC%9A%E4%BD%BF%E7%94%A8lambda%E8%A1%A8%E8%BE%BE%E5%BC%8F0-s-x---s--x-s---s)、[transform函数](#%E7%A4%BA%E4%BE%8B3%EF%BC%9A%E4%BD%BF%E7%94%A8lambda%E8%A1%A8%E8%BE%BE%E5%BC%8Fkv---v--10)、[zip_with函数](#%E7%A4%BA%E4%BE%8B4%EF%BC%9A%E4%BD%BF%E7%94%A8lambda%E8%A1%A8%E8%BE%BE%E5%BC%8Fx-y---y-x)、[map_filter函数](#%E7%A4%BA%E4%BE%8B5%EF%BC%9A%E4%BD%BF%E7%94%A8lambda%E8%A1%A8%E8%BE%BE%E5%BC%8Fx---coalescex-0--1)。Lambda表达式的语法如下：

```sql
parameter -> expression
```



|      参数      |                                                                                                                 说明                                                                                                                  |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *parameter*  | 用于传递参数的标识符。                                                                                                                                                                                                                         |
| *expression* | 表达式，大多数的MySQL表达式都可以在Lambda表达式使用。例如： ```sql x -> x + 1 (x, y) -> x + y x -> regexp_like(x, 'a+') x -> x[1] / x[2] x -> if(x > 0, x, -x) x -> coalesce(x, 0) x -> cast(x AS JSON) x -> x + try(1 / 0) ```  |



示例 
-----------------------

### 示例1：使用Lambda表达式x -\> x is not null

返回数组\[5, null, 7, null\]中非null的元素。

* 查询和分析语句

  ```sql
  * | SELECT filter(array[5, null, 7, null], x -> x is not null)
  ```

  

* 查询和分析结果
  
  ![filter函数](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0866388261/p303951.png)




### 示例2：使用Lambda表达式0, (s, x) -\> s + x, s -\> s

返回数组\[5, 20, 50\]中各个元素相加的结果。

* 查询和分析语句

  ```sql
  * | SELECT reduce(array[5, 20, 50], 0, (s, x) -> s + x, s -> s)
  ```

  

* 查询和分析结果
  
  ![reduce](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5229378261/p303133.png)

### 示例3：使用Lambda表达式(k,v) -\> v \> 10

将两个数组映射为一个Map且Map中的键值大于10。

* 查询和分析语句

  ```sql
  * | SELECT map_filter(map(array['class01', 'class02', 'class03'], array[11, 10, 9]), (k,v) -> v > 10)
  ```

* 查询和分析结果
  
  ![map_filter](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0866388261/p303952.png)


### 示例4：使用Lambda表达式(x, y) -\> (y, x)

将对换两个数组的元素位置，然后提取数组中索引相同的元素组成一个新的二维数组。

* 查询和分析语句

  ```sql
  * | SELECT zip_with(array[1, 3, 5], array['a', 'b', 'c'], (x, y) -> (y, x))
  ```

* 查询和分析结果
  
  ![zip_with](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0866388261/p303967.png)

### 示例5：使用Lambda表达式x -\> coalesce(x, 0) + 1

将数组\[5, NULL, 6\]中的各个元素加1，然后返回。如果数组中包含null元素，则转换为0，再加1。

* 查询和分析语句

  ```sql
  * | SELECT transform(array[5, NULL, 6], x -> coalesce(x, 0) + 1)
  ```

* 查询和分析结果![transform](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0866388261/p303968.png)


### 其他示例

```sql
* | SELECT filter(array[], x -> true)
* | SELECT map_filter(map(array[],array[]), (k, v) -> true)
* | SELECT reduce(array[5, 6, 10, 20], -- calculates arithmetic average: 10.25
              cast(row(0.0, 0) AS row(sum double, count integer)),
              (s, x) -> cast(row(x + s.sum, s.count + 1) AS row(sum double, count integer)),
              s -> if(s.count = 0, null, s.sum / s.count))
* | SELECT reduce(array[2147483647, 1], cast(0 AS bigint), (s, x) -> s + x, s -> s)
* | SELECT reduce(array[5, 20, null, 50], 0, (s, x) -> s + x, s -> s)
* | SELECT transform(array[array[1, null, 2], array[3, null]], a -> filter(a, x -> x is not null))
* | SELECT zip_with(array['a', 'b', 'c'], array['d', 'e', 'f'], (x, y) -> concat(x, y))
```