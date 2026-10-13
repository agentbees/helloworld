'use strict';

const { registerUser } = require('./registration');

function registrationPage(message = '') {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Sign up</title></head>
<body><main><h1>Create your account</h1>
<form method="post" action="/signup" novalidate>
<label for="username">Username</label><input id="username" name="username" required minlength="3" maxlength="32" autocomplete="username">
<label for="password">Password</label><input id="password" name="password" type="password" required minlength="8" autocomplete="new-password">
<label for="passwordConfirmation">Confirm password</label><input id="passwordConfirmation" name="passwordConfirmation" type="password" required minlength="8" autocomplete="new-password">
<button type="submit">Sign up</button>${message ? `<p role="alert">${escapeHtml(message)}</p>` : ''}
</form></main></body></html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

async function handleRegistration(req, res, prisma, body) {
  const result = await registerUser(prisma, body);
  if (result.ok) {
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, user: result.user }));
    return result;
  }
  res.writeHead(result.status, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: false, errors: result.errors }));
  return result;
}

module.exports = { handleRegistration, registrationPage, escapeHtml };
