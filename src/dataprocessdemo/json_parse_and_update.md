# SLS数据加工对Json数据解析与更新
本文档介绍对于包含Json格式字段的日志如何进行解析。

## 场景一：Json对象展开与提取

日志中包含Json对象，通过e_json进行字段展开与对象提取

**示例1: Json一层展开**
* 原始日志
```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```
* 加工规则
```python
e_json("data", depth=1)
```
* 加工结果
```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1: v1
k2: {"k3": "v3", "k4": "v4"}
```

**示例2: Json完全展开**
* 原始日志
```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```
* 加工规则
```python
e_json("data")
```
* 加工结果
```
data:{"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1:v1
k3:v3
k4:v4
```

**示例3: 指定名称精确提取Json对象**
* 原始日志
```
data: {
	"foo": {
    	"bar": "baz"
    },
    "peoples": [{
        "name": "xh",
        "sex": "girl"
    }, {
        "name": "xm",
        "sex": "boy"
    }]
}
```
* 加工规则
```python
e_json("data", jmes="foo", output="foo")
e_json("data", jmes="foo.bar", output="bar")
e_json("data", jmes="peoples[0].name", output="name")
e_json("data", jmes="peoples[*].name", output="names")
```
* 加工结果
```
data:{"foo": {"bar": "baz"}, "peoples": [{"name": "xh", "sex": "girl"}, {"name": "xm", "sex": "boy"}]}
foo:{"bar": "baz"}
bar:baz
name:xh
names:["xh", "xm"]
```

## 场景二：获取Json对象值
日志中包含Json对象，通过dct_get提取Json字段值

**示例1: Json对象包含目标字段**
* 原始日志
```
data: {"k1":"v1","k2":"v2"}
```
* 加工规则
```
e_set("key1", dct_get(v("data"), "k1"))
```
* 加工结果
```
data:{"k1": "v1", "k2": "v2"}
key1:v1
```

**示例2: Json对象不包含目标字段，设置默认值**
* 原始日志
```
data: {"k1":"v1","k2":"v2"}
```
* 加工规则
```python
e_set("key3", dct_get(v("data"), "k3", default="default"))
```
* 加工结果
```
data:{"k1": "v1", "k2": "v2"}
key3:default
```

## 场景三：更新Json字段
日志中包含Json对象，通过dct_update更新Json对象字段值
**示例1: 修改Json对象字段值**
* 原始日志
```
data: {"k1":"v1","k2":"v2"}
```
* 加工规则
```python
e_set("data", dct_update(v("data"), {"k1": "new_k1"}))
```
* 加工结果
```
data:{"k1": "new_k1", "k2": "v2"}
```

**示例2: 为Json对象增加字段**
* 原始日志
```
data: {"k1":"v1","k2":"v2"}
```
* 加工规则
```python
e_set("data", dct_update(v("data"), {"k3": "k3"}))
```
* 加工结果
```
data:{"k1": "v1", "k2": "v2", "k3": "k3"}
```

## 场景四：删除Json字段
日志中包含Json对象，通过dct_delete删除Json对象字段

**示例1:**
* 原始日志
```
data: {"k1":"v1","k2":"v2", "k3": "v3"}
```
* 加工规则
```python
e_set("data", dct_delete(v("data"), "k1", "k2"))
```
* 加工结果
```
data:{"k3": "v3"}
```

## 场景五：将值解析为Json对象

**示例1: 将字符串解析为Json对象**
* 原始日志
```
data: "pre{ \"k1\": \"v1\", \"k2\": \"v2\"}"
```
* 加工规则
```python
e_set("json_object", json_parse(op_slice(v("data"), 3, 28)))
```
* 加工结果
```
data:pre{ "k1": "v1", "k2": "v2"}
json_object:{"k1": "v1", "k2": "v2"}
```