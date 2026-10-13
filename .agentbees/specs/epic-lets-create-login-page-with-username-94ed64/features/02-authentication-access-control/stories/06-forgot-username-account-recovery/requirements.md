# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Forgot username / account recovery' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Forgot username / account recovery
**User story:** As a user who cannot remember my username, I want to recover my account identifier securely, so that I can sign in without exposing account information.

#### Acceptance criteria
1. WHEN a visitor submits an email address to the username-recovery form THEN the system SHALL show a generic confirmation response regardless of whether the email is registered.
2. WHEN the email belongs to an account THEN the system SHALL send the username through the configured recovery channel without displaying it in the browser response.
3. WHEN a recovery request is submitted repeatedly for the same address THEN the system SHALL apply rate limiting and SHALL avoid revealing account existence.
4. WHEN an account has no verified recovery email THEN the system SHALL provide safe generic guidance without exposing account details.

#### Success criteria
- Known users can receive their username through the configured recovery channel.
- Unknown email addresses produce the same externally visible response as known addresses.
- Recovery requests are rate limited.

**Measurement:** Playwright tests compare responses for known and unknown addresses, verify successful recovery delivery behavior, and verify rate-limit enforcement.

**Security notes:** Respond identically whether or not the account exists.
