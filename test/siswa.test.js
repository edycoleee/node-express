//test/siswa.test.js
const request = require('supertest');
const { app } = require('../src/application');

describe('TEST REST FULL API', () => {

  //1. GET http://localhost:3000/api/siswa
  it('READ : Endpoint : GET /api/siswa', async () => {
    //a.send request get
    const getDataResponse = await request(app).get('/api/siswa');
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah 'GET ALL SISWA'
    expect(getDataResponse.text).toBe('GET ALL SISWA');
  })

  //2. GET http://localhost:3000/api/siswa/1
  it('READ : Endpoint : GET /api/siswa/:id', async () => {
    //a.send request get
    const getDataResponse = await request(app).get('/api/siswa/1');
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('GET SISWA');
  })

  //3. POST http://localhost:3000/api/siswa
  it('CREATE : Endpoint : POST /api/siswa', async () => {
    //data obyek yang akan dikirim
    const dataKirim = {
      "first_name": "Edy",
      "last_name": "Kholid",
      "email": "edy@gmail.com",
      "phone": "8787878787"
    }
    const getDataResponse = await request(app)
      //a.send request post
      .post('/api/siswa')
      //kirim data body >> object dataKirim
      .send(dataKirim);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('ADD NEW SISWA');
  })

  //4. DELETE http://localhost:3000/api/siswa/1
  it('DELETE : Endpoint : DELETE /api/siswa/:id', async () => {
    //a.send request delete
    const getDataResponse = await request(app).delete('/api/siswa/id');
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('DELETE SISWA');
  })

  //5. PUT http://localhost:3000/api/siswa/1
  it('UPDATE : Endpoint : PUT /api/siswa/:id', async () => {
    //data obyek yang akan dikirim
    const dataKirim = {
      "first_name": "Silmi-Rev",
      "last_name": "Ayra-Rev",
      "email": "silmi@gmail.com",
      "phone": "32423423434"
    }
    const getDataResponse = await request(app)
      //a.send request put
      .put('/api/siswa/1')
      //kirim data body >> object dataKirim
      .send(dataKirim);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('UPDATE SISWA');
  })

})