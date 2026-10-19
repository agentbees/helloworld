# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Change password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Change password
**User story:** As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.

#### Acceptance criteria
1. WHEN an authenticated user submits the correct current password and a compliant new password THEN the system SHALL store the new password as a bcrypt hash and SHALL confirm the change.
2. WHEN the current password is incorrect THEN the system SHALL reject the request and SHALL not modify the password.
3. WHEN the new password fails configured complexity or matches the current password THEN the system SHALL reject the request and SHALL explain the required correction without exposing sensitive data.
4. WHEN a password change succeeds THEN the system SHALL invalidate other active sessions and SHALL retain or reissue only the current session according to the session policy.
5. WHEN an unauthenticated user requests password change THEN the system SHALL deny the request and SHALL require authentication.

#### Success criteria
- The new password authenticates successfully and the previous password fails after a successful change.
- Other active sessions are invalidated according to the documented policy.
- No plaintext password is logged or stored, and automated tests cover success and validation failures.

**Measurement:** Run integration tests for password replacement and session invalidation, inspect database hashes and logs, and measure successful versus rejected password-change requests.

**Security notes:** Require current password; enforce password policy; consider invalidating other sessions.
