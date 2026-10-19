# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Sign in' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Sign in
**User story:** As a registered user, I want to sign in with my username and password, so that I can access my account securely.

#### Acceptance criteria
1. WHEN a user submits a valid username and password THEN Auth.js SHALL authenticate the user and SHALL establish a secure session.
2. WHEN a user submits an invalid username or password THEN the application SHALL display exactly or equivalently a clear "Invalid credentials" message and SHALL not establish a session.
3. WHEN sign-in succeeds in a browser window opened by the application for authentication THEN the application SHALL close that authentication window; WHEN the main browser window is not script-closeable THEN the application SHALL complete sign-in and display the authenticated state without attempting to close the user's browser.
4. WHEN a user submits credentials for an unverified account THEN the application SHALL prevent access to protected resources and SHALL direct the user to email verification.
5. WHEN a user has exceeded the configured failed-attempt threshold THEN the application SHALL deny sign-in and SHALL display a non-sensitive lockout message.

#### Success criteria
- Valid credentials establish an authenticated Auth.js session.
- Invalid credentials consistently show a non-sensitive invalid-credentials error and create no session.
- Protected routes remain inaccessible to unauthenticated or unverified users.

**Measurement:** Run Playwright tests for successful, invalid, unverified, and locked-account sign-in; verify session cookies and protected-route responses.

**Security notes:** Generic 'invalid credentials' message; rate-limit; constant-time comparison to avoid timing leaks.
