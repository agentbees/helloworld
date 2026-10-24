const { greet } = require('./greet');

test('greets the world by default', () => {
  expect(greet()).toBe('Hello, world!');
});
