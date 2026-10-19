# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot / Reset password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot / Reset password
**User story:** As a user who has forgotten a password, I want to request and complete a password reset, so that I can regain secure access to my account.

#### Acceptance criteria
1. WHEN a user submits a registered or unregistered email address for password recovery THEN the application SHALL return the same non-sensitive response for both cases.
2. WHEN a password-reset request is valid THEN the application SHALL generate a single-use, time-limited reset token and SHALL not store the token in plaintext.
3. WHEN a user submits a valid, unexpired reset token and a password meeting policy THEN the application SHALL replace the existing password with a secure hash and SHALL invalidate the token.
4. WHEN a user submits an expired, reused, malformed, or invalid reset token THEN the application SHALL reject the reset and SHALL display a safe error message.
5. WHEN a password reset succeeds THEN the application SHALL invalidate existing sessions and SHALL require sign-in with the new password.

#### Success criteria
- Valid reset tokens allow one successful password change within their expiry period.
- Invalid, expired, and reused tokens cannot change passwords.
- Password-reset requests do not reveal whether an account exists.

**Measurement:** Run automated reset-flow tests and verify token expiry, single use, hashing, session invalidation, and identical response behavior for known and unknown accounts.

**Security notes:** Do not reveal whether the email exists; token TTL ~15-60m; invalidate other sessions on reset.
