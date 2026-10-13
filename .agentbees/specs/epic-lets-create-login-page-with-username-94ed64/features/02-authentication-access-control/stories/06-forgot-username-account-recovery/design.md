# Design — Lets create login page with username and password

## Overview

Domain design for the 'Forgot username / account recovery' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Forgot username / account recovery
```

## Components

### Forgot username / account recovery
- Responsibility: As a user who cannot remember my username, I want to recover my account identifier securely, so that I can sign in without exposing account information.
- Driven by: authentication

## Data flow

The 'forgot username / account recovery' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
