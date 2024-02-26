# 提取字符串动态键值对
本文档介绍如何使用不同方案提取字符串键值对。

## 常用方案比较

字符串动态键值对提取分为关键字提取、值提取、关键字加工和值加工，常用方案为采用e_kv函数、e_kv_delimit函数和e_regex函数等。不同提取场景的三种方案如下：


| 方案         | 关键字提取                           | 值提取                                            | 关键字加工 | 值加工         |
| ------------ | ------------------------------------ | ------------------------------------------------- | ---------- | -------------- |
| e_kv         | 使用特定正则表达式                   | 支持默认的字符集、特定分隔符或者带(、)或（"）分隔 | 支持前后缀 | 支持文本escape |
| e_kv_delimit | 使用特定正则表达式                   | 使用分隔符                                        | 支持前后缀 | 默认无         |
| e_regex      | 组合自定义正则表达式和默认字符集过滤 | 完全自定义                                        | 自定义     | 自定义         |



大部分键值对的提取使用`e_kv`函数并配置特定参数就可以很好的满足，尤其是带括字符和反斜杠需要提取并转义时。其他复杂或高级的场景可以用`e_regex`函数来提取。部分特定场景下的键值对使用`e_kv_delemit`函数会更简单。

## 关键字提取

* 处理方法`e_kv`、`e_kv_delimit`、`e_regex`等函数在应用于关键字提取的时候都应遵循[字段名提取约束](https://help.aliyun.com/document_detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z)。



* 示例1以`k1: q=asd&a=1&b=2&__1__=3`日志为例，如果要对该格式的日志作关键字和值提取，三种方案如下：

  * e_kv函数

    * 原始日志

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```


    * 加工规则

      ```python
      #默认以特定字符集提取关键字
      e_kv("k1")
      ```


    * 加工结果

      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```

      **说明** 没有提取出关键字`__1__`是因为其不符合[字段名提取约束](https://help.aliyun.com/document_detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z)。



  * e_kv_delimit函数

    * 原始日志

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```


    * 加工规则

      ```python
      # 以&分隔键值后,用&分隔提取出关键字
      e_kv_delimit("k1", pair_sep=r"&")
      ```


    * 加工结果

      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```




  * e_regex函数

    * 原始日志

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```


    * 加工规则

      ```python
      # 自行指定字符集提取关键字和值
      e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"\1": r"\2"})
      ```


    * 加工结果
      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```



* 示例2以`content:k1=v1&k2=v2?k3:v3`为例，需要特定正则提取关键字，三种方案如下：

  * e_kv函数

    * 原始日志

		```
		content:k1=v1&k2=v2?k3:v3
		```



    * 加工规则

		```python
		e_kv("content",sep="(?:=|:)")
		```



    * 加工结果

		```
		content:k1=v1&k2=v2?k3:v3
		k1: v1
		k2: v2
		k3: v3
		```


      **说明** 给参数`pari_sep`、`kv_sep`或者`sep`传递字符集的时候，需要使用正则的不捕获分组，形式如`(?:字符集)`。



  * e_kv_delimit函数

    * 原始日志

		```
		content:k1=v1&k2=v2?k3:v3
		```



    * 加工规则

		```python
		e_kv_delimit("content",pair_sep=r"&?",kv_sep="(?:=|:)")
		```



    * 加工结果

		```
		content:k1=v1&k2=v2?k3:v3
		k1: v1
		k2: v2
		k3: v3
		```


  * e_regex函数

    * 原始日志

		```
		content:k1=v1&k2=v2?k3:v3
		```



    * 加工规则

		```python
		e_regex(
			"content",
			r"([a-zA-Z0-9]+)[=|:]([a-zA-Z0-9]+)",{r"\1": r"\2"}
		)
		```

    * 加工结果

		```
		content:k1=v1&k2=v2?k3:v3
		k1: v1
		k2: v2
		k3: v3
		```


* 示例3 对以下格式的复杂字符串，使用`e_regex`函数提取更方便。

  * 原始日志

	```
	content :"ak_id:"lxaiscW,"ak_key:"rsd7r8f
	```


  * 加工规则如果要提取字符串的关键字前有（"）符号，需要使用`e_regex`函数来提取。

	```python
	e_regex("str",r'(\w+):(\"\w+)',{r"\1":r"\2"})
	```





  * 加工结果经过DSL编排之后的日志格式：

	```
	content :"ak_id:"lxaiscW,"ak_key:"rsd7r8f
	ak_id: lxaiscW
	ak_key: rsd7r8f
	```


## 值提取

