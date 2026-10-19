# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Email verification' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Email verification
**User story:** As a newly registered user, I want to verify my email address, so that my account can be activated securely.

#### Acceptance criteria
1. WHEN a user follows a valid, unexpired email-verification link THEN the application SHALL mark the email as verified and SHALL allow the user to continue to sign in.
2. WHEN a user follows an expired, reused, or malformed verification link THEN the application SHALL reject the link and SHALL offer a resend option.
3. WHEN a user requests another verification email THEN the application SHALL invalidate earlier verification tokens and SHALL rate-limit resend requests.
4. WHEN an account has not been verified THEN the application SHALL prevent access to protected features requiring verified email.

#### Success criteria
- A valid verification link changes the account to verified exactly once.
- Invalid links cannot verify accounts, and resend requests are rate-limited.
- Unverified accounts cannot access protected features.

**Measurement:** Run Playwright verification tests with valid, expired, reused, and repeated tokens and verify the account status in PostgreSQL.

**Security notes:** Single-use, time-limited verification token.
