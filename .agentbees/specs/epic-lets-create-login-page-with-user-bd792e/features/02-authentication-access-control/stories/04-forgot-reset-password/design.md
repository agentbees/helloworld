# Design — Lets create login page with user name and

## Overview

Domain design for the 'Forgot / Reset password' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Forgot / Reset password
```

## Components

### Forgot / Reset password
- Responsibility: As a user who has forgotten a password, I want to request and complete a password reset, so that I can regain secure access to my account.
- Driven by: authentication

## Data flow

The 'forgot / reset password' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
