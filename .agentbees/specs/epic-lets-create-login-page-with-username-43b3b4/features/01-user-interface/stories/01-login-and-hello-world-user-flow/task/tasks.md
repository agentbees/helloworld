# Tasks — Lets create login page with username and password

Implementation checklist for **Implement Login and Hello World User Flow**. Each numbered subtask is a buildable, independently verifiable unit.

- [ ] 1. Implement Login and Hello World User Flow
  - _Story:_ As a user, I want to enter my username and password and see a Hello World page after successful login, so that I can access the application.

- [ ] 1.1 Inspect the existing Next.js, Prisma, PostgreSQL, and Auth.js configuration and reuse established conventions without modifying unrelated stories or components.
  - Acceptance: WHEN an unauthenticated user navigates to /login THEN the application SHALL display username and password inputs and a submit control.
  - _Requirements: 1_
- [ ] 1.2 Add or update the Prisma user representation only as required for credential authentication, including a unique username and a password-hash field, and create the corresponding PostgreSQL migration if the fields do not already exist.
  - Acceptance: WHEN a user submits /login with either the username or password missing THEN the application SHALL show validation feedback and SHALL not attempt authentication.
  - _Requirements: 1_
- [ ] 1.3 Implement the Auth.js Credentials provider and authentication route at /api/auth/[...nextauth], retrieving the user by username through Prisma and verifying the submitted password against the stored hash.
  - Acceptance: WHEN a user submits invalid credentials THEN the application SHALL remain on the login flow and SHALL display a generic authentication error without revealing whether the username exists.
  - _Requirements: 1_
- [ ] 1.4 Configure session handling and the Auth.js provider required by the Next.js application, including the necessary environment-variable validation and server/client session integration.
  - Acceptance: WHEN a user submits valid credentials for an existing account THEN the application SHALL create an authenticated session and SHALL redirect the user to /hello.
  - _Requirements: 1_
- [ ] 1.5 Implement the /login React page with labeled username and password inputs, required-field validation, a submit control, pending-submit handling, and a generic failure message for invalid credentials.; Implement the protected /hello page that renders the static text "Hello World" and performs a server-side session check before rendering.; Add route protection for /hello using the established Next.js mechanism, such as middleware or a server-side guard, redirecting unauthenticated users to /login.; Add Playwright coverage for displaying the login form, rejecting invalid credentials, accepting valid seeded or test credentials, redirecting to /hello, displaying "Hello World", and blocking unauthenticated access to /hello.
  - Acceptance: WHEN an authenticated user navigates to /hello THEN the application SHALL display the static text "Hello World".
  - _Requirements: 1_

## Constraints (from org steering / dependencies)

- WHEN this feature integrates with Backend API, THE implementation SHALL depend on Backend API for the backend endpoints it calls for data + actions.
- THE implementation SHALL include an integration test that exercises the seam with Backend API (api).
- IF Backend API is unavailable or returns an error, THEN THE implementation SHALL handle the failure gracefully (surface a clear error and avoid an unhandled exception).
- WHEN this feature integrates with Authentication & Access Control, THE implementation SHALL depend on Authentication & Access Control for the sign-in/session state that gates protected screens.
- THE implementation SHALL include an integration test that exercises the seam with Authentication & Access Control (auth).
- IF Authentication & Access Control is unavailable or returns an error, THEN THE implementation SHALL handle the failure gracefully (surface a clear error and avoid an unhandled exception).

## Definition of done

- Every subtask above is complete and its acceptance criteria pass.
- Automated tests cover the behavior and pass.
- All listed constraints are satisfied.
