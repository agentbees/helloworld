'use strict';

const { registerUser } = require('./registration');

function registrationPage(state = '') {
  const errors = typeof state === 'string' ? (state ? { general: state } : {}) : (state || {});
  const field = (name) => errors[name] ? `<p id="${name}-error" role="alert">${escapeHtml(errors[name])}</p>` : '';
  const success = errors.success ? `<p role="status">${escapeHtml(errors.success)}</p>` : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Sign up</title></head>
<body><main><h1>Create your account</h1>
<form method="post" action="/signup" novalidate>
<label for="username">Username</label><input id="username" name="username" required minlength="3" maxlength="32" autocomplete="username" aria-describedby="username-error">${field('username')}
<label for="password">Password</label><input id="password" name="password" type="password" required minlength="8" autocomplete="new-password" aria-describedby="password-error">${field('password')}
<label for="passwordConfirmation">Confirm password</label><input id="passwordConfirmation" name="passwordConfirmation" type="password" required minlength="8" autocomplete="new-password" aria-describedby="passwordConfirmation-error">${field('passwordConfirmation')}
<button type="submit">Sign up</button><p id="form-status" role="status" aria-live="polite"></p>${field('general')}${success}
</form><script>document.querySelector('form').addEventListener('submit',function(){var b=this.querySelector('button');b.disabled=true;b.textContent='Creating account…';document.getElementById('form-status').textContent='Creating your account…';});</script></main></body></html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

async function handleRegistration(req, res, prisma, body) {
  if (!prisma) {
    res.writeHead(503, { 'content-type': 'text/html; charset=utf-8' });
    res.end(registrationPage({ general: 'Registration is temporarily unavailable. Please try again later.' }));
    return { ok: false, status: 503 };
  }
  let result;
  try {
    result = await registerUser(prisma, body);
  } catch (_) {
    res.writeHead(503, { 'content-type': 'text/html; charset=utf-8' });
    res.end(registrationPage({ general: 'Registration is temporarily unavailable. Please try again later.' }));
    return { ok: false, status: 503 };
  }
  const wantsJson = req && /application\/json/i.test(req.headers && req.headers.accept || '');
  if (!wantsJson) {
    res.writeHead(result.status, { 'content-type': 'text/html; charset=utf-8' });
    res.end(registrationPage(result.ok ? { success: 'Your account was created successfully.' } : result.errors));
    return result;
  }
  if (result.ok) {
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, user: result.user }));
    return result;
  }
  res.writeHead(result.status, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: false, errors: result.errors }));
  return result;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { raw += chunk; if (raw.length > 10_000) reject(new Error('request too large')); });
    req.on('end', () => {
      try {
        const type = String(req.headers['content-type'] || '');
        const parsed = type.includes('application/json') ? JSON.parse(raw || '{}') : Object.fromEntries(new URLSearchParams(raw));
        resolve(parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {});
      } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

module.exports = { handleRegistration, registrationPage, escapeHtml, readRequestBody };
