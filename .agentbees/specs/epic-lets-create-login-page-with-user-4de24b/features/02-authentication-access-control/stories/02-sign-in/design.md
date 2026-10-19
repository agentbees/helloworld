# Design — Lets create login page with user name and

## Overview

Domain design for the 'Sign in' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Sign in
```

## Components

### Sign in
- Responsibility: As a registered user, I want to sign in with my username and password, so that I can securely access my account.
- Driven by: authentication

## Data flow

The 'sign in' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
