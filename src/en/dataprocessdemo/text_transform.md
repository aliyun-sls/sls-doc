# Transform logs in specific text formats

The practice cases in this topic are based on the actual data transformation requirements submitted in tickets during daily work.This topic describes how to use LOG domain-specific language (DSL) orchestration to transform logs to meet the requirements.

## Scenario: Convert non-standard JSON objects to JSON data and expand the objects

Assume that you want to perform secondary nesting on the collected dictionary data and expand the data.You can convert the dictionary data to JSON data and then use the `e_json` function to expand the data.

- Raw log entries

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

- LOG DSL orchestration

  1. Convert data in the `content` field to the JSON format.

     ```python
     e_set("content_json",str_replace(ct_str(v("content")),"'",'"'))
     ```

     The log after processing is as follows:

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

  2. Expand the standardized `content_json` data generated after the preceding processing.Expand the standardized `content_json` data generated after the preceding processing.

     ```python
     e_json("content_json",depth=1,fmt='full')
     ```

  The log after expanding is as follows:

  ```
  content_json.data-1.data-1:  {"aaa": "Mozilla", "bbb": "asde"}
  content_json.data-2.data-2:  {"up_adde": "-", "up_host": "-"}
  content_json.referer:  -
  content_json.request:  GET /phpMyAdmin
  content_json.status:  404
  ```

setting the `depth` parameter to _2_, the following log is generated:

```
content_json.data-1.aaa:  Mozilla
content_json.data-1.bbb:  asde
content_json.data-2.up_adde:  -
content_json.data-2.up_host:  -
content_json.referer:  -
content_json.request:  GET /phpMyAdmin
content_json.status:  404
```

3. To sum up, use the following LOG DSL rules:
   ```python
   e_set(
   	"content_json",
   	str_replace(ct_str(v("content")),"'",'"')
   )
   e_json("content_json",depth=2,fmt='full')
   ```

- Log after transformation. After the log is transformed by setting the `depth` parameter to _2_, the following log is generated:

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

## Convert log data in other text formats to data in the JSON format and expand the data

To expand non-standard JSON data, you can flexibly combine rules.

- Raw log entries

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

- LOG DSL orchestration

  1. Convert the log data to data in the JSON format by using the `str_logtash_config_normalize` function.

     ```python
     e_set(
     	"normalize_data",
     	str_logtash_config_normalize(
     		v("content")
     	)
     )
     ```

  2. Use a JSON function to expand the data.

     ```python
     e_json("normalize_data",depth=1,fmt='full')
     ```

  3. To sum up, use the following LOG DSL rules:
     ```python
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

- Log after transformation.
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

## Convert text written in special encoding formats

Hexadecimal characters that are recorded in daily work need to be decoded before they can be read.Use the `str_hex_escape_encode` function to escape hexadecimal characters.

- Raw log entries

  ```
  content : "\xe4\xbd\xa0\xe5\xa5\xbd"
  ```

- LOG DSL orchestration

  ```python
  e_set("hex_encode",str_hex_escape_encode(v("content")))
  ```

- Log after transformation.
  ```
  content : "\xe4\xbd\xa0\xe5\xa5\xbd"
  hex_encode : "hello"
  ```

## Expand XML fields

You may encounter various types of data during your daily work, such as XML data.If you want to convert XML data to JSON data, you can use the `xml_to_json` function.

- Test logs

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

- LOG DSL orchestration

  ```python
  e_set("str_json",xml_to_json(v("str")))
  ```

- Post processing logs
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
