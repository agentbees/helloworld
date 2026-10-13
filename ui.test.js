const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

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
