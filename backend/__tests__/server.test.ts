import request from 'supertest';

const serverUrl = 'http://localhost:4000/graphql';

describe('Server', () => {
  it('should be running', async () => {
    const res = await request(serverUrl).get('/'); // replace '/' with your server's health check endpoint
    expect(res.statusCode).toEqual(200);
  });
});
