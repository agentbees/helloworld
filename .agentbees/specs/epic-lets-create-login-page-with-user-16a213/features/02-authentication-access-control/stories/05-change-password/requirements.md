# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Change password' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Change password
**User story:** As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.

#### Acceptance criteria
1. WHEN an authenticated user submits the correct current password and a new password meeting policy, THEN the system SHALL update the stored password hash.
2. WHEN the current password is incorrect, THEN the system SHALL reject the change and SHALL leave the existing password unchanged.
3. WHEN the new password is invalid or matches the current password, THEN the system SHALL reject the change and SHALL explain the applicable validation rule without exposing sensitive data.
4. WHEN a password change succeeds, THEN the system SHALL invalidate other active sessions and SHALL require the user to authenticate again where configured.

#### Success criteria
- Valid password changes succeed in all supported browser tests.
- Incorrect current passwords never modify the password hash.
- Old passwords fail authentication after a successful change.

**Measurement:** Execute positive and negative Playwright scenarios and verify authentication behavior and session records through Prisma-backed test assertions.

**Security notes:** Require current password; enforce password policy; consider invalidating other sessions.
