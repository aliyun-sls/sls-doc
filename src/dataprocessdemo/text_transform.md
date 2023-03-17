# 特定格式文本数据加工

文档中的实践案例主要是根据实际工作中的工单需求产生。本文档将从工单需求，加工编排等方面介绍如何使用LOG DSL编排解决任务需求。

## 场景：非标准JSON对象转JSON展开

需要对收集的dict数据进行二次嵌套展开操作。首先将dict数据转成JSON数据，再使用`e_json`函数进行展开即可。


* 原始日志

  ```
  content: {
    'referer': '-',
    'request': 'GET /phpMyAdmin',
    'status': 404,
    'data-1': {
      'aaa': 'Mozilla',
      'bbb': 'asde'
    },
    'data-2': {
      'up_adde': '-',
      'up_host': '-'
    }
  }
  ```


* LOG DSL编排

  1. 将上述`content`数据转换成JSON格式数据。

      ```
      e_set("content_json",str_replace(ct_str(v("content")),"'",'"'))
      ```

      处理后的日志为：

		```
		content: {
			'referer': '-',
			'request': 'GET /phpMyAdmin',
			'status': 404,
			'data-1': {
				'aaa': 'Mozilla',
				'bbb': 'asde'
			},
			'data-2': {
				'up_adde': '-',
				'up_host': '-'
			}
			}
			content_json:  {
			"referer": "-",
			"request": "GET /phpMyAdmin",
			"status": 404,
			"data-1": {
				"aaa": "Mozilla",
				"bbb": "asde"
			},
			"data-2": {
				"up_adde": "-",
				"up_host": "-"
			}
		}
		```




  2. 对经过处理后的标准化的`content_json`数据进行展开。例如要展开第一层只需要设定JSON中的`depth`参数为 *1* 即可。
		```
		e_json("content_json",depth=1,fmt='full')
		```
       展开的日志为：
		```
		content_json.data-1.data-1:  {"aaa": "Mozilla", "bbb": "asde"}
		content_json.data-2.data-2:  {"up_adde": "-", "up_host": "-"}
		content_json.referer:  -
		content_json.request:  GET /phpMyAdmin
		content_json.status:  404
		```
       如果`depth`设置为 *2* ，则展开的日志为：
		```
		content_json.data-1.aaa:  Mozilla
		content_json.data-1.bbb:  asde
		content_json.data-2.up_adde:  -
		content_json.data-2.up_host:  -
		content_json.referer:  -
		content_json.request:  GET /phpMyAdmin
		content_json.status:  404
		```


  3. 综上LOG DSL规则可以如以下形式：
		```
		e_set(
			"content_json",
			str_replace(ct_str(v("content")),"'",'"')
		)
		e_json("content_json",depth=2,fmt='full')
		```


* 加工后数据 加工后的数据是按照`depth`为 *2* 处理的，具体形式如下：

	```
	content:  {
	'referer': '-',
	'request': 'GET /phpMyAdmin',
	'status': 404,
	'data-1': {
		'aaa': 'Mozilla',
		'bbb': 'asde'
	},
	'data-2': {
		'up_adde': '-',
		'up_host': '-'
	}
	}
	content_json:  {
	"referer": "-",
	"request": "GET /phpMyAdmin",
	"status": 404,
	"data-1": {
		"aaa": "Mozilla",
		"bbb": "asde"
	},
	"data-2": {
		"up_adde": "-",
		"up_host": "-"
	}
	}
	content_json.data-1.aaa:  Mozilla
	content_json.data-1.bbb:  asde
	content_json.data-2.up_adde:  -
	content_json.data-2.up_host:  -
	content_json.referer:  -
	content_json.request:  GET /phpMyAdmin
	content_json.status:  404
	```


## 其他格式文本转JSON展开

对一些非标准的JSON格式数据，如果进行展开可以通过组合规则的形式进行操作。


* 原始日志
	```
	content : {
		"pod" => {
			"name" => "crm-learning-follow-7bc48f8b6b-m6kgb"
		}, "node" => {
			"name" => "tw5"
		}, "labels" => {
			"pod-template-hash" => "7bc48f8b6b", "app" => "crm-learning-follow"
		}, "container" => {
			"name" => "crm-learning-follow"
		}, "namespace" => "testing1"
	}
	```


* LOG DSL编排

  1. 首先将日志格式转换为JSON形式，可以使用`str_logtash_config_normalize`函数进行转换，操作如下：
		```
		e_set(
			"normalize_data",
			str_logtash_config_normalize(
				v("content")
			)
		)
		```


  2. 可以使用JSON函数进行展开操作，具体如下：
		```
		e_json("normalize_data",depth=1,fmt='full')
		```


  3. 综上LOG DSL规则可以如以下形式：
		```
		e_set(
			"normalize_data",
			str_logtash_config_normalize(
				v("content")
			)
		)
		e_json(
			"normalize_data",
			depth=1,
			fmt='full'
		)
		```




