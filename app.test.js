const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const server = require('./app');

test('GET /health returns an unauthenticated JSON health response', async () => {
  await new Promise((resolve, reject) => {
    server.listen(0, resolve);
    server.once('error', reject);
  });

  try {
    const response = await new Promise((resolve, reject) => {
      const request = http.get({
        port: server.address().port,
        path: '/health',
      }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          body,
        }));
      });
      request.on('error', reject);
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body, '{"status":"ok"}');
    assert.match(response.contentType, /^application\/json(?:;|$)/);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => {
      if (error) reject(error);
      else resolve();
    }));
  }
});
