# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Change password' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Change password
**User story:** As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.

#### Acceptance criteria
1. WHEN an authenticated user submits the current password and a compliant new password THEN the system SHALL update the stored password hash and SHALL invalidate all other active sessions.
2. WHEN an authenticated user submits an incorrect current password THEN the system SHALL reject the change and SHALL leave the existing password unchanged.
3. WHEN the new password fails the configured password policy or matches the current password THEN the system SHALL reject the change and SHALL explain the applicable requirement without exposing sensitive data.
4. WHEN a password change succeeds THEN the system SHALL require the user to authenticate again before accessing protected content.

#### Success criteria
- Users can change passwords only after proving knowledge of the current password.
- Old passwords no longer authenticate after a successful change.
- Existing sessions are invalidated after the change.

**Measurement:** Playwright tests verify successful and unsuccessful changes, old-password rejection, session invalidation, and password-policy enforcement.

**Security notes:** Require current password; enforce password policy; consider invalidating other sessions.
