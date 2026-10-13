# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'Account deletion' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — Account deletion
**User story:** As an authenticated user, I want to delete my account, so that I can remove my personal data and stop using the service.

#### Acceptance criteria
1. WHEN an authenticated user requests account deletion and confirms the action with the current password THEN the system SHALL mark the account deleted or permanently remove it according to the data-retention policy.
2. WHEN an authenticated user requests deletion without valid confirmation THEN the system SHALL reject the request and SHALL leave the account active.
3. WHEN account deletion succeeds THEN the system SHALL invalidate all sessions, revoke outstanding verification and recovery tokens, and redirect the user to a signed-out confirmation page.
4. WHEN a deleted account attempts to sign in THEN the system SHALL deny authentication without revealing account status.

#### Success criteria
- Only an authenticated user with valid confirmation can delete the account.
- Deleted accounts cannot create authenticated sessions.
- All active sessions and outstanding account-recovery tokens are invalidated.

**Measurement:** Playwright tests verify confirmation requirements, deletion completion, session invalidation, token revocation, and denied subsequent sign-in; Prisma database checks verify the configured deletion behavior.

**Security notes:** Require confirmation/re-auth; honor data-retention/GDPR.
