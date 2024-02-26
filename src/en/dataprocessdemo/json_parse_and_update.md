# SLS 数据加工对 Json 数据解析与更新

本文档介绍对于包含 Json 格式字段的日志如何进行解析。

## 场景一：Json 对象展开与提取

日志中包含 Json 对象，通过 e_json 进行字段展开与对象提取

**示例 1: Json 一层展开**

- 原始日志

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```

- 加工规则

```python
e_json("data", depth=1)
```

- 加工结果

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1: v1
k2: {"k3": "v3", "k4": "v4"}
```

**示例 2: Json 完全展开**

- 原始日志

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```

- 加工规则

```python
e_json("data")
```

- 加工结果

```
data:{"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1:v1
k3:v3
k4:v4
```

**示例 3: 指定名称精确提取 Json 对象**

- 原始日志

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

- 加工规则

```python
e_json("data", jmes="foo", output="foo")
e_json("data", jmes="foo.bar", output="bar")
e_json("data", jmes="peoples[0].name", output="name")
e_json("data", jmes="peoples[*].name", output="names")
```

- 加工结果

```
data:{"foo": {"bar": "baz"}, "peoples": [{"name": "xh", "sex": "girl"}, {"name": "xm", "sex": "boy"}]}
foo:{"bar": "baz"}
bar:baz
name:xh
names:["xh", "xm"]
```

## 场景二：获取 Json 对象值

日志中包含 Json 对象，通过 dct_get 提取 Json 字段值

**示例 1: Json 对象包含目标字段**

- 原始日志

```
data: {"k1":"v1","k2":"v2"}
```

- 加工规则

```
e_set("key1", dct_get(v("data"), "k1"))
```

- 加工结果

```
data:{"k1": "v1", "k2": "v2"}
key1:v1
```

**示例 2: Json 对象不包含目标字段，设置默认值**

- 原始日志

```
data: {"k1":"v1","k2":"v2"}
```

- 加工规则

```python
e_set("key3", dct_get(v("data"), "k3", default="default"))
```

- 加工结果

```
data:{"k1": "v1", "k2": "v2"}
key3:default
```

## 场景三：更新 Json 字段

日志中包含 Json 对象，通过 dct_update 更新 Json 对象字段值
**示例 1: 修改 Json 对象字段值**

- 原始日志

```
data: {"k1":"v1","k2":"v2"}
```

- 加工规则

```python
e_set("data", dct_update(v("data"), {"k1": "new_k1"}))
```

- 加工结果

```
data:{"k1": "new_k1", "k2": "v2"}
```

**示例 2: 为 Json 对象增加字段**

- 原始日志

```
data: {"k1":"v1","k2":"v2"}
```

- 加工规则

```python
e_set("data", dct_update(v("data"), {"k3": "k3"}))
```

- 加工结果

```
data:{"k1": "v1", "k2": "v2", "k3": "k3"}
```

## 场景四：删除 Json 字段

日志中包含 Json 对象，通过 dct_delete 删除 Json 对象字段

**示例 1:**

- 原始日志

```
data: {"k1":"v1","k2":"v2", "k3": "v3"}
```

- 加工规则

```python
e_set("data", dct_delete(v("data"), "k1", "k2"))
```

- 加工结果

```
data:{"k3": "v3"}
```

## 场景五：将值解析为 Json 对象

**示例 1: 将字符串解析为 Json 对象**

- 原始日志

```
data: "pre{ \"k1\": \"v1\", \"k2\": \"v2\"}"
```

- 加工规则

```python
e_set("json_object", json_parse(op_slice(v("data"), 3, 28)))
```

- 加工结果

```
data:pre{ "k1": "v1", "k2": "v2"}
json_object:{"k1": "v1", "k2": "v2"}
```
