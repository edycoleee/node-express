//test/siswa.test.js
const request = require('supertest');
const { app } = require('../src/application');

describe('TEST REST FULL API', () => {

    const dataTest = {
        "id": 1,
        "first_name": "Silmi",
        "last_name": "Ayra",
        "email": "silmi@gmail.com",
        "phone": "32423423434"
    }

    //1. GET http://localhost:3000/api/siswa
    it('GET Data SEARCH ALL (READ)', async () => {
        const getDataResponse = await request(app).get('/api/siswa');
        // Memeriksa panjang array
        expect(getDataResponse.body.length).toBeGreaterThan(0);
        // Memeriksa isi array
        expect(getDataResponse.body).toEqual(expect.arrayContaining([dataTest]));
    })

    //2. GET http://localhost:3000/api/siswa/1
    it('GET Data by ID (READ)', async () => {
        const getDataResponse = await request(app).get('/api/siswa/1');
        expect(getDataResponse.status).toBe(200);
        // Memeriksa isi object
        expect(getDataResponse.body).toEqual(dataTest);
    })

    //3. POST http://localhost:3000/api/siswa
    it('POST Data (CREATE)', async () => {
        const dataKirim = {
            "first_name": "Edy",
            "last_name": "Kholid",
            "email": "edy@gmail.com",
            "phone": "8787878787"
        }
        const getDataResponse = await request(app)
            .post('/api/siswa')
            .send(dataKirim);
            expect(getDataResponse.status).toBe(201);
            expect(getDataResponse.text).toBe('ADD NEW SISWA');
    })

    //4. DELETE http://localhost:3000/api/siswa/1
    it('DELETE Data by Id (DELETE)', async () => {
        const getDataResponse = await request(app).delete('/api/siswa/id');
        expect(getDataResponse.status).toBe(200);
        expect(getDataResponse.text).toBe('DELETE SISWA');
    })

    //5. PUT http://localhost:3000/api/siswa/1
    it('POST Data (CREATE)', async () => {
        const dataKirim = {
            "first_name": "Silmi-Rev",
            "last_name": "Ayra-Rev",
            "email": "silmi@gmail.com",
            "phone": "32423423434"
          }
        const getDataResponse = await request(app)
            .put('/api/siswa/1')
            .send(dataKirim);
            expect(getDataResponse.status).toBe(200);
            expect(getDataResponse.text).toBe('UPDATE SISWA');
    })

})