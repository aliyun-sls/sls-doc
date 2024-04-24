# Extract dynamic key-value pairs from a string

This topic describes how to extract dynamic key-value pairs from a string by using different functions.

## Functions

Extracting dynamic key-value pairs is a process that extracts and transforms keywords and values. You can use the e_kv function, e_kv_delimit function, and e_regex function to extract dynamic key-value pairs.

| Solution     | Keyword extraction                                             | Value extraction                                                                   | Keyword transformation          | Value processing      |
| ------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------- | --------------------- |
| e_kv         | Uses specific regular expressions.                             | 支 Supports the default character set and specific delimiters such as (,) and ("). | Supports prefixes and suffixes. | Supports text escape. |
| e_kv_delimit | Uses specific regular expressions.                             | Uses delimiters.                                                                   | Supports prefixes and suffixes. | Default None          |
| e_regex      | Uses custom regular expressions and the default character set. | Custom.                                                                            | Custom.                         | Custom.               |

In most cases, you can use the `e_kv` function to extract key-value pairs, especially when you need to extract and escape enclosed characters or backslashes (\).In complex scenarios, you can use the `e_regex` function to extract key-value pairs.In specific scenarios, you need to extract key-value pairs by using the `e_kv_delemit` function.

## Extract keywords

- Method. When you use the `e_kv` function, `e_kv_delimit` function, or `e_regex` function to extract keywords, the functions must comply with the extraction constraints. For more information, see [Limits on field names for extraction](https://www.alibabacloud.com/help/en/doc-detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z).

- Example 1. The following example describes three methods that you can use to extract keywords and values from the `k1: q=asd&a=1&b=2&__1__=3` log entry.

  - e_kv functions

    - Raw log entries

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```

    - Transformation rule

      ```python

      e_kv("k1")
      ```

    - Transformation result

      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```

      **Note** The keyword **1** is not extracted because it does not comply with the extraction constraints. For more information, see [Limits on field names for extraction](https://www.alibabacloud.com/help/en/doc-detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z).

  - e_kv_delimit function

    - Raw log entries

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```

    - Transformation rule

      ```python
      e_kv_delimit("k1", pair_sep=r"&")
      ```

    - Transformation result

      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```

  - e_regex function.

    - Raw log entries

      ```
      k1: q=asd&a=1&b=2&__1__=3
      ```

    - Transformation rule

      ```python
      # 自行指定字符集提取关键字和值
      e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"\1": r"\2"})
      ```

    - Transformation result
      ```
      k1: q=asd&a=1&b=2
      q: asd
      a: 1
      b: 2
      ```

- Example 2. The following example describes three methods that you can use to extract keywords from the `content:k1=v1&k2=v2?k3:v3` log entry by using regular expressions:

  - e_kv function.

    - Raw log entries

    ```
    content:k1=v1&k2=v2?k3:v3
    ```

    - Transformation rule

    ```python
    e_kv("content",sep="(?:=|:)")
    ```

    - Transformation result

    ```
    content:k1=v1&k2=v2?k3:v3
    k1: v1
    k2: v2
    k3: v3
    ```

    **Note** When the character set is passed to the `pari_sep`, `kv_sep`, or `sep` field, regular expressions that include a non-capturing group are used in the format of `(?:character set)`.

  - e_kv_delimit function.

    - Raw log entries

    ```
    content:k1=v1&k2=v2?k3:v3
    ```

    - Transformation rule

    ```python
    e_kv_delimit("content",pair_sep=r"&?",kv_sep="(?:=|:)")
    ```

    - Transformation result

    ```
    content:k1=v1&k2=v2?k3:v3
    k1: v1
    k2: v2
    k3: v3
    ```

  - e_regex function.

    - Raw log entries

    ```
    content:k1=v1&k2=v2?k3:v3
    ```

    - Transformation rule

    ```python
    e_regex(
    	"content",
    	r"([a-zA-Z0-9]+)[=|:]([a-zA-Z0-9]+)",{r"\1": r"\2"}
    )
    ```

    - Transformation result

    ```
    content:k1=v1&k2=v2?k3:v3
    k1: v1
    k2: v2
    k3: v3
    ```

- Example 3. The following example shows how to use the `e_regex` function to extract keywords from complex strings.

  - Raw log entries

  ```
  content :"ak_id:"lxaiscW,"ak_key:"rsd7r8f
  ```

  - Transformation rule. If double quotation marks (") exist in front of the keywords, you can use the `e_regex` function.

  ```python
  e_regex("str",r'(\w+):(\"\w+)',{r"\1":r"\2"})
  ```

  - Result. The log format after DSL orchestration:

  ```
  content :"ak_id:"lxaiscW,"ak_key:"rsd7r8f
  ak_id: lxaiscW
  ak_key: rsd7r8f
  ```

## Value extraction

- Use the `e_kv` function to extract values if clear identifiers exist between dynamic key-value pairs or between keywords and values, such as `a=b`, or `a="cxxx"`. Example:

  - Raw log entries

  ```
  content1:  k="helloworld",the change world, k2="good"
  ```

  - Transformation rule. In this case, the change world is not extracted.`the change world`：

  ```python
  e_kv("content1")

  e_kv_delimit("content1",kv_sep="=", pair_sep=",\s")

  e_regex("str",r"(\w+)=(\"\w+)",{r"\1": r"\2"})
  ```

  - Result. The extracted log entry:

  ```
  content1:  k="helloworld",the change world, k2="good"
  k1: helloworld
  k2: good
  ```

- To extract values from log entries that contain the " character in the `content:k1="v1=1"&k2=v2?k3=v3` format, we recommend that you use the `e_kv` function.

  - Raw log entries

  ```
  content:k1="v1=1"&k2=v2?k3=v3
  ```

  - Transformation rule

  ```python
  e_kv("content",sep="=", quote="'")
  ```

  - Result. The extracted log entry:

  ```
  content: k1='v1=1'&k2=v2?k3=v3
  k1: v1=1
  k2:v2
  k3:v3
  ```

  如 If you use the `e_kv_delimit` function to extract values and the syntax is `e_kv_delimit("ctx", pair_sep=r"&?", kv_sep="=")`, only `k2: v2` and `k3: v3` can be parsed. The keyword `k1="v1` in the first key-value pair is dropped because the keyword does not comply with the extraction constraints. For more information, see [Limits on field names for extraction](https://www.alibabacloud.com/help/en/doc-detail/129385.htm?spm=a2c4g.11186623.2.8.3cf920621wFXr7#section-sey-2kq-d1z).

- Some key-value pairs separated by delimiters contain special characters but they are not enclosed in specific characters. We recommend that you use the e_kv_delimit function to extract values from such key-value pairs.Example:

  - Raw log entries

  ```
  content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
  ```

  - (Recommended) Transformation rule. Use the e_kv_delimit function.

  ```python
  e_kv_delimit("content", pair_sep="|", kv_sep=" eat ")
  ```

  - (Recommended) Result. The parsed log entry:

  ```
  content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
  kittens:  fish, mice
  chicks:  bugs, rice
  rats:  rice, oil
  ```

  - (Not recommended) Transformation rule. If you use the `e_kv` function, some log fields cannot be parsed.

  ```python
  e_kv("f1", sep="eat")
  ```

  - (Not recommended) Result. The parsed log entry:

  ```
  content:  rats eat rice, oil|chicks eat bugs, rice|kittens eat fish, mice|
  kittens:  fish
  chicks:  bugs
  rats:  rice
  ```

## Transform keywords

- You can use the `e_kv` and `e_kv_delimit` functions to transform keywords and values by setting the prefix and suffix parameters in the format of `prefix="", suffix=""`.

  - Raw log entries

  ```
  k1: q=asd&a=1&b=2
  ```

  - Transformation rule

  ```python
  e_kv("k1", sep="=", quote='"', prefix="start_", suffix="_end")
  e_kv_delimit("k1", pair_sep=r"&", kv_sep="=", prefix="start_", suffix="_end")
  e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"start_\1_end": r"\2"})
  ```

  - Result. Log data is transformed into keywords in the following format:

  ```
  k1: q=asd&a=1&b=2
  start_q_end: asd
  start_a_end: 1
  start_b_end: 2
  ```

- `e_regex` function.You can also use the function to transform the log entry. Example:

  - Transformation rule

  ```python
  e_regex("k1",r"(\w+)=([a-zA-Z0-9]+)",{r"\1_\1": r"\2"})
  ```

  - Result. Log data is transformed into keywords in the following format:

  ```
  k1: q=asd&a=1&b=2
  q_q: asd
  a_a: 1
  a_a: 2
  ```

## Value processing

- Use the `e_kv` function if the log format is `k1:"v1\"abc"`, or double quotation marks exist in the log content. Example:

  - Raw log entries

  ```
  """
  In this example, the backlash (\) character is not an escape character.
  """
  content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
  ```

  - Transformation rule 1

  ```python
  e_kv("content2",sep=":", quote='"')
  ```

  Rule when the e_kv function is used:

  - Result 1. The extracted log entry:

  ```
  content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
  k1: v1\
  k2: v2
  k3: v3
  ```

  - Transformation rule 2. You can use the `e_kv` function to escape the `\` character by using the `escape` parameter.Example:

  ```python
  e_kv("content2",sep=":", quote='"',escape=True)
  ```

  - Result 2. The extracted log entry:

  ```
  content2:  k1:"v1\"abc", k2:"v2", k3: "v3"
  k1: v1"abc
  k2: v2
  k3: v3
  ```

- Use the `e_kv` function if the log format is `k1:"v1\"abc"`, or double quotation marks exist in the log content. Example:

  - Raw log entries

  ```
  data: i=c10 a='k1=k2\';k2=k3'
  ```

  - Transformation rule 2. You can use the `e_kv` function to escape the `\` character by using the `escape` parameter.

  ```python
  e_kv("data", quote="'")
  ```

  - Result 1. The extracted log entry:

  ```
  a:  k1=k2\
  i:  c10
  k2:  k3
  ```

  - Transformation rule 2. You can use the `e_kv` function to escape the `\` character by using the `escape` parameter.Example:

  ```python
  e_kv("data", quote="'", escape=True)
  ```

  - Transformation result 2. The extracted log entry:

  ```
  data: i=c10 a='k1=k2\';k2=k3'
  i: c10
  a: k1=k2';k2=k3
  ```

- Complex processing of key values

  - Raw log entries

  ```
  content:  rats eat rice|chicks eat bugs|kittens eat fish|
  ```

  - Transformation rule use the 'eRegex' function for processing.

  ```python
  e_regex("content", r"\b(\w+) eat ([^\|]+)", {r"\1": r"\2 by \1"})
  ```

  - Transformation result processed log :

  ```
  content:  rats eat rice|chicks eat bugs|kittens eat fish|
  kittens:  fish by kittens
  chicks:  bugs by chicks
  rats:  rice by rats
  ```
