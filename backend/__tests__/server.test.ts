import request from 'supertest';

const serverUrl = 'http://localhost:4000/graphql';

it('should be running', async () => {
  const query = {
    query: `{ healthCheck }`,
  };

  const res = await request(serverUrl)
    .post('/')
    .send(query)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('data.healthCheck', 'Server is running');
});
