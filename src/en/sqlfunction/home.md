Complying with the SQL 92 standard, SQL functions in Simple Log Service include linear transformation functions, aggregate functions, window functions, and custom functions of Simple Log Service, such as time series functions, AI algorithm analysis functions, and log clustering functions.

This topic describes the SQL syntax and various types of functions used in Simple Log Service.

# SQL syntax

## group by

- [Query the values of IP addresses after geohash encoding](./95.展示IP经过geohash编码之后的值.md)
- [Query the project write latency in service logs](./98.服务日志中查询project的写入延迟情况.md)

## order by

- [ Query projects with high write latency](./97.获取写入延迟较高的project.md)

## case when and if

- [Query the information about non-200 requests](./38.非200请求.md)
- [Query the proportion of Tomcat error requests](./13.tomcat错误请求占比.md)
- [Sort and display based on pv for htpt_user-agent](./17.根据pv为http_user_agent进行排序展示.md)

## having

- [Query projects with high write latency](./97.获取写入延迟较高的project.md)
- [Query the project write latency in service logs](./98.%E6%9C%8D%E5%8A%A1%E6%97%A5%E5%BF%97%E4%B8%AD%E6%9F%A5%E8%AF%A2project%E7%9A%84%E5%86%99%E5%85%A5%E5%BB%B6%E8%BF%9F%E6%83%85%E5%86%B5.md)

## join

- [Query data by joining two Logstores](./96.两个logstore关联查询.md)
- [Convert an array to a string, find the difference set of two arrays, and find the maximum and minimum values in an array](./163.把数组转换为字符串、求两个数组的差集、求数组中的最大值、求数组中的最小值.md)

## nested subqueries

## ANY/SOME

- [Check whether elements in multiple columns meet a condition](./174.%E5%88%A4%E6%96%AD%E5%A4%9A%E5%88%97%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E6%BB%A1%E8%B6%B3%E6%9D%A1%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE.md)

## unnest

- [Estimate time series periodicity](./58.%E6%97%B6%E5%BA%8F%E5%91%A8%E6%9C%9F%E4%BC%B0%E8%AE%A1%E5%87%BD%E6%95%B0.md)
- [Estimate the values for percentiles 0.5 and 0.9](./94.0.5%EF%BC%8C0.9%E4%BD%8D%E7%BD%AE%E4%BC%B0%E7%AE%97.md)

## Functions

## General comparison functions

- [Check whether a value is null or within a range](./122.%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E6%98%AF%20null%EF%BC%8C%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E5%9C%A8%E4%B8%A4%E4%B8%AA%E6%95%B0%E4%B9%8B%E9%97%B4.md)
- [Check whether two values are unequal or equal and obtain the maximum and minimum values from multiple columns](./173.%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E5%80%BC%E6%98%AF%E5%90%A6%E4%B8%8D%E7%AD%89%EF%BC%8C%E6%98%AF%E5%90%A6%E7%9B%B8%E7%AD%89%E3%80%81%E8%8E%B7%E5%8F%96%E5%A4%9A%E5%88%97%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BC%E5%92%8C%E6%9C%80%E5%B0%8F%E5%80%BC.md)

## General aggregate functions

