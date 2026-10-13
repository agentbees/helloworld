# Design — Lets create login page with username and password

## Overview

Domain design for the 'Account lockout / brute-force protection' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Account lockout / brute-force protection
```

## Components

### Account lockout / brute-force protection
- Responsibility: As a registered user, I want login protections against repeated guessing, so that my account is protected from brute-force attacks.
- Driven by: authentication

## Data flow

The 'account lockout / brute-force protection' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
