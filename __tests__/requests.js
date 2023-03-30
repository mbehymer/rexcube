const app = require('../source');
const request = require('supertest');

jest.setTimeout(30000);

describe('GET All Requests', () => {
  test('responds to /requests', async () => {
    const res = await request(app).get('/requests');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
});

describe('Check if we can GET one Request', () => {
  test('responds to /requests/id', async () => {
    const res = await request(app).get('/requests/640d1ea38a5ddf421808be84');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
});


describe('Check if we can Request an activity', () => {
  test('responds to /requests', async () => {
    const res = await request(app).post('/requests');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  });
});

describe('Check if the Update Requests Route Works', () => {
  test('responds to /requests', async () => {
    const res = await request(app).put('/requests');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  });
});

describe('Check if we can Delete a request', () => {
  test('responds to /requests/id', async () => {
    const res = await request(app).delete('/requests/640d1ea38a5ddf421808be84');
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8');
  });
});
