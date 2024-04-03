## BELAJAR NODE JS EXPRESS

## 1. PERSIAPAN

```json
//Membuat Repo di github
repository
https://github.com/edycoleee/node-express
echo "# node-express" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/edycoleee/node-express.git
git remote add origin git@github.com-edy:edycoleee/node-express.git
git push -u origin main

//init dan instal depedency
npm init
npm install express
npm install jest --save-dev
npm install babel-jest --save-dev
npm install @babel/preset-env --save-dev
npm install @babel/plugin-transform-runtime --save-dev
npm install jest supertest @types/jest --save-dev
npm install --save-dev nodemon
npm install winston winston-daily-rotate-file
npm install uuid

//Edit file package.json

"main": "./src/index.js",
"type": "module",
"scripts": {
    "test": "jest",
    "start": "node ./src/index.js",
    "dev": "nodemon ./src/index.js"
  },
"jest": {
"maxConcurrency" : 2,
"verbose": true,
"transform": {
"^.+\\.[t|j]sx?$": "babel-jest"
},
"collectCoverage": true,
"coverageThreshold": {
"global": {
"branches": 100,
"functions": 100,
"lines": 100,
"statements": 100
}
},
"collectCoverageFrom": [
"src/**/*.{js,jsx}",
"!vendor/**/*.{js,jsx}"
]
},

//Tambahkan File babel.config.json
{
"presets": [
"@babel/preset-env"
],
"plugins": [
[
"@babel/plugin-transform-runtime",
{
"regenerator": true
}
]
]
}

//Tambahkan File .gitignore
node_modules
build
npm-debug.log
.nyc
.env
.DS_Store
.idea
coverage
\*.log
```

## 2. Mengenal Express JS

ExpressJS adalah salah satu Web Framework OpenSource paling populer di NodeJS
ExpressJS pertama kali dibuat tahun 2010, dan karena sangat populer, ExpressJS sekarang sudah menjadi hal yang wajib dikuasai ketika kita akan membuat Web menggunakan NodeJS

Application

Saat kita membuat web menggunakan ExpressJS, kita akan membuat object Application
Application adalah object utama dalam library ExpressJS

Application secara default tidak berjalan, jika kita ingin menjalankan Application nya, kita perlu menggunakan method listen(port)
Dimana port adalah nomor port yang ingin kita gunakan untuk menjalankan web nya
Pastikan port yang kita pilih tidak bentrok dengan aplikasi lain

```json
//src/index.js
import express from "express";

export const app = express();

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

`npm run dev`

## 3. Basic Testing

- Memisahkan index.js dan application.js ,untuk memudahkan pengetesan dengan unit test

```json
//src/index.js
import { app } from "./application.js";

//1. Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

- endpoint GET http://localhost:3000/

```json
//src/application.js
import express from "express";

export const app = express();

app.use(express.json());

//2. Contoh Endpoint API
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});
```

- melakukan pengetesan dengan request.rest

```json
###
GET http://localhost:3000/

###
```

- melakukan pengetesan dengan unit test

```json
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
```

4. Basic Routing

- end point GET http://localhost:3000/oby

```json
//src/application.js
import express from "express";

export const app = express();

app.use(express.json());

//1. Contoh Endpoint API >> GET / >> Response Text
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});

//2. Contoh Endpoint API >> GET /oby >> Response Object dg router
export const router = express.Router();
app.use(router)
const dtpasien1 = {
    nama: "Edy",
    alamat: "Semarang"
}
router.get('/oby', (req, res, next) => {
    res.json({
        message: 'GET Data Pasien Sukses',
        data: dtpasien1
    })
})

```

- test rest

```json
###
GET http://localhost:3000/oby
```

- unit test

```json
//Test GET http://localhost:3000/oby
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
```

## 4. Req Body >> Response Body

- endpoint POST http://localhost:3000/api/pasien

```json
//3. Contoh Endpoint API >> POST /api/pasien >> Req Body >> Res Body
router.post('/pasien', (req, res, next) => {
    res.json({
        message: 'POST Data Pasien Sukses',
        data: req.body
    })
})
app.use("/api", router)
```

- request test

```json
###
POST http://localhost:3000/api/pasien
Content-Type: application/json

{
  "nama" : "Silmi",
  "alamat": "Karangawen"
}
```

- unit test

```json
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
```

### 5. Membuat EndPoint CRUD Dokumentasi >> Object
Dokumentasi pada file `.\docs\siswa.md` >> CRUD

```
1. READ : Endpoint : GET /api/siswa
2. READ : Endpoint : GET /api/siswa/:id
3. CREATE : Endpoint : POST /api/siswa
4. DELETE : Endpoint : DELETE /api/siswa/:id
5. UPDATE : Endpoint : PUT /api/siswa/:id
```

### 6. GET Data SEARCH ALL (READ)
- API SPEC
`//docs/siswa.md`

Endpoint : GET /api/siswa

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Silmi",
      "last_name": "Ayra",
      "email": "silmi@gmail.com",
      "phone": "32423423434"
    },
    {
      "id": 2,
      "first_name": "Nafi",
      "last_name": "Dhafin",
      "email": "afin@gmail.com",
      "phone": "112233445566"
    }
  ]
}
```

- Endpoint

Install uuid >> npm install uuid

```json
//src/siswa.js
import express from "express";
import { v4 as uuid } from 'uuid';

//membuat siswa router dari express router > export
export const SiswaRouter = express.Router();

//0. MOCKUP DATA OBYEK (DATA SEMENTARA)
let dbDataSiswa = [
  {
    "id": "1",
    "first_name": "Silmi",
    "last_name": "Ayra",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  },
  {
    "id": "2",
    "first_name": "Nafi",
    "last_name": "Dhafin",
    "email": "afin@gmail.com",
    "phone": "112233445566"
  }
]

