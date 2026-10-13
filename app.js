const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { greet } = require('./greet');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    if (url.searchParams.has('name')) {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(greet(url.searchParams.get('name')));
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
    return;
  }
  if (req.method === 'GET' && url.pathname === '/style.css') {
    res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' });
    res.end(fs.readFileSync(path.join(__dirname, 'style.css')));
    return;
  }
  if (req.method === 'GET' && url.pathname === '/favicon.ico') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.end('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><text y="14" font-size="14">H</text></svg>');
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
