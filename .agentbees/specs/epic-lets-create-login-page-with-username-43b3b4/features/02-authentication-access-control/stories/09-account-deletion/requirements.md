# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Account deletion' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Account deletion
**User story:** As an authenticated user, I want to delete my account, so that I can remove my personal data and stop using the service.

#### Acceptance criteria
1. WHEN an authenticated user confirms account deletion with the required credential or reauthentication step THEN the application SHALL delete or anonymize the account and associated personal data according to the retention policy.
2. WHEN an unauthenticated or unauthorised user requests account deletion THEN the application SHALL reject the request.
3. WHEN account deletion succeeds THEN the application SHALL invalidate all active sessions and redirect the user to a signed-out confirmation page.
4. WHEN a deleted user attempts to sign in with the former credentials THEN the application SHALL deny authentication.

#### Success criteria
- Only the authenticated account owner can initiate deletion.
- Deleted accounts cannot create authenticated sessions with former credentials.
- All active sessions are invalidated after deletion.
- The documented personal-data retention behavior is applied.

**Measurement:** Test authorized and unauthorized deletion flows with Playwright and verify account, related records, and session state in PostgreSQL.

**Security notes:** Require confirmation/re-auth; honor data-retention/GDPR.
