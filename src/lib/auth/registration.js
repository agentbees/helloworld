'use strict';

const { hashPassword } = require('./password');

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,32}$/;

function validateRegistration(input) {
  const value = input && typeof input === 'object' ? input : {};
  const errors = {};
  const username = typeof value.username === 'string' ? value.username.trim() : '';
  const password = typeof value.password === 'string' ? value.password : '';
  const passwordConfirmation = typeof value.passwordConfirmation === 'string'
    ? value.passwordConfirmation
    : '';

  if (!USERNAME_PATTERN.test(username)) {
    errors.username = 'Username must be 3–32 letters, numbers, or underscores.';
  }
  if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (passwordConfirmation !== password) errors.passwordConfirmation = 'Passwords do not match.';
  return { valid: Object.keys(errors).length === 0, errors, username, password };
}

async function registerUser(prisma, input) {
  const validation = validateRegistration(input);
  if (!validation.valid) return { ok: false, status: 400, errors: validation.errors };

  const existing = await prisma.user.findUnique({ where: { username: validation.username } });
  if (existing) return { ok: false, status: 409, errors: { username: 'That username is unavailable.' } };

  const passwordHash = await hashPassword(validation.password);
  try {
    const user = await prisma.user.create({
      data: { username: validation.username, passwordHash },
      select: { id: true, username: true, createdAt: true }
    });
    return { ok: true, status: 201, user };
  } catch (error) {
    // A concurrent insert can win after findUnique; expose the same safe error.
    if (error && (error.code === 'P2002' || /unique/i.test(error.message || ''))) {
      return { ok: false, status: 409, errors: { username: 'That username is unavailable.' } };
    }
    throw error;
  }
}

module.exports = { registerUser, validateRegistration };
