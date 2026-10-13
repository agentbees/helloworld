# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Email verification' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Email verification
**User story:** As a newly registered user, I want to verify my email address, so that my account can be activated and protected from unauthorized use.

#### Acceptance criteria
1. WHEN a user opens a valid, unexpired email-verification token THEN the system SHALL mark the email as verified, invalidate the token, and display a confirmation page.
2. WHEN a user opens an invalid, expired, or previously used verification token THEN the system SHALL leave the account unverified and SHALL display safe retry guidance.
3. WHEN an unverified user requests a new verification email THEN the system SHALL issue a new single-use, time-limited token and SHALL invalidate the previous token.
4. WHEN a verified user requests email verification again THEN the system SHALL provide a safe confirmation response without generating unnecessary tokens.

#### Success criteria
- Valid verification links activate the account exactly once.
- Unverified accounts cannot access the protected Hello World page.
- Expired or reused verification links cannot activate an account.

**Measurement:** Playwright tests cover valid, invalid, expired, and reused tokens, resend behavior, account status changes, and protected-page access.

**Security notes:** Single-use, time-limited verification token.
