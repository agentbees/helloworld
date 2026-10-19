# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Persist login account records' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Persist login account records
**User story:** As a user, I want the login flow to use account records stored in PostgreSQL, so that my credentials can be checked consistently across sessions.

#### Acceptance criteria
1. WHEN the application requests an account by username THEN the database integration SHALL return the corresponding account record when one exists.
2. WHEN no account matches the requested username THEN the database integration SHALL return no account record without exposing whether other account data exists.
3. WHEN an account record is stored THEN the database integration SHALL persist the username and a password hash, and SHALL NOT persist the plaintext password.
4. THE database schema SHALL enforce uniqueness for usernames so that a username maps to at most one account.
5. WHEN the login flow uses the database integration with a valid persisted account THEN the integration SHALL provide the account data needed for the caller to determine a successful login.
6. WHEN the login flow uses the database integration with an unknown username THEN the integration SHALL provide a failed lookup result that allows the caller to report invalid credentials.

#### Success criteria
- A PostgreSQL account record can be queried by username and returns the expected password hash without returning plaintext credentials.
- Duplicate usernames are rejected by the database constraint.
- Unknown usernames produce a safe empty lookup result.

**Measurement:** Run database integration checks against PostgreSQL using Prisma and verify successful lookup, unknown-user handling, duplicate-username rejection, and absence of plaintext passwords in stored account records.
