# Convert datetime

You can convert time and date data to improve the efficiency of log query and analysis.

## Terms

Domain-specific language (DSL) supports three data types: datetime string, datetime object, and UNIX timestamp.

- Datetime string. Datetime strings are used to convert time and date data into readable strings.Datetime strings are divided into two types in DSL syntax:

  - Datetime strings with a time zone. Example:`2019-06-02 18:41:26+08:00`。

  - Datetime strings without a time zone. Example:`2019-06-02 10:41:26`。

In a datetime string with a time zone, the time difference is appended to the datetime to indicate the time zone. Examples:

- `2019-06-02 18:41:26+08:00`indicates that the datetime is in the UTC+8 time zone.`2019-06-02 18:41:26`。

- `2019-06-02 18:41:26-07:00`indicates that the datetime is in the UTC-7 time zone.`2019-06-02 18:41:26`。

- Datetime object. Datetime objects are instantiated to show data and time.Datetime objects are used to convert time and date data into readable strings.

- UNIX timestamp. A UNIX timestamp indicates the number of seconds that have elapsed since 00:00:00 Thursday, 1 January 1970.UNIX timestamps can be used in the following scenarios:

  - In event logs, the metadata field `__time__` indicates the time when logs are generated and the field `__receieve_time__` indicates the time when Simple Log Service receives logs. The values of these fields use UNIX timestamps to indicate the system time.

    ```
    __source__:  1.2.3.4
    __tag__:__receive_time__:  1562741899
    __topic__:
    __time__: 1562731122
    ```

  - Perform time-related calculations.A UNIX timestamp indicates the number of seconds that have elapsed since 00:00:00 Thursday, 1 January 1970. You can use UNIX timestamps to perform time-related calculations in multiple scenarios. For example:

    - Raw log entries

      ```
      time1: 1562741899
      time2: 1562731122
      ```

    - SLS DSL orchestration

      ```python
      e_set("time_diff", op_sub(v("time1"), v("time2")))
      ```

    - Transformation result

      ```
      time1: 1562741899
      time2: 1562731122
      time_diff: 10777
      ```

## Use functions to convert data types

The following figure shows how to use functions to convert the three data types: datetime string, datetime object, and UNIX timestamp.
![](/img/dataprocessdemo/特定格式处理/date-parse-loop.png)
The following table describes the conversion scenarios and conversion functions.

| Conversion scenario                                                    |                                                 | Conversion function                                                                                                                                                                            |
| ---------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Perform conversions between a datetime object and a UNIX timestamp     | Convert a datetime object to a UNIX timestamp.  | _ `dt_parsetimestamp`converts a datetime object or a datetime string to a UNIX timestamp. _ `dt_totimestamp`converts a datetime object to a UNIX timestamp.                                    |
| Perform conversions between a datetime object and a UNIX timestamp     | Convert a UNIX timestamp to a datetime object.  | _ `dt_parse`converts a UNIX timestamp or a datetime string to a datetime object. _ `dt_fromtimestamp`converts a UNIX timestamp to a datetime object.                                           |
| Perform conversions between a datetime object and a datetime string.。 | Convert a datetime object to a datetime string. | _ `dt_str`converts a datetime object, a UNIX timestamp, or a datetime string to a datetime string in the specified format. _ `dt_strftime`converts a datetime object to a datetime string.     |
| Perform conversions between a datetime object and a datetime string.   | Convert a datetime string to a datetime object. | _ `dt_parse`converts a datetime string or a UNIX timestamp to a datetime object. _ `dt_strptime`converts a datetime string to a datetime object.                                               |
| Perform conversions between a datetime string and a UNIX timestamp.    | Convert a datetime string to a UNIX timestamp.  | `dt_parsetimestamp`converts a datetime string or a datetime object to a UNIX timestamp.                                                                                                        |
| Perform conversions between a datetime string and a UNIX timestamp.    | Convert a UNIX timestamp to a datetime string.  | _ `dt_str`converts a UNIX timestamp, a datetime object, or a datetime string to a datetime string in the specified format. _ `dt_strftimestamp`converts a UNIX timestamp to a datetime string. |

Three conversion scenarios and six conversion functions are described in the preceding table. These conversion functions are divided into the following two types:

- Automatic conversion functions. Automatic conversion functions such as `dt_parse` automatically convert different data types, such as UNIX timestamps, datetime objects, and datetime strings.

- Dedicated functions. Automatic conversion functions cannot meet your requirements in some scenarios.For example, automatic conversion functions such as `dt_parse` cannot parse date types in some custom formats. In this case, you must use the `dt_strptime` function.

