# Unexpected parameters (bigint) for function url_decode. Expected: url_decode(varchar(x))

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Unexpected parameters (bigint) for function url_decode. Expected: url_decode(varchar(x))

## Error description

The SQL statement fails due to a syntax error caused by an incorrectly specified input parameter type within an SQL function.

## Cause

- The function expects an input parameter of the STRING type, but receives a BIGINT type instead.
- This error may occur in different functions, such as _url_decode_ and _regexp_like_. However, the underlying error cause, namely, a mismatch of the expected and provided input parameter types, remains consistent.

## Solution

Convert the input parameter type to STRING before you pass the parameter to the url_decode function.You can use the CAST or CONVERT function to convert the parameter type from BIGINT to STRING. You can also enclose the parameter in quotation marks to convert the type to STRING when you invoke the url_decode function.  
Sample code:

```SQL
SELECT url_decode(CAST(bigint_param AS varchar(20))) -- Use the CAST function to convert the parameter type from BIGINT to STRING.

SELECT url_decode('123456789') -- If the parameter is a literal, you can directly enclose the parameter to convert the type to STRING.

```
