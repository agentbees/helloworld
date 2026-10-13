const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const server = require('./app');

const root = __dirname;

test('entry screen renders a persistent, readable Hello World heading', () => {
  const document = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const styles = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

  assert.match(document, /<main>\s*<h1>Hello World<\/h1>\s*<\/main>/);
  assert.match(document, /<link rel="stylesheet" href="\/style\.css">/);
  assert.match(styles, /min-height:\s*100vh/);
  assert.match(styles, /background:\s*#[0-9a-f]{6}/i);
  assert.match(styles, /color:\s*#[0-9a-f]{6}/i);
  assert.match(styles, /h1\s*\{[\s\S]*font-size:/);
});

test('the running entry route serves the screen and its stylesheet', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const page = await fetch(`http://127.0.0.1:${port}/`);
    const html = await page.text();
    assert.equal(page.status, 200);
    assert.match(html, /<main>\s*<h1>Hello World<\/h1>\s*<\/main>/);

    const stylesheet = await fetch(`http://127.0.0.1:${port}/style.css`);
    assert.equal(stylesheet.status, 200);
    assert.match(await stylesheet.text(), /min-height:\s*100vh/);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
