const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const server = require('./app');

test('serves a readable Hello World entry screen', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());

  const { port } = server.address();
  const response = await new Promise((resolve, reject) => {
    const request = http.get(`http://127.0.0.1:${port}/`, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    request.on('error', reject);
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /<h1>Hello World<\/h1>/);
  assert.match(response.body, /font-family: system-ui/);
});
