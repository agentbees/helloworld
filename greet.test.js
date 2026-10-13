const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { greet } = require('./greet');
const server = require('./app');

test('greets the world by default', () => {
  assert.strictEqual(greet(), 'Hello, world!');
});

function request(path) {
  return new Promise((resolve, reject) => {
    const request = http.get({ port: server.address().port, path }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve({ response, body }));
    });
    request.on('error', reject);
  });
}

test('serves the Hello World page and stylesheet', async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());

  const page = await request('/');
  assert.strictEqual(page.response.statusCode, 200);
  assert.match(page.response.headers['content-type'], /^text\/html/);
  assert.match(page.body, /<h1>Hello World<\/h1>/);

  const greeting = await request('/?name=Bea');
  assert.strictEqual(greeting.response.statusCode, 200);
  assert.match(greeting.response.headers['content-type'], /^text\/plain/);
  assert.strictEqual(greeting.body, 'Hello, Bea!');

  const stylesheet = await request('/style.css');
  assert.strictEqual(stylesheet.response.statusCode, 200);
  assert.match(stylesheet.response.headers['content-type'], /^text\/css/);
});
