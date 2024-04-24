# denied by sts or ram, action:\*

**ErrorCode**

> Unauthorized

**ErrorMessage**

```
denied by sts or ram, action: log:GetLogStoreLogs, resource: acs:log:<region>:<uid>:project/<project>/logstore/<logstore>
```

## Error description

You do not have the permissions to query the current Logstore.

## Cause

- You are not granted the permissions on the Logstore.

## Solution

- Grant the read permissions on the Logstore to your Resource Access Management (RAM) identity. Sample code for resource authorization:

```
action: log:GetLogStoreLogs, resource: acs:log:<region>:<uid>:project/<project>/logstore/<logstore>
```

> SamplA built-in command line interface (CLI) is provided for you to perform self-service queries.e code:
