const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

test('README describes the single-page app and required technologies', () => {
  assert.match(readme, /single-page\s+\*\*Hello World HTML application\*\*/i);
  assert.match(readme, /HTML5/i);
  assert.match(readme, /CSS3/i);
  assert.match(readme, /JavaScript/i);
});

test('README local usage points to an existing HTML entry point', () => {
  const links = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  const relativeLinks = links.filter((link) => !/^(?:https?:|#|mailto:)/i.test(link));

  assert.ok(relativeLinks.length > 0, 'README should contain a relative project link');
  for (const link of relativeLinks) {
    assert.ok(
      fs.existsSync(path.resolve(root, link)),
      `README link target does not exist: ${link}`,
    );
  }
  assert.match(readme, /python3\s+-m\s+http\.server\s+8000/i);
});

test('README explains GitHub Pages access after publishing', () => {
  assert.match(readme, /GitHub Pages/i);
  assert.match(readme, /Settings\s+→\s+Pages/i);
  assert.match(readme, /github\.io/i);
});
