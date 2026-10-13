const http = require('node:http');
const { greet } = require('./greet');
const { handleLogin, loginPage } = require('./src/lib/auth/login-http');
const { verifySession } = require('./src/lib/auth/login');

let prisma;
function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (!prisma) {
    try { prisma = new (require('@prisma/client').PrismaClient)(); } catch (_) { return null; }
  }
  return prisma;
}

function page(title, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title></head><body>${body}</body></html>`;
}

function sendHtml(res, status, html, headers = {}) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8', ...headers });
  res.end(html);
}

function sessionFrom(req) {
  const match = /(?:^|;)\s*authjs\.session-token=([^;]+)/.exec(req.headers.cookie || '');
  try { return match && verifySession(match[1]); } catch (_) { return false; }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => { body += chunk; if (body.length > 10_000) req.destroy(); });
    req.on('end', () => resolve(Object.fromEntries(new URLSearchParams(body))));
    req.on('error', reject);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/login') {
    sendHtml(res, 200, loginPage());
    return;
  }

  if (req.method === 'POST' && url.pathname === '/login') {
    readBody(req).then(form => handleLogin(req, res, getPrisma(), form))
      .catch(() => sendHtml(res, 400, loginPage('Unable to process the login request.')));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/hello') {
    if (!sessionFrom(req)) {
      res.writeHead(302, { location: '/login' });
      res.end();
      return;
    }
    sendHtml(res, 200, page('Hello World', '<main><h1>Hello World</h1></main>'));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(greet(url.searchParams.get('name')));
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
