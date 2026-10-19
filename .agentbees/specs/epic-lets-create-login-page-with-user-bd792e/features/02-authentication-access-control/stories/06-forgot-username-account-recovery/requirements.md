# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Forgot username / account recovery' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Forgot username / account recovery
**User story:** As a user who has forgotten a username, I want to recover account access using my verified email address, so that I can sign in without exposing account information.

#### Acceptance criteria
1. WHEN a user submits an email address for username recovery THEN the application SHALL return the same non-sensitive response whether or not the email is registered.
2. WHEN a registered and verified email is submitted THEN the application SHALL send recovery instructions containing the username or a safe recovery link without revealing the username in the browser response.
3. WHEN an unverified or unknown email is submitted THEN the application SHALL not disclose account existence or username details.
4. WHEN a recovery link is invalid or expired THEN the application SHALL reject it and SHALL provide a safe way to restart recovery.

#### Success criteria
- Users with verified email addresses can recover their username through the configured recovery channel.
- Unknown and unverified accounts receive indistinguishable responses from known accounts.

**Measurement:** Test known, unknown, unverified, expired, and malformed recovery requests and compare response content, status, and timing within an accepted tolerance.

**Security notes:** Respond identically whether or not the account exists.
