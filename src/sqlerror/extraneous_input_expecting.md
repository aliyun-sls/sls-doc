# extraneous input '*' expecting ...
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> extraneous input 'limit' expecting {'(', '?', 'ADD', 'ALL', 'SOME', 'ANY', 'AT', 'NOT', 'NO', 'EXISTS', 'NULL', 'TRUE', 'FALSE', 'SUBSTRING', 'POSITION', 'TINYINT', 'SMALLINT', 'INTEGER', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'ZONE', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'LOCALTIME', 'LOCALTIMESTAMP', 'EXTRACT', 'CASE', 'FILTER', 'OVER', 'PARTITION', 'RANGE', 'ROWS', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'SCHEMA', 'COMMENT', 'VIEW', 'REPLACE', 'GRANT', 'REVOKE', 'PRIVILEGES', 'PUBLIC', 'OPTION', 'EXPLAIN', 'ANALYZE', 'FORMAT', 'TYPE', 'TEXT', 'GRAPHVIZ', 'LOGICAL', 'DISTRIBUTED', 'VALIDATE', 'CAST', 'TRY_CAST', 'SHOW', 'TABLES', 'SCHEMAS', 'CATALOGS', 'COLUMNS', 'COLUMN', 'USE', 'PARTITIONS', 'FUNCTIONS', 'TO', 'SYSTEM', 'BERNOULLI', 'POISSONIZED', 'TABLESAMPLE', 'ARRAY', 'MAP', 'SET', 'RESET', 'SESSION', 'DATA', 'START', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'WORK', 'ISOLATION', 'LEVEL', 'SERIALIZABLE', 'REPEATABLE', 'COMMITTED', 'UNCOMMITTED', 'READ', 'WRITE', 'ONLY', 'CALL', 'INPUT', 'OUTPUT', 'CASCADE', 'RESTRICT', 'INCLUDING', 'EXCLUDING', 'PROPERTIES', 'NORMALIZE', 'NFD', 'NFC', 'NFKD', 'NFKC', 'IF', 'NULLIF', 'COALESCE', '+', '-', STRING, BINARY_LITERAL, INTEGER_VALUE, DECIMAL_VALUE, IDENTIFIER, DIGIT_IDENTIFIER, QUOTED_IDENTIFIER, BACKQUOTED_IDENTIFIER, DOUBLE_PRECISION}

## 错误描述
SQL中出现多余的输入，期望某个符号。

## 可能原因
- 您未按照SLS [查询 | 分析](https://help.aliyun.com/document_detail/53608.html) 语法正确输入，可能只输入SQL语句，而没有输入|及前面的查询语句。  
解释：SLS同时提供了对日志数据的查询和分析能力，这其实是两块能力的组合：查询（类搜索引擎）、分析（类SQL）。  
SLS以自研语法：**<查询> | <分析>**，通过管道符|将上述两块能力有效联结起来，您可以通过|前面的查询语句有效过滤你需要的特征数据，然后通过|后面的分析语句（标准SQL）对过滤后的有效数据进行多维度的统计分析。
- 您在SQL语句中输入了不正确的语法或符号。

## 解决方法
- 参阅SLS [查询 | 分析](https://help.aliyun.com/document_detail/53608.html) 语法说明，并检查输入语句是否合法
- 如上述没有问题，请检查SQL中是否有多余的符号或语法错误。建议使用在线SQL检查工具来定位错误，并进行修正。  