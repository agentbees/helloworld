'use strict';

const { authenticate, GENERIC_ERROR, signSession } = require('./login');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function loginPage(message = '') {
  const feedback = message ? `<p id="login-error" role="alert">${escapeHtml(message)}</p>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Login</title></head><body><main><h1>Login</h1>${feedback}<form method="post" action="/login"><label for="username">Username</label><input id="username" name="username" type="text" required autocomplete="username"><label for="password">Password</label><input id="password" name="password" type="password" required autocomplete="current-password"><button type="submit">Log in</button></form></main></body></html>`;
}

async function handleLogin(req, res, prisma, body) {
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!username || !password) {
    res.writeHead(400, { 'content-type': 'text/html; charset=utf-8' });
    res.end(loginPage('Username and password are required.'));
    return { ok: false, status: 400 };
  }
  if (!prisma) {
    res.writeHead(503, { 'content-type': 'text/html; charset=utf-8' });
    res.end(loginPage('Authentication is temporarily unavailable. Please try again later.'));
    return { ok: false, status: 503 };
  }
  try {
    const result = await authenticate(prisma, username, password);
    if (!result.ok) {
      res.writeHead(401, { 'content-type': 'text/html; charset=utf-8' });
      res.end(loginPage(GENERIC_ERROR));
      return { ok: false, status: 401 };
    }
    const token = signSession(result.user.id);
    res.writeHead(302, { location: '/hello', 'set-cookie': `authjs.session-token=${token}; HttpOnly; Path=/; SameSite=Lax` });
    res.end();
    return { ok: true, status: 302 };
  } catch (_) {
    res.writeHead(503, { 'content-type': 'text/html; charset=utf-8' });
    res.end(loginPage('Authentication is temporarily unavailable. Please try again later.'));
    return { ok: false, status: 503 };
  }
}

module.exports = { handleLogin, loginPage };
