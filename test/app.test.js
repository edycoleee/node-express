//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application');
//const { app } = require('../src');

describe('Test Untuk 1 dan 3', () => {

  //1. test GET http://localhost:3000
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  //3. test POST http://localhost:3000/api/pasien
  it('should return Body', async () => {
    const dataKirim = {
      "nama": "Silmi",
      "alamat": "Karangawen"
    }
    const response = await request(app)
      .post('/api/pasien')
      .send(dataKirim);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'POST Data Pasien Sukses',
      data: dataKirim
    });
  });

});

//jalankan test
//npx jest app.test.js

//Test menggunakan per satuan test
//2. Test GET http://localhost:3000/oby
test("Test GET /oby", async () => {
  //Cek response Object >> body >> toEqual
  const response = await request(app).get("/oby");
  expect(response.body).toEqual({
    message: 'GET Data Pasien Sukses',
    data: {
      nama: "Edy",
      alamat: "Semarang"
    }
  });
})

//