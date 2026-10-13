# Tasks — Lets create login page with username and password

Implementation checklist for **Implement User Registration (Sign up)**. Each numbered subtask is a buildable, independently verifiable unit.

- [ ] 1. Implement User Registration (Sign up)
  - _Story:_ As a new user, I want to create an account with a username and password, so that I can access authenticated pages.

- [ ] 1.1 Add or update the Prisma user model with a unique username and a passwordHash field, preserving any existing Auth.js-required fields and relationships, then create the corresponding database migration.
  - Acceptance: WHEN a visitor submits a valid, unused username, matching password, and password confirmation THEN the registration flow SHALL create exactly one PostgreSQL user record with the username and a non-plaintext password hash.
  - _Requirements: 1_
- [ ] 1.2 Add the password-hashing dependency and implement a server-only registration service that validates username and password requirements, checks for an existing username, hashes the password, and inserts the new user with Prisma.
  - Acceptance: WHEN a visitor submits a username that already exists THEN the registration flow SHALL reject the request and SHALL display a safe duplicate-username error without creating another user record.
  - _Requirements: 1_
- [ ] 1.3 Create the Next.js sign-up page and React form with accessible labels, required fields, password confirmation, inline validation feedback, submission pending state, and a success state that does not expose stored credentials.
  - Acceptance: WHEN a visitor submits passwords that do not match THEN the registration flow SHALL reject the request and SHALL identify the password confirmation error without writing a user record.
  - _Requirements: 1_
- [ ] 1.4 Add the registration route or Server Action used by the form, ensuring it accepts only the required registration fields, rejects malformed or extra-invalid input, and maps duplicate-user and validation failures to safe client-facing messages.
  - Acceptance: WHEN a visitor submits an empty or invalid username or a password that fails the defined minimum requirements THEN the registration flow SHALL reject the request and SHALL display field-level validation feedback.
  - _Requirements: 1_
- [ ] 1.5 Add Playwright coverage for successful registration, duplicate username rejection, mismatched password rejection, and verification that the resulting database record contains a password hash rather than the submitted plaintext password.
  - Acceptance: WHEN a registration request is received THEN the server SHALL perform validation and password hashing server-side and SHALL never persist or return the plaintext password.
  - _Requirements: 1_

## Constraints (from org steering / dependencies)

- WHEN this feature integrates with Database Integration, THE implementation SHALL depend on Database Integration for the credential/account store it verifies against.
- THE implementation SHALL include an integration test that exercises the seam with Database Integration (database).
- IF Database Integration is unavailable or returns an error, THEN THE implementation SHALL handle the failure gracefully (surface a clear error and avoid an unhandled exception).

## Definition of done

- Every subtask above is complete and its acceptance criteria pass.
- Automated tests cover the behavior and pass.
- All listed constraints are satisfied.
