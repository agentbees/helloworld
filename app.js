const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const publicDir = __dirname;

function serveFile(res, filename, contentType) {
  try {
    const content = fs.readFileSync(path.join(publicDir, filename));
    res.writeHead(200, { 'content-type': contentType });
    res.end(content);
  } catch {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Unable to load the application.');
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    serveFile(res, 'index.html', 'text/html; charset=utf-8');
    return;
  }
  if (req.method === 'GET' && url.pathname === '/style.css') {
    serveFile(res, 'style.css', 'text/css; charset=utf-8');
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
