'use strict';

// Auth.js Credentials provider seam. The application server uses the same
// authorize implementation when running without the Next.js adapter.
const { authenticate } = require('./login');

function credentialsProvider(prisma) {
  let Credentials;
  try { Credentials = require('next-auth/providers/credentials').default; } catch (_) {
    Credentials = (options) => ({ id: 'credentials', type: 'credentials', ...options });
  }
  return Credentials({
    name: 'Username and password',
    credentials: { username: { label: 'Username', type: 'text' }, password: { label: 'Password', type: 'password' } },
    async authorize(credentials) {
      const result = await authenticate(prisma, credentials && credentials.username, credentials && credentials.password);
      return result.ok ? result.user : null;
    }
  });
}

module.exports = { credentialsProvider };