- [Compare the PVs of today with those of yesterday based on NGINX access logs.](./1.nginx今日PV与昨日对比.md)
- [Distribution of source IP addresses from NGINX logs](./2.nginx日志来源IP的分布.md)
- [Collect statistics on the inbound and outbound NGINX traffic](./3.nginx流入流出的流量统计.md)
- [Query the top 10 addresses that access NGINX](./4.nginx访问前十的地址.md)
- [Predict PVs based on NGINX access logs](./5.nginx%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97%E7%9A%84PV%E9%A2%84%E6%B5%8B.md)
- [PPredict PVs based on NGINX access logs](./6.nginx%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97%E7%9A%84PV%E8%B6%8B%E5%8A%BF%E5%90%8C%E6%AF%94%E6%98%A8%E6%97%A5.md)
- [Analyze the trend of Tomcat request status](./7.tomcat%E8%AF%B7%E6%B1%82%E7%8A%B6%E6%80%81%E8%B6%8B%E5%8A%BF%E5%88%86%E6%9E%90.md)
- [Query the changes of PVs and UVs for Tomcat access over time](./8.%E5%B1%95%E7%A4%BAtomcat%E8%AE%BF%E9%97%AE%E7%9A%84pv%E3%80%81uv%E9%9A%8F%E6%97%B6%E9%97%B4%E5%8F%98%E5%8C%96%E6%9B%B2%E7%BA%BF.md)
- [tomcat Query the number of Tomcat error requests and comparison with that of last hour](./9.tomcat%E9%94%99%E8%AF%AF%E8%AF%B7%E6%B1%82%E6%95%B0%E9%87%8F%E4%BB%A5%E5%8F%8A%E4%B8%8E%E4%B8%8A%E4%B8%80%E5%B0%8F%E6%97%B6%E9%94%99%E8%AF%AF%E8%AF%B7%E6%B1%82%E6%AF%94%E8%BE%83.md)
- [Query the top 10 URIs in Tomcat requests](./10.tomcat%E4%B8%AD%E8%AF%B7%E6%B1%82%E6%95%B0%E5%89%8D%E5%8D%81%E7%9A%84uri%E5%B1%95%E7%A4%BA.md)
- [Query the types and distribution of Tomcat clients](./11.%E6%9F%A5%E8%AF%A2%E8%AE%BF%E9%97%AEtomcat%E7%9A%84%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%88%86%E7%B1%BB%E5%8F%8A%E6%95%B0%E9%87%8F%E5%88%86%E5%B8%83.md)
- [Query the global distribution of clients](./15.%E5%AE%A2%E6%88%B7%E7%AB%AFPV%E5%85%A8%E7%90%83%E5%88%86%E5%B8%83.md)
- [Query the distribution of request methods](./39.%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95%E5%88%86%E5%B8%83.md)

## Date and time functions

- [Obtain the current date, time, date and time, time zone, local time, and local timestamp](./117.%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E6%97%A5%E6%9C%9F%E3%80%81%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E3%80%81%E5%BD%93%E5%89%8D%E5%B9%B4%E6%9C%88%E6%97%A5%E6%97%B6%E5%88%86%E7%A7%92%E3%80%81%E5%BD%93%E5%89%8D%E6%97%B6%E5%8C%BA%E3%80%81%E6%9C%AC%E5%9C%B0%E6%97%B6%E9%97%B4%E3%80%81%E6%9C%AC%E5%9C%B0%E6%97%B6%E9%97%B4%E6%88%B3.md)
- [Parse the format of a string to convert it into a timestamp, and calculate the interval between two time values](./118.%E6%8A%8A%20string%20%E4%BB%A5%20format%20%E6%A0%BC%E5%BC%8F%E8%A7%A3%E6%9E%90%EF%BC%8C%E8%BD%AC%E5%8C%96%E6%88%90%20timestamp%E3%80%81%E8%AE%A1%E7%AE%97%E4%B8%A4%E4%B8%AA%E6%97%B6%E9%97%B4%E9%97%B4%E9%9A%94.md)
- [Collect statistics on the inbound and outbound NGINX traffic](./3.nginx流入流出的流量统计.md)
- [Query the daily consumption and trend prediction for this month](./18.%E6%9C%AC%E6%9C%88%E6%AF%8F%E6%97%A5%E6%B6%88%E8%B4%B9%E5%8F%8A%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B.md)
- [The cost of each product in the last three months](./23.%E5%90%84%E4%B8%AA%E4%BA%A7%E5%93%81%E6%9C%80%E8%BF%91%E4%B8%89%E4%B8%AA%E6%9C%88%E7%9A%84%E8%B4%B9%E7%94%A8%E6%83%85%E5%86%B5.md)
- [Predict expenses for the next three months](./25.%E6%9C%AA%E6%9D%A5%E4%B8%89%E4%B8%AA%E6%9C%88%E9%A2%84%E6%B5%8B%E8%B4%B9%E7%94%A8%E6%B1%87%E6%80%BB.md)

