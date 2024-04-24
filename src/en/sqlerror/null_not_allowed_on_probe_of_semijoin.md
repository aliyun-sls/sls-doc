# NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.

## Error description

Null values are not allowed on the probe side of the SemiJoin operator.

## Cause

In a semi-join, null values cannot appear on the probe side. Otherwise, the semi-join cannot be executed.The possible cause is that a null value is returned for a row record in the probe table or a subquery during the query.

## Solution

Check the query plan to determine the table that returns the null value.If the query plan involves subqueries, make sure that the result set returned by the subqueries does not contain a null value.If the error is caused by a null value in an external table, you can replace the semi-join with an inner-join, or use the COALESCE or ISNULL function to process the null value.
