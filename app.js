const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { greet } = require('./greet');

const index = fs.readFileSync(path.join(__dirname, 'index.html'));
const stylesheet = fs.readFileSync(path.join(__dirname, 'style.css'));

// A minimal HTTP server that serves the Hello World interface.
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    if (url.searchParams.has('name')) {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(greet(url.searchParams.get('name')));
    } else {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(index);
    }
    return;
  }
  if (req.method === 'GET' && url.pathname === '/style.css') {
    res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' });
    res.end(stylesheet);
    return;
  }
  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('not found');
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  server.listen(port, () => console.log(`helloworld listening on :${port}`));
}

module.exports = server;
