# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Sign in' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Sign in
**User story:** As a registered user, I want to sign in with my username and password, so that I can access the authenticated hello world page.

#### Acceptance criteria
1. WHEN a registered user submits valid username and password credentials THEN Auth.js SHALL authenticate the user and the application SHALL display the static "Hello World" page.
2. WHEN a user submits an unknown username or incorrect password THEN the application SHALL deny authentication and display a generic invalid-credentials error.
3. WHEN an unauthenticated user requests the protected hello world page THEN the application SHALL redirect the user to the login page.
4. WHEN a user submits the login form with a missing username or password THEN the application SHALL display validation feedback and SHALL not attempt authentication.
5. THE application SHALL create an authenticated session only after successful credential verification.

#### Success criteria
- Valid credentials reach the static hello world page.
- Invalid credentials cannot create a session or access the protected page.
- Unauthenticated access is redirected to login.
- The login flow works through the approved Next.js, React, TypeScript, Auth.js, Prisma, and PostgreSQL stack.

**Measurement:** Run Playwright tests for valid, invalid, incomplete, and unauthenticated flows; verify session state and protected-route responses.

**Security notes:** Generic 'invalid credentials' message; rate-limit; constant-time comparison to avoid timing leaks.
