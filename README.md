# helloworld

A tiny hello-world service used for AgentBees demos.

- `app.js` — an Express app that greets you (`GET /?name=Bea`) and exposes a health check (`GET /health`).
- `greet.js` — the `greet(name)` function.
- `npm start` runs it; `npm test` runs the Jest tests.