## String functions

- [Convert the case, calculate the string length, and reverse a string](./187.%E8%BD%AC%E6%8D%A2%E5%A4%A7%E5%B0%8F%E5%86%99%E3%80%81%E8%AE%A1%E7%AE%97%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%95%BF%E5%BA%A6%E5%92%8C%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.md)
- [Obtain the minimum edit distance between two strings, supplement or truncate a string to length n, remove the leading or trailing spaces from a string, truncate a string from a field, and find the position where a string starts](./114.%E8%8E%B7%E5%8F%96%E4%B8%A4%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%9C%80%E5%B0%8F%E7%BC%96%E8%BE%91%E8%B7%9D%E7%A6%BB%E3%80%81%E8%A1%A5%E9%BD%90%E6%88%96%E6%88%AA%E5%8F%96%E9%95%BF%E5%BA%A6%E4%B8%BA%20n%20%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E3%80%81%E5%8E%BB%E6%8E%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%B7%A6%E4%BE%A7%E7%A9%BA%E6%A0%BC%E3%80%81%E5%8E%BB%E6%8E%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8F%B3%E4%BE%A7%E7%A9%BA%E6%A0%BC%E3%80%81%E5%9C%A8%E5%AD%97%E6%AE%B5%E4%B8%AD%E6%88%AA%E5%8F%96%E5%AD%97%E7%AC%A6%E4%B8%B2%E3%80%81%E6%9F%A5%E6%89%BE%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%BC%80%E5%A7%8B%E7%9A%84%E4%BD%8D%E7%BD%AE.md)
- [Obtain the start position of a string in another string, remove the leading and trailing spaces from a string, and split a string into an array](./115.%E8%8E%B7%E5%8F%96%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%EF%BC%8C%E5%9C%A8%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%80%E5%85%88%E5%BC%80%E5%A7%8B%E7%9A%84%E4%BD%8D%E7%BD%AE%E3%80%81%E5%8E%BB%E6%8E%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%89%8D%E5%90%8E%E7%A9%BA%E6%A0%BC%E3%80%81%E6%8A%8A%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%88%86%E8%A3%82%E6%88%90%20array.md)
- [Delete or replace a part of a string](./116.%E5%88%A0%E9%99%A4%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%9F%90%E4%B8%80%E9%83%A8%E5%88%86%EF%BC%8C%E6%9B%BF%E6%8D%A2%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%9F%90%E4%B8%80%E9%83%A8%E5%88%86.md)
- [Replace or delete values in a field or split a field value into an array](./120.%E6%9B%BF%E6%8D%A2%E5%AD%97%E6%AE%B5%E3%80%81%E5%88%A0%E9%99%A4%E5%AD%97%E6%AE%B5%E3%80%81%E6%8A%8A%E5%AD%97%E6%AE%B5%E5%88%87%E5%89%B2%E6%88%90%E6%95%B0%E7%BB%84.md)

## JSON functions

- [Convert a string to the JSON format](./85.%E6%8A%8A%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E5%8C%96%E6%88%90JSON%E7%B1%BB%E5%9E%8B.md)
- [Convert JSON data to a string and check whether a string contains a specific value](./160.%E6%8A%8A%20json%20%E8%BD%AC%E6%8D%A2%E4%B8%BA%20string%E3%80%81%E6%9F%A5%E8%AF%A2%E6%98%AF%E5%90%A6%E6%9C%89%E6%9F%90%E4%B8%AA%E5%80%BC.md)
- [Query the value of the element with the specified index and the size of a JSON array](./161.%E8%8E%B7%E5%8F%96%20json%20%E7%9A%84%E4%B8%8B%E6%A0%87%EF%BC%8C%E8%8E%B7%E5%8F%96%20json%20%E7%9A%84%E5%A4%A7%E5%B0%8F.md)

## Complex functions

### Array functions

### Map

