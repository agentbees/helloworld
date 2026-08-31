// greet(name) — a friendly greeting. Defaults to the whole world.
function greet(name) {
  const who = (name && String(name).trim()) || 'world';
  return `Hello, ${who}!`;
}

module.exports = { greet };
