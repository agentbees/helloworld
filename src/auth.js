'use strict';

const { credentialsProvider } = require('./lib/auth/authjs');

// Auth.js configuration is kept in one server-only module so every route uses
// the persisted Prisma user and the same Credentials provider.
function authConfig(prisma) {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) {
    throw new Error('AUTH_SECRET must be configured with at least 32 characters.');
  }
  return { trustHost: true, secret: process.env.AUTH_SECRET, session: { strategy: 'jwt' }, providers: [credentialsProvider(prisma)] };
}

module.exports = { authConfig };
