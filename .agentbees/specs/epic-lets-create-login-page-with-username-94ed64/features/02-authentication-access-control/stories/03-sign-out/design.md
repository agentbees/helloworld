# Design — Lets create login page with username and password

## Overview

Domain design for the 'Sign out' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Sign out
```

## Components

### Sign out
- Responsibility: As an authenticated user, I want to sign out, so that my session cannot be reused by someone else on the device.
- Driven by: authentication

## Data flow

The 'sign out' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
