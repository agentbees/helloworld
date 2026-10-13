# helloworld

A tiny hello-world service used for AgentBees demos.

- `app.js` — a minimal HTTP server with a username/password login flow. Visit
  `/login` and use the configured credentials (`user`/`password` by default) to
  reach the protected `/hello` page. The original greeting remains available at
  `/?name=Bea`.
- `greet.js` — the `greet(name)` function.
- `npm start` runs it; `npm test` runs the tests (Node's built-in runner — no deps).
