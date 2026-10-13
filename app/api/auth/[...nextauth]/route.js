// Auth.js route adapter for a Next.js deployment. The small HTTP runner in
// app.js delegates credential verification to the same server-only auth seam.
const { authConfig } = require('../../../../src/auth');

let handlers;
try {
  const NextAuth = require('next-auth').default || require('next-auth');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  handlers = NextAuth(authConfig(prisma)).handlers;
} catch (_) {
  handlers = { GET: () => new Response('Authentication is unavailable.', { status: 503 }), POST: () => new Response('Authentication is unavailable.', { status: 503 }) };
}

exports.GET = handlers.GET;
exports.POST = handlers.POST;
