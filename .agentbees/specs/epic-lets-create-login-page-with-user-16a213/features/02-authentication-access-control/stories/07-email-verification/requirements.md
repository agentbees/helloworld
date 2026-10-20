# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Email verification' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Email verification
**User story:** As a newly registered user, I want to verify my email address, so that account recovery and account ownership can be trusted.

#### Acceptance criteria
1. WHEN a user opens a valid, unexpired verification link, THEN the system SHALL mark the email address as verified and SHALL invalidate the token.
2. WHEN a user opens an expired, malformed, or previously used verification link, THEN the system SHALL reject it and SHALL leave the email unverified.
3. WHEN a user requests another verification email, THEN the system SHALL issue a new time-limited token and SHALL rate limit repeated requests.
4. WHEN a user has not verified the email address, THEN the system SHALL restrict features configured to require verification and SHALL explain how to verify.

#### Success criteria
- Valid verification links succeed once and cannot be reused.
- Expired and invalid links never change verification status.
- Verification resend requests are rate limited.

**Measurement:** Test token lifecycle and feature gating with Playwright, and inspect verification status and token invalidation in PostgreSQL.

**Security notes:** Single-use, time-limited verification token.
