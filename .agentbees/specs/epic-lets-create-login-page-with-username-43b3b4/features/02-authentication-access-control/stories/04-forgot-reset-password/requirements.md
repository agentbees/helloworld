# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Forgot / Reset password' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Forgot / Reset password
**User story:** As a user who cannot remember my password, I want to request and complete a password reset, so that I can regain access securely.

#### Acceptance criteria
1. WHEN a user submits a registered account identifier to the forgot-password form THEN the application SHALL provide a reset response that does not reveal whether the account exists.
2. WHEN a valid, unexpired, single-use reset token is submitted with a valid new password THEN the application SHALL replace the stored password hash and SHALL invalidate the token.
3. WHEN an expired, invalid, or previously used reset token is submitted THEN the application SHALL reject the reset and SHALL not change the password.
4. WHEN a password reset succeeds THEN the application SHALL invalidate existing sessions for that account and SHALL require sign in with the new password.
5. THE application SHALL never include plaintext passwords in reset links, logs, or responses.

#### Success criteria
- A valid reset token changes the password exactly once.
- Invalid or reused tokens cannot change credentials.
- Reset responses do not disclose account existence.
- Existing sessions are invalidated after a successful reset.

**Measurement:** Test token issuance and reset scenarios with Playwright and integration tests; inspect session and password-hash changes in PostgreSQL.

**Security notes:** Do not reveal whether the email exists; token TTL ~15-60m; invalidate other sessions on reset.
