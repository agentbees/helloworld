const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword } = require('./src/lib/auth/password');
const { handleLogin, loginPage } = require('./src/lib/auth/login-http');

function response() {
  return { headers: null, status: null, body: '', writeHead(status, headers) { this.status = status; this.headers = headers; }, end(body = '') { this.body += body; } };
}

test('login form exposes accessible username/password controls', () => {
  const html = loginPage();
  assert.match(html, /id="username"[^>]*required/);
  assert.match(html, /id="password"[^>]*type="password"[^>]*required/);
  assert.match(html, /<button[^>]*>Log in<\/button>/);
});

test('missing credentials are rejected before authentication', async () => {
  const res = response();
  let queried = false;
  await handleLogin({}, res, { user: { findUnique: async () => { queried = true; } } }, { username: '', password: '' });
  assert.equal(res.status, 400);
  assert.match(res.body, /required/);
  assert.equal(queried, false);
});

test('invalid credentials receive a generic error', async () => {
  const res = response();
  const hash = await hashPassword('a secure password');
  await handleLogin({}, res, { user: { findUnique: async () => ({ id: 'u1', username: 'alice', passwordHash: hash }) } }, { username: 'alice', password: 'wrong' });
  assert.equal(res.status, 401);
  assert.match(res.body, /Invalid username or password/);
  assert.doesNotMatch(res.body, /alice/);
});

test('valid credentials redirect to protected hello with a signed auth cookie', async () => {
  const previous = process.env.AUTH_SECRET;
  process.env.AUTH_SECRET = 'test-secret-that-is-at-least-32-characters-long';
  const res = response();
  const hash = await hashPassword('a secure password');
  await handleLogin({}, res, { user: { findUnique: async () => ({ id: 'u1', username: 'alice', passwordHash: hash }) } }, { username: 'alice', password: 'a secure password' });
  assert.equal(res.status, 302);
  assert.equal(res.headers.location, '/hello');
  assert.match(res.headers['set-cookie'], /authjs\.session-token=.*HttpOnly/);
  if (previous === undefined) delete process.env.AUTH_SECRET; else process.env.AUTH_SECRET = previous;
});
