const request = require('supertest');
const server = require('./app');

test('GET /health returns an unauthenticated JSON health response', async () => {
  const response = await request(server).get('/health');

  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/^application\/json/);
  expect(response.text).toBe('{"status":"ok"}');
});