**Note** For more information, see [Date and time functions](https://www.alibabacloud.com/help/en/doc-detail/125409.htm?spm=a2c4g.11186623.2.9.169c3cb8rqBjjU#concept-1130519) and [Conversion functions](https://www.alibabacloud.com/help/en/doc-detail/125403.htm?spm=a2c4g.11186623.2.10.169c3cb8rqBjjU#concept-1130510).

## Perform conversions between a datetime object and a UNIX timestamp

- Conversion functions

  - `dt_parsetimestamp`: Recommended. This automatic conversion function converts a datetime object or a datetime string to a UNIX timestamp.

  - `e_set`You can set the tz parameter in this function to add a time zone to a datetime object. You can also set the tz parameter to convert a source time zone to a destination time zone.

- Convert a UNIX timestamp to a datetime string with a time zone.

  - Raw log entries

    ```
    time: 1562741899
    ```

  - SLS DSL orchestration

    ```python
    e_set("new_time", dt_parse(v("time"), tz="Asia/Shanghai"))
    ```

  - Transformation result

    ```
    time: 1562741899
    new_time: 2019-07-10 06:58:19+08:00
    ```

## Perform conversions between a datetime string and a UNIX timestamp.

-Conversion functions

- `dt_str`converts a UNIX timestamp, a datetime object, or a datetime string to a datetime string in the specified format.

- `dt_strftimestamp`converts a UNIX timestamp to a datetime string.

- `dt_parsetimestamp`converts a datetime string or a datetime object to a UNIX timestamp.

- Scenario 1：Convert a datetime string without a time zone to a UNIX timestamp.For example, to convert `2019-06-02 18:41:26` to a UNIX timestamp, you must specify a time zone for the datetime string. The converted UNIX timestamp varies based on time zones.

  - Raw log entries

    ```
    time: 2019-06-02 18:41:26
    ```

  - SLS DSL orchestration

    ```python
    e_set(
          "Shanghai_timestamp",
          dt_parsetimestamp(
                v("time"),
                tz="Asia/Shanghai"
          )
    )
    e_set(
          "Los_Angeles_timestamp",
          dt_parsetimestamp(
                v("time"),
                tz="America/Los_Angeles"
          )
    )
    e_set(
          "UTC_timestamp",
          dt_parsetimestamp(v("time"))
    )
    ```

  - Transformation result

    ```
    Shanghai_timestamp: 1559472086
    Los_Angeles_timestamp: 1559526086
    UTC_timestamp: 1559500886
    ```

  **Note**

  - `tz="Asia/Shanghai"`Indicates that the time indicated by the 'time' field is the time corresponding to the time zone of Shanghai.

  - If no time zone is specified, the UTC+0 time zone is used as the default time zone.

  - For more information about the values of the `tz=time zone string` parameter, see [Time zones](https://www.alibabacloud.com/help/en/doc-detail/129390.htm?spm=a2c4g.11186623.2.11.169c3cb8rqBjjU#concept-1597620).

- Scenario 2: Convert a datetime string with a time zone to a UNIX timestamp.You do not need to specify the time zone parameter if a datetime string contains a time zone, such as `2019-06-02 18:41:26+08:00`.

  - Raw log entries

    ```
    China_time : 2019-06-02 18:41:26+08:00
    America_time: 2019-06-02 3:41:26-07:00
    UTC_time : 2019-06-02 10:41:26+00:00
    ```

  - SLS DSL orchestration

    ```python
    e_set("timestamp1", dt_parsetimestamp(v("China_time")))
    e_set("timestamp2", dt_parsetimestamp(v("America_time")))
    e_set("timestamp3", dt_parsetimestamp(v("UTC_time")))
    ```

  - Transformation result

    ```
    America_time:  2019-06-02 3:41:26-07:00
    China_time:  2019-06-02 18:41:26+08:00
    UTC_time:  2019-06-02 10:41:26+00:00
    timestamp1: 1559472086
    timestamp2: 1559472086
    timestamp3: 1559472086
    ```

- Scenario 3: Convert a custom datetime without a time zone to a UNIX timestamp.

  - Raw log entries

    ```
    time1: 2019-07-10 06:58:19
    time2: 2019/07/10 06-58-19
    ```

  - SLS DSL orchestration

    ```python
    e_set(
          "time3",
          dt_parsetimestamp(v("time1"))
    )
    e_set(
          "time4",
          dt_parsetimestamp(
                dt_strptime(
                      v("time2"),
                      "%Y/%m/%d %H-%M-%S"
                )
          )
    )
    ```

  - Transformation result

    ```
    time1: 2019-07-10 06:58:19
    time2: 2019/07/10 06-58-19
    time3: 1562741899
    time4: 1562741899
    ```

## Perform conversions between a datetime object and a datetime string.

-Conversion functions

- `dt_parse`converts a datetime string or a UNIX timestamp to a datetime object.

- `dt_astimezone`returns a datetime object that contains a time zone.

- Scenario 1：Convert a datetime string without a time zone to a datetime object in the specified time zone.For example, you can convert the `2019-06-02 18:41:26` datetime string to a UNIX timestamp and then convert the UNIX timestamp to a datetime string in another time zone.The following example shows how to convert the datetime in the time zone of Los Angeles to the datetime in the time zone of Shanghai.

  - Raw log entries

    ```
    #Assume that the datetime in the time field is the time zone of Los Angeles.
    time : 2019-06-04 2:41:26
    ```

  - SLS DSL orchestration

    ```python
    e_set(
          "timestamp",
          dt_parsetimestamp(
                v("time"),
                tz="America/Los_Angeles")
          )
    e_set(
          "Shanghai_time",
          dt_parse(v("timestamp"),
          tz="Asia/Shanghai")
    )
    ```

  - Transformation result

    ```
    Shanghai_time : 2019-06-04 17:41:26+08:00
    time : 2019-06-04 2:41:26
    timestamp:  1559641286
    ```

- Scenario 2：Convert a datetime string without a time zone to a datetime object with a time zone.

  - Raw log entries

    ```
    time : 2019-07-10 06:58:19
    ```

  - SLS DSL orchestration

    ```python
    e_set("new_time", dt_parse(v("time"), tz="Asia/Shanghai"))
    ```

  - Transformation result

    ```
    time: 2019-07-10 06:58:19
    new_time: 2019-07-10 06:58:19+08:00
    ```

- Scenario 3：Convert a datetime string with a time zone to a datetime object in the destination time zone.

  - Raw log entries

    ```
    time : 2019-06-04 2:41:26+08:00
    ```

  - SLS DSL orchestration

    ```python
    e_set(
          "new_time",
          dt_astimezone(v("time"),
                tz="America/Los_Angeles"
          )
    )
    ```

  - Transformation result

    ```
    new_time : 2019-06-03 11:41:26-07:00
    time : 2019-06-04 2:41:26+08:00
    ```

## Offset datetime

-Conversion functions

- `dt_add`The following syntax shows the parameters of this function:

  ```python
  dt_add(
        field name, dt1=None, dt2=None,
        year(s)=None, month(s)=None,
        day(s)=None, hour(s)=None,
        minute(s)=None, second(s)=None,
        microsecond(s)=None,
        weeks(s)=None,
        weekday=None
  )
  ```

  `year(s)`、`month(s)`、`day(s)`The parameters that end with (s) have two patterns. For example, year (s) can be `year` and `years`, and month (s) can be `month` and `months`.Take `year` and `years` as examples. If `year` is used in the syntax, the value of `year` replaces the value of year in raw log entries. If `years` is used in the syntax, the value of `years` is added to the value of year in raw log entries.You must use the `dt_add` function at the same time. This function allows you to add a value, subtract a value, or overwrite the value of a datetime.

- The `weekday` parameter in the `dt_add` function is used together with the `dt_MO` and `dt_TU` parameters to offset the specified weekday.For more information, see[dt_MO](https://www.alibabacloud.com/help/en/doc-detail/125409.htm?spm=a2c4g.11186623.2.12.169c3cb8rqBjjU#section-bm9-1dd-jnv).

- Scenario 1：Scenario 1: Offset a datetime by year and month.The following example shows how to offset a datetime by year and month.

  - Raw log entries

    ```
    time1 : 2019-06-04 2:41:26
    ```

  - SLS DSL orchestration 1

    ```python
    e_set("time2", dt_add(v("time1"), year=2018))
    ```

  - Transformation result 1

    ```
    time1 : 2019-06-04 2:41:26
    time2 : 2018-06-04 02:41:26
    ```

  - SLS DSL orchestration 2

    ```python
    e_set("time2", dt_add(v("time1"), years=2018))
    ```

  - Transformation result 2

    ```
    time1 : 2019-06-04 2:41:26
    time2 : 4037-06-04 02:41:26
    ```

- Scenario 2：Shift dates by week. The date offset by week is shown in the following example:

  - Raw log entries

    ```
    #2019-06-04 Tuesday
    time1 : 2019-06-04 2:41:26
    ```

  - SLS DSL orchestration

    ```python
    e_set(
          "nex_Monday",
          dt_add(v("time1"),
          weekday=dt_MO(1))
    )
    e_set(
          "previous_Tuesday",
          dt_add(v("time1"),
          weekday=dt_TU(op_neg(1)))
    )
    e_set(
          "nex_next_Saturday",
          dt_add(v("time1"),
          weekday=dt_SA(2))
    )
    e_set(
          "previous_previous_Sunday",
          dt_add(v("time1"),
          weekday=dt_SU(op_neg(2)))
    )
    ```

  - Transformation result

    ```
    next_Monday : 2019-06-10 02:41:26
    next_next_Saturday : 2019-06-15 02:41:26
    previous_Tuesday : 2019-06-04 2:41:26
    previous_previous_Sunday : 2019-05-26 02:41:26
    time1 : 2019-06-04 2:41:26
    ```

  **Note** If `time1` is a Tuesday, the last Tuesday and the next Tuesday are the days that are one week before or after `time1`.
