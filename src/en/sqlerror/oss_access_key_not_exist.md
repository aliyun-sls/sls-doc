# The specified key does not exist.

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> The specified key does not exist.

## Error description

Generally, this error occurs when you associate Simple Log Service with Object Storage Service (OSS) to query data from an external table. In this case, access to the OSS bucket fails because the specified key does not exist.

## Cause

The specified object does not exist in the OSS bucket you access. The object may have been deleted or never exist.The possible cause is that you specified an incorrect OSS bucket endpoint or an incorrect object key.

## Solution

- Make sure that the OSS bucket and the key name of the object to access are correct.
- Log on to the OSS console to check whether the specified object key exists in the specified OSS bucket.
- If the error persists, submit a ticket to Simple Log Service for assistance.
