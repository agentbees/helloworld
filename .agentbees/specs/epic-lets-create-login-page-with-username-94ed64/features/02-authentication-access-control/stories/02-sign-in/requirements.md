# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Sign in' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Sign in
**User story:** As a registered user, I want to sign in with my username and password, so that I can securely access the application and see the requested Hello World page.

#### Acceptance criteria
1. WHEN a registered user submits valid credentials THEN Auth.js SHALL authenticate the user and SHALL establish a secure session.
2. WHEN an authenticated user completes sign-in THEN the application SHALL redirect the user to a static page displaying exactly "Hello World".
3. WHEN a user submits invalid credentials THEN the system SHALL deny authentication and SHALL display a generic error that does not reveal whether the username exists.
4. WHEN an unverified user submits otherwise valid credentials THEN the system SHALL prevent access to protected content and SHALL direct the user to email verification guidance.
5. WHEN an unauthenticated user requests the protected Hello World page THEN the application SHALL redirect the user to the sign-in page.

#### Success criteria
- Valid verified users reach the Hello World page after sign-in.
- Invalid credentials never create an authenticated session.
- Unauthenticated users cannot access the protected page directly.

**Measurement:** Playwright tests verify successful sign-in and Hello World rendering, invalid-credential behavior, verified-account enforcement, and protected-route redirection.

**Security notes:** Generic 'invalid credentials' message; rate-limit; constant-time comparison to avoid timing leaks.
