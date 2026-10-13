# Requirements — Lets create login page with username and password

## Introduction

This spec covers the 'User Registration (Sign up)' story of lets create login page with username and password (new_project).

## Requirements

### Requirement 1 — User Registration (Sign up)
**User story:** As a new user, I want to create an account with a username, email address, and password, so that I can access the authenticated application.

#### Acceptance criteria
1. WHEN a visitor submits a unique username, valid email address, and compliant password THEN the system SHALL create a pending user record in PostgreSQL through Prisma and SHALL not store the plaintext password.
2. WHEN a visitor submits a username or email address already associated with an account THEN the system SHALL reject registration and SHALL display a non-sensitive validation message.
3. WHEN a visitor submits an invalid email address or password that fails the configured policy THEN the system SHALL reject registration and SHALL identify the invalid input without exposing account information.
4. WHEN registration succeeds THEN the system SHALL initiate email verification and SHALL direct the user to a verification-pending confirmation page.

#### Success criteria
- Users can register with valid credentials and receive a verification-pending confirmation.
- Passwords are stored only as securely hashed values.
- Duplicate usernames and email addresses are rejected.

**Measurement:** Automated Playwright tests cover valid registration, duplicate-account rejection, validation errors, and confirmation-page routing; database inspection confirms no plaintext passwords are stored.

**Security notes:** Prevent account enumeration on duplicate email; hash passwords with a strong password KDF (e.g. Argon2id, scrypt, or bcrypt) with a per-user salt; validate all input server-side; rate-limit sign-ups.
