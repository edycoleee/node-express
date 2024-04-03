//test/siswa.test.js
const request = require('supertest');
const { app } = require('../src/application');

describe('Test Untuk 1 dan 3', () => {

    //data yang untuk membandingkan hasil test >> salah satu object dari response 
    // kita coba data mockup object dengan id : 1
    const dataTest =   {
        "id": "1",
        "first_name": "Silmi",
        "last_name": "Ayra",
        "email": "silmi@gmail.com",
        "phone": "32423423434"
      }

    //1. GET http://localhost:3000/api/siswa
    it('GET Data SEARCH ALL (READ)', async () => {
        // kirim request ke server GET http://localhost:3000/api/siswa
        const getDataResponse  = await request(app).get('/api/siswa');
        //cek log data response
        console.log(getDataResponse.body.data);
        // Memeriksa response status = 200
        expect(getDataResponse.status).toBe(200);
        // Memeriksa panjang array lebih dari 1 object panjangnya 
        expect(getDataResponse.body.data.length).toBeGreaterThan(0);
         // Memeriksa isi array apakah ada object seperti dataTest 
        expect(getDataResponse.body.data).toEqual(expect.arrayContaining([dataTest]));
      })

    //2. GET http://localhost:3000/api/siswa/1
    it('GET Data by ID (READ)', async () => {
        const getDataResponse = await request(app).get('/api/siswa/1');
        console.log(getDataResponse.body.data);
        expect(getDataResponse.status).toBe(200);
        // Memeriksa isi object
        expect(getDataResponse.body.data).toEqual(dataTest);
    })

    //3. POST http://localhost:3000/api/siswa
    it('POST Data (CREATE)', async () => {
        const dataKirim = {
            "first_name": "Edy",
            "last_name": "Kholid",
            "email": "edy@gmail.com",
            "phone": "8787878787"
        }
        const response = await request(app)
            .post('/api/siswa')
            .send(dataKirim);
        expect(response.status).toBe(200);
        // Memeriksa bahwa respons adalah sebuah objek
        expect(response.body.data).toBeInstanceOf(Object);
        // Memeriksa apakah objek mengandung nilai tertentu
        expect(response.body.data).toEqual(expect.objectContaining({ "first_name": "Edy" }));
    })

    //4. DELETE http://localhost:3000/api/siswa/1
    it('DELETE Data by Id (DELETE)', async () => {
        const getDataResponse = await request(app).delete('/api/siswa/id');
        console.log(getDataResponse);
        expect(getDataResponse.status).toBe(404);
        // Memeriksa isi array tidak mengandung object tertentu
        expect(getDataResponse.body.data).not.toEqual(expect.arrayContaining([dataTest]));
    })

    //5. PUT http://localhost:3000/api/siswa/1
    it('POST Data (CREATE)', async () => {
        const dataKirim = {
            "first_name": "Silmi-Rev",
            "last_name": "Ayra-Rev",
            "email": "silmi@gmail.com",
            "phone": "32423423434"
          }
        const response = await request(app)
            .put('/api/siswa/1')
            .send(dataKirim);
        expect(response.status).toBe(200);
        // Memeriksa apakah objek mengandung nilai tertentu
        expect(response.body.data).toEqual(expect.objectContaining({ "first_name": "Silmi-Rev" }));
        expect(response.body.data).toEqual(expect.objectContaining({ "last_name": "Ayra-Rev" }));
    })

})