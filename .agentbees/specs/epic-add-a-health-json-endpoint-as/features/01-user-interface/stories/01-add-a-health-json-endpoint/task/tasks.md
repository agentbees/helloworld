# Tasks — Add a /health JSON endpoint As an operator,

Implementation checklist for **Implement Add a /health JSON endpoint**. Each numbered subtask is a buildable, independently verifiable unit.

- [ ] 1. Implement Add a /health JSON endpoint
  - _Story:_ As an operator, I want a GET /health endpoint that returns {"status":"ok"} so I can wire an uptime check.

- [ ] 1.1 Locate the existing Express application, route registration, authentication middleware, test setup, and OpenAPI document without modifying unrelated feature routes.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the service SHALL return HTTP 200.
  - _Requirements: 1_
- [ ] 1.2 Implement an unauthenticated GET /health route that responds with status 200 and the JSON payload {"status":"ok"}.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the response body SHALL be exactly {"status":"ok"}.
  - _Requirements: 1_
- [ ] 1.3 Ensure the health route is registered outside any authentication-protected router or explicitly excluded from authentication middleware while preserving existing security behavior for other routes.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the response Content-Type SHALL indicate application/json.
  - _Requirements: 1_
- [ ] 1.4 Add the GET /health endpoint to the existing OpenAPI definition, including its unauthenticated operation and 200 JSON response schema.
  - Acceptance: WHEN the OpenAPI document describes GET /health THEN it SHALL define an unauthenticated operation with a 200 application/json response whose schema requires status to equal "ok".
  - _Requirements: 1_
- [ ] 1.5 Add Jest and Supertest tests verifying that GET /health without credentials returns 200, application/json, and exactly {"status":"ok"}.; Run the focused health endpoint tests and the existing test suite, fixing only issues caused by this implementation.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the service SHALL return HTTP 200.
  - _Requirements: 1_

## Definition of done

- Every subtask above is complete and its acceptance criteria pass.
- Automated tests cover the behavior and pass.
