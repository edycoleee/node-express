//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application');
//const { app } = require('../src');

describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

//jalankan test
//npx jest app.test.js