* 动态键值对之间以及关键字与值之间有明确标识，如`a=b`或`a="cxxx"`日志格式的，推荐用`e_kv`函数，示例如下。

  * 原始日志

	```
	content1:  k="helloworld",the change world, k2="good"
	```



  * 加工规则这种情况下使用e_kv函数，提取内容不包括`the change world`：

	```python
	e_kv("content1")
	# e_kv_delimit函数写法，特别注意k2前有空格，所以e_kv_delimit函数的pair_sep参数需要使用`,\s`才能正常解析，否则解析不出来k2。
	e_kv_delimit("content1",kv_sep="=", pair_sep=",\s")
	# e_regex函数写法
	e_regex("str",r"(\w+)=(\"\w+)",{r"\1": r"\2"})
	```

  * 加工结果提取后的日志为：

	```
	content1:  k="helloworld",the change world, k2="good"
	k1: helloworld
	k2: good
	```


* 对带`"`的日志格式`content:k1="v1=1"&k2=v2?k3=v3`，推荐使用`e_kv`函数进行提取，例如：

  * 原始日志

	```
	content:k1="v1=1"&k2=v2?k3=v3
	```



  * 加工规则

	```python
	e_kv("content",sep="=", quote="'")
	```



  * 加工结果处理后日志为：

	```
	content: k1='v1=1'&k2=v2?k3=v3
	k1: v1=1
	k2:v2
	k3:v3
	```


  如果使用`e_kv_delimit`函数提取，规则为`e_kv_delimit("ctx", pair_sep=r"&?", kv_sep="=")`，只能解析出`k2: v2`和`k3: v3`，因为其中第一个提取的键值对中关键字是`k1="v1`，不符合[字段名提取约束](https://help.aliyun.com/document_detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z)会被丢弃。

* 分隔符的键值对中，值包含特殊字符但没有用特定字符包括。例如：

  * 原始日志

	```
	content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
	```



  * 加工规则（推荐）使用e_kv_delimit函数比较合适。

	```python
	e_kv_delimit("content", pair_sep="|", kv_sep=" eat ")
	```

  * 加工结果（推荐）处理后日志为：

	```
	content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
	kittens:  fish, mice
	chicks:  bugs, rice
	rats:  rice, oil
	```


  * 加工规则（不推荐）使用`e_kv`函数无法解析完整。

	```python
	e_kv("f1", sep="eat")
	```

  * 加工结果（不推荐）处理后日志为：

	```
	content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
	kittens:  fish
	chicks:  bugs
	rats:  rice
	```


## 关键字加工

* `e_kv`函数和`e_kv_delimit`函数都可以通过`prefix="", suffix=""`对关键字和值进行加工。

  * 原始日志

	```
	k1: q=asd&a=1&b=2
	```



  * 加工规则

	```python
	e_kv("k1", sep="=", quote='"', prefix="start_", suffix="_end")
	e_kv_delimit("k1", pair_sep=r"&", kv_sep="=", prefix="start_", suffix="_end")
	e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"start_\1_end": r"\2"})
	```



  * 加工结果加工后的数据都是关键字加工形式，如下：

	```
	k1: q=asd&a=1&b=2
	start_q_end: asd
	start_a_end: 1
	start_b_end: 2
	```


* `e_regex`函数对关键字加工的能力更强，例如：

  * 加工规则

	```python
	e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"\1_\1": r"\2"})
	```



  * 加工结果加工后的数据都是关键字加工形式，如下：

	```
	k1: q=asd&a=1&b=2
	q_q: asd
	a_a: 1
	a_a: 2
	```


## 值加工

* 日志格式为`k1:"v1\"abc"`形式， 同时值加工的内容存在有双引号符号的情形，使用`e_kv`函数可正常进行提取，其他两种方式较难实现。

  * 原始日志

	```
	"""
	这里的\只是普通的符号，不是转义符
	"""
	content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
	```



  * 加工规则1

	```python
	e_kv("content2",sep=":", quote='"')
	```



    使用e_kv函数规则为：

  * 加工结果1提取后的日志为：

	```
	content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
	k1: v1\
	k2: v2
	k3: v3
	```

  * 加工规则2`e_kv`函数通过参数`escape`支持对`\`字符转义。例如：

	```python
	e_kv("content2",sep=":", quote='"',escape=True)
	```





  * 加工结果2提取后的日志为：

	```
	content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
	k1: v1"abc
	k2: v2
	k3: v3
	```


* 日志格式为`a='k1=k2\';k2=k3'`形式的日志，只有`e_kv`函数可以正常提取出，其他两种比较难以实现。

  * 原始日志

	```
	data: i=c10 a='k1=k2\';k2=k3'
	```



  * 加工规则1默认情况下`e_kv`函数的`escape=False`，结果为：

	```python
	e_kv("data", quote="'")
	```

  * 加工结果1提取后的日志为：

	```
	a:  k1=k2\
	i:  c10
	k2:  k3
	```

  * 加工规则2`e_kv`函数通过参数`escape`支持对`\`字符转义。例如：

	```python
	e_kv("data", quote="'", escape=True)
	```

  * 加工结果2提取后的日志为：

	```
	data: i=c10 a='k1=k2\';k2=k3'
	i: c10
	a: k1=k2';k2=k3
	```


* 键值的复杂加工。

  * 原始日志

	```
	content:  rats eat rice|chicks eat bugs|kittens eat fish|
	```



  * 加工规则使用`e_regex`函数进行加工。

	```python
	e_regex("content", r"\b(\w+) eat ([^\|]+)", {r"\1": r"\2 by \1"})
	```


  * 加工结果处理后日志为：

	```
	content:  rats eat rice|chicks eat bugs|kittens eat fish|
	kittens:  fish by kittens
	chicks:  bugs by chicks
	rats:  rice by rats
	```



## 客户案例

例如某网站日志中有一个URL数据，针对这条数据有提取需求，按照需求设计加工规则处理日志内容。

* 第一次加工

  * 需求

    * 需求1：对日志解析出`proto`、`domain`、`param`等内容。

    * 需求2：对`param`中的键值对做展开操作。



  * 原始日志

	```
	__source__:  10.43.xx.xx
	__tag__:__client_ip__:  12.120.xx.xx
	__tag__:__receive_time__:  1563517113
	__topic__:
	request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
	```


  * 加工方案

    * 总规则

		```python
		# 初步处理解析request内容
		e_regex(
			'request',
			grok("%{URIPROTO:uri_proto}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:uri_domain})?(?:%{URIPATHPARAM:uri_param})?")
		)
		# 其次处理解析uri_param
		e_regex(
			'uri_param',
			grok("%{GREEDYDATA:uri_path}\?%{GREEDYDATA:uri_query}")
		)
		# 展开kv形式
		e_kv("uri_query")
		```

    * 细分规则及对应的加工结果

      1. 使用GROK模式对字段`request`进行解析。

         也可以使用正则解析，请参见[GROK函数](https://help.aliyun.com/document_detail/125480.htm?spm=a2c4g.11186623.2.11.3cf920621wFXr7#concept-1180778)和[GROK模式参考](https://help.aliyun.com/document_detail/129387.htm?spm=a2c4g.11186623.2.12.3cf920621wFXr7#concept-1597616)。

		```python
		e_regex(
			'request',
			grok("%{URIPROTO:uri_proto}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:uri_domain})?(?:%{URIPATHPARAM:uri_param})?")
		)
		```

		对应加工结果：

		```
		uri_domain:  yz.m.sm.cn
		uri_param:  /video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
		uri_proto:  https
		```



      2. 使用GROK模式对字段`uri_param`进行解析。

		```python
		e_regex(
			'uri_param',
			grok("%{GREEDYDATA:uri_path}\?%{GREEDYDATA:uri_query}")
		)
		```

		对应加工结果：

		```
		uri_path:  /video/getlist/s
		uri_query:  ver=3.2.3&app_type=supplier&os=Android8.1.0
		```

      3. 对`uri_param`进行字段提取，具体操作如下：

		```python
		e_kv("uri_query")
		```

		对应加工结果：

		```
		app_type:  supplier
		os:  Android8.1.0
		ver:  3.2.3
		```

* 加工结果预览处理后日志：

	```
	__source__:  10.43.xx.xx
	__tag__:__client_ip__:  12.120.xx.xx
	__tag__:__receive_time__:  1563517113
	__topic__:
	request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
	uri_domain:  yz.m.sm.cn
	uri_path:  /video/getlist/s
	uri_proto:  https
	uri_query:  ver=3.2.3&app_type=supplier&os=Android8.1.0
	app_type:  supplier
	os:  Android8.1.0
	ver:  3.2.3
	```

  假如只有解析request需求，可以直接对字段`request`使用[e_kv](https://help.aliyun.com/document_detail/125488.htm?spm=a2c4g.11186623.2.13.3cf920621wFXr7#section-n3z-qjb-xpp)函数。例如：

	```python
	e_kv("request")
	```

  预览处理后日志：

	```
	__source__:  10.43.xx.xx
	__tag__:__client_ip__:  12.120.xx.xx
	__tag__:__receive_time__:  1563517113
	__topic__:
	request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
	app_type:  supplier
	os:  Android8.1.0
	ver:  3.2.3
	```

* 进一步加工客户要提取其中动态字段`ver`、`app_type`和`os`等，加工规则如下。

  * 使用正则表达式

	```python
	e_regex("url", r"\b(\w+)=([^=&]+)", {r"\1": r"\2"})
	```

  * 使用`e_kv_delmit`函数

	```python
	e_kv_delimit("url", pair_sep=r"?&")
	```

* 方案总结对于大部分URL函数形式，都可使用以上函数进行解析。但是针对原始日志中的URL形式，使用`e_kv`函数已经足够，清晰明了而且形式简单。

