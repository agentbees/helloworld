const http = require('node:http');
const { greet } = require('./greet');

// A minimal HTTP server. GET / greets you (optionally ?name=Bea).
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
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