- [Calculate the union of two maps
  ](./156.%E6%B1%82%E4%B8%A4%E4%B8%AA%20map%20%E7%9A%84%E5%B9%B6%E9%9B%86.md)

## Regular expression functions

- [Extract values from a field and check whether any field values match a regular expression](./119.%E6%8F%90%E5%8F%96%E5%AD%97%E6%AE%B5%E3%80%81%E5%88%A4%E6%96%AD%E5%AD%97%E6%AE%B5%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%AC%A6%E5%90%88%E6%AD%A3%E5%88%99%E7%9A%84%E5%AD%97%E6%AE%B5.md)

## URL functions

- [Obtain parameters in a URL by using a URL function](./84.%E9%80%9A%E8%BF%87url%E5%87%BD%E6%95%B0%E8%8E%B7%E5%8F%96url%E4%B8%AD%E5%8F%82%E6%95%B0.md)
- [Query the fragment, host, path, port, and protocol from a URL](./158.%E8%8E%B7%E5%8F%96%20url%20%E7%9A%84%20fragment%E3%80%81host%E3%80%81path%E3%80%81port%E3%80%81protocol.md)
- [Query the query condition from a URL and encode or decode a URL](./159.%E8%8E%B7%E5%8F%96%20url%20%E7%9A%84%20query%EF%BC%8Curl%20%E8%BD%AC%E7%A0%81%EF%BC%8Curl%20%E8%A7%A3%E7%A0%81.md)

## Mathematical calculation functions

## Mathematical statistics functions

- [Query the correlation of two columns](./92.%E4%B8%A4%E5%88%97%E7%9A%84%E7%9B%B8%E5%85%B3%E5%BA%A6.md)
- [Query the population covariance and sample covariance of the pre-tax profit and pre-tax amount from bills](./107.%E6%AF%94%E8%BE%83%E8%B4%A6%E5%8D%95%E7%A8%8E%E5%89%8D%E5%88%A9%E6%B6%A6%E5%92%8C%E7%A8%8E%E5%89%8D%E9%87%91%E9%A2%9D%E7%9A%84%E6%80%BB%E4%BD%93%E5%8D%8F%E6%96%B9%E5%B7%AE%E5%92%8C%E6%A0%B7%E6%9C%AC%E5%8D%8F%E6%96%B9%E5%B7%AE.md)
- [Query the sample standard deviation and population standard deviation of the pre-tax income](./108.%E6%9F%A5%E8%AF%A2%E7%A8%8E%E5%89%8D%E6%94%B6%E5%85%A5%E7%9A%84%E6%A0%B7%E6%9C%AC%E6%A0%87%E5%87%86%E5%B7%AE%E5%92%8C%E6%80%BB%E4%BD%93%E6%A0%87%E5%87%86%E5%B7%AE.md)
- [Query the sample variance and population variance of the pre-tax income](./109.%E6%9F%A5%E8%AF%A2%E7%A8%8E%E5%89%8D%E6%94%B6%E5%85%A5%E7%9A%84%E6%A0%B7%E6%9C%AC%E6%96%B9%E5%B7%AE%E5%92%8C%E6%80%BB%E4%BD%93%E6%96%B9%E5%B7%AE.md)

## Approximate functions

- [Estimate the values for percentiles 0.5 and 0.9](./94.0.5%EF%BC%8C0.9%E4%BD%8D%E7%BD%AE%E4%BC%B0%E7%AE%97.md)
- [Predict 95th quantile of I/O latency](./61.IO%E5%BB%B6%E8%BF%9F%E7%9A%8495%E5%88%86%E4%BD%8D%E6%95%B0%E9%A2%84%E6%B5%8B.md)
- [Predict CPU utilization](./62.CPU%E5%88%A9%E7%94%A8%E7%8E%87%E9%A2%84%E6%B5%8B.md)
- [Predict trend cycle curves](./63.%E8%B6%8B%E5%8A%BF%E5%91%A8%E6%9C%9F%E6%9B%B2%E7%BA%BF%E9%A2%84%E6%B5%8B.md)
- [Predict network latency](./64.%E7%BD%91%E7%BB%9C%E5%BB%B6%E6%97%B6%E9%A2%84%E6%B5%8B.md)
- [Predict network traffic](./65.%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E9%A2%84%E6%B5%8B.md)
- [2SPred](./66.2SPred.md)
- [Predict PVs](./67.%E8%AE%BF%E9%97%AE%E9%87%8F%E9%A2%84%E6%B5%8B.md)

