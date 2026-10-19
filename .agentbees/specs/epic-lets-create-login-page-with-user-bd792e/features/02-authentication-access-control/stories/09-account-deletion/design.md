# Design — Lets create login page with user name and

## Overview

Domain design for the 'Account deletion' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Account deletion
```

## Components

### Account deletion
- Responsibility: As an authenticated user, I want to delete my account, so that my personal data and access are removed when I no longer need the service.
- Driven by: authentication

## Data flow

The 'account deletion' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
