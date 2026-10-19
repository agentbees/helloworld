# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot / Reset password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot / Reset password
**User story:** As a user who cannot remember my password, I want to request and complete a password reset, so that I can regain access securely.

#### Acceptance criteria
1. WHEN a user submits a username or registered email for password recovery THEN the system SHALL return the same non-sensitive response whether or not an account exists.
2. WHEN a recovery request matches an account THEN the system SHALL create a single-use, time-limited reset token and SHALL send reset instructions through the configured email service.
3. WHEN a user submits a valid unexpired reset token with a compliant new password THEN the system SHALL replace the stored bcrypt password hash and SHALL invalidate the token.
4. WHEN a user submits an expired, used, malformed, or otherwise invalid reset token THEN the system SHALL reject the reset and SHALL not change the password.
5. WHEN a password reset succeeds THEN the system SHALL invalidate existing sessions and SHALL require the user to sign in with the new password.
6. WHEN repeated reset requests exceed the configured rate limit THEN the system SHALL throttle requests without revealing whether an account exists.

#### Success criteria
- Valid reset tokens can be used exactly once and expire within the configured standard security window.
- A successfully reset password works for sign-in while the previous password no longer works.
- Reset requests do not disclose account existence and are rate-limited.
- Playwright and API tests cover valid, invalid, expired, reused-token, and throttled reset flows.

**Measurement:** Measure token issuance and consumption outcomes, verify token expiry and single-use behavior in integration tests, and review rate-limit and reset audit metrics.

**Security notes:** Do not reveal whether the email exists; token TTL ~15-60m; invalidate other sessions on reset.
