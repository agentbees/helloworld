const http = require('node:http');

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello World</title>
    <style>
      :root {
        color-scheme: light;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #172033;
        background: #f4f7fb;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        box-sizing: border-box;
      }

      main {
        width: min(100%, 42rem);
        padding: clamp(2rem, 8vw, 5rem);
        box-sizing: border-box;
        text-align: center;
        background: #ffffff;
        border: 1px solid #dbe3ef;
        border-radius: 1rem;
        box-shadow: 0 1rem 3rem rgb(23 32 51 / 10%);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.25rem, 10vw, 4.5rem);
        line-height: 1.1;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello World</h1>
    </main>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(page);
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
