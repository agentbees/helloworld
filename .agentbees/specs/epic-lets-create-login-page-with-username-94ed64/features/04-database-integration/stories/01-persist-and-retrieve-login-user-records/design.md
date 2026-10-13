# Design — Lets create login page with username and password

## Overview

Domain design for the 'Persist and retrieve login user records' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Persist and retrieve login user records
```

## Components

### Persist and retrieve login user records
- Responsibility: As an application user, I want my login record to be stored and retrieved from the database, so that the application can authenticate my username and password.
- Driven by: authentication

## Data flow

The 'persist and retrieve login user records' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
