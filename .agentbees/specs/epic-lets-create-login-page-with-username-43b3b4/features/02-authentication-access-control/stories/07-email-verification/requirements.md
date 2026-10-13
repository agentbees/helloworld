# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Email verification' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Email verification
**User story:** As a newly registered user, I want to verify my email address, so that account recovery and security notifications can use a trusted contact method.

#### Acceptance criteria
1. WHEN a user follows a valid, unexpired, single-use verification link THEN the application SHALL mark the email address as verified.
2. WHEN a verification token is invalid, expired, or already used THEN the application SHALL reject it and SHALL leave the email unverified.
3. WHEN an unverified user requests a new verification message THEN the application SHALL issue a new time-limited token and SHALL rate-limit repeated requests.
4. THE application SHALL use a generic verification response that does not expose unrelated account details.

#### Success criteria
- Valid verification links mark the correct account as verified once.
- Invalid and reused links cannot verify an account.
- Repeated verification requests are rate-limited.

**Measurement:** Use integration and Playwright tests to verify token lifecycle, account status changes, and throttling.

**Security notes:** Single-use, time-limited verification token.
