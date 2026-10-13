# Design — Lets create login page with username and password

## Overview

Domain design for the 'Email verification' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Email verification
```

## Components

### Email verification
- Responsibility: As a newly registered user, I want to verify my email address, so that my account can be activated and protected from unauthorized use.
- Driven by: authentication

## Data flow

The 'email verification' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
