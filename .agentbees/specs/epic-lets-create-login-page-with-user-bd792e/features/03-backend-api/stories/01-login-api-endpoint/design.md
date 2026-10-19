# Design — Lets create login page with user name and

## Overview

Domain design for the 'Login API endpoint' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Login API endpoint
```

## Components

### Login API endpoint
- Responsibility: As a client application, I want to submit a username and password to a login API, so that I can determine whether the user is authenticated.
- Driven by: authentication

## Data flow

The 'login api endpoint' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
