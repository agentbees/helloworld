const request = require('supertest');
const app = require('./app');

describe('GET /health', () => {
  test('returns an unauthenticated JSON health response', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['content-type']).toMatch(/^application\/json(?:;|$)/);
  });
});
