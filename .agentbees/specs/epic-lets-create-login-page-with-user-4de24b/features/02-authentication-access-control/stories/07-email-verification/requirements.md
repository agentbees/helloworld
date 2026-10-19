# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Email verification' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Email verification
**User story:** As a newly registered user, I want to verify my email address, so that the system can confirm account ownership and enable verified-account access.

#### Acceptance criteria
1. WHEN registration completes with an unverified email address THEN the system SHALL create a single-use, time-limited verification token and SHALL send a verification message.
2. WHEN a user opens a valid unexpired verification token THEN the system SHALL mark the email address as verified and SHALL invalidate the token.
3. WHEN a user opens an expired, used, or malformed verification token THEN the system SHALL reject verification and SHALL provide a safe option to request a new message.
4. WHEN an unverified user requests a feature requiring verification THEN the system SHALL deny access and SHALL direct the user to verify the email address.
5. WHEN a user requests a new verification message THEN the system SHALL apply rate limiting and SHALL return a non-sensitive response.

#### Success criteria
- A valid verification token verifies an account exactly once within the configured expiration window.
- Unverified users cannot access verification-required features.
- Verification requests are rate-limited and automated tests cover valid, expired, reused, and malformed tokens.

**Measurement:** Measure verification completion rate, token success and failure outcomes, email delivery latency, and passing API/Playwright test cases.

**Security notes:** Single-use, time-limited verification token.
