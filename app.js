const http = require('node:http');
const { greet } = require('./greet');
const { registrationPage, handleRegistration, readRequestBody } = require('./src/lib/auth/registration-http');

let prisma;
function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (!prisma) {
    try {
      const { PrismaClient } = require('@prisma/client');
      prisma = new PrismaClient();
    } catch (_) {
      return null;
    }
  }
  return prisma;
}

// A minimal HTTP server. GET / greets you (optionally ?name=Bea).
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(greet(url.searchParams.get('name')));
    return;
  }
  if (req.method === 'GET' && url.pathname === '/signup') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(registrationPage());
    return;
  }
  if (req.method === 'POST' && url.pathname === '/signup') {
    readRequestBody(req).then((body) => handleRegistration(req, res, getPrisma(), body))
      .catch(() => {
        if (!res.headersSent) {
          res.writeHead(400, { 'content-type': 'text/html; charset=utf-8' });
          res.end(registrationPage({ general: 'We could not read that request.' }));
        }
      });
    return;
  }
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.end('not found');
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  server.listen(port, () => console.log(`helloworld listening on :${port}`));
}

module.exports = server;
