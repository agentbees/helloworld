const http = require('node:http');

const helloWorldPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello World</title>
    <style>
      :root { color: #172033; background: #f4f7fb; font-family: system-ui, sans-serif; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; }
      main { padding: 2rem; text-align: center; }
      h1 { margin: 0; font-size: clamp(2.5rem, 10vw, 5rem); line-height: 1.1; }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello World</h1>
    </main>
  </body>
</html>`;

// A minimal HTTP server that displays the Hello World screen.
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(helloWorldPage);
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
