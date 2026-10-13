# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Forgot username / account recovery' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Forgot username / account recovery
**User story:** As a user who cannot remember my username, I want to recover my account identifier through a verified contact method, so that I can sign in without exposing account information.

#### Acceptance criteria
1. WHEN a user submits a registered recovery email address THEN the application SHALL send or queue a recovery message containing the username or a secure recovery link.
2. WHEN a user submits an unregistered recovery address THEN the application SHALL return the same generic response used for registered addresses.
3. WHEN a recovery link is invalid, expired, or already used THEN the application SHALL reject it and SHALL not disclose account details.
4. THE application SHALL rate-limit recovery requests and SHALL not expose usernames in URLs, client logs, or unauthenticated responses.

#### Success criteria
- A verified account owner can recover the username through the configured recovery channel.
- Unregistered addresses produce indistinguishable responses.
- Invalid recovery links do not reveal account information.

**Measurement:** Test registered and unregistered recovery flows with Playwright and inspect response consistency, token expiry, and rate-limit behavior.

**Security notes:** Respond identically whether or not the account exists.
