const app = require('../source');
const request = require('supertest');

jest.setTimeout(30000);

describe('Check if the Update category Route Works', () => {
    test('responds to /category', async () => {
        const res = await request(app).put('/category');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    });
    });

describe('Post a new category', () => {
    test('responds to /category', async () => {
        const res = await request(app).post('/category');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
    });

