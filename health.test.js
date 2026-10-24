const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const server = require('./app');

test('GET /health returns an unauthenticated JSON health response', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());

  const response = await new Promise((resolve, reject) => {
    const request = http.get({
      hostname: 'localhost',
      port: server.address().port,
      path: '/health',
    }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ res, body }));
    });
    request.on('error', reject);
  });

  assert.strictEqual(response.res.statusCode, 200);
  assert.strictEqual(response.res.headers['content-type'], 'application/json');
  assert.strictEqual(response.body, '{"status":"ok"}');
});
