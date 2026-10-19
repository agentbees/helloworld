# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Sign in' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Sign in
**User story:** As a registered user, I want to sign in with my username and password, so that I can securely access my account.

#### Acceptance criteria
1. WHEN a user submits a valid username and password THEN Auth.js SHALL authenticate the user, SHALL create a secure session, and SHALL allow access to authorized pages.
2. WHEN a user submits an invalid username or password THEN the system SHALL reject authentication and SHALL display exactly a user-safe message such as "Invalid credentials" without identifying which field was incorrect.
3. WHEN authentication succeeds in a browser window opened by the application for the sign-in flow THEN the system SHALL close that window after the session is established.
4. WHEN authentication succeeds in a normal user-opened browser tab THEN the system SHALL retain the authenticated session and SHALL navigate to the configured post-login destination because browsers do not permit reliable closure of user-opened tabs.
5. WHEN a user submits credentials over an insecure transport THEN the system SHALL reject the request or redirect it to HTTPS before processing credentials.
6. WHEN an unauthenticated user requests a protected resource THEN the system SHALL redirect the user to the sign-in page.

#### Success criteria
- Valid users can sign in with a username and password and receive an authenticated session.
- Invalid credentials always produce the configured generic error message and never reveal whether the username exists.
- Playwright tests verify successful sign-in, invalid credentials, protected-route redirection, and the application-opened-window completion behavior.

**Measurement:** Measure authentication success and failure rates, inspect Auth.js session events, and execute Playwright end-to-end tests across supported browsers.

**Security notes:** Generic 'invalid credentials' message; rate-limit; constant-time comparison to avoid timing leaks.
