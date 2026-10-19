# Design — Lets create login page with user name and

## Overview

Domain design for the 'Change password' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Change password
```

## Components

### Change password
- Responsibility: As an authenticated user, I want to change my password, so that I can maintain control of my account credentials.
- Driven by: authentication

## Data flow

The 'change password' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
