# Too many queued queries

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Too many queued queries

## Error description

The number of concurrent SQL requests in your current project exceeds the upper limit, which is 15 in standard SQL mode and 150 in enhanced SQL mode.

## Principle explanation

_SQL concurrency in Simple Log Service:_
The SQL concurrency quota provided by Simple Log Service is exclusively used for a user project. Multiple SQL requests in the same project are submitted to the Simple Log Service server, and each ongoing SQL request occupies one unit of the SQL concurrency quota. When SQL execution is complete, the allocated unit of the SQL concurrency quota is reclaimed.
The SQL concurrency quota of a user project is 15 in standard SQL mode and 150 in enhanced SQL mode.

## Cause

- The number of concurrent requests is too high.
- The latency of a single SQL request is too high.
- The retry logic for processing SQL request exceptions in your business code leads to many retry loops.

## Solution

- Reduce the number of requests.
- Optimize the SQL statement to reduce the execution latency of a single SQL request.
- Add a random waiting time to the retry logic to prevent invalid retry loops that can increase the pressure from concurrent requests.

> SamplA built-in command line interface (CLI) is provided for you to perform self-service queries.e code:
