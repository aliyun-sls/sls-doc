# extraneous input '\*' expecting ...

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> extraneous input 'limit' expecting {'(', '?', 'ADD', 'ALL', 'SOME', 'ANY', 'AT', 'NOT', 'NO', 'EXISTS', 'NULL', 'TRUE', 'FALSE', 'SUBSTRING', 'POSITION', 'TINYINT', 'SMALLINT', 'INTEGER', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'ZONE', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'LOCALTIME', 'LOCALTIMESTAMP', 'EXTRACT', 'CASE', 'FILTER', 'OVER', 'PARTITION', 'RANGE', 'ROWS', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'SCHEMA', 'COMMENT', 'VIEW', 'REPLACE', 'GRANT', 'REVOKE', 'PRIVILEGES', 'PUBLIC', 'OPTION', 'EXPLAIN', 'ANALYZE', 'FORMAT', 'TYPE', 'TEXT', 'GRAPHVIZ', 'LOGICAL', 'DISTRIBUTED', 'VALIDATE', 'CAST', 'TRY_CAST', 'SHOW', 'TABLES', 'SCHEMAS', 'CATALOGS', 'COLUMNS', 'COLUMN', 'USE', 'PARTITIONS', 'FUNCTIONS', 'TO', 'SYSTEM', 'BERNOULLI', 'POISSONIZED', 'TABLESAMPLE', 'ARRAY', 'MAP', 'SET', 'RESET', 'SESSION', 'DATA', 'START', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'WORK', 'ISOLATION', 'LEVEL', 'SERIALIZABLE', 'REPEATABLE', 'COMMITTED', 'UNCOMMITTED', 'READ', 'WRITE', 'ONLY', 'CALL', 'INPUT', 'OUTPUT', 'CASCADE', 'RESTRICT', 'INCLUDING', 'EXCLUDING', 'PROPERTIES', 'NORMALIZE', 'NFD', 'NFC', 'NFKD', 'NFKC', 'IF', 'NULLIF', 'COALESCE', '+', '-', STRING, BINARY_LITERAL, INTEGER_VALUE, DECIMAL_VALUE, IDENTIFIER, DIGIT_IDENTIFIER, QUOTED_IDENTIFIER, BACKQUOTED_IDENTIFIER, DOUBLE_PRECISION}

## Error description

The SQL input contains extra information, which is expected to be a specific symbol.

## Cause

- Your input is incorrect and does not comply with the [Query statement | Analysis statement](https://www.alibabacloud.com/help/en/doc-detail/53608.html) syntax of Simple Log Service. The input may contain only an SQL analysis statement, without a pipe (|) or query statement before the analysis statement.
  Simple Log Service provides the combined query and analysis capabilities on log data. The query capability is similar to a search engine, and the analysis capability is similar to SQL.
  In the [Query statement | Analysis statement] self-developed syntax of Simple Log Service, a pipe (|) is used to combine the query and analysis capabilities. You can use the query statement before the pipe (|) to query the feature data that you need, and then use the analysis statement (standard SQL) after the pipe (|) to perform multi-dimensional statistical analysis on the queried valid data.
- Incorrect syntax or symbols are entered in the SQL statements.

## Solution

- Check whether the input statements are valid by referring to the description of the [Query statement | Analysis statement](https://www.alibabacloud.com/help/en/doc-detail/53608.html) syntax of Simple Log Service.
- - If the error persists, check whether the SQL statements contain extra symbols or syntax errors.We recommend that you use an online SQL check tool to locate and fix the error.
