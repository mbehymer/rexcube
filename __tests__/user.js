const app = require('../source');
const request = require('supertest');

jest.setTimeout(30000);

describe('GET LOGOUT', () => {
    test('responds to /', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toBe(200);
        });
    });

describe('Check if the Update User Route Works', () => {
    test('responds to /activity', async () => {
        const res = await request(app).put('/user');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    });
    });

    describe('Post a User', () => {
        test('responds to /user', async () => {
          const res = await request(app).post('/user');
          expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        });
      });

describe('Delete a user', () => {
    test('responds to /user', async () => {
        const res = await request(app).delete('/user/640766ff36b18da5e16a9ceb');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    });
    });