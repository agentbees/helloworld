# Design — Add a /health JSON endpoint As an operator,

## Overview

Technical design for 'Implement Add a /health JSON endpoint'. Add an unauthenticated GET /health route in the existing Express application. The route must return HTTP 200 with the JSON response body {"status":"ok"} and the appropriate application/json content type. Register the route through the application’s existing routing/initialization path without changing authentication behavior for other endpoints. Add Jest and Supertest coverage for the unauthenticated success response, exact JSON body, status code, and content type.

## Architecture

```
Request
  -> Add a /health JSON endpoint
     -> implementation
```

## Components

### Implement Add a /health JSON endpoint
- Responsibility: Add an unauthenticated GET /health route in the existing Express application. The route must return HTTP 200 with the JSON response body {"status":"ok"} and the appropriate application/json content type. Register the route through the application’s existing routing/initialization path without changing authentication behavior for other endpoints. Add Jest and Supertest coverage for the unauthenticated success response, exact JSON body, status code, and content type.
- Driven by: the request

## Data flow

Inputs are validated, the story's behavior is executed, and results are persisted/returned as appropriate.

## Error handling

Each step validates its inputs and fails safely with actionable, non-sensitive errors.

## Testing strategy

Unit tests per step plus end-to-end validation of the story's acceptance criteria.
