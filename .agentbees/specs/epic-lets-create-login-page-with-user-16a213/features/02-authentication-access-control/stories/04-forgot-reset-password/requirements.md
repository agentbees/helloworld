# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot / Reset password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot / Reset password
**User story:** As a user who cannot remember my password, I want to reset it through a verified email link, so that I can regain secure access.

#### Acceptance criteria
1. WHEN a user submits a registered or unregistered email address for password recovery, THEN the system SHALL show the same non-enumerating confirmation message.
2. WHEN a recovery request is valid, THEN the system SHALL send a single-use, time-limited reset token through the configured email provider.
3. WHEN a user submits a valid reset token and a password meeting policy, THEN the system SHALL replace the password hash, invalidate applicable existing sessions, and mark the token as used.
4. WHEN a user submits an expired, used, or invalid reset token, THEN the system SHALL reject the request and SHALL not change the password.

#### Success criteria
- Reset tokens expire within the configured standard-security period and cannot be reused.
- Password recovery responses do not reveal whether an account exists.
- A successfully reset password can sign in, while the previous password cannot.

**Measurement:** Run Playwright reset flows with valid, expired, reused, and invalid tokens; verify session invalidation and database token state.

**Security notes:** Do not reveal whether the email exists; token TTL ~15-60m; invalidate other sessions on reset.
