# mismatched input '\*' expecting ...

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> line 1:76: mismatched input '$' expecting {'(', '?', 'ADD', 'ALL', 'SOME', 'ANY', 'AT', 'NO', 'EXISTS', 'NULL', 'TRUE', 'FALSE', 'SUBSTRING', 'POSITION', 'TINYINT', 'SMALLINT', 'INTEGER', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'ZONE', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'LOCALTIME', 'LOCALTIMESTAMP', 'EXTRACT', 'CASE', 'FILTER', 'OVER', 'PARTITION', 'RANGE', 'ROWS', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'SCHEMA', 'COMMENT', 'VIEW', 'REPLACE', 'GRANT', 'REVOKE', 'PRIVILEGES', 'PUBLIC', 'OPTION', 'EXPLAIN', 'ANALYZE', 'FORMAT', 'TYPE', 'TEXT', 'GRAPHVIZ', 'LOGICAL', 'DISTRIBUTED', 'VALIDATE', 'CAST', 'TRY_CAST', 'SHOW', 'TABLES', 'SCHEMAS', 'CATALOGS', 'COLUMNS', 'COLUMN', 'USE', 'PARTITIONS', 'FUNCTIONS', 'TO', 'SYSTEM', 'BERNOULLI', 'POISSONIZED', 'TABLESAMPLE', 'ARRAY', 'MAP', 'SET', 'RESET', 'SESSION', 'DATA', 'START', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'WORK', 'ISOLATION', 'LEVEL', 'SERIALIZABLE', 'REPEATABLE', 'COMMITTED', 'UNCOMMITTED', 'READ', 'WRITE', 'ONLY', 'CALL', 'INPUT', 'OUTPUT', 'CASCADE', 'RESTRICT', 'INCLUDING', 'EXCLUDING', 'PROPERTIES', 'NORMALIZE', 'NFD', 'NFC', 'NFKD', 'NFKC', 'IF', 'NULLIF', 'COALESCE', '+', '-', STRING, BINARY_LITERAL, INTEGER_VALUE, DECIMAL_VALUE, IDENTIFIER, DIGIT_IDENTIFIER, QUOTED_IDENTIFIER, BACKQUOTED_IDENTIFIER, DOUBLE_PRECISION}

## Error description

The SQL statement has a syntax error, or an input character does not meet expectations.

## Cause

The SQL statement contains unrecognized characters or operators. For example, part of the parentheses or quotation marks is missing or the operator is incorrect.

## Solution

Check whether the SQL statement contains a syntax error. If yes, fix the error accordingly.You can use an SQL editing tool or online SQL verification tool for verification and debugging.We recommend that you build the SQL statement step by step to ensure that each part can be correctly executed. This prevents syntax errors.
