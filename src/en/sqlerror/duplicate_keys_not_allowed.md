# Duplicate keys (version) are not allowed

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Duplicate keys (version) are not allowed

## Error description

Duplicate keys are not allowed.

## Cause

The Logstore may contain duplicate version columns. This may be caused by incorrect configurations during index field creation.

## Solution

Determine the type of the version column to be retained in the Logstore and delete the other conflicting version columns.