## Interval-valued comparison functions and periodicity-valued comparison functions

- [Query the PV trend and day-to-day comparison from NGINX access logs](./6.nginx%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97%E7%9A%84PV%E8%B6%8B%E5%8A%BF%E5%90%8C%E6%AF%94%E6%98%A8%E6%97%A5.md)
- [Display yesterday's consumption and year-on-year comparison with last month](./20.%E5%B1%95%E7%A4%BA%E6%98%A8%E5%A4%A9%E7%9A%84%E6%B6%88%E8%B4%B9%E5%8F%8A%E4%B8%8E%E4%B8%8A%E6%9C%88%E7%9A%84%E5%90%8C%E6%AF%94.md)

## Window function

- [Display the proportion of consumption for each product this month](./19.%E5%B1%95%E7%A4%BA%E6%9C%AC%E6%9C%88%E6%B6%88%E8%B4%B9%E6%83%85%E5%86%B5%E5%90%84%E4%BA%A7%E5%93%81%E7%9A%84%E5%8D%A0%E6%AF%94.md)
- [Query the top 30 URIs with largest PVs per minute](./86.%E5%B1%95%E7%A4%BA%E6%AF%8F%E5%88%86%E9%92%9F%E5%89%8D30%E4%B8%AApv%E7%9A%84uri.md)
- [Query the maximum value in a window](./179.%E8%8E%B7%E5%8F%96%E7%AA%97%E5%8F%A3%E5%86%85%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BC.md)
- [Query the minimum value in a window](./180.%E8%8E%B7%E5%8F%96%E7%AA%97%E5%8F%A3%E5%86%85%E7%9A%84%E6%9C%80%E5%B0%8F%E5%80%BC.md)
- [Query a specific value in a window](./181.%E8%8E%B7%E5%8F%96%E7%AA%97%E5%8F%A3%E5%86%85%E6%8C%87%E5%AE%9A%E7%9A%84%E5%80%BC.md)
- [Query the values after the specified line in a window and return the default value if no value is available](./182.%E8%8E%B7%E5%8F%96%E7%AA%97%E5%8F%A3%E5%86%85%E6%8C%87%E5%AE%9A%E8%A1%8C%E4%B9%8B%E5%90%8E%E7%9A%84%E5%80%BC%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%B2%A1%E6%9C%89%E5%B0%B1%E7%BB%99%E4%BB%96%E4%B8%80%E4%B8%AA%E9%BB%98%E8%AE%A4%E5%80%BC.md)
- [Query the values before the specified line in a window and return the default value if no value is available](./183.%E8%8E%B7%E5%8F%96%E7%AA%97%E5%8F%A3%E5%86%85%E6%8C%87%E5%AE%9A%E8%A1%8C%E4%B9%8B%E5%90%8E%E7%9A%84%E5%80%BC%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%B2%A1%E6%9C%89%E5%B0%B1%E7%BB%99%E4%BB%96%E4%B8%80%E4%B8%AA%E9%BB%98%E8%AE%A4%E5%80%BC.md)

## Bitwise functions

- [Perform the AND operation on binary strings](./89.%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%B1%82and.md)

## Geospatial functions

- [Construct a point](./90.%E6%9E%84%E9%80%A0%E4%B8%80%E4%B8%AA%E7%82%B9.md)
- [Construct a point, line, or polygon](./125.%E6%9E%84%E9%80%A0%E7%82%B9%EF%BC%8C%E7%BA%BF%EF%BC%8C%E5%A4%9A%E8%BE%B9%E5%BD%A2.md)
- [Construct a spatial geometric entity and convert a spatial geometric entity into the WKT format](./126.%E6%9E%84%E9%80%A0%E7%A9%BA%E9%97%B4%E5%87%A0%E4%BD%95%E5%AE%9E%E4%BD%93%EF%BC%8C%E6%8A%8A%E7%A9%BA%E9%97%B4%E5%87%A0%E4%BD%95%E5%AE%9E%E4%BD%93%E8%BD%AC%E5%8F%98%E6%88%90WKT%E6%A0%BC%E5%BC%8F.md)
- [Obtain the polygon at a specific distance from a geometric entity](./127.%E8%8E%B7%E5%8F%96%E8%B7%9D%E7%A6%BB%E7%BB%93%E5%90%88%E5%9B%BE%E5%BD%A2%E4%B8%80%E5%AE%9A%E8%B7%9D%E7%A6%BB%E7%9A%84%E5%A4%9A%E8%BE%B9%E5%BD%A2.md)

## IP geolocation functions

- [Query the values of IP addresses after geohash encoding](./95.%E5%B1%95%E7%A4%BAIP%E7%BB%8F%E8%BF%87geohash%E7%BC%96%E7%A0%81%E4%B9%8B%E5%90%8E%E7%9A%84%E5%80%BC.md)
- [Convert an IP address to a geohash code based on the latitude and longitude](./123.%E6%A0%B9%E6%8D%AE%E7%BB%8F%E7%BA%AC%E5%BA%A6%E8%BD%AC%E6%8D%A2%E4%B8%BA%20geohash%20%E7%BC%96%E7%A0%81.md)

## Security check functions

- [Check IP address security](./93.ip%E5%AE%89%E5%85%A8%E6%A3%80%E6%B5%8B.md)
- [Collect statistics on the number of times that a domain is securely accessed per minute](./103.%E7%BB%9F%E8%AE%A1%E6%AF%8F%E5%88%86%E9%92%9F%20Domain%20%E5%87%BA%E7%8E%B0%E5%AE%89%E5%85%A8%E7%9A%84%E6%AC%A1%E6%95%B0.md)
- [Collect statistics on the number of times that a URL is securely accessed per minute](./104.%E7%BB%9F%E8%AE%A1%E6%AF%8F%E5%88%86%E9%92%9F%20url%20%E5%87%BA%E7%8E%B0%E5%AE%89%E5%85%A8%E7%9A%84%E6%AC%A1%E6%95%B0.md)

## Mobile number functions

- [Construct a point](./91.%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E6%89%80%E5%B1%9E%E7%9C%81%E4%BB%BD.md)
- [Query the city and ISP to which a mobile number belongs](./124.%E6%9F%A5%E8%AF%A2%E7%94%B5%E8%AF%9D%E5%BD%92%E5%B1%9E%E5%9C%B0%EF%BC%8C%E7%94%B5%E8%AF%9D%E8%BF%90%E8%90%A5.md)

## Time series clustering functions

- [Obtain a curve similar to a specific curve](./175.%E6%89%BE%E5%88%B0%E6%8C%87%E5%AE%9A%E6%9B%B2%E7%BA%BF%E7%9A%84%E7%9B%B8%E4%BC%BC%E6%9B%B2%E7%BA%BF.md)

## AI algorithm analysis functions

### Correlation analysis functions

- [Check the correlation between two metrics](./176.%E6%9F%A5%E7%9C%8B%E7%9B%AE%E6%A0%87%E6%8C%87%E6%A0%87%E4%B9%8B%E9%97%B4%E7%9A%84%E7%9B%B8%E5%85%B3%E6%80%A7%E5%80%BC.md)

### Smooth functions

- [Use the Holt Winters algorithm to filter time series data](./178.%E4%BD%BF%E7%94%A8%20Holt%20Winters%20%E7%AE%97%E6%B3%95%E5%AF%B9%E6%97%B6%E5%BA%8F%E6%95%B0%E6%8D%AE%E8%BF%9B%E8%A1%8C%E6%BB%A4%E6%B3%A2%E6%93%8D%E4%BD%9C.md)
