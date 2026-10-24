# Tasks — Add a /health JSON endpoint As an operator,

Implementation checklist for **Implement Add a /health JSON endpoint**. Each numbered subtask is a buildable, independently verifiable unit.

- [ ] 1. Implement Add a /health JSON endpoint
  - _Story:_ As an operator, I want a GET /health endpoint that returns {"status":"ok"} so I can wire an uptime check.

- [ ] 1.1 Locate the existing Express app and route registration pattern.
  - Acceptance: WHEN an unauthenticated client sends GET /health, THEN the service SHALL respond with HTTP 200.
  - _Requirements: 1_
- [ ] 1.2 Implement GET /health as a public route that responds with status 200 and the JSON object {"status":"ok"}.
  - Acceptance: WHEN an unauthenticated client sends GET /health, THEN the response body SHALL be exactly {"status":"ok"}.
  - _Requirements: 1_
- [ ] 1.3 Register the route without applying authentication middleware to it.
  - Acceptance: WHEN an unauthenticated client sends GET /health, THEN the response SHALL use the application/json content type.
  - _Requirements: 1_
- [ ] 1.4 Add Supertest tests using Jest that call GET /health without credentials and verify the status, exact response body, and JSON content type.
  - Acceptance: WHEN a client sends GET /health without authentication credentials, THEN the service SHALL not reject the request for lack of authentication.
  - _Requirements: 1_
- [ ] 1.5 Run the relevant test suite and confirm the new endpoint passes without modifying sibling-story behavior.
  - Acceptance: WHEN an unauthenticated client sends GET /health, THEN the service SHALL respond with HTTP 200.
  - _Requirements: 1_

## Definition of done

- Every subtask above is complete and its acceptance criteria pass.
- Automated tests cover the behavior and pass.
