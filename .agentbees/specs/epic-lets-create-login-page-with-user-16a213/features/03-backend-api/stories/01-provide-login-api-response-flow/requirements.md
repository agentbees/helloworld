# Requirements — Lets create login page with user name and

## Introduction

This spec covers the 'Provide login API response flow' story of lets create login page with user name and (new_project).

## Requirements

### Requirement 1 — Provide login API response flow
**User story:** As a login client, I want to submit a username and password to the backend API, so that I can proceed on successful authentication or show an invalid-credentials error.

#### Acceptance criteria
1. WHEN the client submits a username and password for a valid account to the login endpoint THEN the API SHALL return a successful response indicating authentication succeeded.
2. WHEN the client submits a username and password that do not match a valid account THEN the API SHALL return an authentication failure response containing the message "invalid credentials".

#### Success criteria
- The login endpoint returns a success response for valid credentials and an authentication failure response with the required message for invalid credentials.

**Measurement:** Exercise the login endpoint with valid and invalid credential pairs and verify the HTTP status and response body for each case.
