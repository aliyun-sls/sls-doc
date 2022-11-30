函数概览 
=========================

本文列举SQL分析所涉及的函数与运算符。

聚合函数 
-------------------------



|                                                函数名称                                                |                        说明                        |
|----------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [arbitrary函数](./聚合函数.html#arbitrary函数)       | 返回x中任意一个非空的值。                                    |
| [avg函数](./聚合函数.html#avg函数)             | 计算x中的算术平均值。                                      |
| [bitwise_and_agg函数](./聚合函数.html#bitwise-and-agg函数) | 返回x中所有值按位与运算（AND）的结果。                            |
| [bitwise_or_agg函数](./聚合函数.html#bitwise-or-agg函数)  | 返回x中所有值按位或运算（OR）的结果。                             |
| [bool_and函数](./聚合函数.html#bool-and函数)        | 判断是否所有日志都满足条件。如果是，则返回true。 bool_and函数等同于every函数。 |
| [bool_or函数](./聚合函数.html#bool-or函数)         | 判断是否存在日志满足条件。如果存在，则返回true。                       |
| [checksum函数](./聚合函数.html#checksum函数)        | 计算x的校验和。                                         |
| [count函数](./聚合函数.html#count函数)           | 统计所有的日志条数。                                       |
| [count函数](./聚合函数.html#count函数)           | 统计所有的日志条数，等同于count(\*)。                          |
| [count函数](./聚合函数.html#count函数)           | 统计x中值不为NULL的日志条数。                                |
| [count_if函数](./聚合函数.html#count-if函数)        | 统计满足指定条件的日志条数。                                   |
| [every函数](./聚合函数.html#every函数)           | 判断是否所有日志都满足条件。如果是，则返回true。 every函数等同于bool_and函数。 |
| [geometric_mean函数](./聚合函数.html#geometric-mean函数)  | 计算x的几何平均数。                                       |
| [kurtosis函数](./聚合函数.html#kurtosis函数)        | 计算x的峰度。                                          |
| [map_union函数](./聚合函数.html#map-union函数)       | 返回一列Map数据的并集。 如果Map中存在相同的键，则返回的键值为其中任意一个键的值。     |
| [max函数](./聚合函数.html#max函数)             | 查询x中的最大值。                                        |
| [max函数](./聚合函数.html#max函数)             | 查询x中最大的n个值。返回结果为数组。                              |
| [max_by函数](./聚合函数.html#max-by函数)          | 查询y为最大值时对应的x值。                                   |
| [max_by函数](./聚合函数.html#max-by函数)          | 查询最大的n个y值对应的x值，返回结果为数组。                          |
| [min函数](./聚合函数.html#min函数)             | 查询x中最小值。                                         |
| [min函数](./聚合函数.html#min函数)             | 查询x中最小的n个值。返回结果为数组。                              |
| [min_by函数](./聚合函数.html#max-by函数)          | 查询y为最小值时对应的x值。                                   |
| [min_by函数](./聚合函数.html#max-by函数)          | 查询最小的n个y值对应的x值。返回结果为数组。                          |
| [skewness函数](./聚合函数.html#skewness函数)        | 计算x的偏度。                                          |
| [sum函数](./聚合函数.html#sum函数)             | 计算x的总值。                                          |



字符串函数 
--------------------------



|                                                  函数名称                                                   |                       说明                       |
|---------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [chr函数](./字符串函数.html#chr函数)                  | 将ASCII码转换为字符。                                  |
| [codepoint函数](./字符串函数.html#codepoint函数)            | 将字符转换为ASCII码。                                  |
| [concat函数](./字符串函数.html#concat函数)               | 将多个字符串拼接成一个字符串。                                |
| [from_utf8函数](./字符串函数.html#from-utf8函数)            | 将二进制字符串解码为UTF-8编码格式，并使用默认字符U+FFFD替换无效的UTF-8字符。 |
| [from_utf8函数](./字符串函数.html#from-utf8函数)            | 将二进制字符串解码为UTF-8编码格式，并使用自定义字符串替换无效的UTF-8字符。     |
| [length函数](./字符串函数.html#length函数)               | 计算字符串的长度。                                      |
| [levenshtein_distance函数](./字符串函数.html#levenshtein-distance函数) | 计算x和y之间的最小编辑距离。                                |
| [lower函数](./字符串函数.html#lower函数)                | 将字符串转换为小写形式。                                   |
| [lpad函数](./字符串函数.html#lpad函数)                 | 在字符串的开头填充指定字符，直到指定长度后返回结果字符串。                  |
| [ltrim函数](./字符串函数.html#ltrim函数)                | 删除字符串开头的空格。                                    |
| [normalize函数](./字符串函数.html#normalize函数)            | 使用NFC格式将字符串格式化。                                |
| [position函数](./字符串函数.html#position函数)             | 返回目标子串在字符串中的位置。                                |
| [replace函数](./字符串函数.html#replace函数)              | 将字符串中所匹配的字符替换为其他指定字符。                          |
| [replace函数](./字符串函数.html#replace函数)              | 删除字符串中匹配的字符。                                   |
| [reverse函数](./字符串函数.html#reverse函数)              | 返回反向顺序的字符串。                                    |
| [rpad函数](./字符串函数.html#rpad函数)                 | 在字符串的尾部填充指定字符，直到指定长度后返回结果字符串。                  |
| [rtrim函数](./字符串函数.html#rtrim函数)                | 删除字符串中结尾的空格。                                   |
| [split函数](./字符串函数.html#split函数)                | 使用指定的分隔符拆分字符串，并返回子串集合。                         |
| [split函数](./字符串函数.html#split函数)                | 通过指定的分隔符拆分字符串并使用limit限制字符串拆分的个数，然后返回拆分后的子串集合。  |
| [split_part函数](./字符串函数.html#split-part函数)           | 使用指定的分隔符拆分字符串，并返回指定位置的内容。                      |
| [split_to_map函数](./字符串函数.html#split-to-map函数)         | 使用指定的第一个分隔符拆分字符串，然后再使用指定的第二个分隔符进行第二次拆分。        |
| [strpos函数](./字符串函数.html#strpos函数)               | 返回目标子串在字符串中的位置。与position(sub_string in x)函数等价。 |
| [substr函数](./字符串函数.html#substr函数)               | 返回字符串中指定位置的子串，并指定子串长度。                         |
| [substr函数](./字符串函数.html#substr函数)               | 返回字符串中指定位置的子串。                                 |
| [to_utf8函数](./字符串函数.html#to-utf8函数)              | 将字符串转换为UTF-8编码格式。                              |
| [trim函数](./字符串函数.html#trim函数)                 | 删除字符串中开头和结尾的空格。                                |
| [upper函数](./字符串函数.html#upper函数)                | 将字符串转化为大写形式。                                   |



日期和时间函数 
----------------------------



|                                                   函数名称                                                    |                             说明                             |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| [current_date函数](./日期和时间函数.html#current-date函数)           | 返回当前日期。                                                    |
| [current_time函数](./日期和时间函数.html#current-time函数)           | 返回当前时间和时区。                                                 |
| [current_timestamp函数](./日期和时间函数.html#current-timestamp函数)      | 返回当前日期、时间和时区。                                              |
| [current_timezone函数](./日期和时间函数.html#current-timezone函数)       | 返回当前时区。                                                    |
| [date函数](./日期和时间函数.html#date函数)                   | 返回日期和时间表达式中的日期部分。                                          |
| [date_format函数](./日期和时间函数.html#date-format函数)            | 将timestamp类型的日期和时间表达式转化为指定格式的日期和时间表达式。                     |
| [date_parse函数](./日期和时间函数.html#date-parse函数)             | 将日期和时间字符串转换为指定格式的timestamp类型的日期和时间表达式。                     |
| [from_iso8601_date函数](./日期和时间函数.html#from-iso8601-date函数)      | 将ISO8601格式的日期表达式转化为date类型的日期表达式。                           |
| [from_iso8601_timestamp函数](./日期和时间函数.html#from-iso8601-timestamp函数) | 将ISO8601格式的日期和时间表达式转化为timestamp类型的日期和时间表达式。                |
| [from_unixtime函数](./日期和时间函数.html#from-unixtime函数)          | 将UNIX时间戳转化为无时区的timestamp类型的日期和时间表达式。                       |
| [from_unixtime函数](./日期和时间函数.html#from-unixtime函数)          | 将UNIX时间戳转化为带时区的timestamp类型的日期和时间表达式。                       |
| [from_unixtime函数](./日期和时间函数.html#from-unixtime函数)          | 将UNIX时间戳转化为带时区的timestamp类型的日期和时间表达式，其中hours和minutes为时区偏移量。 |
| [localtime函数](./日期和时间函数.html#localtime函数)              | 返回本地时间。                                                    |
| [localtimestamp函数](./日期和时间函数.html#localtimestamp函数)         | 返回本地日期和时间。                                                 |
| [now函数](./日期和时间函数.html#now函数)                    | 返回当前日期和时间。 now函数等同于current_timestamp函数。                    |
| [to_iso8601函数](./日期和时间函数.html#to-iso8601函数)             | 将date类型或timestamp类型的日期和时间表达式转换为ISO8601格式的日期和时间表达式。         |
| [to_unixtime函数](./日期和时间函数.html#to-unixtime函数)            | 将timestamp类型的日期和时间表达式转化成UNIX时间戳。                           |
| [day函数](./日期和时间函数.html#day函数)                    | 提取日期和时间表达式中的天数，按月计算。 day函数等同于day_of_month函数。               |
| [day_of_month函数](./日期和时间函数.html#day-of-month函数)           | 提取日期和时间表达式中的天数，按月计算。 day_of_month函数等同于day函数。               |
| [day_of_week函数](./日期和时间函数.html#day-of-week函数)            | 提取日期和时间表达式中的天数，按周计算。 day_of_week函数等同于dow函数。                |
| [day_of_year函数](./日期和时间函数.html#day-of-year函数)            | 提取日期和时间表达式中的天数，按年计算。 day_of_year函数等同于doy函数。                |
| [dow函数](./日期和时间函数.html#dow函数)                    | 提取日期和时间表达式中的天数，按周计算。 dow函数等同于day_of_week函数。                |
| [doy函数](./日期和时间函数.html#doy函数)                    | 提取日期和时间表达式中的天数，按年计算。 doy函数等同于day_of_year函数。                |
| [extract函数](./日期和时间函数.html#extract函数)                | 通过指定的field，提取日期和时间表达式中的日期或时间部分。                            |
| [hour函数](./日期和时间函数.html#hour函数)                   | 提取日期和时间表达式中的小时数，按24小时制计算。                                  |
| [minute函数](./日期和时间函数.html#minute函数)                 | 提取日期和时间表达式中的分钟数。                                           |
| [month函数](./日期和时间函数.html#month函数)                  | 提取日期和时间表达式中的月份。                                            |
| [quarter函数](./日期和时间函数.html#quarter函数)                | 计算目标日期所属的季度。                                               |
| [second函数](./日期和时间函数.html#second函数)                 | 提取日期和时间表达式中的秒数。                                            |
| [timezone_hour函数](./日期和时间函数.html#timezone-hour函数)          | 计算时区的小时偏移量。                                                |
| [timezone_minute函数](./日期和时间函数.html#timezone-minute函数)        | 计算时区的分钟偏移量。                                                |
| [week函数](./日期和时间函数.html#week函数)                   | 计算目标日期是在一年中的第几周。 week函数等同于week_of_year函数。                  |
| [week_of_year函数](./日期和时间函数.html#week-of-year函数)           | 计算目标日期是在一年中的第几周。 week_of_year函数等同于week函数。                  |
| [year函数](./日期和时间函数.html#year函数)                   | 提取目标日期中的年份。                                                |
| [year_of_week函数](./日期和时间函数.html#year_of_week函数)           | 提取目标日期在ISO周日历中的年份。 year_of_week函数等同于yow函数。                 |
| [yow函数](./日期和时间函数.html#)                    | 提取目标日期在ISO周日历中的年份。 yow函数等同于year_of_week函数。                 |
| [date_trunc函数](./日期和时间函数.html#date-trunc函数)             | 根据您指定的时间单位截断日期和时间表达式，并按照毫秒、秒、分钟，小时、日、月或年对齐。                |
| [date_add函数](./日期和时间函数.html#date-add函数)               | 在x上加上N个时间单位（unit）。                                         |
| [date_diff函数](./日期和时间函数.html#date-diff函数)              | 返回两个时间表达式之间的时间差值，例如计算x和y之间相差几个时间单位（unit）。                  |
| [time_series函数](./日期和时间函数.html#time-series函数)            | 补全您查询时间窗口内缺失的数据。                                           |



JSON函数 
---------------------------



|                                              函数名称                                               |                          说明                           |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| [json_array_contains函数](./JSON函数.html#json-array-contains函数) | 判断JSON数组中是否包含某个值。                                     |
| [json_array_get函数](./JSON函数.html#json-array-get函数)      | 获取JSON数组中某个下标对应的元素。                                   |
| [json_array_length函数](./JSON函数.html#json-array-length函数)   | 计算JSON数组中元素的数量。                                       |
| [json_extract函数](./JSON函数.html#json-extract函数)        | 从JSON对象或JSON数组中提取一组JSON值（数组或对象）。                      |
| [json_extract_scalar函数](./JSON函数.html#json-extract-scalar函数) | 从JSON对象或JSON数组中提取一组标量值（字符串、整数或布尔值）。类似于json_extract函数。 |
| [json_format函数](./JSON函数.html#json-format函数)         | 把JSON类型转化成字符串类型。                                      |
| [json_parse函数](./JSON函数.html#json-parse函数)          | 把字符串类型转化成JSON类型。                                      |
| [json_size函数](./JSON函数.html#json-size函数)           | 计算JSON对象或数组中元素的数量。                                    |



正则式函数 
--------------------------



|                                              函数名称                                              |                   说明                   |
|------------------------------------------------------------------------------------------------|----------------------------------------|
| [regexp_extract_all函数](/.正则式函数.html#regexp-extract-all函数) | 提取目标字符串中符合正则表达式的子串，并返回所有子串的合集。         |
| [regexp_extract_all函数](./正则式函数.html#regexp-extract-all函数) | 提取目标字符串中符合正则表达式的子串，然后返回与目标捕获组匹配的子串合集。  |
| [regexp_extract函数](./正则式函数.html#regexp-extract函数)     | 提取并返回目标字符串中符合正则表达式的第一个子串。              |
| [regexp_extract函数](./正则式函数.html#regexp-extract函数)     | 提取目标字符串中符合正则表达式的子串，然后返回与目标捕获组匹配的第一个子串。 |
| [regexp_like函数](./正则式函数.html#regexp-like函数)        | 判断目标字符串是否符合正则表达式。                      |
| [regexp_replace函数](./正则式函数.html#regexp-replace函数)     | 删除目标字符串中符合正则表达式的子串，返回未被删除的子串。          |
| [regexp_replace函数](./正则式函数.html#regexp-replace函数)     | 替换目标字符串中符合正则表达式的子串，返回被替换后的字符串。         |
| [regexp_split函数](./正则式函数.html#regexp-split函数)       | 使用正则表达式分割目标字符串，返回被分割后的子串合集。            |



同比与环比函数 
----------------------------



|                                          函数名称                                          |                                    说明                                    |
|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [compare函数](./同比和环比函数.html#compare函数)    | 对比当前时间周期内的计算结果与n秒之前时间周期内的计算结果。                                           |
| [compare函数](./同比和环比函数.html#compare函数)    | 对比当前时间周期内的计算结果与n1、n2、n3秒之前时间周期内的计算结果。                                    |
| [ts_compare函数](./同比和环比函数.html#ts-compare函数) | 对比当前时间周期内的计算结果与n秒之前时间周期内的计算结果。 **注意** ts_compare函数必须按照时间列进行分组（GROUP BY）。 |
| [ts_compare函数](./同比和环比函数.html#ts-compare函数) | 对比当前时间周期内的计算结果与n1、n2、n3秒之前时间周期内的计算结果。                                    |



数组函数和运算符 
-----------------------------



|                                            函数名称                                             |                                 说明                                  |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [下标运算符](./数组函数和运算符.html#下标运算符)             | 返回数组中的第x个元素。                                                        |
| [array_agg函数](./数组函数和运算符.html#array-agg函数)       | 以数组形式返回x中的所有值。                                                      |
| [array_distinct函数](./数组函数和运算符.html#array-distinct函数)  | 删除数组中重复的元素。                                                         |
| [array_except函数](./数组函数和运算符.html#array-except函数)    | 计算两个数组的差集。                                                          |
| [array_intersect函数](./数组函数和运算符.html#array-intersect函数) | 计算两个数组的交集。                                                          |
| [array_join函数](./数组函数和运算符.html#array-join函数)      | 使用指定的连接符将数组中的元素拼接为一个字符串。如果数组中包含null元素，则null元素将被忽略。                  |
| [array_join函数](./数组函数和运算符.html#array-join函数)      | 使用指定的连接符将数组中的元素拼接为一个字符串。如果数组中包含null元素，则null元素将被替换为null_replacement。 |
| [array_max函数](./数组函数和运算符.html#array-max函数)       | 获取数组中的最大值。                                                          |
| [array_min函数](./数组函数和运算符.html#array-min函数)       | 获取数组中的最小值。                                                          |
| [array_position函数](./数组函数和运算符.html#array-position函数)  | 获取指定元素的下标，下标从1开始。如果指定元素不存在，则返回0。                                    |
| [array_remove函数](./数组函数和运算符.html#array-remove函数)    | 删除数组中指定的元素。                                                         |
| [array_sort函数](./数组函数和运算符.html#array-sort函数)      | 对数组元素进行升序排序。如果有null元素，则null元素排在最后。                                  |
| [array_transpose函数](./数组函数和运算符.html#array-transpose函数) | 对矩阵进行转置，即提取二维数组中索引相同的元素组成一个新的二维数组。                                  |
| [array_union函数](./数组函数和运算符.html#array-union函数)     | 计算两个数组的并集。                                                          |
| [cardinality函数](./数组函数和运算符.html#cardinality函数)     | 计算数组中元素的个数。                                                         |
| [concat函数](./数组函数和运算符.html#concat函数)          | 将多个数组拼接为一个数组。                                                       |
| [contains函数](./数组函数和运算符.html#contains函数)        | 判断数组中是否包含指定元素。如果包含，则返回true。                                         |
| [element_at函数](./数组函数和运算符.html#element-at函数)      | 返回数组中的第y个元素。                                                        |
| [filter函数](./数组函数和运算符.html#filter函数)          | 结合Lambda表达式，用于过滤数组中的元素。只返回满足Lambda表达式的元素。                           |
| [flatten函数](./数组函数和运算符.html#flatten函数)         | 把将二维数组转换为一维数组。                                                      |
| [reduce函数](./数组函数和运算符.html#reduce函数)          | 根据Lambda表达式中的定义，对数组中的各个元素进行相加计算，然后返回计算结果。                           |
| [reverse函数](./数组函数和运算符.html#reverse函数)         | 对数组中的元素进行反向排列。                                                      |
| [sequence函数](./数组函数和运算符.html#sequence函数)        | 通过指定的起始值返回一个数组，其元素为起始值范围内一组连续且递增的值。递增间隔为默认值1。                       |
| [sequence函数](./数组函数和运算符.html#sequence函数)        | 通过指定的起始值返回一个数组，其元素为起始值范围内一组连续且递增的值。自定义递增间隔。                         |
| [shuffle函数](./数组函数和运算符.html#shuffle函数)         | 对数组元素进行随机排列。                                                        |
| [slice函数](./数组函数和运算符.html#slice函数)           | 获取数组的子集。                                                            |
| [transform函数](./数组函数和运算符.html#transform函数)       | 将Lambda表达式应用到数组的每个元素中。                                              |
| [zip函数](./数组函数和运算符.html#zip函数)             | 将多个数组合并为一个二维数组，且各个数组中下标相同的元素组成一个新的数组。                               |
| [zip_with函数](./数组函数和运算符.html#zip-with函数)        | 根据Lambda表达式中的定义将两个数组合并为一个数组。                                        |



Map映射函数和运算符 
--------------------------------



|                                              函数名称                                               |                              说明                              |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [下标运算符](./Map映射函数和运算符.html#下标运算符)          | 获取Map中目标键的值。                                                 |
| [cardinality函数](./Map映射函数和运算符.html#cardinality函数)  | 计算Map的大小。                                                    |
| [element_at函数](./Map映射函数和运算符.html#element-at函数)   | 获取Map中目标键的值。                                                 |
| [histogram函数](./Map映射函数和运算符.html#histogram函数)    | 对查询和分析结果进行分组，返回结果为JSON格式。                                    |
| [histogram_u函数](./Map映射函数和运算符.html#histogram-u函数)  | 对查询和分析结果进行分组，返回结果为多行多列格式。                                    |
| [map函数](./Map映射函数和运算符.html#map函数)          | 返回一个空Map。                                                    |
| [map函数](./Map映射函数和运算符.html#map函数)          | 将两个数组映射为一个Map。                                               |
| [map_agg函数](./Map映射函数和运算符.html#map-agg函数)      | 将x和y映射为一个Map。x为Map中的键，y为Map中的键值。当y存在多个值时，随机提取一个值作为键值。        |
| [map_concat函数](./Map映射函数和运算符.html#map-concat函数)   | 将多个Map合并为一个Map。                                              |
| [map_filter函数](./Map映射函数和运算符.html#map-filter函数)   | 结合Lambda表达式，用于过滤Map中的元素。                                     |
| [map_keys函数](./Map映射函数和运算符.html#map-keys函数)     | 提取Map中所有的键，并以数组形式返回。                                         |
| [map_values函数](./Map映射函数和运算符.html#map-values函数)   | 提取Map中所有键的值，并以数组形式返回。                                        |
| [multimap_agg函数](./Map映射函数和运算符.html#multimap-agg函数) | 将x和y映射为一个Map。x为Map中的键，y为Map中的键值，键值为数组格式。当y存在多个值时，提取所有的值作为键值。 |



数学计算函数 
---------------------------



|                                             函数名称                                              |                   说明                    |
|-----------------------------------------------------------------------------------------------|-----------------------------------------|
| [abs函数](./数学计算函数.html#abs函数)               | 计算x的绝对值。                                |
| [acos函数](./数学计算函数.html#acos函数)              | 计算x的反余弦。                                |
| [asin函数](./数学计算函数.html#asin函数)              | 计算x的反正弦。                                |
| [atan函数](./数学计算函数.html#atan函数)              | 计算x的反正切。                                |
| [atan2函数](./数学计算函数.html#atan2函数)             | 计算x和y相除的结果的反正切。                         |
| [cbrt函数](./数学计算函数.html#cbrt函数)              | 计算x的立方根。                                |
| [ceil函数](./数学计算函数.html#ceil函数)              | 对x进行向上取整数。 ceil函数是ceiling函数的别名。         |
| [ceiling函数](./数学计算函数.html#ceiling函数)           | 对x进行向上取整数。                              |
| [cos函数](./数学计算函数.html#cos函数)               | 计算x的余弦。                                 |
| [cosh函数](./数学计算函数.html#cosh函数)              | 计算x的双曲余弦。                               |
| [cosine_similarity函数](./数学计算函数.html#cosine-similarity函数) | 计算x和y之间的余弦相似度。                          |
| [degrees函数](./数学计算函数.html#degrees函数)           | 将弧度转换为度。                                |
| [e函数](./数学计算函数.html#e函数)                 | 返回自然底数e的值。                              |
| [exp函数](./数学计算函数.html#exp函数)               | 计算自然底数e的x次幂。                            |
| [floor函数](./数学计算函数.html#floor函数)             | 对x进行向下取整数。                              |
| [from_base函数](./数学计算函数.html#from-base函数)         | 根据BASE编码将x转为y进制的数字。                     |
| [ln函数](./数学计算函数.html#ln函数)                | 计算x的自然对数。                               |
| [infinity函数](./数学计算函数.html#infinity函数)          | 返回正无穷的数值。                               |
| [is_nan函数](./数学计算函数.html#is-nan函数)            | 判断x是否为NaN。                              |
| [log2函数](./数学计算函数.html#log2函数)              | 计算x以2为底的对数。                             |
| [log10函数](./数学计算函数.html#log10函数)             | 计算x以10为底的对数。                            |
| [log函数](./数学计算函数.html#log函数)               | 计算x以y为底的对数。                             |
| [mod函数](./数学计算函数.html#mod函数)               | 计算x与y相除的余数。                             |
| [nan函数](./数学计算函数.html#nan函数)               | 返回一个NaN值。                               |
| [pi函数](./数学计算函数.html#pi函数)                | 返回π值，精确到小数点后15位。                        |
| [pow函数](./数学计算函数.html#pow函数)               | 计算x的y次幂。 pow函数是power函数的别名。              |
| [power函数](./数学计算函数.html#power函数)             | 计算x的y次幂。                                |
| [radians函数](./数学计算函数.html#radians函数)           | 将度转换为弧度。                                |
| [rand函数](./数学计算函数.html#rand函数)              | 返回随机数。                                  |
| [random函数](./数学计算函数.html#random函数)            | 返回\[0,1)之间的随机数。                         |
| [random函数](./数学计算函数.html#random函数)            | 返回\[0,x)之间的随机数。                         |
| [round函数](./数学计算函数.html#round函数)             | 对x进行四舍五入取整数。                            |
| [round函数](./数学计算函数.html#round函数)             | 对x进行四舍五入且保留n位小数。                        |
| [sign函数](./数学计算函数.html#sign函数)              | 返回x的符号，通过1、0、-1表示。                      |
| [sin函数](./数学计算函数.html#sin函数)               | 计算x的正弦。                                 |
| [sqrt函数](./数学计算函数.html#sqrt函数)              | 计算x的平方根。                                |
| [tan函数](./数学计算函数.html#tan函数)               | 计算x的正切。                                 |
| [tanh函数](./数学计算函数.html#tanh函数)              | 计算x的双曲正切。                               |
| [to_base函数](./数学计算函数.html#to-base函数)           | 根据BASE编码将x转为y进制的字符串。                    |
| [truncate函数](./数学计算函数.html#truncate函数)          | 截断x的小数部分。                               |
| [width_bucket函数](./数学计算函数.html#width-bucket函数)      | 将一段数值范围划分成大小相同的多个Bucket，然后返回x所属的Bucket。 |
| [width_bucket函数](./数学计算函数.html#width-bucket函数)      | 使用数组指定Bucket的范围，然后返回x所属的Bucket。         |



数学统计函数 
---------------------------



|                                               函数名称                                                |                            说明                            |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| [corr函数](./数学统计函数.html#corr函数)           | 计算x和y的相关度。计算结果范围为\[0,1\]。                                |
| [covar_pop函数](./数学统计函数.html#covar-pop函数)      | 计算x和y的总体协方差。                                             |
| [covar_samp函数](./数学统计函数.html#covar-samp函数)     | 计算x和y的样本协方差。                                             |
| [regr_intercept函数](./数学统计函数.html#regr-intercept函数) | 根据输入点`(x,y)`拟合成一个线性方程，然后计算该直线的Y轴截距。 |
| [regr_slope函数](./数学统计函数.html#regr-slope函数)     | 根据输入点`(x,y)`拟合成一个线性方程，然后计算该直线的斜率。   |
| [stddev函数](./数学统计函数.html#stddev函数)         | 计算x的样本标准差。与stddev_samp函数同义。                              |
| [stddev_samp函数](./数学统计函数.html#stddev-samp函数)    | 计算x的样本标准差。                                               |
| [stddev_pop函数](./数学统计函数.html#stddev-pop函数)     | 计算x的总体标准差。                                               |
| [variance函数](./数学统计函数.html#variance函数)       | 计算x的样本方差。与var_samp函数同义。                                  |
| [var_samp函数](./数学统计函数.html#var-samp函数)       | 计算x的样本方差。                                                |
| [var_pop函数](./数学统计函数.html#var-pop函数)        | 计算x的总体方差。                                                |



类型转换函数 
---------------------------



|                                         函数名称                                         |                                                                说明                                                                |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| [cast函数](./类型转换函数.html#cast函数)     | 转换x的数据类型。 使用cast函数转换数据类型时，如果某个值转换失败，将终止整个查询与分析操作。                                                                                |
| [try_cast函数](./类型转换函数.html#try-cast函数) | 转换x的数据类型。 使用try_cast函数转换数据类型时，如果某个值转换失败，该值返回NULL，并跳过该值继续处理。 **说明** 日志中可能有脏数据，建议使用try_cast函数，避免因脏数据造成整个查询与分析操作失败。 |
| [typeof函数](./类型转换函数.html#typeof函数)   | 返回x的数据类型。                                                                                                                        |



安全检测函数 
---------------------------



|                                               函数名称                                                |     说明      |
|---------------------------------------------------------------------------------------------------|-------------|
| [security_check_ip函数](./安全检测函数.html#security-check-ip函数)     | 检查IP地址是否安全。 |
| [security_check_domain函数](./安全检测函数.html#security-check-domain函数) | 检查域名是否安全。   |
| [security_check_url函数](./安全检测函数.html#security-check-url函数)    | 检查URL是否安全。  |



窗口函数 
-------------------------



|                                           函数名称                                           |                                              说明                                               |
|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [聚合函数](./窗口函数（待处理）.html#聚合函数)           | 所有聚合函数都支持在窗口函数中使用。聚合函数列表请参见[聚合函数](./聚合函数.html)。 |
| [cume_dist函数](./窗口函数（待处理）.html#cume-dist函数)    | 统计窗口分区内各个值的累计分布。即计算窗口分区内值小于等于当前值的行数占窗口内总行数的比例。返回值范围为(0,1\]。                                   |
| [dense_rank函数](./窗口函数（待处理）.html#dense-rank函数)   | 窗口分区内值的排名。相同值拥有相同的排名，排名是连续的，例如有两个相同值的排名为1，则下一个值的排名为2。                                         |
| [ntile函数](./窗口函数（待处理）.html#ntile函数)        | 将窗口分区内数据按照顺序分成n组。                                                                             |
| [percent_rank函数](./窗口函数（待处理）.html#percent-rank函数) | 计算窗口分区内各行的百分比排名。                                                                              |
| [rank函数](./窗口函数（待处理）.html#rank函数)         | 窗口分区内值的排名。相同值拥有相同的排名，排名不是连续的，例如有两个相同值的排名为1，则下一个值的排名为3。                                        |
| [row_number函数](./窗口函数（待处理）.html#row-number函数)   | 窗口分区内值的排名。每个值拥有唯一的序号，从1开始。三个相同值的排名为1、2、3。                                                     |
| [first_value函数](./窗口函数（待处理）.html#first-value函数)  | 返回各个窗口分区内第一行的值。                                                                               |
| [last_value函数](./窗口函数（待处理）.html#last-value函数)   | 返回各个窗口分区内最后一行的值。                                                                              |
| [lag函数](./窗口函数（待处理）.html#lag函数)          | 返回窗口分区内位于当前行上方第offset行的值。如果不存在该行，则返回defaut_value。                                             |
| [lead函数](./窗口函数（待处理）.html#lead函数)         | 返回窗口分区内位于当前行下方第offset行的值。如果不存在该行，则返回defaut_value。                                             |
| [nth_value函数](./窗口函数（待处理）.html#nth-value函数)    | 返回窗口分区中第offset行的值。                                                                            |



IP函数 
-------------------------



|                                              函数名称                                               |                     说明                     |
|-------------------------------------------------------------------------------------------------|--------------------------------------------|
| [ip_to_city函数](./IP函数.html#ip-to-city函数)          | 分析目标IP地址所属城市。 返回结果为城市的中文名称。                |
| [ip_to_city函数](./IP函数.html#ip-to-city函数)          | 分析目标IP地址所属城市。 返回结果为城市的行政区划代码。              |
| [ip_to_city_geo函数](./IP函数.html#ip-to-city-geo函数)      | 分析目标IP地址所属城市的经纬度。此函数返回的是城市经纬度，每个城市只有一个经纬度。 |
| [ip_to_country函数](./IP函数.html#ip-to-country函数)       | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的中文名称。          |
| [ip_to_country函数](./IP函数.html#ip-to-country函数)       | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| [ip_to_country_code函数](./IP函数.html#ip-to-country-code函数)  | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| [ip_to_domain函数](./IP函数.html#ip-to-domain函数)        | 判断目标IP地址是内网地址还是外网地址。                       |
| [ip_to_geo函数](./IP函数.html#ip-to-geo函数)           | 分析目标IP地址所在位置的经纬度。                          |
| [ip_to_provider函数](./IP函数.html#ip-to-provider函数)      | 分析目标IP地址所对应的网络运营商。                         |
| [ip_to_province函数](./IP函数.html#ip-to-province函数)      | 分析目标IP地址所属省份州。 返回结果为省份州的中文名称。              |
| [ip_to_province函数](./IP函数.html#ip-to-province函数)      | 分析目标IP地址所属省份州。 返回结果为省份州的行政区划代码。            |
| [ip_prefix函数](./IP函数.html#ip-prefix函数)           | 获取目标IP地址的前缀。                               |
| [is_prefix_subnet_of函数](./IP函数.html#is-prefix-subnet-of函数) | 判断目标网段是否为某网段的子网。                           |
| [is_subnet_of函数](./IP函数.html#is-subnet-of函数)        | 判断目标IP地址是否在某网段内。                           |
| [ip_subnet_max函数](./IP函数.html#ip-subnet-max函数)       | 获取IP网段中的最大IP地址。                            |
| [ip_subnet_min函数](./IP函数.html#ip-subnet-min函数)       | 获取IP网段中的最小IP地址。                            |
| [ip_subnet_range函数](./IP函数.html#ip-subnet-range函数)     | 获取IP网段范围。                                  |



URL函数 
--------------------------



|                                               函数名称                                                |         说明          |
|---------------------------------------------------------------------------------------------------|---------------------|
| [url_encode函数](./URL函数.html#url-encode函数)            | 对URL进行编码。           |
| [url_decode函数](./URL函数.html#url-decode函数)            | 对URL进行解码。           |
| [url_extract_fragment函数](./URL函数.html#url-extract-fragment函数)  | 从URL中提取Fragment信息。  |
| [url_extract_host函数](./URL函数.html#url-extract-host函数)      | 从URL中提取Host信息。      |
| [url_extract_parameter函数](./URL函数.html#url-extract-parameter函数) | 从URL的查询部分中提取指定参数的值。 |
| [url_extract_path函数](./URL函数.html#url-extract-path函数)      | 从URL中提取访问路径信息。      |
| [url_extract_port函数](./URL函数.html#url-extract-port函数)      | 从URL中提取端口信息。        |
| [url_extract_protocol函数](./URL函数.html#url-extract-protocol函数)  | 从URL中提取协议信息。        |
| [url_extract_query函数](./URL函数.html#url-extract-query函数)     | 从URL中提取查询部分的信息。     |



估算函数 
-------------------------



|                                                  函数名称                                                  |                         说明                          |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [approx_distinct函数](./估算函数.html#approx-distinct函数)     | 估算x中不重复值的个数，默认存在2.3%的标准误差。                          |
| [approx_distinct函数](/估算函数.html#approx-distinct函数)     | 估算xx中不重复值的个数，支持自定义标准误差。                             |
| [approx_percentile函数](./估算函数.html#approx-percentile函数)   | 对x进行正序排列，返回大约处于percentage位置的x。                      |
| [approx_percentile函数](./估算函数.html#approx-percentile函数)   | 对x进行正序排列，返回大约处于percentage01、percentage02位置的x。       |
| [approx_percentile函数](./估算函数.html#approx-percentile函数)   | 对x和权重的乘积进行正序排列，返回大约处于percentage位置的x。                |
| [approx_percentile函数](./估算函数.html#approx-percentile函数)   | 对x和权重的乘积进行正序排列，返回大约处于percentage01、percentage02位置的x。 |
| [approx_percentile函数](./估算函数.html#approx-percentile函数)   | 对x和权重的乘积进行正序排列，返回大约处于percentage位置的x。支持设置返回结果的准确度。   |
| [numeric_histogram函数](./估算函数.html#numeric-histogram函数)   | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为JSON类型。            |
| [numeric_histogram函数](./估算函数.html#numeric-histogram函数)   | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为JSON类型。支持对x设置权重。   |
| [numeric_histogram_u函数](./估算函数.html#numeric-histogram-u函数) | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为多行多列格式。            |



二进制函数 
--------------------------



|                                              函数名称                                              |                 说明                 |
|------------------------------------------------------------------------------------------------|------------------------------------|
| [from_base64函数](./二进制函数.html#from-base64函数)        | 将BASE64编码的字符串解码为二进制类型的数据。          |
| [from_base64url函数](./二进制函数.html#from-base64url函数)     | 使用URL安全字符将BASE64编码的字符串解码为二进制类型的数据。 |
| [from_big_endian_64函数](./二进制函数.html#from-big-endian-64函数) | 将大端模式的二进制类型的数据转化成数字。               |
| [from_hex函数](./二进制函数.html#from-hex函数)           | 将十六进制类型的数据转化成二进制类型的数据。             |
| [length函数](./二进制函数.html#length函数)             | 计算二进制类型的数据的长度。                     |
| [md5函数](./二进制函数.html#md5函数)                | 对二进制类型的数据进行MD5编码。                  |
| [to_base64函数](./二进制函数.html#to-base64函数)          | 对二进制类型的数据进行BASE64编码。               |
| [to_base64url函数](./二进制函数.html#to-base64url函数)       | 使用URL安全字符将二进制类型的数据进行BASE64编码。      |
| [to_hex函数](./二进制函数.html#to-hex函数)             | 将二进制类型的数据转化成十六进制类型的数据。             |
| [to_big_endian_64函数](./二进制函数.html#to-big-endian-64函数)   | 将数字转化为大端模式的二进制类型的数据。               |
| [sha1函数](./二进制函数.html#sha1函数)               | 对二进制类型的数据进行SHA1加密。                 |
| [sha256函数](./二进制函数.html#sha256函数)             | 对二进制类型的数据进行SHA256加密。               |
| [sha512函数](./二进制函数.html#sha512函数)             | 对二进制类型的数据进行SHA512加密。               |
| [xxhash64函数](./二进制函数.html#xxhash64函数)           | 对二进制类型的数据进行xxHash64加密。             |



位运算函数 
--------------------------



|                                           函数名称                                            |         说明          |
|-------------------------------------------------------------------------------------------|---------------------|
| [bit_count函数](./位运算函数.html#bit-count函数)   | 统计x中1的个数。           |
| [bitwise_and函数](./位运算函数.html#bitwise-and函数) | 以二进制形式对x和y进行与运算。    |
| [bitwise_not函数](./位运算函数.html#bitwise-not函数) | 以二进制形式对x的所有位进行取反运算。 |
| [bitwise_or函数](./位运算函数.html#bitwise-or函数)  | 以二进制形式对x和y进行或运算。    |
| [bitwise_xor函数](./位运算函数.html#bitwise-xor函数) | 以二进制形式对x和y进行异或运算。   |



空间几何函数 
---------------------------



|                                                函数名称                                                 |                       说明                        |
|-----------------------------------------------------------------------------------------------------|-------------------------------------------------|
| [ST_AsText函数](./空间几何函数.html#st-astext函数)             | 将一个空间几何体转变为WKT格式的文本。                            |
| [ST_GeometryFromText函数](./空间几何函数.html#st-geometryfromtext函数)   | 根据输入的WKT文本构造一个空间几何体。                            |
| [ST_LineFromText函数](./空间几何函数.html#st-linefromtext函数)       | 根据输入的WKT文本构造一条线段。                               |
| [ST_Polygon函数](./空间几何函数.html#st-polygon函数)            | 根据输入的WKT文本构造一个多边形。                              |
| [ST_Point函数](./空间几何函数.html#st-point函数)              | 根据输入的WKT文本构造一个点。                                |
| [ST_Boundary函数](./空间几何函数.html#st-boundary函数)           | 返回空间几何体的边界。                                     |
| [ST_Buffer函数](./空间几何函数.html#st-buffer函数)             | 返回距离指定空间几何体一定距离的空间几何体。                          |
| [ST_Difference函数](./空间几何函数.html#st-difference函数)         | 返回两个空间几何体不同点的集合。                                |
| [ST_Envelope函数](./空间几何函数.html#st-envelope函数)           | 返回空间几何体的最小边界框。                                  |
| [ST_ExteriorRing函数](./空间几何函数.html#st-exteriorring函数)       | 返回空间几何体的外环（线段形式）。                               |
| [ST_Intersection函数](./空间几何函数.html#st-intersection函数)       | 返回两个空间几何体的交集点。                                  |
| [ST_SymDifference函数](./空间几何函数.html#st-symdifference函数)      | 返回两个空间几何体的不同点，然后组成一个新的空间几何体。                    |
| [ST_Contains函数](./空间几何函数.html#st-contains函数)           | 判断第一个空间几何体是否包含第二个空间几何体（边界可存在交集）。如果包含，则返回true。   |
| [ST_Crosses函数](./空间几何函数.html#st-crosses函数)            | 判断两个空间几何体是否存在相同的内部点。如果存在，则返回true。               |
| [ST_Disjoint函数](./空间几何函数.html#st-disjoint函数)           | 判断两个空间几何体是否没有任何交集。 如果没有，则返回true。                |
| [ST_Equals函数](./空间几何函数.html#st-equals函数)             | 判断两个空间几何体是否完全相同。如果是，则返回true。                    |
| [ST_Intersects函数](./空间几何函数.html#st-intersects函数)         | 判断两个空间几何体的平面投影是否存在共同点。如果是，则返回true。              |
| [ST_Overlaps函数](./空间几何函数.html#st-overlaps函数)           | 判断两个空间几何体的维度是否相同。如果两个空间几何体的维度相同且不是包含关系，则返回true。 |
| [ST_Relate函数](./空间几何函数.html#st-relate函数)             | 判断两个空间几何体是否相关。如果是，则返回true。                      |
| [ST_Touches函数](./空间几何函数.html#st-touches函数)            | 判断两个空间几何体是否只有边界存在关联，没有共同的内部点。如果是，则返回true。       |
| [ST_Within函数](./空间几何函数.html#st-within函数)             | 判断第一个空间几何体是否完全在第二个空间几何体内部（边界无交集）。如果是，则返回true。   |
| [ST_Area函数](./空间几何函数.html#st-area函数)               | 使用欧几里得测量法计算空间几何体在二维平面上的投影面积。                    |
| [ST_Centroid函数](./空间几何函数.html#st-centroid函数)           | 返回空间几何实体的中心点。                                   |
| [ST_CoordDim函数](./空间几何函数.html#st-coorddim函数)           | 返回空间几何体的坐标维度。                                   |
| [ST_Dimension函数](./空间几何函数.html#st-dimension函数)          | 返回空间几何实体的固有维度，必须小于或等于坐标维度。                      |
| [ST_Distance函数](./空间几何函数.html#st-distance函数)           | 计算两个空间几何体之间的最小距离。                               |
| [ST_EndPoint函数](./空间几何函数.html#st-endpoint函数)           | 返回线段中的最后一个点。                                    |
| [ST_IsClosed函数](./空间几何函数.html#st-isclosed函数)           | 判断输入的空间几何体是否封闭。如果是，则返回true。                     |
| [ST_IsEmpty函数](./空间几何函数.html#st-isempty函数)            | 判断输入的空间几何体是否为空。如果是，则返回true。                     |
| [ST_IsRing函数](./空间几何函数.html#st-isring函数)             | 判断输入的空间几何体是否为闭合的简单线段（环）。如果是，则返回true。            |
| [ST_Length函数](./空间几何函数.html#st-length函数)             | 使用欧几里得测量法计算线段的二维投影长度。如果存在多条线段，则返回所有线段的长度之和。     |
| [ST_NumPoints函数](./空间几何函数.html#st-numpoints函数)          | 返回空间几何体中点的个数。                                   |
| [ST_NumInteriorRing函数](./空间几何函数.html#st-numinteriorring函数)    | 计算空间几何体中内部环的数量。                                 |
| [ST_StartPoint函数](./空间几何函数.html#st-startpoint函数)         | 返回线段中的第一个点。                                     |
| [ST_X函数](./空间几何函数.html#st-x函数)                  | 返回输入点的第一个X轴坐标。                                  |
| [ST_XMax函数](./空间几何函数.html#st-xmax函数)               | 返回空间几何体的第一个最大的X轴坐标。                             |
| [ST_XMin函数](./空间几何函数.html#st-xmin函数)               | 返回空间几何体的第一个最小的X轴坐标。                             |
| [ST_Y函数](./空间几何函数.html#st-y函数)                  | 返回输入点的第一个Y轴坐标。                                  |
| [ST_YMax函数](./空间几何函数.html#st-ymax函数)               | 返回空间几何体的第一个最大的Y轴坐标。                             |
| [ST_YMin函数](./空间几何函数.html#st-ymin函数)               | 返回几何体的第一个最小的Y轴坐标。                               |
| [bing_tile函数](./空间几何函数.html#bing-tile函数)             | 通过X坐标、Y坐标和缩放级别构造一个Bing图块。                       |
| [bing_tile函数](./空间几何函数.html#bing-tile函数)             | 通过四叉树键构造一个Bing图块。                               |
| [bing_tile_at函数](/空间几何函数.html#bing-tile-at函数)          | 通过经纬度和缩放级别构造一个Bing图块。                           |
| [bing_tile_coordinates函数](./空间几何函数.html#bing-tile-coordinates函数) | 返回目标Bing图块对应的X坐标和Y坐标。                           |
| [bing_tile_polygon函数](./空间几何函数.html#bing-tile-polygon函数)     | 返回目标Bing图块的多边形格式。                               |
| [bing_tile_quadkey函数](./空间几何函数.html#bing-tile-quadkey函数)     | 返回目标Bing图块的四叉树键。                                |
| [bing_tile_zoom_level函数](./空间几何函数.html#bing-tile-zoom-level函数)  | 返回目标Bing图块的缩放级别。                                |



地理函数 
-------------------------



|                                         函数名称                                          |         说明         |
|---------------------------------------------------------------------------------------|--------------------|
| [geohash函数](./地理函数.html#geohash函数) | 对纬度和经度进行geohash编码。 |



颜色函数 
-------------------------



|                                       函数名称                                       |                                               说明                                               |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| [bar函数](./颜色函数.html#bar函数)    | 通过width指定整条ANSI条形图的宽度，其中该ANSI条形图的起始颜色为红色（low_color），结束颜色为绿色（high_color）。然后通过x截取其中一段ANSI条形图并返回。 |
| [bar函数](./颜色函数.html#bar函数)    | 通过width指定整条ANSI条形图的宽度，其中该ANSI条形图的起始颜色和结束颜色为自定义颜色。然后通过x截取其中一段ANSI条形图并返回。                        |
| [color函数](./颜色函数.html#color函数)  | 将颜色字符串转换为color类型。                                                                              |
| [color函数](./颜色函数.html#color函数)  | 通过判断x在low和high之间的占比指定low_color和high_color的份量，然后返回处于low_color和high_color之间的一个颜色。                |
| [color函数](./颜色函数.html#color函数)  | 通过y指定low_color和high_color的份量，然后返回处于low_color和high_color之间的一个颜色。                                |
| [render函数](./颜色函数.html#render函数) | 通过颜色渲染返回结果。布尔表达式为真时，返回绿色勾；否则返回红色叉。                                                             |
| [render函数](./颜色函数.html#render函数) | 通过自定义的颜色渲染返回结果。                                                                                |
| [rgb函数](./颜色函数.html#rgb函数)    | 通过RGB值返回一个颜色值。                                                                                 |



HyperLogLog函数 
----------------------------------



|                                            函数名称                                            |                   说明                   |
|--------------------------------------------------------------------------------------------|----------------------------------------|
| [approx_set函数](./HyperLogLog函数.html#approx-set函数)       | 估算x中不重复值的个数，最大标准误差默认为0.01625。          |
| [cardinality函数](./HyperLogLog函数.html#cardinality函数)      | 将HyperLogLog类型的内容转换为bigint类型。          |
| [empty_approx_set函数](./HyperLogLog函数.html#empty-approx-set函数) | 返回一个HyperLogLog类型的空值。最大标准误差默认为0.01625。 |
| [merge函数](./HyperLogLog函数.html#merge函数)            | 聚合计算所有的HyperLogLog值。                   |



电话号码函数 
---------------------------



|                                            函数名称                                             |      说明      |
|---------------------------------------------------------------------------------------------|--------------|
| [mobile_carrier函数](./电话号码函数.html#mobile-carrier函数)  | 分析电话号码所属运营商。 |
| [mobile_city函数](./电话号码函数.html#mobile-city函数)     | 分析电话号码所属城市。  |
| [mobile_province函数](./电话号码函数.html#mobile-province函数) | 分析电话号码所属省份。  |



比较运算符 
--------------------------



|                                           运算符                                           |             说明             |
|-----------------------------------------------------------------------------------------|----------------------------|
| [基础运算符](./比较运算符.html#基础运算符)       | 比较x和y的大小关系。如果逻辑成立，则返回true。 |
| [ALL运算符](./比较运算符.html#all运算符)      | x满足所有条件时，返回true。           |
| [ANY运算符](./比较运算符.html#any运算符)      | x满足任意一个条件时，返回true。         |
| [BETWEEN运算符](./比较运算符.html#between运算符)  | x处在y和z之间时，返回true。          |
| [DISTINCT运算符](./比较运算符.html#distinct运算符) | x不等于y时，返回true。             |
| [DISTINCT运算符](/比较运算符.html#distinct运算符) | x等于y时，返回true。              |
| [LIKE运算符](./比较运算符.html#like运算符)     | 匹配字符串中指定的字符模式。字符串区分大小写。    |
| [SOME运算符](./比较运算符.html#some运算符)     | x满足任意一个条件时，返回true。         |
| [GREATEST运算符](./比较运算符.html#greatest运算符) | 查询x、y中的最大值。                |
| [LEAST运算符](./比较运算符.html#least运算符)    | 查询x、y中的最小值。                |
| [NULL运算符](./比较运算符.html#null运算符)     | x为null时，返回true。            |
| [NULL运算符](./比较运算符.html#null运算符)     | x为不为null时，返回true。          |



逻辑运算符 
--------------------------



|                                       运算符                                        |             说明              |
|----------------------------------------------------------------------------------|-----------------------------|
| [AND运算符](./逻辑运算符.html#and运算符) | x和y的值都为true时，返回结果为true。     |
| [OR运算符](./逻辑运算符.html#or运算符)  | x和y中任意一个的值为true时，返回结果为true。 |
| [NOT运算符](./逻辑运算符.html#not运算符) | x的值为false时，返回结果为true。       |



单位换算函数 
---------------------------



|                                                 函数名称                                                 |                                          说明                                           |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [convert_data_size函数](./单位换算函数.html#convert-data-size函数)          | 对数据量单位进行换算，系统自动判断最优的换算单位，返回使用最优单位表示的数据量。返回类型为string。例如将1024 KB换算为1 MB，1024 MB换算为1 GB。 |
| [convert_data_size函数](./单位换算函数.html#convert-data-size函数)          | 对数据量单位进行换算，返回使用指定单位表示的数据量。返回类型为string。                                                |
| [format_data_size函数](./单位换算函数.html#format-data-size函数)           | 对Byte单位进行换算，返回使用指定单位表示的数据量。返回类型为string。                                               |
| [parse_data_size函数](./单位换算函数.html#parse-data-size函数)            | 对数据量单位进行换算，返回以Byte为单位的数据量。返回类型为decimal。                                               |
| [to_data_size_B函数](./单位换算函数.html#to-data-size-b函数)             | 对数据量单位进行换算，返回以Byte为单位的数据量。返回类型为double。                                                |
| [to_data_size_KB函数](./单位换算函数.html#to-data-size-kb函数)            | 对数据量单位进行换算，返回以KB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_MB函数](./单位换算函数.html#to-data-size-mb函数)            | 对数据量单位进行换算，返回以MB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_GB函数](./单位换算函数.html#to-data-size-gb函数)            | 对数据量单位进行换算，返回以GB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_TB函数](./单位换算函数.html#to-data-size-tb函数)            | 对数据量单位进行换算，返回以TB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_PB函数](./单位换算函数.html#to-data-size-pb函数)            | 对数据量单位进行换算，返回以PB为单位的数据量。返回类型为double。                                                  |
| [format_duration函数](./单位换算函数.html#format-duration函数)            | 对以秒为单位的时间间隔进行格式化，转换为可读的字符串类型。                                                         |
| [parse_duration函数](./单位换算函数.html#parse-duration函数)             | 对时间间隔进行格式化，转换为`0 00:00:00.000`格式。                                |
| [to_days函数](./单位换算函数.html#to-days函数)                    | 对时间间隔单位进行换算，转换为以天为单位的时间间隔。                                                            |
| [to_hours函数](./单位换算函数.html#to-hours函数)                   | 对时间间隔单位进行换算，转换为以小时为单位的时间间隔。                                                           |
| [to_microseconds函数](./单位换算函数.html#to-microseconds函数)            | 对时间间隔单位进行换算，转换为以微秒为单位的时间间隔。                                                           |
| [to_milliseconds函数](./单位换算函数.html#to-milliseconds函数)            | 对时间间隔单位进行换算，转换为以毫秒为单位的时间间隔。                                                           |
| [to_minutes函数](./单位换算函数.html#to-minutes函数)                 | 对时间间隔单位进行换算，转换为以分钟为单位的时间间隔。                                                           |
| [to_most_succinct_time_unit函数](./单位换算函数.html#to-most-succinct-time-unit函数) | 对时间间隔单位进行换算，系统自动判断最优的换算单位，返回使用最优单位表示的时间间隔。                                            |
| [to_nanoseconds函数](./单位换算函数.html#to-nanoseconds函数)             | 对时间间隔单位进行换算，转换为以纳秒为单位的时间间隔。                                                           |
| [to_seconds函数](./单位换算函数.html#to-seconds函数)                 | 对时间间隔单位进行换算，转换为以秒为单位的时间间隔。                                                            |



窗口漏斗函数 
---------------------------



|                                函数名称                                 |                说明                 |
|---------------------------------------------------------------------|-----------------------------------|
| [window_funnel函数](./窗口漏斗函数.html#语法) | 在滑动的时间窗口中搜索事件链并计算事件链中发生的最大连续的事件数。 |



Lambda表达式 
------------------------------

日志服务支持您在SQL分析语句中定义Lambda表达式，并将该表达式传递给指定函数，丰富函数的表达。更多信息，请参见[Lambda表达式](./Lambda表达式.html)。

条件表达式 
--------------------------



|                                          表达式                                           |                    说明                    |
|----------------------------------------------------------------------------------------|------------------------------------------|
| [CASE WHEN表达式](./条件表达式.html#case-when表达式) | 通过条件判断，对数据进行归类。                          |
| [IF表达式](./条件表达式.html#if表达式)        | 通过条件判断，对数据进行归类。                          |
| [COALESCE表达式](./条件表达式.html#coalesce表达式)  | 返回多个表达式中第一个非NULL的值。                      |
| [NULLIF表达式](./条件表达式.html#nullif表达式)    | 比较两个表达式的值是否相等。如果相等，则返回null，否则返回第一个表达式的值。 |
| [TRY表达式](./条件表达式.html#try表达式)       | 捕获异常信息，使得系统继续执行查询和分析操作。                  |


