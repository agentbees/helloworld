# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Change password' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Change password
**User story:** As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.

#### Acceptance criteria
1. WHEN an authenticated user submits the current password and a valid matching new password pair THEN the application SHALL update the stored password hash.
2. WHEN the submitted current password is incorrect THEN the application SHALL reject the request and SHALL not change the password.
3. WHEN the new password and confirmation do not match or fail password policy THEN the application SHALL display validation feedback and SHALL not update the password.
4. WHEN a password change succeeds THEN the application SHALL invalidate other active sessions for the account and SHALL require reauthentication where configured.

#### Success criteria
- Only the verified account owner can change the password.
- A successful change permits sign in with the new password and rejects the old password.
- Invalid change requests leave the stored password unchanged.

**Measurement:** Execute Playwright and API tests for valid and invalid changes; verify authentication behavior and session invalidation.

**Security notes:** Require current password; enforce password policy; consider invalidating other sessions.
