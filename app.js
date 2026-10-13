const http = require('node:http');
const crypto = require('node:crypto');
const { greet } = require('./greet');

const sessions = new Set();
const loginUsername = process.env.LOGIN_USERNAME || 'user';
const loginPassword = process.env.LOGIN_PASSWORD || 'password';

function page(title, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title></head><body>${body}</body></html>`;
}

function loginPage(message = '') {
  const feedback = message ? `<p role="alert">${message}</p>` : '';
  return page('Login', `<main><h1>Login</h1>${feedback}
<form method="post" action="/login">
<label for="username">Username</label><input id="username" name="username" type="text" required autocomplete="username">
<label for="password">Password</label><input id="password" name="password" type="password" required autocomplete="current-password">
<button type="submit">Log in</button></form></main>`);
}

function sendHtml(res, status, html, headers = {}) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8', ...headers });
  res.end(html);
}

function sessionFrom(req) {
  const match = /(?:^|;)\s*session=([^;]+)/.exec(req.headers.cookie || '');
  return match && sessions.has(match[1]) ? match[1] : null;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => { body += chunk; if (body.length > 10_000) req.destroy(); });
    req.on('end', () => resolve(new URLSearchParams(body)));
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
    readBody(req).then(form => {
      const username = (form.get('username') || '').trim();
      const password = form.get('password') || '';
      if (!username || !password) {
        sendHtml(res, 400, loginPage('Username and password are required.'));
        return;
      }
      if (username !== loginUsername || password !== loginPassword) {
        sendHtml(res, 401, loginPage('Invalid username or password.'));
        return;
      }
      const token = crypto.randomBytes(24).toString('hex');
      sessions.add(token);
      res.writeHead(302, { location: '/hello', 'set-cookie': `session=${token}; HttpOnly; Path=/; SameSite=Lax` });
      res.end();
    }).catch(() => sendHtml(res, 400, loginPage('Unable to process the login request.')));
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
