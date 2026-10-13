# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Sign out' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Sign out
**User story:** As an authenticated user, I want to sign out, so that my session cannot be reused on a shared device.

#### Acceptance criteria
1. WHEN an authenticated user selects sign out THEN Auth.js SHALL invalidate the active session and the application SHALL redirect to the login page.
2. WHEN a signed-out user requests the protected hello world page THEN the application SHALL deny access and SHALL redirect to login.
3. WHEN a user reloads the browser after signing out THEN the application SHALL not restore the invalidated authenticated session.

#### Success criteria
- Sign out invalidates the active session within one request.
- Signed-out users cannot access the hello world page.
- The browser is returned to the login page after sign out.

**Measurement:** Use Playwright to sign in, sign out, reload, and request the protected route; verify the session is absent.

**Security notes:** Invalidate server-side session/token; clear cookies.
