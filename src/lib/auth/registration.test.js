'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { registerUser } = require('./registration');
const { verifyPassword } = require('./password');

function fakePrisma() {
  const rows = [];
  return {
    rows,
    user: {
      findUnique: async ({ where }) => rows.find((row) => row.username === where.username) || null,
      create: async ({ data, select }) => {
        if (rows.some((row) => row.username === data.username)) {
          const error = new Error('unique constraint'); error.code = 'P2002'; throw error;
        }
        const row = { id: String(rows.length + 1), createdAt: new Date(), ...data };
        rows.push(row);
        return Object.fromEntries(Object.keys(select).map((key) => [key, row[key]]));
      }
    }
  };
}

test('registers one user with a non-plaintext password hash', async () => {
  const prisma = fakePrisma();
  const result = await registerUser(prisma, {
    username: 'new_user', password: 'correct horse battery staple', passwordConfirmation: 'correct horse battery staple'
  });
  assert.equal(result.ok, true);
  assert.equal(prisma.rows.length, 1);
  assert.notEqual(prisma.rows[0].passwordHash, 'correct horse battery staple');
  assert.equal(await verifyPassword('correct horse battery staple', prisma.rows[0].passwordHash), true);
  assert.equal(Object.hasOwn(result.user, 'passwordHash'), false);
});

test('rejects duplicate, invalid, and mismatched registrations without writes', async () => {
  const prisma = fakePrisma();
  await registerUser(prisma, { username: 'existing', password: 'long enough password', passwordConfirmation: 'long enough password' });
  assert.equal((await registerUser(prisma, { username: 'existing', password: 'long enough password', passwordConfirmation: 'long enough password' })).status, 409);
  assert.equal((await registerUser(prisma, { username: 'no', password: 'short', passwordConfirmation: 'different' })).status, 400);
  assert.equal(prisma.rows.length, 1);
});
