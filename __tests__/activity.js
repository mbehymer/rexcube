const app = require('../source');
const request = require('supertest');

describe('GET All Activitys', () => {
    test('responds to /activity', async () => {
      const res = await request(app).get('/activity');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
  });

  describe('Check if we can GET one activity', () => {
    test('responds to /activity/id', async () => {
        const res = await request(app).get('/activity/640a06f28ce1d61f91897128');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
    });


  describe('Check if we can get an activity by categoryID', () => {
    test('responds to /activity/findcategory/1', async () => {
      const res = await request(app).get('/activity/findcategory/1');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
  });


    describe('Check if we can Post an activity', () => {
        test('responds to /activity', async () => {
          const res = await request(app).post('/activity');
          expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        });
      });

describe('Check if we can Delete an activity', () => {
    test('responds to /activity/ID', async () => {
        const res = await request(app).delete('/activity/640a06f28ce1d61f91897128');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
    });