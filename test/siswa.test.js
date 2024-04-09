//test/siswa.test.js
//import supertest from "supertest";
const request = require('supertest');
const { app } = require('../src/application');
const { insertManyTestSiswa, deleteAllTestSiswa, insertTestSiswa, selectAllTestSiswa } = require('./util-test');

//1. TEST READ ALL
describe('TEST READ ALL', () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
  })
  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  })

  //1. READ : Endpoint : GET /api/siswa
  it('READ : Endpoint : GET /api/siswa', async () => {
    //a.send request get
    const getDataResponse = await request(app).get('/api/siswa');
    //log untuk melihat response
    console.log(getDataResponse.body.data);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa array object berjumlah 10
    expect(getDataResponse.body.data.length).toBe(10);
  })

})

//2. TEST READ by id
describe('TEST READ by id', () => {

  let idTest = 0
  beforeEach(async () => {
    //a.Hapus semua data
    await deleteAllTestSiswa();
    //b.Insert data
    await insertTestSiswa();
    //c.Select data dan cari id nya
    const rows = await selectAllTestSiswa();
    //gunakan id untuk test get by id
    idTest = rows[0].id
    console.log(idTest);
  })
  //Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  })

  //2. GET http://localhost:3000/api/siswa/:idTest
  it('READ : Endpoint : GET /api/siswa/:id', async () => {
    //a.send request get menggunakan id yang sudah didapat saat select
    const getDataResponse = await request(app).get(`/api/siswa/${idTest}`);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    // Memeriksa apakah objek mengandung nilai tertentu
    expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "first_name": "test-Insert" }));
    expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "last_name": "test-Insert" }));
  })

  //test validasi harusnya invalid (tidak valid)
  it('should reject if request is invalid', async () => {
    const result = await request(app)
      //kirim get menggunakan angka
      .get('/api/siswa/a')
    //status akan menjadi 400
    expect(result.status).toBe(400);
    //errors akan terdefinisi dan di kirimkan alasan errornya
    expect(result.body.errors).toBeDefined();
  });

  //test jika data yang dicari tidak ada
  it('should reject if request is not exist', async () => {
    const result = await request(app)
      //kirim get menggunakan angka
      .get('/api/siswa/1000')
    //status akan menjadi 400
    console.log("TIDAK KETEMU :", result.body);
    expect(result.status).toBe(200);
    //errors akan terdefinisi dan di kirimkan alasan errornya
    expect(result.body.errors).toBeDefined();
  });
})

//3. TEST CREATE
describe('TEST CREATE', () => {

  //Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
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
    expect(getDataResponse.status).toBe(201);
    // Memeriksa bahwa respons adalah sebuah objek
    expect(getDataResponse.body.data).toBeInstanceOf(Object);
    // Memeriksa apakah objek mengandung nilai tertentu
    expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "first_name": "Edy" }));
  })

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .post('/api/siswa')
      .send({
        "first_name": "",
        "last_name": "Kholid",
        "email": "edy@gmail.com",
        "phone": "8787878787"
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

})
//4. TEST DELETE by id
describe('TEST DELETE by id', () => {

  let idTest = 0
  beforeEach(async () => {
    //a.Hapus semua data
    await deleteAllTestSiswa();
    //b.Insert data
    await insertTestSiswa();
    //c.Select data dan cari id nya
    const rows = await selectAllTestSiswa();
    //gunakan id untuk test get by id
    idTest = rows[0].id
    console.log(idTest);
  })


  //4. DELETE http://localhost:3000/api/siswa/1
  it('DELETE : Endpoint : DELETE /api/siswa/:id', async () => {
    //a.send request delete
    const getDataResponse = await request(app).delete(`/api/siswa/${idTest}`);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('Deleted Successfully');
  })

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .delete('/api/siswa/a')
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  //test jika data yang delete tidak ada
  it('should reject if request is not exist', async () => {
    const result = await request(app)
      //kirim get menggunakan angka
      .delete('/api/siswa/1000')
    //status akan menjadi 400
    console.log("TIDAK KETEMU :", result.body);
    expect(result.status).toBe(200);
    //errors akan terdefinisi dan di kirimkan alasan errornya
    expect(result.body.errors).toBeDefined();
  });

})

//5. TEST UPDATE by id
describe('TEST UPDTAE by id', () => {

  let idTest = 0
  beforeEach(async () => {
    //a.Hapus semua data
    await deleteAllTestSiswa();
    //b.Insert data
    await insertTestSiswa();
    //c.Select data dan cari id nya
    const rows = await selectAllTestSiswa();
    //gunakan id untuk test get by id
    idTest = rows[0].id
    console.log(idTest);
  })

  //Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
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
      .put(`/api/siswa/${idTest}`)
      //kirim data body >> object dataKirim
      .send(dataKirim);
    //b. jika sukses, reponse status adalah 201
    expect(getDataResponse.status).toBe(201);
    // Memeriksa apakah objek mengandung nilai tertentu
    expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "first_name": "Silmi-Rev" }));
    expect(getDataResponse.body.data).toEqual(expect.objectContaining({ "last_name": "Ayra-Rev" }));

  })

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .put(`/api/siswa/${idTest}`)
      .send({
        "first_name": "Edy",
        "last_name": "",
        "email": "edy@gmail.com",
        "phone": "8787878787"
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  //test jika data yang delete tidak ada
  it('should reject if request is not exist', async () => {
    const result = await request(app)
      //kirim get menggunakan angka
      .put('/api/siswa/1000')
    //status akan menjadi 400
    console.log("TIDAK KETEMU :", result.body);
    expect(result.status).toBe(400);
    //errors akan terdefinisi dan di kirimkan alasan errornya
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .put('/api/siswa/a')
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

})