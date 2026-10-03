const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

test('index page contains the Hello World document structure', () => {
  assert.match(indexHtml, /^<!doctype html>/i, 'index.html should use the HTML5 doctype');
  assert.match(indexHtml, /<main\b[^>]*>[\s\S]*<\/main>/i, 'index.html should have a semantic main element');
  assert.match(indexHtml, /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']styles\.css["']/i, 'index.html should link styles.css');

  const mainContent = indexHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)[1];
  const visibleText = mainContent.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.strictEqual(visibleText, 'Hello World');
});