// 1. READ : Endpoint : GET /api/siswa
SiswaRouter.get('/', (req, res, next) => {
  //kembalikan respon berupa json data siswa
  res.json({ data: dbDataSiswa })
})
```

- Jalankan siswa Router ke middleware application.js
```json
//src/application.js
import express from "express";
import { SiswaRouter } from "./siswa.js";

...............................................

//Jalankan siswa router sebagai middleware router
router.use("/siswa", SiswaRouter)

app.use("/api", router)

```


- Request.rest Test
```
### 6. GET Data SEARCH ALL (READ)
GET http://localhost:3000/api/siswa
```
- Unit Test
```json
//test/siswa.test.js
const request = require('supertest');
const { app } = require('../src/application');

describe('TEST GET Endpoint 1', () => {

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
})
```
### 7. GET Data /id (READ)
- Endpoint
```json
//2. READ : Endpoint : GET /api/siswa/:id >> menggunakan request.params.id
SiswaRouter.get('/:id', (req, res, next) => {
  //Panggil Fungsi Get Siswa by ID dengan mengirim id = req.params.id
  const dtSiswa = getdbSiswaId(req.params.id)
  //Jika data Kosong kirim pesan error
  if (!dtSiswa || dtSiswa.length === 0) {
    // kirimkan respod status 404 dan json 
    return res.status(404).json({ "errors": "Siswa is not found" })
  }
  //Jika data tdk kosong kirim respon datanya 
  res.json({ data: dtSiswa })
})

//Fungsi Get Siswa by ID ke object mockup database >> dbDataSiswa
const getdbSiswaId = (id) => {
  //return dbDataSiswa.find((siswa) => siswa.id === parseInt(id))
  // cari siswa di dbDataSiswa deengan siswa.id = id >> return hasilnya
  return dbDataSiswa.find((siswa) => siswa.id === id)
}
```
- Request.rest Test
```
### 7. GET Data /id (READ)
GET http://localhost:3000/api/siswa/1
```
- Unit Test
```json
    //2. GET http://localhost:3000/api/siswa/1
    it('GET Data by ID (READ)', async () => {
        //kirim request GET http://localhost:3000/api/siswa/1
        const getDataResponse  = await request(app).get('/api/siswa/1');
        //tampilkan di log data
        console.log(getDataResponse.body.data);
        // jika sukses maka response status = 200
        expect(getDataResponse.status).toBe(200);
         // Memeriksa isi object apakah isi datanya sama dengan dataTest
        expect(getDataResponse.body.data).toEqual(dataTest);
      })
```
### 8. POST Data (CREATE)
- Endpoint
```json
//3. Create Siswa API
SiswaRouter.post('/', (req, res, next) => {
  const dataReq = req.body;
  const id = uuid()
  const AddDtSiswa = (data) => {
    dbDataSiswa.push({ ...data, id })
    console.log(dbDataSiswa);
  }

  AddDtSiswa(dataReq)
  const dataRespon = getdbSiswaId(id)

  res.json({ data: dataRespon })
})
```
- Request.rest Test
```
### 8. POST Data (CREATE)
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
    "first_name": "Edy",
    "last_name": "Kholid",
    "email": "edy@gmail.com",
    "phone": "8787878787"
}

```
- Unit Test
```
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
```
### 9. DELETE Data /id (DELETE)
- Endpoint
```
//4. Remove Siswa API
SiswaRouter.delete('/:id', (req, res, next) => {

  const dtSiswa = getdbSiswaId(req.params.id)
  console.log(dtSiswa);
  if (!dtSiswa || dtSiswa.length === 0) {
    return res.status(404).json({ "errors": "Siswa is not found" })
  } else {
    console.log("delete");
    const deldbSiswaId = (id) => {
      dbDataSiswa = dbDataSiswa.filter((dtSiswa) => dtSiswa.id !== id)
    }

    deldbSiswaId(req.params.id)
    return res.status(200).json({ "data": dbDataSiswa })

  }
})
```
- Request.rest Test
```
### 9. DELETE Data /id (DELETE)
DELETE http://localhost:3000/api/siswa/1

```
- Unit Test
```
    //4. DELETE http://localhost:3000/api/siswa/1
    it('DELETE Data by Id (DELETE)', async () => {
        const getDataResponse = await request(app).delete('/api/siswa/id');
        console.log(getDataResponse);
        expect(getDataResponse.status).toBe(404);
        // Memeriksa isi array tidak mengandung object tertentu
        expect(getDataResponse.body.data).not.toEqual(expect.arrayContaining([dataTest]));
    })

```
### 10. PUT Data /id (UPDATE)
- Endpoint
```
//5. Update Siswa API
SiswaRouter.put('/:id', (req, res, next) => {
  const bodySiswa = req.body;
  const idEdit = req.params.id
  const updatedbSiswa = (id, dataSiswa) => {
    dbDataSiswa = dbDataSiswa.map(dtSiswa => {
      if (dtSiswa.id == id) {
        dtSiswa.first_name = dataSiswa.first_name
        dtSiswa.last_name = dataSiswa.last_name
      }
      return dtSiswa;
    })
    return dbDataSiswa
  }

  updatedbSiswa(idEdit, bodySiswa)

  const dataRespon = getdbSiswaId(idEdit)
  res.json({ data: dataRespon })
})

```
- Request.rest Test
```
### 10. PUT Data /id (UPDATE)
PUT http://localhost:3000/api/siswa/1
Content-Type: application/json

{
    "first_name": "Silmi-Rev",
    "last_name": "Ayra-Rev",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
```
- Unit Test
```
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
```