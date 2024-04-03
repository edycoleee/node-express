//test/siswa.test.js
const request = require('supertest');
const { app } = require('../src/application');
const { query } = require('../src/util/db');

describe('TEST REST FULL API', () => {

    const dataTest = {
        "id": 1,
        "first_name": "Silmi",
        "last_name": "Ayra",
        "email": "silmi@gmail.com",
        "phone": "32423423434"
    }

    //1. GET http://localhost:3000/api/siswa
    it.skip('GET Data SEARCH ALL (READ)', async () => {
        const getDataResponse = await request(app).get('/api/siswa');
        // Memeriksa panjang array
        expect(getDataResponse.body.data.length).toBeGreaterThan(0);
        // Memeriksa isi array
        expect(getDataResponse.body.data).toEqual(expect.arrayContaining([dataTest]));
    })

    //2. GET http://localhost:3000/api/siswa/1
    it.skip('GET Data by ID (READ)', async () => {
        const getDataResponse = await request(app).get('/api/siswa/1');
        expect(getDataResponse.status).toBe(200);
        // Memeriksa isi object
        expect(getDataResponse.body.data).toEqual(dataTest);
    })

    //3. POST http://localhost:3000/api/siswa
    it.skip('POST Data (CREATE)', async () => {
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
        // Memeriksa bahwa respons adalah sebuah objek
        expect(getDataResponse.body.data).toBeInstanceOf(Object);
        // Memeriksa apakah objek mengandung nilai tertentu
        expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "first_name": "Edy" }));
    })

    //4. DELETE http://localhost:3000/api/siswa/1
    it.skip('DELETE Data by Id (DELETE)', async () => {

        //insert data
        const dataInsert = ["test", "test", "test@gmail.com", "080900000"]
        const results = await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
        const idData = results.insertId

        const getDataResponse = await request(app).delete(`/api/siswa/${idData}`);
        expect(getDataResponse.status).toBe(200);
        expect(getDataResponse.text).toBe('Deleted Successfully');
    })

})

describe('PUT /api/siswa/:id', function () {

    let idData
    beforeEach(async () => {
        const dataInsert = ["Silmi", "Ayra", "test@gmail.com", "32423423434"]
        const results = await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
        idData = results.insertId
    })

    afterEach(async () => {
        await query('DELETE FROM tbsiswa WHERE id = ?', [idData]);
    })

    //5. PUT http://localhost:3000/api/siswa/1
    it('PUT Data (UPDATE)', async () => {
        const dataKirim = {
            "first_name": "Silmi-Rev",
            "last_name": "Ayra-Rev",
            "email": "silmi@gmail.com",
            "phone": "32423423434"
        }
        const getDataResponse = await request(app)
            .put(`/api/siswa/${idData}`)
            .send(dataKirim);
        expect(getDataResponse.status).toBe(201);
        expect(getDataResponse.body.data.id).toBe(idData);
        expect(getDataResponse.body.data.first_name).toBe("Silmi-Rev");
        expect(getDataResponse.body.data.last_name).toBe("Ayra-Rev");
        expect(getDataResponse.body.data.email).toBe("silmi@gmail.com");
        expect(getDataResponse.body.data.phone).toBe("32423423434");
    })

})