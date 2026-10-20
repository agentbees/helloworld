# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot username / account recovery' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot username / account recovery
**User story:** As a user who cannot remember my username, I want to recover my account using my verified email address, so that I can sign in without contacting support.

#### Acceptance criteria
1. WHEN a user submits an email address for username recovery, THEN the system SHALL show the same non-enumerating confirmation message regardless of account existence.
2. WHEN the email belongs to a verified account, THEN the system SHALL send recovery instructions containing the username or a secure account-recovery link.
3. WHEN the account email is unverified, THEN the system SHALL require email verification before disclosing the username.
4. WHEN a recovery request is rate limited, THEN the system SHALL delay or reject additional requests without revealing account existence.

#### Success criteria
- Recovery responses are indistinguishable for existing and non-existing email addresses.
- A verified user can recover the correct username through the configured email flow.
- Unverified accounts do not receive username disclosure.

**Measurement:** Compare response content and timing across known and unknown emails, and run Playwright tests for verified, unverified, and rate-limited accounts.

**Security notes:** Respond identically whether or not the account exists.
