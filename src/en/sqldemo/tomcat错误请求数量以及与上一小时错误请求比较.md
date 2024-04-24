The internal SQL statement obtains the number of requests for which the status code is greater than or equal to 400. The middle SQL statement uses the compare function to obtain the data 3,600 seconds ago. In the outer SQL statement, c1 indicates the number of errors at the current time, c2 indicates the number of errors 3,600 seconds ago, and c3 indicates the ratio of c1 to c2, which shows the trend. The trend is displayed in an hour-to-hour comparison chart, in which c1 is the display value and c3 is the ratio.

```sql
status >= 400 |
SELECT
  diff [1] AS c1,
  diff [2] AS c2,
  round(diff [1] * 100.0 / diff [2] - 100.0, 2) AS c3
FROM
  (
    select
      compare(c, 3600) AS diff
    from
      (
        select
          count(1) as c
        from
          log
      )
  )
```
