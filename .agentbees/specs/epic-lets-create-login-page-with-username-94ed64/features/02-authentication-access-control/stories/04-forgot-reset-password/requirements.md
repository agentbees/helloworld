# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Forgot / Reset password' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Forgot / Reset password
**User story:** As a user who cannot remember my password, I want to request and complete a password reset, so that I can regain access to my account securely.

#### Acceptance criteria
1. WHEN a visitor submits an email address on the password-reset request page THEN the system SHALL show the same confirmation response whether or not an account exists for that address.
2. WHEN a known account requests a reset THEN the system SHALL create a single-use, time-limited reset token and SHALL send reset instructions without storing the plaintext password.
3. WHEN a user submits a valid, unexpired reset token and a compliant new password THEN the system SHALL update the password hash, invalidate the token, and invalidate existing sessions.
4. WHEN a user submits an invalid, expired, or previously used reset token THEN the system SHALL reject the reset and SHALL provide a safe recovery message.
5. WHEN a user completes a password reset THEN the system SHALL direct the user to sign in again rather than automatically authenticating the user.

#### Success criteria
- Valid reset tokens allow a password change exactly once within the configured expiry period.
- Invalid and expired tokens cannot change passwords.
- Reset requests do not disclose whether an email address is registered.

**Measurement:** Playwright tests cover reset request privacy, successful reset, token reuse, token expiry, session invalidation, and required re-authentication.

**Security notes:** Do not reveal whether the email exists; token TTL ~15-60m; invalidate other sessions on reset.
