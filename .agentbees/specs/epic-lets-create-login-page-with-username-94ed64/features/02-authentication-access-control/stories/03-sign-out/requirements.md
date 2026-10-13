# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Sign out' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Sign out
**User story:** As an authenticated user, I want to sign out, so that my session cannot be reused by someone else on the device.

#### Acceptance criteria
1. WHEN an authenticated user selects sign out THEN Auth.js SHALL invalidate the active session and SHALL redirect the user to the sign-in page.
2. WHEN a signed-out user requests the protected Hello World page THEN the application SHALL deny access and SHALL redirect the user to sign in.
3. WHEN a user signs out THEN the system SHALL remove or invalidate the session cookie using secure cookie settings.

#### Success criteria
- Signing out immediately prevents access to protected content using the previous session.
- Users are returned to the sign-in page after sign-out.

**Measurement:** Playwright tests verify sign-out redirection, failed access with the prior session, and absence or invalidation of the session cookie.

**Security notes:** Invalidate server-side session/token; clear cookies.