* 加工后数据
	```
	content : {
	"pod" => {
		"name" => "crm-learning-follow-7bc48f8b6b-m6kgb"
	}, "node" => {
		"name" => "tw5"
	}, "labels" => {
		"pod-template-hash" => "7bc48f8b6b", "app" => "crm-learning-follow"
	}, "container" => {
		"name" => "crm-learning-follow"
	}, "namespace" => "testing1"
	}
	normalize_data:  {
	"pod": {
		"name": "crm-learning-follow-7bc48f8b6b-m6kgb"
	},
	"node": {
		"name": "tw5"
	},
	"labels": {
		"pod-template-hash": "7bc48f8b6b",
		"app": "crm-learning-follow"
	},
	"container": {
		"name": "crm-learning-follow"
	},
	"namespace": "testing1"
	}
	normalize_data.container.container:  {"name": "crm-learning-follow"}
	normalize_data.labels.labels:  {"pod-template-hash": "7bc48f8b6b", "app": "crm-learning-follow"}
	normalize_data.namespace:  testing1
	normalize_data.node.node:  {"name": "tw5"}
	normalize_data.pod.pod:  {"name": "crm-learning-follow-7bc48f8b6b-m6kgb"}
	```


## 部分文本特殊编码转换

在日常工作环境中，会遇到一些十六进制字符，需要对其解码才能正常阅读。可以使用`str_hex_escape_encode`函数对一些十六进制字符进行转义操作。


* 原始日志
	```
	content : "\xe4\xbd\xa0\xe5\xa5\xbd"
	```


* LOG DSL编排
	```
	e_set("hex_encode",str_hex_escape_encode(v("content")))
	```


* 加工后数据
	```
	content : "\xe4\xbd\xa0\xe5\xa5\xbd"
	hex_encode : "你好"
	```




## XML字段展开

在工作中会遇到各种类型数据，例如xml数据。如果要展开xml数据可以使用`xml_to_json`函数处理。


* 测试日志
	```
	str : <?xmlversion="1.0"?>
	<data>
		<countryname="Liechtenstein">
			<rank>1</rank>
			<year>2008</year>
			<gdppc>141100</gdppc>
			<neighborname="Austria"direction="E"/>
			<neighborname="Switzerland"direction="W"/>
		</country>
		<countryname="Singapore">
			<rank>4</rank>
			<year>2011</year>
			<gdppc>59900</gdppc>
			<neighborname="Malaysia"direction="N"/>
		</country>
		<countryname="Panama">
			<rank>68</rank>
			<year>2011</year>
			<gdppc>13600</gdppc>
			<neighborname="Costa Rica"direction="W"/>
			<neighborname="Colombia"direction="E"/>
		</country>
	</data>
	```



* LOG DSL编排
	```
	e_set("str_json",xml_to_json(v("str")))
	```



* 加工后的日志
	```
	str : <?xmlversion="1.0"?>
	<data>
		<countryname="Liechtenstein">
			<rank>1</rank>
			<year>2008</year>
			<gdppc>141100</gdppc>
			<neighborname="Austria"direction="E"/>
			<neighborname="Switzerland"direction="W"/>
		</country>
		<countryname="Singapore">
			<rank>4</rank>
			<year>2011</year>
			<gdppc>59900</gdppc>
			<neighborname="Malaysia"direction="N"/>
		</country>
		<countryname="Panama">
			<rank>68</rank>
			<year>2011</year>
			<gdppc>13600</gdppc>
			<neighborname="Costa Rica"direction="W"/>
			<neighborname="Colombia"direction="E"/>
		</country>
	</data>
	str_dict :{
		"data": {
			"country": [{
			"@name": "Liechtenstein",
			"rank": "1",
			"year": "2008",
			"gdppc": "141100",
			"neighbor": [{
				"@name": "Austria",
				"@direction": "E"
			}, {
				"@name": "Switzerland",
				"@direction": "W"
			}]
			}, {
			"@name": "Singapore",
			"rank": "4",
			"year": "2011",
			"gdppc": "59900",
			"neighbor": {
				"@name": "Malaysia",
				"@direction": "N"
			}
			}, {
			"@name": "Panama",
			"rank": "68",
			"year": "2011",
			"gdppc": "13600",
			"neighbor": [{
				"@name": "Costa Rica",
				"@direction": "W"
			}, {
				"@name": "Colombia",
				"@direction": "E"
			}]
			}]
		}
	}
	```
