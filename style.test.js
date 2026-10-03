const test = require('node:test');
const assert = require('node:assert/strict');
const server = require('./app');

test('serves the Hello World page as styled HTML', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    assert.match(body, /Hello, world!/);
    assert.match(body, /<style|<link[^>]+stylesheet/i);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
