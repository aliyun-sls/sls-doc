函数概览 
=========================

本文列举SQL分析所涉及的函数与运算符。

聚合函数 
-------------------------



|                                                函数名称                                                |                        说明                        |
|----------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [arbitrary函数](t13105.html#LogService-user-guide-0103/section-q2a-3qi-wfu)       | 返回x中任意一个非空的值。                                    |
| [avg函数](t13105.html#LogService-user-guide-0103/section-r3j-gup-zms)             | 计算x中的算术平均值。                                      |
| [bitwise_and_agg函数](t13105.html#LogService-user-guide-0103/section-0zv-j94-nft) | 返回x中所有值按位与运算（AND）的结果。                            |
| [bitwise_or_agg函数](t13105.html#LogService-user-guide-0103/section-2cr-39j-c02)  | 返回x中所有值按位或运算（OR）的结果。                             |
| [bool_and函数](t13105.html#LogService-user-guide-0103/section-900-2yt-zxc)        | 判断是否所有日志都满足条件。如果是，则返回true。 bool_and函数等同于every函数。 |
| [bool_or函数](t13105.html#LogService-user-guide-0103/section-dnf-0rd-0os)         | 判断是否存在日志满足条件。如果存在，则返回true。                       |
| [checksum函数](t13105.html#LogService-user-guide-0103/section-sjk-haz-16i)        | 计算x的校验和。                                         |
| [count函数](t13105.html#LogService-user-guide-0103/section-ofd-ty2-ncw)           | 统计所有的日志条数。                                       |
| [count函数](t13105.html#LogService-user-guide-0103/section-ofd-ty2-ncw)           | 统计所有的日志条数，等同于count(\*)。                          |
| [count函数](t13105.html#LogService-user-guide-0103/section-ofd-ty2-ncw)           | 统计x中值不为NULL的日志条数。                                |
| [count_if函数](t13105.html#LogService-user-guide-0103/section-qw1-cji-2z2)        | 统计满足指定条件的日志条数。                                   |
| [every函数](t13105.html#LogService-user-guide-0103/section-2rn-9xk-cki)           | 判断是否所有日志都满足条件。如果是，则返回true。 every函数等同于bool_and函数。 |
| [geometric_mean函数](t13105.html#LogService-user-guide-0103/section-suh-69m-cem)  | 计算x的几何平均数。                                       |
| [kurtosis函数](t13105.html#LogService-user-guide-0103/section-3vu-h93-1l5)        | 计算x的峰度。                                          |
| [map_union函数](t13105.html#LogService-user-guide-0103/section-08l-16q-pml)       | 返回一列Map数据的并集。 如果Map中存在相同的键，则返回的键值为其中任意一个键的值。     |
| [max函数](t13105.html#LogService-user-guide-0103/section-vbl-gik-lpa)             | 查询x中的最大值。                                        |
| [max函数](t13105.html#LogService-user-guide-0103/section-vbl-gik-lpa)             | 查询x中最大的n个值。返回结果为数组。                              |
| [max_by函数](t13105.html#LogService-user-guide-0103/section-o9m-zik-l51)          | 查询y为最大值时对应的x值。                                   |
| [max_by函数](t13105.html#LogService-user-guide-0103/section-o9m-zik-l51)          | 查询最大的n个y值对应的x值，返回结果为数组。                          |
| [min函数](t13105.html#LogService-user-guide-0103/section-9c3-xat-3a6)             | 查询x中最小值。                                         |
| [min函数](t13105.html#LogService-user-guide-0103/section-9c3-xat-3a6)             | 查询x中最小的n个值。返回结果为数组。                              |
| [min_by函数](t13105.html#LogService-user-guide-0103/section-v7i-moo-cde)          | 查询y为最小值时对应的x值。                                   |
| [min_by函数](t13105.html#LogService-user-guide-0103/section-v7i-moo-cde)          | 查询最小的n个y值对应的x值。返回结果为数组。                          |
| [skewness函数](t13105.html#LogService-user-guide-0103/section-37y-kz6-oqo)        | 计算x的偏度。                                          |
| [sum函数](t13105.html#LogService-user-guide-0103/section-j8m-dem-alf)             | 计算x的总值。                                          |



字符串函数 
--------------------------



|                                                  函数名称                                                   |                       说明                       |
|---------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [chr函数](t13110.html#LogService-user-guide-0107/section-l91-pvq-j03)                  | 将ASCII码转换为字符。                                  |
| [codepoint函数](t13110.html#LogService-user-guide-0107/section-hgk-vyf-uz2)            | 将字符转换为ASCII码。                                  |
| [concat函数](t13110.html#LogService-user-guide-0107/section-dgb-jac-rw0)               | 将多个字符串拼接成一个字符串。                                |
| [from_utf8函数](t13110.html#LogService-user-guide-0107/section-g87-4bd-50y)            | 将二进制字符串解码为UTF-8编码格式，并使用默认字符U+FFFD替换无效的UTF-8字符。 |
| [from_utf8函数](t13110.html#LogService-user-guide-0107/section-g87-4bd-50y)            | 将二进制字符串解码为UTF-8编码格式，并使用自定义字符串替换无效的UTF-8字符。     |
| [length函数](t13110.html#LogService-user-guide-0107/section-wav-jjp-xgi)               | 计算字符串的长度。                                      |
| [levenshtein_distance函数](t13110.html#LogService-user-guide-0107/section-gjp-7y8-8hg) | 计算x和y之间的最小编辑距离。                                |
| [lower函数](t13110.html#LogService-user-guide-0107/section-zgy-780-psy)                | 将字符串转换为小写形式。                                   |
| [lpad函数](t13110.html#LogService-user-guide-0107/section-ivt-bxy-cl5)                 | 在字符串的开头填充指定字符，直到指定长度后返回结果字符串。                  |
| [ltrim函数](t13110.html#LogService-user-guide-0107/section-0ge-e6k-rmv)                | 删除字符串开头的空格。                                    |
| [normalize函数](t13110.html#LogService-user-guide-0107/section-qra-xae-qn5)            | 使用NFC格式将字符串格式化。                                |
| [position函数](t13110.html#LogService-user-guide-0107/section-0se-ywm-xaf)             | 返回目标子串在字符串中的位置。                                |
| [replace函数](t13110.html#LogService-user-guide-0107/section-zf1-rxu-ort)              | 将字符串中所匹配的字符替换为其他指定字符。                          |
| [replace函数](t13110.html#LogService-user-guide-0107/section-zf1-rxu-ort)              | 删除字符串中匹配的字符。                                   |
| [reverse函数](t13110.html#LogService-user-guide-0107/section-3wj-lky-k4s)              | 返回反向顺序的字符串。                                    |
| [rpad函数](t13110.html#LogService-user-guide-0107/section-qeb-gmh-8y9)                 | 在字符串的尾部填充指定字符，直到指定长度后返回结果字符串。                  |
| [rtrim函数](t13110.html#LogService-user-guide-0107/section-612-y7i-smx)                | 删除字符串中结尾的空格。                                   |
| [split函数](t13110.html#LogService-user-guide-0107/section-f4d-tjb-ugm)                | 使用指定的分隔符拆分字符串，并返回子串集合。                         |
| [split函数](t13110.html#LogService-user-guide-0107/section-f4d-tjb-ugm)                | 通过指定的分隔符拆分字符串并使用limit限制字符串拆分的个数，然后返回拆分后的子串集合。  |
| [split_part函数](t13110.html#LogService-user-guide-0107/section-td0-e4q-7gn)           | 使用指定的分隔符拆分字符串，并返回指定位置的内容。                      |
| [split_to_map函数](t13110.html#LogService-user-guide-0107/section-49l-i4k-ma5)         | 使用指定的第一个分隔符拆分字符串，然后再使用指定的第二个分隔符进行第二次拆分。        |
| [strpos函数](t13110.html#LogService-user-guide-0107/section-35t-r6q-pbq)               | 返回目标子串在字符串中的位置。与position(sub_string in x)函数等价。 |
| [substr函数](t13110.html#LogService-user-guide-0107/section-fiy-73z-xuu)               | 返回字符串中指定位置的子串，并指定子串长度。                         |
| [substr函数](t13110.html#LogService-user-guide-0107/section-fiy-73z-xuu)               | 返回字符串中指定位置的子串。                                 |
| [to_utf8函数](t13110.html#LogService-user-guide-0107/section-nxq-42x-fvs)              | 将字符串转换为UTF-8编码格式。                              |
| [trim函数](t13110.html#LogService-user-guide-0107/section-oze-c5t-g4z)                 | 删除字符串中开头和结尾的空格。                                |
| [upper函数](t13110.html#LogService-user-guide-0107/section-sqy-0f9-tvh)                | 将字符串转化为大写形式。                                   |



日期和时间函数 
----------------------------



|                                                   函数名称                                                    |                             说明                             |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| [current_date函数](t13111.html#LogService-user-guide-0110/section-ola-y3u-id5)           | 返回当前日期。                                                    |
| [current_time函数](t13111.html#LogService-user-guide-0110/section-lbv-xml-srx)           | 返回当前时间和时区。                                                 |
| [current_timestamp函数](t13111.html#LogService-user-guide-0110/section-2tn-eps-vo0)      | 返回当前日期、时间和时区。                                              |
| [current_timezone函数](t13111.html#LogService-user-guide-0110/section-qrn-j9k-yit)       | 返回当前时区。                                                    |
| [date函数](t13111.html#LogService-user-guide-0110/section-nvv-obo-0hp)                   | 返回日期和时间表达式中的日期部分。                                          |
| [date_format函数](t13111.html#LogService-user-guide-0110/section-0mz-vuv-not)            | 将timestamp类型的日期和时间表达式转化为指定格式的日期和时间表达式。                     |
| [date_parse函数](t13111.html#LogService-user-guide-0110/section-ztv-shl-hvx)             | 将日期和时间字符串转换为指定格式的timestamp类型的日期和时间表达式。                     |
| [from_iso8601_date函数](t13111.html#LogService-user-guide-0110/section-t5g-fki-lli)      | 将ISO8601格式的日期表达式转化为date类型的日期表达式。                           |
| [from_iso8601_timestamp函数](t13111.html#LogService-user-guide-0110/section-lvs-atp-y9q) | 将ISO8601格式的日期和时间表达式转化为timestamp类型的日期和时间表达式。                |
| [from_unixtime函数](t13111.html#LogService-user-guide-0110/section-uae-8wz-765)          | 将UNIX时间戳转化为无时区的timestamp类型的日期和时间表达式。                       |
| [from_unixtime函数](t13111.html#LogService-user-guide-0110/section-uae-8wz-765)          | 将UNIX时间戳转化为带时区的timestamp类型的日期和时间表达式。                       |
| [from_unixtime函数](t13111.html#LogService-user-guide-0110/section-uae-8wz-765)          | 将UNIX时间戳转化为带时区的timestamp类型的日期和时间表达式，其中hours和minutes为时区偏移量。 |
| [localtime函数](t13111.html#LogService-user-guide-0110/section-48i-zmu-qs7)              | 返回本地时间。                                                    |
| [localtimestamp函数](t13111.html#LogService-user-guide-0110/section-0ka-ve7-1el)         | 返回本地日期和时间。                                                 |
| [now函数](t13111.html#LogService-user-guide-0110/section-m7r-dag-yqw)                    | 返回当前日期和时间。 now函数等同于current_timestamp函数。                    |
| [to_iso8601函数](t13111.html#LogService-user-guide-0110/section-1go-qaf-acn)             | 将date类型或timestamp类型的日期和时间表达式转换为ISO8601格式的日期和时间表达式。         |
| [to_unixtime函数](t13111.html#LogService-user-guide-0110/section-u33-c1i-usu)            | 将timestamp类型的日期和时间表达式转化成UNIX时间戳。                           |
| [day函数](t13111.html#LogService-user-guide-0110/section-y88-f4w-u2q)                    | 提取日期和时间表达式中的天数，按月计算。 day函数等同于day_of_month函数。               |
| [day_of_month函数](t13111.html#LogService-user-guide-0110/section-vo3-rfu-a84)           | 提取日期和时间表达式中的天数，按月计算。 day_of_month函数等同于day函数。               |
| [day_of_week函数](t13111.html#LogService-user-guide-0110/section-gcj-wa3-17l)            | 提取日期和时间表达式中的天数，按周计算。 day_of_week函数等同于dow函数。                |
| [day_of_year函数](t13111.html#LogService-user-guide-0110/section-5zx-wss-qws)            | 提取日期和时间表达式中的天数，按年计算。 day_of_year函数等同于doy函数。                |
| [dow函数](t13111.html#LogService-user-guide-0110/section-ho3-5ym-kcr)                    | 提取日期和时间表达式中的天数，按周计算。 dow函数等同于day_of_week函数。                |
| [doy函数](t13111.html#LogService-user-guide-0110/section-bn7-y8s-d1c)                    | 提取日期和时间表达式中的天数，按年计算。 doy函数等同于day_of_year函数。                |
| [extract函数](t13111.html#LogService-user-guide-0110/section-w9t-azs-6ie)                | 通过指定的field，提取日期和时间表达式中的日期或时间部分。                            |
| [hour函数](t13111.html#LogService-user-guide-0110/section-xvw-yuy-evp)                   | 提取日期和时间表达式中的小时数，按24小时制计算。                                  |
| [minute函数](t13111.html#LogService-user-guide-0110/section-ks9-c22-n19)                 | 提取日期和时间表达式中的分钟数。                                           |
| [month函数](t13111.html#LogService-user-guide-0110/section-t36-hc2-iih)                  | 提取日期和时间表达式中的月份。                                            |
| [quarter函数](t13111.html#LogService-user-guide-0110/section-j04-hkw-f2u)                | 计算目标日期所属的季度。                                               |
| [second函数](t13111.html#LogService-user-guide-0110/section-e8r-urh-eso)                 | 提取日期和时间表达式中的秒数。                                            |
| [timezone_hour函数](t13111.html#LogService-user-guide-0110/section-4qh-mb6-cw4)          | 计算时区的小时偏移量。                                                |
| [timezone_minute函数](t13111.html#LogService-user-guide-0110/section-i1c-vxv-4xg)        | 计算时区的分钟偏移量。                                                |
| [week函数](t13111.html#LogService-user-guide-0110/section-s6o-2q9-u3k)                   | 计算目标日期是在一年中的第几周。 week函数等同于week_of_year函数。                  |
| [week_of_year函数](t13111.html#LogService-user-guide-0110/section-3bb-2zn-9jl)           | 计算目标日期是在一年中的第几周。 week_of_year函数等同于week函数。                  |
| [year函数](t13111.html#LogService-user-guide-0110/section-dxh-8i0-ghx)                   | 提取目标日期中的年份。                                                |
| [year_of_week函数](t13111.html#LogService-user-guide-0110/section-hsc-6qw-0v7)           | 提取目标日期在ISO周日历中的年份。 year_of_week函数等同于yow函数。                 |
| [yow函数](t13111.html#LogService-user-guide-0110/section-rnl-y4a-oxz)                    | 提取目标日期在ISO周日历中的年份。 yow函数等同于year_of_week函数。                 |
| [date_trunc函数](t13111.html#LogService-user-guide-0110/section-zpc-jv2-4fb)             | 根据您指定的时间单位截断日期和时间表达式，并按照毫秒、秒、分钟，小时、日、月或年对齐。                |
| [date_add函数](t13111.html#LogService-user-guide-0110/section-frx-vvh-t2b)               | 在x上加上N个时间单位（unit）。                                         |
| [date_diff函数](t13111.html#LogService-user-guide-0110/section-rx8-q9a-z3h)              | 返回两个时间表达式之间的时间差值，例如计算x和y之间相差几个时间单位（unit）。                  |
| [time_series函数](t13111.html#LogService-user-guide-0110/section-wsz-wt2-4fb)            | 补全您查询时间窗口内缺失的数据。                                           |



JSON函数 
---------------------------



|                                              函数名称                                               |                          说明                           |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| [json_array_contains函数](t13114.html#concept-afg-4lq-zdb/section-e8j-1om-8k0) | 判断JSON数组中是否包含某个值。                                     |
| [json_array_get函数](t13114.html#concept-afg-4lq-zdb/section-jjn-dv3-4y9)      | 获取JSON数组中某个下标对应的元素。                                   |
| [json_array_length函数](t13114.html#concept-afg-4lq-zdb/section-697-fqh-nng)   | 计算JSON数组中元素的数量。                                       |
| [json_extract函数](t13114.html#concept-afg-4lq-zdb/section-uqz-6yr-bun)        | 从JSON对象或JSON数组中提取一组JSON值（数组或对象）。                      |
| [json_extract_scalar函数](t13114.html#concept-afg-4lq-zdb/section-8jj-a1y-076) | 从JSON对象或JSON数组中提取一组标量值（字符串、整数或布尔值）。类似于json_extract函数。 |
| [json_format函数](t13114.html#concept-afg-4lq-zdb/section-tfz-3s3-mac)         | 把JSON类型转化成字符串类型。                                      |
| [json_parse函数](t13114.html#concept-afg-4lq-zdb/section-c1r-zzw-94y)          | 把字符串类型转化成JSON类型。                                      |
| [json_size函数](t13114.html#concept-afg-4lq-zdb/section-shf-55f-i4u)           | 计算JSON对象或数组中元素的数量。                                    |



正则式函数 
--------------------------



|                                              函数名称                                              |                   说明                   |
|------------------------------------------------------------------------------------------------|----------------------------------------|
| [regexp_extract_all函数](t13113.html#concept-v5n-nlq-zdb/section-rra-f3x-ek1) | 提取目标字符串中符合正则表达式的子串，并返回所有子串的合集。         |
| [regexp_extract_all函数](t13113.html#concept-v5n-nlq-zdb/section-rra-f3x-ek1) | 提取目标字符串中符合正则表达式的子串，然后返回与目标捕获组匹配的子串合集。  |
| [regexp_extract函数](t13113.html#concept-v5n-nlq-zdb/section-0wa-zya-8tj)     | 提取并返回目标字符串中符合正则表达式的第一个子串。              |
| [regexp_extract函数](t13113.html#concept-v5n-nlq-zdb/section-0wa-zya-8tj)     | 提取目标字符串中符合正则表达式的子串，然后返回与目标捕获组匹配的第一个子串。 |
| [regexp_like函数](t13113.html#concept-v5n-nlq-zdb/section-9jf-f8b-rd1)        | 判断目标字符串是否符合正则表达式。                      |
| [regexp_replace函数](t13113.html#concept-v5n-nlq-zdb/section-un6-0un-8l7)     | 删除目标字符串中符合正则表达式的子串，返回未被删除的子串。          |
| [regexp_replace函数](t13113.html#concept-v5n-nlq-zdb/section-un6-0un-8l7)     | 替换目标字符串中符合正则表达式的子串，返回被替换后的字符串。         |
| [regexp_split函数](t13113.html#concept-v5n-nlq-zdb/section-tn8-doo-c82)       | 使用正则表达式分割目标字符串，返回被分割后的子串合集。            |



同比与环比函数 
----------------------------



|                                          函数名称                                          |                                    说明                                    |
|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [compare函数](t16760.html#concept-ftn-3hd-p2b/section-gmx-4ja-9rz)    | 对比当前时间周期内的计算结果与n秒之前时间周期内的计算结果。                                           |
| [compare函数](t16760.html#concept-ftn-3hd-p2b/section-gmx-4ja-9rz)    | 对比当前时间周期内的计算结果与n1、n2、n3秒之前时间周期内的计算结果。                                    |
| [ts_compare函数](t16760.html#concept-ftn-3hd-p2b/section-hcx-rhd-p2b) | 对比当前时间周期内的计算结果与n秒之前时间周期内的计算结果。 **注意** ts_compare函数必须按照时间列进行分组（GROUP BY）。 |
| [ts_compare函数](t16760.html#concept-ftn-3hd-p2b/section-hcx-rhd-p2b) | 对比当前时间周期内的计算结果与n1、n2、n3秒之前时间周期内的计算结果。                                    |



数组函数和运算符 
-----------------------------



|                                            函数名称                                             |                                 说明                                  |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [下标运算符](t13124.html#concept-ymd-dmq-zdb/section-hc8-r42-4f1)             | 返回数组中的第x个元素。                                                        |
| [array_agg函数](t13124.html#concept-ymd-dmq-zdb/section-vj9-7pe-r2d)       | 以数组形式返回x中的所有值。                                                      |
| [array_distinct函数](t13124.html#concept-ymd-dmq-zdb/section-res-w0o-tyn)  | 删除数组中重复的元素。                                                         |
| [array_except函数](t13124.html#concept-ymd-dmq-zdb/section-h1n-rrz-7xn)    | 计算两个数组的差集。                                                          |
| [array_intersect函数](t13124.html#concept-ymd-dmq-zdb/section-dow-rd7-j1s) | 计算两个数组的交集。                                                          |
| [array_join函数](t13124.html#concept-ymd-dmq-zdb/section-y0i-i9z-xty)      | 使用指定的连接符将数组中的元素拼接为一个字符串。如果数组中包含null元素，则null元素将被忽略。                  |
| [array_join函数](t13124.html#concept-ymd-dmq-zdb/section-y0i-i9z-xty)      | 使用指定的连接符将数组中的元素拼接为一个字符串。如果数组中包含null元素，则null元素将被替换为null_replacement。 |
| [array_max函数](t13124.html#concept-ymd-dmq-zdb/section-g74-ifm-3y2)       | 获取数组中的最大值。                                                          |
| [array_min函数](t13124.html#concept-ymd-dmq-zdb/section-hoa-0c2-v3i)       | 获取数组中的最小值。                                                          |
| [array_position函数](t13124.html#concept-ymd-dmq-zdb/section-stg-8ts-0yz)  | 获取指定元素的下标，下标从1开始。如果指定元素不存在，则返回0。                                    |
| [array_remove函数](t13124.html#concept-ymd-dmq-zdb/section-dfv-lrb-5h4)    | 删除数组中指定的元素。                                                         |
| [array_sort函数](t13124.html#concept-ymd-dmq-zdb/section-fa7-vfh-ppe)      | 对数组元素进行升序排序。如果有null元素，则null元素排在最后。                                  |
| [array_transpose函数](t13124.html#concept-ymd-dmq-zdb/section-o88-53y-45b) | 对矩阵进行转置，即提取二维数组中索引相同的元素组成一个新的二维数组。                                  |
| [array_union函数](t13124.html#concept-ymd-dmq-zdb/section-0d8-lwf-qsb)     | 计算两个数组的并集。                                                          |
| [cardinality函数](t13124.html#concept-ymd-dmq-zdb/section-srb-gig-ruv)     | 计算数组中元素的个数。                                                         |
| [concat函数](t13124.html#concept-ymd-dmq-zdb/section-gsz-ub6-5p0)          | 将多个数组拼接为一个数组。                                                       |
| [contains函数](t13124.html#concept-ymd-dmq-zdb/section-ur1-7aw-3t1)        | 判断数组中是否包含指定元素。如果包含，则返回true。                                         |
| [element_at函数](t13124.html#concept-ymd-dmq-zdb/section-jrg-mzu-fx7)      | 返回数组中的第y个元素。                                                        |
| [filter函数](t13124.html#concept-ymd-dmq-zdb/section-oc8-co0-0ko)          | 结合Lambda表达式，用于过滤数组中的元素。只返回满足Lambda表达式的元素。                           |
| [flatten函数](t13124.html#concept-ymd-dmq-zdb/section-xr2-nyb-a70)         | 把将二维数组转换为一维数组。                                                      |
| [reduce函数](t13124.html#concept-ymd-dmq-zdb/section-2sp-yn9-lqj)          | 根据Lambda表达式中的定义，对数组中的各个元素进行相加计算，然后返回计算结果。                           |
| [reverse函数](t13124.html#concept-ymd-dmq-zdb/section-i9q-wgg-jdp)         | 对数组中的元素进行反向排列。                                                      |
| [sequence函数](t13124.html#concept-ymd-dmq-zdb/section-enw-ez1-j1q)        | 通过指定的起始值返回一个数组，其元素为起始值范围内一组连续且递增的值。递增间隔为默认值1。                       |
| [sequence函数](t13124.html#concept-ymd-dmq-zdb/section-enw-ez1-j1q)        | 通过指定的起始值返回一个数组，其元素为起始值范围内一组连续且递增的值。自定义递增间隔。                         |
| [shuffle函数](t13124.html#concept-ymd-dmq-zdb/section-rwc-c8r-3pk)         | 对数组元素进行随机排列。                                                        |
| [slice函数](t13124.html#concept-ymd-dmq-zdb/section-07i-dou-qlb)           | 获取数组的子集。                                                            |
| [transform函数](t13124.html#concept-ymd-dmq-zdb/section-898-i2g-vgz)       | 将Lambda表达式应用到数组的每个元素中。                                              |
| [zip函数](t13124.html#concept-ymd-dmq-zdb/section-pvf-bgc-91n)             | 将多个数组合并为一个二维数组，且各个数组中下标相同的元素组成一个新的数组。                               |
| [zip_with函数](t13124.html#concept-ymd-dmq-zdb/section-6to-ny5-xzj)        | 根据Lambda表达式中的定义将两个数组合并为一个数组。                                        |



Map映射函数和运算符 
--------------------------------



|                                              函数名称                                               |                              说明                              |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [下标运算符](t13106.html#LogService-user-guide-0104/section-fpn-fsd-rxh)          | 获取Map中目标键的值。                                                 |
| [cardinality函数](t13106.html#LogService-user-guide-0104/section-0nm-iy2-da2)  | 计算Map的大小。                                                    |
| [element_at函数](t13106.html#LogService-user-guide-0104/section-vfk-elr-juy)   | 获取Map中目标键的值。                                                 |
| [histogram函数](t13106.html#LogService-user-guide-0104/section-1xz-lm7-hp1)    | 对查询和分析结果进行分组，返回结果为JSON格式。                                    |
| [histogram_u函数](t13106.html#LogService-user-guide-0104/section-dif-xc9-s5s)  | 对查询和分析结果进行分组，返回结果为多行多列格式。                                    |
| [map函数](t13106.html#LogService-user-guide-0104/section-ts6-0ub-rlt)          | 返回一个空Map。                                                    |
| [map函数](t13106.html#LogService-user-guide-0104/section-ts6-0ub-rlt)          | 将两个数组映射为一个Map。                                               |
| [map_agg函数](t13106.html#LogService-user-guide-0104/section-0r1-qeq-9gs)      | 将x和y映射为一个Map。x为Map中的键，y为Map中的键值。当y存在多个值时，随机提取一个值作为键值。        |
| [map_concat函数](t13106.html#LogService-user-guide-0104/section-g30-0b6-nz0)   | 将多个Map合并为一个Map。                                              |
| [map_filter函数](t13106.html#LogService-user-guide-0104/section-zsf-pks-2v2)   | 结合Lambda表达式，用于过滤Map中的元素。                                     |
| [map_keys函数](t13106.html#LogService-user-guide-0104/section-9ou-tm9-n5g)     | 提取Map中所有的键，并以数组形式返回。                                         |
| [map_values函数](t13106.html#LogService-user-guide-0104/section-i3m-g8q-a73)   | 提取Map中所有键的值，并以数组形式返回。                                        |
| [multimap_agg函数](t13106.html#LogService-user-guide-0104/section-f21-eg3-sk1) | 将x和y映射为一个Map。x为Map中的键，y为Map中的键值，键值为数组格式。当y存在多个值时，提取所有的值作为键值。 |



数学计算函数 
---------------------------



|                                             函数名称                                              |                   说明                    |
|-----------------------------------------------------------------------------------------------|-----------------------------------------|
| [abs函数](t13109.html#concept-obh-gjq-zdb/section-i8z-xqe-edx)               | 计算x的绝对值。                                |
| [acos函数](t13109.html#concept-obh-gjq-zdb/section-kyh-0kj-sch)              | 计算x的反余弦。                                |
| [asin函数](t13109.html#concept-obh-gjq-zdb/section-9f0-fkq-4d3)              | 计算x的反正弦。                                |
| [atan函数](t13109.html#concept-obh-gjq-zdb/section-yjs-kek-rb6)              | 计算x的反正切。                                |
| [atan2函数](t13109.html#concept-obh-gjq-zdb/section-2s3-s13-eks)             | 计算x和y相除的结果的反正切。                         |
| [cbrt函数](t13109.html#concept-obh-gjq-zdb/section-yxq-jtv-d59)              | 计算x的立方根。                                |
| [ceil函数](t13109.html#concept-obh-gjq-zdb/section-mrr-q32-znp)              | 对x进行向上取整数。 ceil函数是ceiling函数的别名。         |
| [ceiling函数](t13109.html#concept-obh-gjq-zdb/section-4vb-rt6-6p0)           | 对x进行向上取整数。                              |
| [cos函数](t13109.html#concept-obh-gjq-zdb/section-i7m-cvs-fk8)               | 计算x的余弦。                                 |
| [cosh函数](t13109.html#concept-obh-gjq-zdb/section-3yg-bxw-a8f)              | 计算x的双曲余弦。                               |
| [cosine_similarity函数](t13109.html#concept-obh-gjq-zdb/section-krn-k5u-ktz) | 计算x和y之间的余弦相似度。                          |
| [degrees函数](t13109.html#concept-obh-gjq-zdb/section-i8r-8xz-x5l)           | 将弧度转换为度。                                |
| [e函数](t13109.html#concept-obh-gjq-zdb/section-y9g-hj2-acv)                 | 返回自然底数e的值。                              |
| [exp函数](t13109.html#concept-obh-gjq-zdb/section-oa5-2b2-6mv)               | 计算自然底数e的x次幂。                            |
| [floor函数](t13109.html#concept-obh-gjq-zdb/section-mpw-23r-wvg)             | 对x进行向下取整数。                              |
| [from_base函数](t13109.html#concept-obh-gjq-zdb/section-so1-v2p-k6z)         | 根据BASE编码将x转为y进制的数字。                     |
| [ln函数](t13109.html#concept-obh-gjq-zdb/section-dhi-13t-8at)                | 计算x的自然对数。                               |
| [infinity函数](t13109.html#concept-obh-gjq-zdb/section-pe3-mtw-dqz)          | 返回正无穷的数值。                               |
| [is_nan函数](t13109.html#concept-obh-gjq-zdb/section-pri-zh5-5ns)            | 判断x是否为NaN。                              |
| [log2函数](t13109.html#concept-obh-gjq-zdb/section-vm5-z6v-1it)              | 计算x以2为底的对数。                             |
| [log10函数](t13109.html#concept-obh-gjq-zdb/section-rly-n2m-cj0)             | 计算x以10为底的对数。                            |
| [log函数](t13109.html#concept-obh-gjq-zdb/section-kr0-4ia-sp4)               | 计算x以y为底的对数。                             |
| [mod函数](t13109.html#concept-obh-gjq-zdb/section-yc3-or0-js0)               | 计算x与y相除的余数。                             |
| [nan函数](t13109.html#concept-obh-gjq-zdb/section-9uk-hhu-qao)               | 返回一个NaN值。                               |
| [pi函数](t13109.html#concept-obh-gjq-zdb/section-j4w-s82-b4f)                | 返回π值，精确到小数点后15位。                        |
| [pow函数](t13109.html#concept-obh-gjq-zdb/section-57s-fvd-t2k)               | 计算x的y次幂。 pow函数是power函数的别名。              |
| [power函数](t13109.html#concept-obh-gjq-zdb/section-mol-h5g-f7r)             | 计算x的y次幂。                                |
| [radians函数](t13109.html#concept-obh-gjq-zdb/section-7gh-o8t-h2p)           | 将度转换为弧度。                                |
| [rand函数](t13109.html#concept-obh-gjq-zdb/section-gog-afn-pss)              | 返回随机数。                                  |
| [random函数](t13109.html#concept-obh-gjq-zdb/section-5uq-zst-swa)            | 返回\[0,1)之间的随机数。                         |
| [random函数](t13109.html#concept-obh-gjq-zdb/section-5uq-zst-swa)            | 返回\[0,x)之间的随机数。                         |
| [round函数](t13109.html#concept-obh-gjq-zdb/section-9wi-fmq-bae)             | 对x进行四舍五入取整数。                            |
| [round函数](t13109.html#concept-obh-gjq-zdb/section-9wi-fmq-bae)             | 对x进行四舍五入且保留n位小数。                        |
| [sign函数](t13109.html#concept-obh-gjq-zdb/section-quj-r91-z6x)              | 返回x的符号，通过1、0、-1表示。                      |
| [sin函数](t13109.html#concept-obh-gjq-zdb/section-tva-ifi-e45)               | 计算x的正弦。                                 |
| [sqrt函数](t13109.html#concept-obh-gjq-zdb/section-z3m-sui-s2x)              | 计算x的平方根。                                |
| [tan函数](t13109.html#concept-obh-gjq-zdb/section-4wm-5k6-ocr)               | 计算x的正切。                                 |
| [tanh函数](t13109.html#concept-obh-gjq-zdb/section-s70-fqp-15y)              | 计算x的双曲正切。                               |
| [to_base函数](t13109.html#concept-obh-gjq-zdb/section-wo9-323-znw)           | 根据BASE编码将x转为y进制的字符串。                    |
| [truncate函数](t13109.html#concept-obh-gjq-zdb/section-drs-jh6-0mu)          | 截断x的小数部分。                               |
| [width_bucket函数](t13109.html#concept-obh-gjq-zdb/section-2d3-6db-7bn)      | 将一段数值范围划分成大小相同的多个Bucket，然后返回x所属的Bucket。 |
| [width_bucket函数](t13109.html#concept-obh-gjq-zdb/section-2d3-6db-7bn)      | 使用数组指定Bucket的范围，然后返回x所属的Bucket。         |



数学统计函数 
---------------------------



|                                               函数名称                                                |                            说明                            |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| [corr函数](t13108.html#LogService-user-guide-0106/section-hvp-xo2-b3l)           | 计算x和y的相关度。计算结果范围为\[0,1\]。                                |
| [covar_pop函数](t13108.html#LogService-user-guide-0106/section-dvz-55i-e4p)      | 计算x和y的总体协方差。                                             |
| [covar_samp函数](t13108.html#LogService-user-guide-0106/section-4ks-738-q9q)     | 计算x和y的样本协方差。                                             |
| [regr_intercept函数](t13108.html#LogService-user-guide-0106/section-rnu-6w0-32w) | 根据输入点`(x,y)`拟合成一个线性方程，然后计算该直线的Y轴截距。 |
| [regr_slope函数](t13108.html#LogService-user-guide-0106/section-dmb-272-8gm)     | 根据输入点`(x,y)`拟合成一个线性方程，然后计算该直线的斜率。   |
| [stddev函数](t13108.html#LogService-user-guide-0106/section-lpw-ymn-ta3)         | 计算x的样本标准差。与stddev_samp函数同义。                              |
| [stddev_samp函数](t13108.html#LogService-user-guide-0106/section-z9x-07z-d4n)    | 计算x的样本标准差。                                               |
| [stddev_pop函数](t13108.html#LogService-user-guide-0106/section-4vo-h34-op2)     | 计算x的总体标准差。                                               |
| [variance函数](t13108.html#LogService-user-guide-0106/section-ts2-w02-83a)       | 计算x的样本方差。与var_samp函数同义。                                  |
| [var_samp函数](t13108.html#LogService-user-guide-0106/section-7aa-czc-fj3)       | 计算x的样本方差。                                                |
| [var_pop函数](t13108.html#LogService-user-guide-0106/section-ikh-fxc-8nb)        | 计算x的总体方差。                                                |



类型转换函数 
---------------------------



|                                         函数名称                                         |                                                                说明                                                                |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| [cast函数](t13115.html#concept-v55-4lq-zdb/section-w7c-n7h-7k0)     | 转换x的数据类型。 使用cast函数转换数据类型时，如果某个值转换失败，将终止整个查询与分析操作。                                                                                |
| [try_cast函数](t13115.html#concept-v55-4lq-zdb/section-3o5-9kg-9hc) | 转换x的数据类型。 使用try_cast函数转换数据类型时，如果某个值转换失败，该值返回NULL，并跳过该值继续处理。 **说明** 日志中可能有脏数据，建议使用try_cast函数，避免因脏数据造成整个查询与分析操作失败。 |
| [typeof函数](t13115.html#concept-v55-4lq-zdb/section-jng-3t0-izs)   | 返回x的数据类型。                                                                                                                        |



安全检测函数 
---------------------------



|                                               函数名称                                                |     说明      |
|---------------------------------------------------------------------------------------------------|-------------|
| [security_check_ip函数](t17042.html#concept-zwy-cmb-r2b/section-8c6-qr8-pwf)     | 检查IP地址是否安全。 |
| [security_check_domain函数](t17042.html#concept-zwy-cmb-r2b/section-w5v-18w-zqm) | 检查域名是否安全。   |
| [security_check_url函数](t17042.html#concept-zwy-cmb-r2b/section-jzg-nj5-gay)    | 检查URL是否安全。  |



窗口函数 
-------------------------



|                                           函数名称                                           |                                              说明                                               |
|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [聚合函数](t13118.html#concept-lqk-wlq-zdb/section-42t-cj8-nio)           | 所有聚合函数都支持在窗口函数中使用。聚合函数列表请参见[聚合函数](t13105.html#LogService-user-guide-0103)。 |
| [cume_dist函数](t13118.html#concept-lqk-wlq-zdb/section-6dk-2dm-t9u)    | 统计窗口分区内各个值的累计分布。即计算窗口分区内值小于等于当前值的行数占窗口内总行数的比例。返回值范围为(0,1\]。                                   |
| [dense_rank函数](t13118.html#concept-lqk-wlq-zdb/section-2sg-x7c-k6i)   | 窗口分区内值的排名。相同值拥有相同的排名，排名是连续的，例如有两个相同值的排名为1，则下一个值的排名为2。                                         |
| [ntile函数](t13118.html#concept-lqk-wlq-zdb/section-rbj-f90-1j7)        | 将窗口分区内数据按照顺序分成n组。                                                                             |
| [percent_rank函数](t13118.html#concept-lqk-wlq-zdb/section-1yc-nyu-obp) | 计算窗口分区内各行的百分比排名。                                                                              |
| [rank函数](t13118.html#concept-lqk-wlq-zdb/section-slw-cpg-1lp)         | 窗口分区内值的排名。相同值拥有相同的排名，排名不是连续的，例如有两个相同值的排名为1，则下一个值的排名为3。                                        |
| [row_number函数](t13118.html#concept-lqk-wlq-zdb/section-9a0-6yn-3kg)   | 窗口分区内值的排名。每个值拥有唯一的序号，从1开始。三个相同值的排名为1、2、3。                                                     |
| [first_value函数](t13118.html#concept-lqk-wlq-zdb/section-ddv-1t7-per)  | 返回各个窗口分区内第一行的值。                                                                               |
| [last_value函数](t13118.html#concept-lqk-wlq-zdb/section-rdr-pgb-fvf)   | 返回各个窗口分区内最后一行的值。                                                                              |
| [lag函数](t13118.html#concept-lqk-wlq-zdb/section-ugb-0vt-tdz)          | 返回窗口分区内位于当前行上方第offset行的值。如果不存在该行，则返回defaut_value。                                             |
| [lead函数](t13118.html#concept-lqk-wlq-zdb/section-pu9-9ch-j9k)         | 返回窗口分区内位于当前行下方第offset行的值。如果不存在该行，则返回defaut_value。                                             |
| [nth_value函数](t13118.html#concept-lqk-wlq-zdb/section-578-lim-ujg)    | 返回窗口分区中第offset行的值。                                                                            |



IP函数 
-------------------------



|                                              函数名称                                               |                     说明                     |
|-------------------------------------------------------------------------------------------------|--------------------------------------------|
| [ip_to_city函数](t13116.html#concept-wmd-slq-zdb/section-05n-xcd-8eb)          | 分析目标IP地址所属城市。 返回结果为城市的中文名称。                |
| [ip_to_city函数](t13116.html#concept-wmd-slq-zdb/section-05n-xcd-8eb)          | 分析目标IP地址所属城市。 返回结果为城市的行政区划代码。              |
| [ip_to_city_geo函数](t13116.html#concept-wmd-slq-zdb/section-0yf-b0b-dp5)      | 分析目标IP地址所属城市的经纬度。此函数返回的是城市经纬度，每个城市只有一个经纬度。 |
| [ip_to_country函数](t13116.html#concept-wmd-slq-zdb/section-w6s-rnk-fxl)       | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的中文名称。          |
| [ip_to_country函数](t13116.html#concept-wmd-slq-zdb/section-w6s-rnk-fxl)       | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| [ip_to_country_code函数](t13116.html#concept-wmd-slq-zdb/section-pjj-fxb-rri)  | 分析目标IP地址所属国家或地区。 返回结果为国家或地区的代码。            |
| [ip_to_domain函数](t13116.html#concept-wmd-slq-zdb/section-9mx-7dy-u76)        | 判断目标IP地址是内网地址还是外网地址。                       |
| [ip_to_geo函数](t13116.html#concept-wmd-slq-zdb/section-xnc-pfy-rrc)           | 分析目标IP地址所在位置的经纬度。                          |
| [ip_to_provider函数](t13116.html#concept-wmd-slq-zdb/section-71m-7ym-0zj)      | 分析目标IP地址所对应的网络运营商。                         |
| [ip_to_province函数](t13116.html#concept-wmd-slq-zdb/section-ejv-2jx-gml)      | 分析目标IP地址所属省份州。 返回结果为省份州的中文名称。              |
| [ip_to_province函数](t13116.html#concept-wmd-slq-zdb/section-ejv-2jx-gml)      | 分析目标IP地址所属省份州。 返回结果为省份州的行政区划代码。            |
| [ip_prefix函数](t13116.html#concept-wmd-slq-zdb/section-9wy-gmk-tia)           | 获取目标IP地址的前缀。                               |
| [is_prefix_subnet_of函数](t13116.html#concept-wmd-slq-zdb/section-ck5-5nd-l9h) | 判断目标网段是否为某网段的子网。                           |
| [is_subnet_of函数](t13116.html#concept-wmd-slq-zdb/section-s2i-dlr-g03)        | 判断目标IP地址是否在某网段内。                           |
| [ip_subnet_max函数](t13116.html#concept-wmd-slq-zdb/section-6e6-wj5-o1w)       | 获取IP网段中的最大IP地址。                            |
| [ip_subnet_min函数](t13116.html#concept-wmd-slq-zdb/section-8yh-yqu-dtq)       | 获取IP网段中的最小IP地址。                            |
| [ip_subnet_range函数](t13116.html#concept-wmd-slq-zdb/section-bzv-5qx-bal)     | 获取IP网段范围。                                  |



URL函数 
--------------------------



|                                               函数名称                                                |         说明          |
|---------------------------------------------------------------------------------------------------|---------------------|
| [url_encode函数](t13112.html#concept-xjz-mlq-zdb/section-ygm-6yz-yuh)            | 对URL进行编码。           |
| [url_decode函数](t13112.html#concept-xjz-mlq-zdb/section-57j-2ij-dq0)            | 对URL进行解码。           |
| [url_extract_fragment函数](t13112.html#concept-xjz-mlq-zdb/section-7ks-rmc-4ba)  | 从URL中提取Fragment信息。  |
| [url_extract_host函数](t13112.html#concept-xjz-mlq-zdb/section-uic-piy-ppb)      | 从URL中提取Host信息。      |
| [url_extract_parameter函数](t13112.html#concept-xjz-mlq-zdb/section-kmy-134-5aw) | 从URL的查询部分中提取指定参数的值。 |
| [url_extract_path函数](t13112.html#concept-xjz-mlq-zdb/section-exf-2fp-47y)      | 从URL中提取访问路径信息。      |
| [url_extract_port函数](t13112.html#concept-xjz-mlq-zdb/section-i7s-npj-l0u)      | 从URL中提取端口信息。        |
| [url_extract_protocol函数](t13112.html#concept-xjz-mlq-zdb/section-toi-z8a-3ig)  | 从URL中提取协议信息。        |
| [url_extract_query函数](t13112.html#concept-xjz-mlq-zdb/section-zsb-1xh-9kd)     | 从URL中提取查询部分的信息。     |



估算函数 
-------------------------



|                                                  函数名称                                                  |                         说明                          |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [approx_distinct函数](t13107.html#LogService-user-guide-0105/section-7e3-oue-n8d)     | 估算x中不重复值的个数，默认存在2.3%的标准误差。                          |
| [approx_distinct函数](t13107.html#LogService-user-guide-0105/section-7e3-oue-n8d)     | 估算xx中不重复值的个数，支持自定义标准误差。                             |
| [approx_percentile函数](t13107.html#LogService-user-guide-0105/section-408-f86-n42)   | 对x进行正序排列，返回大约处于percentage位置的x。                      |
| [approx_percentile函数](t13107.html#LogService-user-guide-0105/section-408-f86-n42)   | 对x进行正序排列，返回大约处于percentage01、percentage02位置的x。       |
| [approx_percentile函数](t13107.html#LogService-user-guide-0105/section-408-f86-n42)   | 对x和权重的乘积进行正序排列，返回大约处于percentage位置的x。                |
| [approx_percentile函数](t13107.html#LogService-user-guide-0105/section-408-f86-n42)   | 对x和权重的乘积进行正序排列，返回大约处于percentage01、percentage02位置的x。 |
| [approx_percentile函数](t13107.html#LogService-user-guide-0105/section-408-f86-n42)   | 对x和权重的乘积进行正序排列，返回大约处于percentage位置的x。支持设置返回结果的准确度。   |
| [numeric_histogram函数](t13107.html#LogService-user-guide-0105/section-0jv-o9t-uqn)   | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为JSON类型。            |
| [numeric_histogram函数](t13107.html#LogService-user-guide-0105/section-0jv-o9t-uqn)   | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为JSON类型。支持对x设置权重。   |
| [numeric_histogram_u函数](t13107.html#LogService-user-guide-0105/section-wkn-k1v-ejt) | 按照bucket数量（直方图列数），统计x的近似直方图，返回结果为多行多列格式。            |



二进制函数 
--------------------------



|                                              函数名称                                              |                 说明                 |
|------------------------------------------------------------------------------------------------|------------------------------------|
| [from_base64函数](t13125.html#concept-nbt-dmq-zdb/section-9og-jyd-ps0)        | 将BASE64编码的字符串解码为二进制类型的数据。          |
| [from_base64url函数](t13125.html#concept-nbt-dmq-zdb/section-w5g-8cg-djn)     | 使用URL安全字符将BASE64编码的字符串解码为二进制类型的数据。 |
| [from_big_endian_64函数](t13125.html#concept-nbt-dmq-zdb/section-oxn-3kn-a8b) | 将大端模式的二进制类型的数据转化成数字。               |
| [from_hex函数](t13125.html#concept-nbt-dmq-zdb/section-a4v-mgy-ywe)           | 将十六进制类型的数据转化成二进制类型的数据。             |
| [length函数](t13125.html#concept-nbt-dmq-zdb/section-1jc-wum-8uv)             | 计算二进制类型的数据的长度。                     |
| [md5函数](t13125.html#concept-nbt-dmq-zdb/section-jer-81l-cc9)                | 对二进制类型的数据进行MD5编码。                  |
| [to_base64函数](t13125.html#concept-nbt-dmq-zdb/section-5x1-csg-cai)          | 对二进制类型的数据进行BASE64编码。               |
| [to_base64url函数](t13125.html#concept-nbt-dmq-zdb/section-drw-fnv-c5u)       | 使用URL安全字符将二进制类型的数据进行BASE64编码。      |
| [to_hex函数](t13125.html#concept-nbt-dmq-zdb/section-xg5-lhn-jpi)             | 将二进制类型的数据转化成十六进制类型的数据。             |
| [to_big_endian_64函数](t13125.html#concept-nbt-dmq-zdb/section-nwk-fez-9sx)   | 将数字转化为大端模式的二进制类型的数据。               |
| [sha1函数](t13125.html#concept-nbt-dmq-zdb/section-t4y-j41-wvt)               | 对二进制类型的数据进行SHA1加密。                 |
| [sha256函数](t13125.html#concept-nbt-dmq-zdb/section-5fp-yu1-g0b)             | 对二进制类型的数据进行SHA256加密。               |
| [sha512函数](t13125.html#concept-nbt-dmq-zdb/section-czx-wjm-6a5)             | 对二进制类型的数据进行SHA512加密。               |
| [xxhash64函数](t13125.html#concept-nbt-dmq-zdb/section-dtj-4ze-oha)           | 对二进制类型的数据进行xxHash64加密。             |



位运算函数 
--------------------------



|                                           函数名称                                            |         说明          |
|-------------------------------------------------------------------------------------------|---------------------|
| [bit_count函数](t13126.html#reference-yml-2mq-zdb/section-aib-2nh-wyg)   | 统计x中1的个数。           |
| [bitwise_and函数](t13126.html#reference-yml-2mq-zdb/section-s2v-apf-tdu) | 以二进制形式对x和y进行与运算。    |
| [bitwise_not函数](t13126.html#reference-yml-2mq-zdb/section-nwe-g6f-mk2) | 以二进制形式对x的所有位进行取反运算。 |
| [bitwise_or函数](t13126.html#reference-yml-2mq-zdb/section-oxc-w47-xz8)  | 以二进制形式对x和y进行或运算。    |
| [bitwise_xor函数](t13126.html#reference-yml-2mq-zdb/section-9bf-ttf-aey) | 以二进制形式对x和y进行异或运算。   |



空间几何函数 
---------------------------



|                                                函数名称                                                 |                       说明                        |
|-----------------------------------------------------------------------------------------------------|-------------------------------------------------|
| [ST_AsText函数](t13132.html#reference-zbk-pmq-zdb/section-uf9-ooi-du2)             | 将一个空间几何体转变为WKT格式的文本。                            |
| [ST_GeometryFromText函数](t13132.html#reference-zbk-pmq-zdb/section-48m-m4j-06b)   | 根据输入的WKT文本构造一个空间几何体。                            |
| [ST_LineFromText函数](t13132.html#reference-zbk-pmq-zdb/section-8m7-og8-h4e)       | 根据输入的WKT文本构造一条线段。                               |
| [ST_Polygon函数](t13132.html#reference-zbk-pmq-zdb/section-cm1-cek-75m)            | 根据输入的WKT文本构造一个多边形。                              |
| [ST_Point函数](t13132.html#reference-zbk-pmq-zdb/section-rlo-dkw-8bj)              | 根据输入的WKT文本构造一个点。                                |
| [ST_Boundary函数](t13132.html#reference-zbk-pmq-zdb/section-bot-4rj-c7w)           | 返回空间几何体的边界。                                     |
| [ST_Buffer函数](t13132.html#reference-zbk-pmq-zdb/section-f6n-liv-3xh)             | 返回距离指定空间几何体一定距离的空间几何体。                          |
| [ST_Difference函数](t13132.html#reference-zbk-pmq-zdb/section-dqo-a0n-w1f)         | 返回两个空间几何体不同点的集合。                                |
| [ST_Envelope函数](t13132.html#reference-zbk-pmq-zdb/section-qcu-yqo-xo7)           | 返回空间几何体的最小边界框。                                  |
| [ST_ExteriorRing函数](t13132.html#reference-zbk-pmq-zdb/section-5e0-e34-uct)       | 返回空间几何体的外环（线段形式）。                               |
| [ST_Intersection函数](t13132.html#reference-zbk-pmq-zdb/section-whq-rb9-eo4)       | 返回两个空间几何体的交集点。                                  |
| [ST_SymDifference函数](t13132.html#reference-zbk-pmq-zdb/section-5ym-66t-xom)      | 返回两个空间几何体的不同点，然后组成一个新的空间几何体。                    |
| [ST_Contains函数](t13132.html#reference-zbk-pmq-zdb/section-bwh-0yi-d6k)           | 判断第一个空间几何体是否包含第二个空间几何体（边界可存在交集）。如果包含，则返回true。   |
| [ST_Crosses函数](t13132.html#reference-zbk-pmq-zdb/section-3dz-03v-q35)            | 判断两个空间几何体是否存在相同的内部点。如果存在，则返回true。               |
| [ST_Disjoint函数](t13132.html#reference-zbk-pmq-zdb/section-b65-y0a-140)           | 判断两个空间几何体是否没有任何交集。 如果没有，则返回true。                |
| [ST_Equals函数](t13132.html#reference-zbk-pmq-zdb/section-8do-nhl-2uh)             | 判断两个空间几何体是否完全相同。如果是，则返回true。                    |
| [ST_Intersects函数](t13132.html#reference-zbk-pmq-zdb/section-l5z-7sj-s8l)         | 判断两个空间几何体的平面投影是否存在共同点。如果是，则返回true。              |
| [ST_Overlaps函数](t13132.html#reference-zbk-pmq-zdb/section-htm-799-jbx)           | 判断两个空间几何体的维度是否相同。如果两个空间几何体的维度相同且不是包含关系，则返回true。 |
| [ST_Relate函数](t13132.html#reference-zbk-pmq-zdb/section-euf-ym7-sg7)             | 判断两个空间几何体是否相关。如果是，则返回true。                      |
| [ST_Touches函数](t13132.html#reference-zbk-pmq-zdb/section-akl-aqy-hmu)            | 判断两个空间几何体是否只有边界存在关联，没有共同的内部点。如果是，则返回true。       |
| [ST_Within函数](t13132.html#reference-zbk-pmq-zdb/section-1cr-ecg-owu)             | 判断第一个空间几何体是否完全在第二个空间几何体内部（边界无交集）。如果是，则返回true。   |
| [ST_Area函数](t13132.html#reference-zbk-pmq-zdb/section-8s0-ka8-0os)               | 使用欧几里得测量法计算空间几何体在二维平面上的投影面积。                    |
| [ST_Centroid函数](t13132.html#reference-zbk-pmq-zdb/section-ge2-pko-nu9)           | 返回空间几何实体的中心点。                                   |
| [ST_CoordDim函数](t13132.html#reference-zbk-pmq-zdb/section-nqn-1a7-z02)           | 返回空间几何体的坐标维度。                                   |
| [ST_Dimension函数](t13132.html#reference-zbk-pmq-zdb/section-vtn-hlz-pqn)          | 返回空间几何实体的固有维度，必须小于或等于坐标维度。                      |
| [ST_Distance函数](t13132.html#reference-zbk-pmq-zdb/section-qk5-p6p-406)           | 计算两个空间几何体之间的最小距离。                               |
| [ST_EndPoint函数](t13132.html#reference-zbk-pmq-zdb/section-vod-0jn-1by)           | 返回线段中的最后一个点。                                    |
| [ST_IsClosed函数](t13132.html#reference-zbk-pmq-zdb/section-gp6-nhp-wf6)           | 判断输入的空间几何体是否封闭。如果是，则返回true。                     |
| [ST_IsEmpty函数](t13132.html#reference-zbk-pmq-zdb/section-w0e-bpe-zdt)            | 判断输入的空间几何体是否为空。如果是，则返回true。                     |
| [ST_IsRing函数](t13132.html#reference-zbk-pmq-zdb/section-vyq-1f8-6jr)             | 判断输入的空间几何体是否为闭合的简单线段（环）。如果是，则返回true。            |
| [ST_Length函数](t13132.html#reference-zbk-pmq-zdb/section-f0k-9qv-413)             | 使用欧几里得测量法计算线段的二维投影长度。如果存在多条线段，则返回所有线段的长度之和。     |
| [ST_NumPoints函数](t13132.html#reference-zbk-pmq-zdb/section-hff-e0e-7cr)          | 返回空间几何体中点的个数。                                   |
| [ST_NumInteriorRing函数](t13132.html#reference-zbk-pmq-zdb/section-209-wyy-8xk)    | 计算空间几何体中内部环的数量。                                 |
| [ST_StartPoint函数](t13132.html#reference-zbk-pmq-zdb/section-erh-jm1-h6w)         | 返回线段中的第一个点。                                     |
| [ST_X函数](t13132.html#reference-zbk-pmq-zdb/section-ntz-66g-q2w)                  | 返回输入点的第一个X轴坐标。                                  |
| [ST_XMax函数](t13132.html#reference-zbk-pmq-zdb/section-imm-d1d-7y9)               | 返回空间几何体的第一个最大的X轴坐标。                             |
| [ST_XMin函数](t13132.html#reference-zbk-pmq-zdb/section-ypd-gr0-y7z)               | 返回空间几何体的第一个最小的X轴坐标。                             |
| [ST_Y函数](t13132.html#reference-zbk-pmq-zdb/section-zsp-j85-b7e)                  | 返回输入点的第一个Y轴坐标。                                  |
| [ST_YMax函数](t13132.html#reference-zbk-pmq-zdb/section-8k6-97u-weu)               | 返回空间几何体的第一个最大的Y轴坐标。                             |
| [ST_YMin函数](t13132.html#reference-zbk-pmq-zdb/section-6mk-z79-5jg)               | 返回几何体的第一个最小的Y轴坐标。                               |
| [bing_tile函数](t13132.html#reference-zbk-pmq-zdb/section-lnq-1qa-6gi)             | 通过X坐标、Y坐标和缩放级别构造一个Bing图块。                       |
| [bing_tile函数](t13132.html#reference-zbk-pmq-zdb/section-lnq-1qa-6gi)             | 通过四叉树键构造一个Bing图块。                               |
| [bing_tile_at函数](t13132.html#reference-zbk-pmq-zdb/section-a72-l72-134)          | 通过经纬度和缩放级别构造一个Bing图块。                           |
| [bing_tile_coordinates函数](t13132.html#reference-zbk-pmq-zdb/section-5ly-1yr-thl) | 返回目标Bing图块对应的X坐标和Y坐标。                           |
| [bing_tile_polygon函数](t13132.html#reference-zbk-pmq-zdb/section-o76-del-7dd)     | 返回目标Bing图块的多边形格式。                               |
| [bing_tile_quadkey函数](t13132.html#reference-zbk-pmq-zdb/section-kup-fo0-d4n)     | 返回目标Bing图块的四叉树键。                                |
| [bing_tile_zoom_level函数](t13132.html#reference-zbk-pmq-zdb/section-lly-hw4-8vo)  | 返回目标Bing图块的缩放级别。                                |



地理函数 
-------------------------



|                                         函数名称                                          |         说明         |
|---------------------------------------------------------------------------------------|--------------------|
| [geohash函数](t15139.html#reference-sm3-1zx-g2b/section-v65-fai-y9f) | 对纬度和经度进行geohash编码。 |



颜色函数 
-------------------------



|                                       函数名称                                       |                                               说明                                               |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| [bar函数](t2113413.html#concept-2113413/section-wfn-p5x-yfk)    | 通过width指定整条ANSI条形图的宽度，其中该ANSI条形图的起始颜色为红色（low_color），结束颜色为绿色（high_color）。然后通过x截取其中一段ANSI条形图并返回。 |
| [bar函数](t2113413.html#concept-2113413/section-wfn-p5x-yfk)    | 通过width指定整条ANSI条形图的宽度，其中该ANSI条形图的起始颜色和结束颜色为自定义颜色。然后通过x截取其中一段ANSI条形图并返回。                        |
| [color函数](t2113413.html#concept-2113413/section-x72-svx-d1s)  | 将颜色字符串转换为color类型。                                                                              |
| [color函数](t2113413.html#concept-2113413/section-x72-svx-d1s)  | 通过判断x在low和high之间的占比指定low_color和high_color的份量，然后返回处于low_color和high_color之间的一个颜色。                |
| [color函数](t2113413.html#concept-2113413/section-x72-svx-d1s)  | 通过y指定low_color和high_color的份量，然后返回处于low_color和high_color之间的一个颜色。                                |
| [render函数](t2113413.html#concept-2113413/section-4tb-hmv-kom) | 通过颜色渲染返回结果。布尔表达式为真时，返回绿色勾；否则返回红色叉。                                                             |
| [render函数](t2113413.html#concept-2113413/section-4tb-hmv-kom) | 通过自定义的颜色渲染返回结果。                                                                                |
| [rgb函数](t2113413.html#concept-2113413/section-5yb-uhm-wer)    | 通过RGB值返回一个颜色值。                                                                                 |



HyperLogLog函数 
----------------------------------



|                                            函数名称                                            |                   说明                   |
|--------------------------------------------------------------------------------------------|----------------------------------------|
| [approx_set函数](t2113438.html#concept-2113438/section-1v0-ncu-00b)       | 估算x中不重复值的个数，最大标准误差默认为0.01625。          |
| [cardinality函数](t2113438.html#concept-2113438/section-db0-lqn-1rb)      | 将HyperLogLog类型的内容转换为bigint类型。          |
| [empty_approx_set函数](t2113438.html#concept-2113438/section-bzw-cc3-42e) | 返回一个HyperLogLog类型的空值。最大标准误差默认为0.01625。 |
| [merge函数](t2113438.html#concept-2113438/section-ot3-qji-4d0)            | 聚合计算所有的HyperLogLog值。                   |



电话号码函数 
---------------------------



|                                            函数名称                                             |      说明      |
|---------------------------------------------------------------------------------------------|--------------|
| [mobile_carrier函数](t65320.html#concept-a15-tzn-yfb/section-oop-s92-8pw)  | 分析电话号码所属运营商。 |
| [mobile_city函数](t65320.html#concept-a15-tzn-yfb/section-pm1-oif-hfc)     | 分析电话号码所属城市。  |
| [mobile_province函数](t65320.html#concept-a15-tzn-yfb/section-o2g-015-7os) | 分析电话号码所属省份。  |



比较运算符 
--------------------------



|                                           运算符                                           |             说明             |
|-----------------------------------------------------------------------------------------|----------------------------|
| [基础运算符](t13127.html#reference-gym-fmq-zdb/section-vog-htc-ev2)       | 比较x和y的大小关系。如果逻辑成立，则返回true。 |
| [ALL运算符](t13127.html#reference-gym-fmq-zdb/section-atq-sq4-ksq)      | x满足所有条件时，返回true。           |
| [ANY运算符](t13127.html#reference-gym-fmq-zdb/section-6uj-0r2-94s)      | x满足任意一个条件时，返回true。         |
| [BETWEEN运算符](t13127.html#reference-gym-fmq-zdb/section-rff-unu-zow)  | x处在y和z之间时，返回true。          |
| [DISTINCT运算符](t13127.html#reference-gym-fmq-zdb/section-ejz-umu-isp) | x不等于y时，返回true。             |
| [DISTINCT运算符](t13127.html#reference-gym-fmq-zdb/section-ejz-umu-isp) | x等于y时，返回true。              |
| [LIKE运算符](t13127.html#reference-gym-fmq-zdb/section-kxy-htx-2ws)     | 匹配字符串中指定的字符模式。字符串区分大小写。    |
| [SOME运算符](t13127.html#reference-gym-fmq-zdb/section-3ed-j89-ryq)     | x满足任意一个条件时，返回true。         |
| [GREATEST运算符](t13127.html#reference-gym-fmq-zdb/section-cow-li5-5ib) | 查询x、y中的最大值。                |
| [LEAST运算符](t13127.html#reference-gym-fmq-zdb/section-xj1-1jv-tdb)    | 查询x、y中的最小值。                |
| [NULL运算符](t13127.html#reference-gym-fmq-zdb/section-856-3oh-jgt)     | x为null时，返回true。            |
| [NULL运算符](t13127.html#reference-gym-fmq-zdb/section-856-3oh-jgt)     | x为不为null时，返回true。          |



逻辑运算符 
--------------------------



|                                       运算符                                        |             说明              |
|----------------------------------------------------------------------------------|-----------------------------|
| [AND运算符](t13129.html#concept-vsj-kmq-zdb/section-pw8-5ul-lcn) | x和y的值都为true时，返回结果为true。     |
| [OR运算符](t13129.html#concept-vsj-kmq-zdb/section-cog-9xl-z3f)  | x和y中任意一个的值为true时，返回结果为true。 |
| [NOT运算符](t13129.html#concept-vsj-kmq-zdb/section-nes-1zb-hjv) | x的值为false时，返回结果为true。       |



单位换算函数 
---------------------------



|                                                 函数名称                                                 |                                          说明                                           |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [convert_data_size函数](t2120463.html#concept-2120463/section-cks-tj3-d5x)          | 对数据量单位进行换算，系统自动判断最优的换算单位，返回使用最优单位表示的数据量。返回类型为string。例如将1024 KB换算为1 MB，1024 MB换算为1 GB。 |
| [convert_data_size函数](t2120463.html#concept-2120463/section-cks-tj3-d5x)          | 对数据量单位进行换算，返回使用指定单位表示的数据量。返回类型为string。                                                |
| [format_data_size函数](t2120463.html#concept-2120463/section-35k-13k-uh4)           | 对Byte单位进行换算，返回使用指定单位表示的数据量。返回类型为string。                                               |
| [parse_data_size函数](t2120463.html#concept-2120463/section-0ju-sal-lyh)            | 对数据量单位进行换算，返回以Byte为单位的数据量。返回类型为decimal。                                               |
| [to_data_size_B函数](t2120463.html#concept-2120463/section-dox-t2w-rf9)             | 对数据量单位进行换算，返回以Byte为单位的数据量。返回类型为double。                                                |
| [to_data_size_KB函数](t2120463.html#concept-2120463/section-23a-xls-npy)            | 对数据量单位进行换算，返回以KB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_MB函数](t2120463.html#concept-2120463/section-m4m-y3r-0p7)            | 对数据量单位进行换算，返回以MB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_GB函数](t2120463.html#concept-2120463/section-0e5-nn8-osq)            | 对数据量单位进行换算，返回以GB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_TB函数](t2120463.html#concept-2120463/section-z2x-yht-3ym)            | 对数据量单位进行换算，返回以TB为单位的数据量。返回类型为double。                                                  |
| [to_data_size_PB函数](t2120463.html#concept-2120463/section-5am-akc-rig)            | 对数据量单位进行换算，返回以PB为单位的数据量。返回类型为double。                                                  |
| [format_duration函数](t2120463.html#concept-2120463/section-vvp-aaz-1nv)            | 对以秒为单位的时间间隔进行格式化，转换为可读的字符串类型。                                                         |
| [parse_duration函数](t2120463.html#concept-2120463/section-zbi-yy9-qvm)             | 对时间间隔进行格式化，转换为`0 00:00:00.000`格式。                                |
| [to_days函数](t2120463.html#concept-2120463/section-qzi-mi5-oh9)                    | 对时间间隔单位进行换算，转换为以天为单位的时间间隔。                                                            |
| [to_hours函数](t2120463.html#concept-2120463/section-lzy-nw4-pqn)                   | 对时间间隔单位进行换算，转换为以小时为单位的时间间隔。                                                           |
| [to_microseconds函数](t2120463.html#concept-2120463/section-b96-6s6-9vh)            | 对时间间隔单位进行换算，转换为以微秒为单位的时间间隔。                                                           |
| [to_milliseconds函数](t2120463.html#concept-2120463/section-3mk-oic-qzq)            | 对时间间隔单位进行换算，转换为以毫秒为单位的时间间隔。                                                           |
| [to_minutes函数](t2120463.html#concept-2120463/section-7p5-w3c-iio)                 | 对时间间隔单位进行换算，转换为以分钟为单位的时间间隔。                                                           |
| [to_most_succinct_time_unit函数](t2120463.html#concept-2120463/section-sis-p3a-hdj) | 对时间间隔单位进行换算，系统自动判断最优的换算单位，返回使用最优单位表示的时间间隔。                                            |
| [to_nanoseconds函数](t2120463.html#concept-2120463/section-liu-lfy-psc)             | 对时间间隔单位进行换算，转换为以纳秒为单位的时间间隔。                                                           |
| [to_seconds函数](t2120463.html#concept-2120463/section-jy7-wxm-1nx)                 | 对时间间隔单位进行换算，转换为以秒为单位的时间间隔。                                                            |



窗口漏斗函数 
---------------------------



|                                函数名称                                 |                说明                 |
|---------------------------------------------------------------------|-----------------------------------|
| [window_funnel函数](t2120491.html#concept-2120491) | 在滑动的时间窗口中搜索事件链并计算事件链中发生的最大连续的事件数。 |



Lambda表达式 
------------------------------

日志服务支持您在SQL分析语句中定义Lambda表达式，并将该表达式传递给指定函数，丰富函数的表达。更多信息，请参见[Lambda表达式](t13128.html#reference-zwt-jmq-zdb)。

条件表达式 
--------------------------



|                                          表达式                                           |                    说明                    |
|----------------------------------------------------------------------------------------|------------------------------------------|
| [CASE WHEN表达式](t13122.html#concept-sf5-bmq-zdb/section-zxs-v4x-zdb) | 通过条件判断，对数据进行归类。                          |
| [IF表达式](t13122.html#concept-sf5-bmq-zdb/section-upz-kpq-tdb)        | 通过条件判断，对数据进行归类。                          |
| [COALESCE表达式](t13122.html#concept-sf5-bmq-zdb/section-pzt-mpq-tdb)  | 返回多个表达式中第一个非NULL的值。                      |
| [NULLIF表达式](t13122.html#concept-sf5-bmq-zdb/section-xcy-npq-tdb)    | 比较两个表达式的值是否相等。如果相等，则返回null，否则返回第一个表达式的值。 |
| [TRY表达式](t13122.html#concept-sf5-bmq-zdb/section-ylv-4pq-tdb)       | 捕获异常信息，使得系统继续执行查询和分析操作。                  |


