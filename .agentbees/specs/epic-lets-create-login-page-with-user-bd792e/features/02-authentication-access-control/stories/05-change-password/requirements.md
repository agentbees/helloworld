# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Change password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Change password
**User story:** As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.

#### Acceptance criteria
1. WHEN an authenticated user submits the correct current password and a new password meeting policy THEN the application SHALL update the stored password hash.
2. WHEN an authenticated user submits an incorrect current password THEN the application SHALL reject the change and SHALL not modify the stored password.
3. WHEN the new password is missing, weak, or equal to the current password THEN the application SHALL reject the change and SHALL identify the applicable requirement.
4. WHEN a password change succeeds THEN the application SHALL invalidate other active sessions and SHALL require re-authentication where appropriate.

#### Success criteria
- Users can change passwords only after current-password verification.
- Weak or incorrect-password requests do not alter account credentials.
- Other active sessions are invalidated after a successful change.

**Measurement:** Run Playwright and API tests for valid, invalid, weak, and repeated-password cases; verify password hashes and session invalidation in PostgreSQL/Auth.js.

**Security notes:** Require current password; enforce password policy; consider invalidating other sessions.
