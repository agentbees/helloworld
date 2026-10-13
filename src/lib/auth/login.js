'use strict';

const crypto = require('node:crypto');
const { verifyPassword } = require('./password');

const GENERIC_ERROR = 'Invalid username or password.';

function requiredAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be configured with at least 32 characters.');
  }
  return secret;
}

async function authenticate(prisma, username, password) {
  if (!prisma || !username || !password) return { ok: false, error: GENERIC_ERROR };
  const user = await prisma.user.findUnique({ where: { username }, select: { id: true, username: true, passwordHash: true } });
  // Keep the response identical for unknown users and bad passwords.
  if (!user || !(await verifyPassword(password, user.passwordHash))) return { ok: false, error: GENERIC_ERROR };
  return { ok: true, user: { id: user.id, username: user.username } };
}

function signSession(userId) {
  const payload = Buffer.from(JSON.stringify({ sub: userId, iat: Date.now() })).toString('base64url');
  const signature = crypto.createHmac('sha256', requiredAuthSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifySession(value) {
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;
  const expected = crypto.createHmac('sha256', requiredAuthSecret()).update(payload).digest('base64url');
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).sub || false; } catch (_) { return false; }
}

module.exports = { GENERIC_ERROR, authenticate, requiredAuthSecret, signSession, verifySession };
