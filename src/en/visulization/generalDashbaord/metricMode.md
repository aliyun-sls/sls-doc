# Time series mode

You can use the time series mode to display the changes of one or more sets of data over a continuous period of time. You can also use the mode to merge the results of multiple query statements. This way, the trend of query and analysis results can be displayed in a more detailed manner.

## Prerequisites

Only line charts (Pro) and flow charts (Pro) support the time series mode.

## Concept

You can use the time series mode to display the changes of one or more sets of data over a continuous period of time. You can also use the mode to merge the results of multiple query statements. This way, the trend of query and analysis results can be displayed in a more detailed manner.

The __time__ field is the default attribute of each log in Simple Log Service. The field specifies the point in time at which a log is written to Simple Log Service. The point in time also refers to the log time. The __time__ field is in the UNIX timestamp format with seconds as the unit. You can use the __time__ field to create charts in time series mode. This frees you from complex time functions.

The following list describes the differences between the time series mode and a non-time series mode:

- Time series mode
  1. The system automatically optimizes the time span for a more uniform time distribution.
  2. In the x-axis, the time is displayed in the mm:ss format. In tooltips, the time is displayed in the YYYY-MM-DD hh:mm:ss format.
  3. You can add multiple query statements.

- Non-time series mode
  1. The x-axis shows a longer time span.
  2. In the x-axis and tooltips, the time is displayed in the UNIX timestamp format. If you want to convert the format, you must include a time function in the query statement.
  3. You can add only one query statement. 

## Benefits

- The x-axis shows a more uniform time distribution to reflect the trends of metrics in an effective manner.
- The system automatically optimizes the time span in the x-axis. This way, more details of query and analysis results are displayed.
- The time in the x-axis is displayed in the mm:ss format, which makes the time span and points in time easier to read.
- You can add multiple query statements and merge the results of the statements.

## Limits

The time field that is used for the x-axis must be in the UNIX timestamp format with seconds as the unit or in a standard time format. In a standard time format, the time field follows the UTC time standard, such as 2022-02-03T22:30:05+08:00, or the time field can be parsed into a time value that contains the year, month, day, hour, minute, and second information, such as in the YYYY/MM/DD hh:mm:ss format. In this format, a time zone is allowed.