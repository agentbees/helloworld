# Design — Lets create login page with username and password

## Overview

Domain design for the 'Authentication error handling' story. Describes the flow and its behavior at the business level.

## Architecture

```
User
  -> Authentication error handling
```

## Components

### Authentication error handling
- Responsibility: As a user, I want clear and safe authentication errors, so that I can correct problems without exposing sensitive account information.
- Driven by: authentication

## Data flow

The 'authentication error handling' flow is exercised by the user; inputs are validated and outcomes recorded.

## Error handling

Invalid input and failure cases are surfaced with clear, non-sensitive messages.

## Testing strategy

Validated end to end against the story's acceptance criteria.
