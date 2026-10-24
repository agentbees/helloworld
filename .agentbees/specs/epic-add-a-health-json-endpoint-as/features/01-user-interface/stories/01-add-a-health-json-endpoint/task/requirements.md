# Requirements — Add a /health JSON endpoint As an operator,

## Introduction

This spec covers the 'Add a /health JSON endpoint' story of add a /health json endpoint as an operator, (new_feature).

## Requirements

### Requirement 1 — Add a /health JSON endpoint
**User story:** As an operator, I want a GET /health endpoint that returns {"status":"ok"} so I can wire an uptime check.

#### Acceptance criteria
1. GET /health returns 200 with {"status":"ok"}
2. It does not require auth
3. WHEN add a /health json endpoint is implemented THEN the system SHALL satisfy the need indicated by the request.

#### Success criteria
- Add a /health JSON endpoint works as described and is verified.

**Measurement:** Covered by tests and reviewed against the request.
