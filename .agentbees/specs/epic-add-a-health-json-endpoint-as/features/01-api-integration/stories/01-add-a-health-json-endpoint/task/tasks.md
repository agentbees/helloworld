# Tasks — Add a /health JSON endpoint As an operator,

Implementation checklist for **Implement Add a /health JSON endpoint**. Each numbered subtask is a buildable, independently verifiable unit.

- [ ] 1. Implement Add a /health JSON endpoint
  - _Story:_ As an operator, I want a GET /health endpoint that returns {"status":"ok"} so I can wire an uptime check.

- [ ] 1.1 Register a GET /health Express route that does not pass through authentication checks and returns the JSON object {"status":"ok"} with HTTP status 200.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the API SHALL return HTTP 200 with the JSON body {"status":"ok"}.
  - _Requirements: 1_
- [ ] 1.2 Update the existing OpenAPI specification to describe GET /health, including its unauthenticated operation, 200 response, application/json media type, and response schema for the exact status value "ok".
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the response SHALL include an application/json Content-Type.
  - _Requirements: 1_
- [ ] 1.3 Add Jest integration tests that call GET /health without credentials and verify HTTP 200, the application/json response, and the exact response body {"status":"ok"}.
  - Acceptance: WHEN the OpenAPI document describes GET /health THEN it SHALL declare no security requirement and SHALL define a 200 application/json response whose schema requires status to equal "ok".
  - _Requirements: 1_
- [ ] 1.4 Run the focused Jest tests and the relevant API validation or test suite to confirm the route and OpenAPI definition are valid.
  - Acceptance: WHEN an unauthenticated client sends GET /health THEN the API SHALL return HTTP 200 with the JSON body {"status":"ok"}.
  - _Requirements: 1_

## Definition of done

- Every subtask above is complete and its acceptance criteria pass.
- Automated tests cover the behavior and pass.
