const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { greet } = require('./greet');

const stylesheet = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// A minimal HTTP server. GET / greets you (optionally ?name=Bea).
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    const message = escapeHtml(greet(url.searchParams.get('name')));
    const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello World</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <main class="page-shell">
      <section class="greeting-card" aria-labelledby="greeting">
        <p class="eyebrow">A friendly message</p>
        <h1 id="greeting">${message}</h1>
      </section>
    </main>
  </body>
</html>`;
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(page);
    return;
  }
  if (req.method === 'GET' && url.pathname === '/style.css') {
    res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' });
    res.end(stylesheet);
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
