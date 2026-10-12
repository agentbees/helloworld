const test = require('node:test');
const assert = require('node:assert/strict');
const server = require('./app');

test('serves a static Hello World page at the root URL', async () => {
  await new Promise((resolve) => server.listen(0, resolve));

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.match(body, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
    assert.match(body, /<main>[\s\S]*<h1>Hello World<\/h1>[\s\S]*<\/main>/);
    assert.match(body, /main\s*\{[\s\S]*width: min\(100%, 42rem\)/);
    assert.doesNotMatch(body, /<script\b/);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
