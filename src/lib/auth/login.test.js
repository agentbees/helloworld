const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword } = require('./password');
const { authenticate, signSession, verifySession } = require('./login');

test('authenticates a persisted username and password hash', async () => {
  const passwordHash = await hashPassword('correct horse battery staple');
  const prisma = { user: { findUnique: async () => ({ id: 'u1', username: 'alice', passwordHash }) } };
  assert.deepEqual(await authenticate(prisma, 'alice', 'correct horse battery staple'), { ok: true, user: { id: 'u1', username: 'alice' } });
  assert.equal((await authenticate(prisma, 'alice', 'wrong')).ok, false);
});

test('uses a signed persistent session token instead of an in-memory session set', () => {
  const previous = process.env.AUTH_SECRET;
  process.env.AUTH_SECRET = 'test-secret-that-is-at-least-32-characters-long';
  const token = signSession('u1');
  assert.equal(verifySession(token), 'u1');
  assert.equal(verifySession(`${token}x`), false);
  if (previous === undefined) delete process.env.AUTH_SECRET; else process.env.AUTH_SECRET = previous;
});
