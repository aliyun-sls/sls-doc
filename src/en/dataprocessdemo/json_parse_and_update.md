# Use the data transformation feature to parse and update JSON data

This topic describes how to use the data transformation feature of Simple Log Service to parse and update JSON objects that are included in logs.

## Scenario 1: Expand and extract JSON objects

If a log contains JSON objects, you can use the e_json function to expand and extract an object.

**Example 1: Expand the JSON object at the first layer\*\***

- Raw log entries

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```

- Transformation rule

```python
e_json("data", depth=1)
```

- Transformation result

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1: v1
k2: {"k3": "v3", "k4": "v4"}
```

**Example 2: Expand the JSON object at each layer**

- Raw log entries

```
data: {"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
```

- Transformation rule

```python
e_json("data")
```

- Transformation result

```
data:{"k1": "v1", "k2": {"k3": "v3", "k4": "v4"}}
k1:v1
k3:v3
k4:v4
```

**Example 3: Extract a JSON object value by specifying a key**

- Raw log entries

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

- Transformation rule

```python
e_json("data", jmes="foo", output="foo")
e_json("data", jmes="foo.bar", output="bar")
e_json("data", jmes="peoples[0].name", output="name")
e_json("data", jmes="peoples[*].name", output="names")
```

- Transformation result

```
data:{"foo": {"bar": "baz"}, "peoples": [{"name": "xh", "sex": "girl"}, {"name": "xm", "sex": "boy"}]}
foo:{"bar": "baz"}
bar:baz
name:xh
names:["xh", "xm"]
```

## Scenario 2: Extract JSON object values

If a log contains JSON objects, you can use the dct_get function to extract a JSON object value.

**Example 1: A JSON object contains the required field**

- Raw log entries

```
data: {"k1":"v1","k2":"v2"}
```

- Transformation rule

```
e_set("key1", dct_get(v("data"), "k1"))
```

- Transformation result

```
data:{"k1": "v1", "k2": "v2"}
key1:v1
```

**Example 2: A JSON object does not contain the required field. Assign the default value to the key3 key**

- Raw log entries

```
data: {"k1":"v1","k2":"v2"}
```

- Transformation rule

```python
e_set("key3", dct_get(v("data"), "k3", default="default"))
```

- Transformation result

```
data:{"k1": "v1", "k2": "v2"}
key3:default
```

## Scenario 3: Update JSON object values

If a log contains JSON objects, you can use the dct_update function to update a JSON object value.
**Example 1: Change a JSON object value\*\***

- Raw log entries

```
data: {"k1":"v1","k2":"v2"}
```

- Transformation rule

```python
e_set("data", dct_update(v("data"), {"k1": "new_k1"}))
```

- Transformation result

```
data:{"k1": "new_k1", "k2": "v2"}
```

**Example 2: Add a key-value pair to a JSON object\*\***

- Raw log entries

```
data: {"k1":"v1","k2":"v2"}
```

- Transformation rule

```python
e_set("data", dct_update(v("data"), {"k3": "k3"}))
```

- Transformation result

```
data:{"k1": "v1", "k2": "v2", "k3": "k3"}
```

## Scenario 4: Delete a JSON object value

If a log contains JSON objects, you can use the dct_delete function to delete a JSON object value.

**Example 1:**

- Raw log entries

```
data: {"k1":"v1","k2":"v2", "k3": "v3"}
```

- Transformation rule

```python
e_set("data", dct_delete(v("data"), "k1", "k2"))
```

- Transformation result

```
data:{"k3": "v3"}
```

## Scenario 5: Parse a value into a JSON object

**Example 1: Parse a string into a JSON object**

- Raw log entries

```
data: "pre{ \"k1\": \"v1\", \"k2\": \"v2\"}"
```

- Transformation rule

```python
e_set("json_object", json_parse(op_slice(v("data"), 3, 28)))
```

- Transformation result

```
data:pre{ "k1": "v1", "k2": "v2"}
json_object:{"k1": "v1", "k2": "v2"}
```
