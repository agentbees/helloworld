# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot username / account recovery' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot username / account recovery
**User story:** As a user who cannot remember my username, I want to recover my account identifier securely, so that I can sign in without exposing account information.

#### Acceptance criteria
1. WHEN a user submits a registered email address for username recovery THEN the system SHALL send recovery instructions containing the username or a safe account-recovery link through the configured email service.
2. WHEN a user submits an unregistered email address THEN the system SHALL return the same response as for a registered address and SHALL not reveal whether an account exists.
3. WHEN a recovery request is submitted without a valid email format THEN the system SHALL reject the request and SHALL identify the input correction without exposing account data.
4. WHEN repeated recovery requests exceed the configured rate limit THEN the system SHALL throttle requests and SHALL record the event for monitoring.
5. WHEN a recovery message is generated THEN the system SHALL not include passwords, password hashes, reset tokens in URLs beyond their intended purpose, or other sensitive account data.

#### Success criteria
- A user with a verified registered email receives usable recovery instructions within the configured delivery target.
- Unregistered and registered email requests produce indistinguishable user-facing responses.
- Recovery requests are rate-limited and covered by automated API and Playwright tests.

**Measurement:** Measure email delivery success and latency, compare responses for registered and unregistered addresses, and review rate-limit and security-event metrics.

**Security notes:** Respond identically whether or not the account exists.
