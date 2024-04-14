## BELAJAR NODE JS EXPRESS

## 1. PERSIAPAN

```
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
npm install joi
npm install mysql2

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

### Object App dari Express

`export const app = express();`

Objek app pada Express adalah inti dari aplikasi Express. Dengan objek ini, Anda dapat membuat rute, menangani permintaan HTTP, mengatur middleware, dan berbagai fungsi lainnya yang terkait dengan pengaturan dan penanganan aplikasi web.

Berikut adalah beberapa contoh penggunaan umum objek app pada Express:

1. Membuat Rute: Anda dapat menggunakan metode `app.get()`, `app.post()`, `app.put()`, `app.delete()`, dll., untuk menentukan rute HTTP dan menangani permintaan yang sesuai.

```
app.get('/', function(req, res) {
  res.send('Halo dunia!');
});
```

2. Mengatur Middleware: Middleware adalah fungsi-fungsi yang dipanggil sebelum penanganan permintaan akhir. Dengan Express, Anda dapat menggunakan metode `app.use()` untuk mengatur middleware.

```
app.use(express.json()); // Middleware untuk menangani JSON data
```

3. Menjalankan Server: Seperti yang Anda lihat dalam potongan kode sebelumnya, Anda menggunakan objek app untuk memanggil metode `listen()` untuk memulai server dan mendengarkan koneksi masuk.

```
app.listen(PORT, function() {
  console.log(`Server berjalan di port ${PORT}`);
});
```

### Application :: _a.import library >> b.app object >> c.port >> d.listen_

```
//src/index.js
//a. import library Framework express
import express from "express";

//b. membuat object app dari express function
export const app = express();

//c. definisikan PORT sebagai variable,
// sehingga mudah menggantinya jika diperlukan
const PORT = process.env.PORT || 3000;

//d. metode app.listen untuk memulai sebuah server dan mendengarkan koneksi masuk pada port
//app.listen(PORT, callback)
//() => {...}: arrow function, used as the callback function. logs a message to the console
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

### Jalankan Server : `npm run dev`

## 3. Basic Testing

Belajar membuat endpoint request dan response

1. Endpoint GET http://localhost:3000/ > Request => Response send String

Response Body Success :

```json
"Hello World!"
```

2. Endpoint GET http://localhost:3000/oby > Request => Response json Object

   Response Body Success :

```json
{
  "message": "GET Data Pasien Sukses",
  "data": {
    "nama": "Edy",
    "alamat": "Semarang"
  }
}
```

3. Endpoint POST http://localhost:3000/api/pasien > Request+Body => Response json Object

   Request Body :

```json
Content-Type: application/json

{
  "nama" : "Silmi",
  "alamat": "Karangawen"
}
```

Response Body Success :

```json
{
  "message": "POST Data Pasien Sukses",
  "data": {
    "nama": "Silmi",
    "alamat": "Karangawen"
  }
}
```

Untuk pertama kita buat :

#### 1. Endpoint GET http://localhost:3000/ > Request => Response send String

- Memisahkan index.js dan application.js ,untuk memudahkan pengetesan dengan unit test

```
//src/index.js
import { app } from "./application.js";

//c. definisikan PORT sebagai variable,
// sehingga mudah menggantinya jika diperlukan
const PORT = process.env.PORT || 3000;

//d. metode app.listen untuk memulai sebuah server dan mendengarkan koneksi masuk pada port
//app.listen(PORT, callback)
//() => {...}: arrow function, used as the callback function. logs a message to the console
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

- endpoint GET http://localhost:3000/

Response Body Success :

```json
"Hello World!"
```

```
//src/application.js
//a. import library Framework express
import express from "express";

//b. membuat object app dari express function
export const app = express();

//e. Menjalankan Middleware app.use menangani data json
app.use(express.json());

//f. Membuat Rute >> app.get(Route, callback) >> (req,res) => {...}
//1. Contoh : Endpoint API : GET '/' ========================
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});
```

- melakukan pengetesan dengan request.rest

```
//request.rest
### 1. Contoh : Endpoint API : GET '/'
GET http://localhost:3000/

###
```

- melakukan pengetesan dengan unit test

Unit Test adalah callback function

```
1. fungsi testing : describe >> it =======================
describe('Nama Test', callback1)
callback1 >> () => {it('Nama Sub Test', callback2)}
callback2 >> async()=>{...}

describe("Test1", () => {
  it("Test 1.a", async() => {
    expect(...).toBe(...);
  });
  it("Test 1.b", async() => {
    expect(...).toBe(...);
  });
});

2. fungsi testing : describe >> test =======================
describe('Nama Test', callback1)
callback1 >> () => {test('Nama Sub Test', callback2)}
callback2 >> async()=>{...}

describe("Test1", () => {
  test("Test 1.a", async() => {
    expect(...).toBe(...);
  });
  test("Test 1.b", async() => {
    expect(...).toBe(...);
  });
});
```

Unit Test :

```
//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application');

//a. fungsi testing : describe >> it
describe('TEST GET No 1 dan No 3', () => {

  //1. TEST No 1 >> GET http://localhost:3000/
  it('TEST GET http://localhost:3000/', async () => {
    //b. lakukan request, GET "/" dan tangkap hasilnya ke variable response
    const response = await request(app)
    .get('/');
    //c. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //d. Periksa isi response seharusnya 'Hello World!'
    expect(response.text).toBe('Hello World!');
  });
});

//jalankan test
//npx jest app.test.js
```

4. Basic Routing

#### 2. Endpoint GET http://localhost:3000/oby > Request => Response json Object

- end point GET http://localhost:3000/oby

  Response Body Success :

```json
{
  "message": "GET Data Pasien Sukses",
  "data": {
    "nama": "Edy",
    "alamat": "Semarang"
  }
}
```

```
//src/application.js
//a. import library Framework express
import express from "express";

//b. membuat object app dari express function
export const app = express();

//e. Menjalankan Middleware app.use menangani data json
app.use(express.json());

//f. Membuat Rute >> app.get(Route, callback) >> (req,res) => {...}
//1. Contoh : Endpoint API : GET '/' ========================
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});

//2. Contoh Endpoint API >> GET /oby >> Response Object dg router
//membuat object router dari express
export const router = express.Router();
//jalankan middleware router
app.use(router)
//data object yang akan di kirim ke respon json
const dtpasien1 = {
    nama: "Edy",
    alamat: "Semarang"
}
//routing untuk http://localhost:3000/oby
router.get('/oby', (req, res, next) => {
  // response json data
    res.json({
        message: 'GET Data Pasien Sukses',
        data: dtpasien1
    })
})

```

- test rest

```
### 2. Contoh Endpoint API >> GET /oby
GET http://localhost:3000/oby
```

- unit test

```
//Test GET http://localhost:3000/oby
//a. fungsi testing : test
test("TEST GET http://localhost:3000/oby", async () => {
  /b. lakukan request, GET "/oby" dan tangkap hasilnya ke variable response
  const response = await request(app)
  .get("/oby");
  //c. Cek response Object >> body >> toEqual (sama)
  expect(response.body).toEqual({
    message: 'GET Data Pasien Sukses',
    data: {
      nama: "Edy",
      alamat: "Semarang"
    }
  });
})
```

#### 3. Req Body >> Response Body

- endpoint POST http://localhost:3000/api/pasien

Request Body :

```json
Content-Type: application/json

{
  "nama" : "Silmi",
  "alamat": "Karangawen"
}
```

Response Body Success :

```json
{
  "message": "POST Data Pasien Sukses",
  "data": {
    "nama": "Silmi",
    "alamat": "Karangawen"
  }
}
```

```
//3. Contoh Endpoint API >> POST /api/pasien >> Req Body >> Res Body
//Membuat Rute >> app.post(Route, callback) >> (req,res) => {res.json({...})}
router.post('/pasien', (req, res, next) => {
    //kirim json >> data berasal dari request body
    res.json({
        message: 'POST Data Pasien Sukses',
        data: req.body
    })
})
app.use("/api", router)
```

- request test

```
### 3. POST http://localhost:3000/api/pasien
POST http://localhost:3000/api/pasien
Content-Type: application/json

{
  "nama" : "Silmi",
  "alamat": "Karangawen"
}
```

- unit test

```
//fungsi test gabungkan dengan test pertama dan menjadi sub ke dua

//a. fungsi testing : describe >> it
describe('TEST GET No 1 dan No 3', () => {

  //1. TEST No 1 >> GET http://localhost:3000/
  it('TEST GET http://localhost:3000/', async () => {
    //b. lakukan request, GET "/" dan tangkap hasilnya ke variable response
    const response = await request(app)
    .get('/');
    //c. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //d. Periksa isi response seharusnya 'Hello World!'
    expect(response.text).toBe('Hello World!');
  });

  //3. test POST http://localhost:3000/api/pasien ================
  it('POST http://localhost:3000/api/pasien', async () => {
    //b. buat variable data body yang akan dikirim
    const dataKirim = {
      "nama": "Silmi",
      "alamat": "Karangawen"
    }
     //c. lakukan request, POST "/api/pasien" dan tangkap hasilnya ke variable response
    const response = await request(app)
      //kirim post
      .post('/api/pasien')
      //kirim send body
      .send(dataKirim);
    //d. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //e. respose body yang diharapkan adalah sama dengan data berikut
    expect(response.body).toEqual({
      message: 'POST Data Pasien Sukses',
      data: dataKirim
    });
  });

});
```

### 5. Membuat EndPoint CRUD Dokumentasi

Dokumentasi pada file `.\docs\siswa.md` >> CRUD

```
1. READ : Endpoint : GET /api/siswa
2. READ : Endpoint : GET /api/siswa/:id
3. CREATE : Endpoint : POST /api/siswa
4. DELETE : Endpoint : DELETE /api/siswa/:id
5. UPDATE : Endpoint : PUT /api/siswa/:id
```

### 6. SETTING MYSQL

- Membuat database / Schema dbsiswa

```
CREATE SCHEMA `dbsekolah` ;
```

- Membuat table tbsiswa

```
USE dbsekolah;

CREATE TABLE `dbsekolah`.`tbsiswa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));
```

```
INSERT INTO tbsiswa(first_name,last_name,email,phone)
VALUES
('Silmi','Ayra','silmi@gmail.com','32423423434'),
('Nafi','Dhafin','afin@gmail.com','112233445566');
```

- Koneksi ke database

```
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=760410
DB_NAME=dbsekolah
DB_PORT=3306
```

- konfigurasi mysql

`npm install mysql2`

```
//src/util/config.js

export const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "760410",
    database: "dbsekolah",
    connectTimeout: 60000
  },
};

```

```
//src/util/db.js
import mysql from "mysql2/promise";
import { config } from "../application/config.js";

export async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);
  await connection.end();
  return results;
}

```

- membuat routing siswa

```
//src/application.js
import express from "express";
import { SiswaRouter } from "./siswa.js";

..........................

//4. Jalankan Router Siswa >> middleware router
router.use("/siswa", SiswaRouter)

app.use("/api", router)

```

```
//src/siswa.js
import express from "express";

//membuat object router siswa dari express
export const SiswaRouter = express.Router();
```

### 7. TEST ENDPOINT

- Endpoint dan perintah query SQL

```
1. READ : Endpoint : GET /api/siswa
    SELECT * FROM tabel
2. READ : Endpoint : GET /api/siswa/:id
    SELECT * FROM tabel WHERE kolom = ygdicari
3. CREATE : Endpoint : POST /api/siswa
    INSERT INTO tabel (kolom) VALUES (?)', [data kirim]
4. DELETE : Endpoint : DELETE /api/siswa/:id
    DELETE FROM tabel WHERE kolom = ?', [data]
5. UPDATE : Endpoint : PUT /api/siswa/:id
    UPDATE tabel SET kolom=?', [data]
```

- ROUTING >> request - reponse >> send TEXT STRING

```
//src/siswa.js
import express from "express";

export const SiswaRouter = express.Router();

// 1. READ : Endpoint : GET /api/siswa
SiswaRouter.get('/', (req, res, next) => {
    //SELECT * FROM tabel
    res.send("GET ALL SISWA")
  })

//2. READ : Endpoint : GET /api/siswa/:id
SiswaRouter.get('/:id', (req, res, next) => {
    //SELECT * FROM tabel WHERE kolom = ygdicari
    res.send("GET SISWA")
  })

//3. CREATE : Endpoint : POST /api/siswa
SiswaRouter.post('/', (req, res, next) => {
    //INSERT INTO tabel (kolom) VALUES (?)', [data kirim]
    res.send("ADD NEW SISWA")
  })

//4. DELETE : Endpoint : DELETE /api/siswa/:id
SiswaRouter.delete('/:id', (req, res, next) => {
    //DELETE FROM tabel WHERE kolom = ?', [data]
    res.send("DELETE SISWA")
  })

//5. UPDATE : Endpoint : PUT /api/siswa/:id
SiswaRouter.put('/:id', (req, res, next) => {
    //UPDATE tabel SET kolom=?', [data]
    res.send("UPDATE SISWA")
})
```

- .REST

```
### 6. READ : Endpoint : GET /api/siswa
GET http://localhost:3000/api/siswa

### 7. READ : Endpoint : GET /api/siswa/:id
GET http://localhost:3000/api/siswa/1

### 8. CREATE : Endpoint : POST /api/siswa
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 9. DELETE : Endpoint : DELETE /api/siswa/:id
DELETE http://localhost:3000/api/siswa/1

### 10. UPDATE : Endpoint : PUT /api/siswa/:id
PUT http://localhost:3000/api/siswa/1
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"

}
```

- UNIT TEST

```
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
        const getDataResponse = await request(app).delete('/api/siswa/1');
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
```

- jalankan test dengan `npx jest siswa.test.js`

### 8. Membuat Joi Validasi

- Joi Validasi

```
//src/siswa-validation.js
import Joi from "joi";

//1. READ : Endpoint : GET /api/siswa

//2. READ : Endpoint : GET /api/siswa/:id
//validasi apakah id > angka, positive, required(wajib ada)
export const getSiswaValidation = Joi.number().positive().required();

//3. CREATE : Endpoint : POST /api/siswa
//validasi Create
export const createSiswaValidation = Joi.object({
    //string, max100, required
    first_name: Joi.string().max(100).required(),
    //string, max100, opsional(boleh tdk ada)
    last_name: Joi.string().max(100).optional(),
    //email, max200, opsional
    email: Joi.string().max(200).email().optional(),
    //string, max20, opsional
    phone: Joi.string().max(20).optional()
});

//4. DELETE : Endpoint : DELETE /api/siswa/:id
//validasi id = validasi get by id
export const delsiswaValidation = getSiswaValidation

//5. UPDATE : Endpoint : PUT /api/siswa/:id
export const updateSiswaValidation = Joi.object({
    //validasi id > angka, positive, required(wajib ada)
    id: Joi.number().positive().required(),
    //string, max100, required
    first_name: Joi.string().max(100).required(),
    //string, max100, opsional(boleh tdk ada)
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional()
});

```

### 9. Implementasi Joi

- Routing

```
//src/siswa.js
import express from "express";
import { createSiswaValidation, delsiswaValidation, getSiswaValidation, updateSiswaValidation } from "./siswa-validation.js";

export const SiswaRouter = express.Router();

// 1. READ : Endpoint : GET /api/siswa
SiswaRouter.get('/', (req, res, next) => {

  //Validasi data

  //SELECT \* FROM tabel
  res.send("GET ALL SISWA")
})

//2. READ : Endpoint : GET /api/siswa/:id
SiswaRouter.get('/:id', (req, res, next) => {

  //Validasi data id >> req.params.id
  const { error } = getSiswaValidation.validate(req.params.id);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res.status(400).send(error.details[0].message);
  }

  //SELECT * FROM tabel WHERE kolom = ygdicari
  res.send("GET SISWA")

})

//3. CREATE : Endpoint : POST /api/siswa
SiswaRouter.post('/', (req, res, next) => {

  // Validasi data req.body
  const { error } = createSiswaValidation.validate(req.body);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res.status(400).send(error.details[0].message);
  }

  //INSERT INTO tabel (kolom) VALUES (?)', [data kirim]
  res.send("ADD NEW SISWA")

})

//4. DELETE : Endpoint : DELETE /api/siswa/:id
SiswaRouter.delete('/:id', (req, res, next) => {

  //Validasi data id >> req.params.id
  const { error } = delsiswaValidation.validate(req.params.id);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res.status(400).send(error.details[0].message);
  }

  //DELETE FROM tabel WHERE kolom = ?', [data]
  res.send("DELETE SISWA")

})

//5. UPDATE : Endpoint : PUT /api/siswa/:id
SiswaRouter.put('/:id', (req, res, next) => {

  // Validasi data req.body dan req params.id
  const dataIn = {
    "id": req.params.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "phone": req.body.phone
  }
  const { error } = updateSiswaValidation.validate(dataIn);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res.status(400).send(error.details[0].message);
  }

  //UPDATE tabel SET kolom=?', [data]
  res.send("UPDATE SISWA")
})
```

- .REST Test

```
### 6. READ : Endpoint : GET /api/siswa
GET http://localhost:3000/api/siswa

### 7. READ : Endpoint : GET /api/siswa/:id
GET http://localhost:3000/api/siswa/1

### 7a. Validation READ : Endpoint : GET /api/siswa/:id
//"value" must be a number
GET http://localhost:3000/api/siswa/a

### 8. CREATE : Endpoint : POST /api/siswa
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 8a. Validation CREATE : Endpoint : POST /api/siswa
//"first_name" is not allowed to be empty
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "",
"last_name": "Kholid",
"phone": "8787878787"
}

### 9. DELETE : Endpoint : DELETE /api/siswa/:id
DELETE http://localhost:3000/api/siswa/1

### 9a. Vvalidation DELETE : Endpoint : DELETE /api/siswa/:id
//"value" must be a number
DELETE http://localhost:3000/api/siswa/a

### 10. UPDATE : Endpoint : PUT /api/siswa/:id
PUT http://localhost:3000/api/siswa/1
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

### 10a. Validation UPDATE : Endpoint : PUT /api/siswa/:id
//"id" must be a number
PUT http://localhost:3000/api/siswa/a
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

### 10b. Validation UPDATE : Endpoint : PUT /api/siswa/:id
//"first_name" is not allowed to be empty
PUT http://localhost:3000/api/siswa/1
Content-Type: application/json

{
"first_name": "",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}
```

- Unit Test >>pisahkan masing2 menjadi satu siklus tes

```
1. READ : Endpoint : GET /api/siswa
   a.Insert data(10), b.Test GET ALL, c.Test Validasi, d.Delete data
2. READ : Endpoint : GET /api/siswa/:id
   a.Insert data(1), b.Test GET id, c.Test Validasi, d.Delete data
3. CREATE : Endpoint : POST /api/siswa
   a.Test Insert, c.Test Validasi, d.Delete data
4. DELETE : Endpoint : DELETE /api/siswa/:id
   a.Insert data(1), b.Test Delete id, c.Test Validasi d.Delete data
5. UPDATE : Endpoint : PUT /api/siswa/:id
   a.Insert data(1), b.Test PUT id, c.Test Validasi, d.Delete data
6. Setelah dikumpulkan fungsi test >> util-test.js
```

```
//test/util-test.js

//a. Insert data 10
export const insertManyTestSiswa = async () => {
  let data = {}
  for (let i = 0; i < 10; i++) {
    data = {
      first_name: `test ${i}`,
      last_name: `test ${i}`,
      email: `test${i}@gmail.com`,
      phone: `080900000${i}`
    }
    console.log(`Insert {i} data`)
  }
}

//b. Insert data 1
export const insertTestSiswa = async () => {
  data = {
    first_name: `test-Insert`,
    last_name: `test-Insert`,
    email: `testinsert@gmail.com`,
    phone: `08090000000`
  }
  console.log(`Insert 1 data`)
}

//c. Delete data
export const deleteAllTestSiswa = async () => {
  console.log(`Delete data`)
}
```

```
//test/siswa.test.js
//import supertest from "supertest";
const request = require('supertest');
const { app } = require('../src/application');
const { insertManyTestSiswa, deleteAllTestSiswa, insertTestSiswa } = require('./util-test');

//1. TEST READ ALL
describe.skip('TEST READ ALL', () => {
  //a.Insert data(10)
  beforeEach(async () => {
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
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah 'GET ALL SISWA'
    expect(getDataResponse.text).toBe('GET ALL SISWA');
  })

})

//2. TEST READ by id
describe.skip('TEST READ by id', () => {

  //a.Insert data
  beforeEach(async () => {
    await insertTestSiswa();
  })
  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
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
})

//3. TEST CREATE
describe.skip('TEST CREATE', () => {

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
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('ADD NEW SISWA');
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

  //a.Insert data
  beforeEach(async () => {
    await insertTestSiswa();
  })

  //4. DELETE http://localhost:3000/api/siswa/1
  it('DELETE : Endpoint : DELETE /api/siswa/:id', async () => {
    //a.send request delete
    const getDataResponse = await request(app).delete('/api/siswa/1');
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('DELETE SISWA');
  })

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .delete('/api/siswa/a')
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

})

//5. TEST UPDTAE by id
describe('TEST UPDTAE by id', () => {

  //a.Insert data
  beforeEach(async () => {
    await insertTestSiswa();
  })
  //d.Delete data
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
      .put('/api/siswa/1')
      //kirim data body >> object dataKirim
      .send(dataKirim);
    //b. jika sukses, reponse status adalah 200
    expect(getDataResponse.status).toBe(200);
    //c. jika sukses, reponse berupa text adalah
    expect(getDataResponse.text).toBe('UPDATE SISWA');
  })

  it('should reject if request is invalid', async () => {
    const result = await request(app)
      .post('/api/siswa')
      .send({
        "first_name": "Edy",
        "last_name": "",
        "email": "edy@gmail.com",
        "phone": "8787878787"
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

})
```

### 10. Test Koneksi DataBase

```
//test/db.test.js
import { query } from "../src/util/db.js";

//TEST KONEKSI DB
describe('TEST DATABASE', () => {
  it('Koneksi databse >> query SELECT ', async () => {
    const dataTest = {
      "id": 1,
      "first_name": "Silmi",
      "last_name": "Ayra",
      "email": "silmi@gmail.com",
      "phone": "32423423434"
    }
    //Select semua data dari tabel tbsiswa
    const rows = await query('SELECT * FROM tbsiswa')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    // Memeriksa panjang array
    expect(rows.length).toBeGreaterThan(0);
    // Memeriksa isi array
    expect(rows).toEqual(expect.arrayContaining([dataTest]));
  })

})
```

### 11. Utilitu untuk test

```
//test/util-test.js

import { query } from "../src/util/db";

//a. Delete data
export const deleteAllTestSiswa = async () => {
  await query('DELETE FROM tbsiswa')
  console.log(`Delete All Test data`)
}


//b. Insert data 10
export const insertManyTestSiswa = async () => {
  let data = {}
  for (let i = 0; i < 10; i++) {
    data = {
      first_name: `test ${i}`,
      last_name: `test ${i}`,
      email: `test${i}@gmail.com`,
      phone: `080900000${i}`
    }
    let dataInsert = Object.values(data);
    await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  }
  console.log(`Insert Test 10 data`)

}

//c. Insert data 1
export const insertTestSiswa = async () => {
  const data = {
    first_name: `test-Insert`,
    last_name: `test-Insert`,
    email: `testinsert@gmail.com`,
    phone: `08090000000`
  }
  let dataInsert = Object.values(data);
  await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  console.log(`Insert Test 1 data`)
}

//d. Select All data
export const selectAllTestSiswa = async () => {
  const rows = await query('SELECT * FROM tbsiswa ')
  console.log(`Select All Test data`)
  return rows
}
```

### 11. POST Data (CREATE)

- Perintah SQL : `'INSERT INTO tabel (kolom) VALUES (?)', [data kirim]`

- API SPEC
  `//docs/siswa.md`

CREATE : Endpoint : POST /api/siswa

Response Body Success :

```json
{
  "data": {
    "id": 3,
    "first_name": "Edy",
    "last_name": "Kholid",
    "email": "edy@gmail.com",
    "phone": "8787878787"
  }
}
```

Response Body Error :

```json
{
  "errors": "\"first_name\" is not allowed to be empty"
}
```

- ROUTING

```
//src/siswa.js
import express from "express";
import { createSiswaValidation, delsiswaValidation, getSiswaValidation, updateSiswaValidation } from "./siswa-validation.js";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

//1. CREATE : Endpoint : POST /api/siswa
SiswaRouter.post('/', async (req, res, next) => {

  // Validasi data req.body
  const { error } = createSiswaValidation.validate(req.body);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res
      .status(400)
      .json({
        errors: error.details[0].message
      })
  }

  try {
    //ambil data yg akan disimpan dari request body
    const { first_name, last_name, email, phone } = req.body;
    //kirim query SQL perintah simpan >> INSERT INTO tabel (kolom) VALUES (?)', [data kirim]
    const results = await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', [first_name, last_name, email, phone]);
    //ambil data hasil query berupa ID insert
    const id = results.insertId
    //console.log(results.insertId);
    //GET data ke server dengan id hasil insert >> SELECT * FROM tabel WHERE kolom = ?', [data]
    const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id]);
    //tampilkan hasilnya di log
    console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
    //kirim status 201, dan data array object hasil get >> object ke 0 di array
    res.status(201).send({ 'data': rows[0] });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }

})
```

- .REST

```
### 8. CREATE : Endpoint : POST /api/siswa

POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 8a. Validation CREATE : Endpoint : POST /api/siswa

//"first_name" is not allowed to be empty
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "",
"last_name": "Kholid",
"phone": "8787878787"
}

```

- UNIT TEST

```
//1. TEST CREATE
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
```

### 12. GET Data All (READ)

- Perintah SQL : `SELECT * FROM tabel`

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

- ROUTING

```
//src/siswa.js
import express from "express";
import { createSiswaValidation, delsiswaValidation, getSiswaValidation, updateSiswaValidation } from "./siswa-validation.js";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

// 2. READ : Endpoint : GET /api/siswa
SiswaRouter.get('/', async (req, res, next) => {

  //Validasi data

  try {
    //Perintah Query SQL ke database >> SELECT * FROM tabel
    const rows = await query('SELECT * FROM tbsiswa')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    //kirim status 200 dan data >> array object rows
    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
})
```

- .REST

```
### 6. READ : Endpoint : GET /api/siswa
GET http://localhost:3000/api/siswa
```

- UNIT TEST

```
//test/util-test.js

import { query } from "../src/util/db";

//a. Insert data 10
export const insertManyTestSiswa = async () => {
  let data = {}
  for (let i = 0; i < 10; i++) {
    data = {
      first_name: `test ${i}`,
      last_name: `test ${i}`,
      email: `test${i}@gmail.com`,
      phone: `080900000${i}`
    }
    let dataInsert = Object.values(data);
    await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  }
  console.log(`Insert Test 10 data`)

}

//b. Insert data 1
export const insertTestSiswa = async () => {
  const data = {
    first_name: `test-Insert`,
    last_name: `test-Insert`,
    email: `testinsert@gmail.com`,
    phone: `08090000000`
  }
  let dataInsert = Object.values(data);
  await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  console.log(`Insert Test 1 data`)
}

//c. Delete data
export const deleteAllTestSiswa = async () => {
  await query('DELETE FROM tbsiswa')
  console.log(`Delete All Test data`)
}
```

```
//test/siswa.test.js
//import supertest from "supertest";
const request = require('supertest');
const { app } = require('../src/application');
const { insertManyTestSiswa, deleteAllTestSiswa, insertTestSiswa } = require('./util-test');

//1. TEST READ ALL
describe('TEST READ ALL', () => {
  //a.Insert data(10)
  beforeEach(async () => {
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
```

### 13. GET Data /id (READ)

- Perintah SQL : `'SELECT * FROM tabel WHERE kolom = ?' , [data]`
- API SPEC
  `//docs/siswa.md`

READ : Endpoint : GET /api/siswa/:id

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Silmi",
    "last_name": "Ayra",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
}
```

Response Body Error :

```json
{
  "errors": "Siswa is not found"
}
```

- ROUTING

```
//3. READ : Endpoint : GET /api/siswa/:id
SiswaRouter.get('/:id', async (req, res, next) => {

  //Validasi data id >> req.params.id
  const { error } = getSiswaValidation.validate(req.params.id);
  if (error) {
    //console.log(`Validation Error: ${error.message}`);
    return res
      .status(400)
      .json({
        errors: error.details[0].message
      })
  }

  try {
    //ambil id dari request params
    const { id } = req.params;
    //Perintah Query SQL ke database >> 'SELECT * FROM tabel WHERE kolom = ?' , [data]
    const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id])
    //tampilkan di log
    console.log(`GET DATA: ${JSON.stringify(rows)}`, rows.length);
    //check data jika ada
    if (rows.length !== 1) {
      return res
        //status jika tidak ketemu adalah 204
        //.status(204)
        //pesan errors
        .json({
          errors: "Siswa is not found"
        })
    }

    //kirim status 200 dan data >> array objec rows >> object rows ke 0
    return res.status(200).json({ 'data': rows[0] })
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }

})
```

- .REST

```
//create utk dapatkan id kemudian di get/read by id
### 8. CREATE : Endpoint : POST /api/siswa
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 7. READ : Endpoint : GET /api/siswa/:id
GET http://localhost:3000/api/siswa/31

### 7a. Validation READ : Endpoint : GET /api/siswa/:id
//"value" must be a number
GET http://localhost:3000/api/siswa/a

### 7b. Validation READ : Endpoint : GET /api/siswa/:id
//error not found
GET http://localhost:3000/api/siswa/1000
```

- UNIT TEST

```
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

```

### 14. DELETE Data /id (DELETE)

- Perintah SQL : `'DELETE FROM tabel WHERE kolom = ?', [data]`

- API SPEC
  `//docs/siswa.md`

DELETE : Endpoint : DELETE /api/siswa/:id

Response Body Success :

```
Deleted Successfully
```

- ROUTING

```
//4. DELETE : Endpoint : DELETE /api/siswa/:id
SiswaRouter.delete('/:id', async (req, res, next) => {

  //Validasi data id >> req.params.id
  const { error } = delsiswaValidation.validate(req.params.id);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res
      .status(400)
      .json({
        errors: error.details[0].message
      })
  }

  try {
    //ambil id dari request params
    const { id } = req.params;
    //Perintah Query SQL ke database >> 'SELECT * FROM tabel WHERE kolom = ?' , [data]
    const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id])
    //tampilkan di log
    console.log(`GET DATA: ${JSON.stringify(rows)}`, rows.length);
    //check data jika ada
    if (rows.length !== 1) {
      return res
        //pesan errors
        .json({
          errors: "Siswa is not found"
        })
    }

    //delete data
    const result = await query('DELETE FROM tbsiswa WHERE id = ?', [id]);
    let message = 'Error in delete';
    if (result.affectedRows) {
      message = 'Deleted Successfully';
    }
    console.log(`DELETE DATA: ${id}`);
    res.status(200).send(message);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
})
```

- .REST

```
//create utk dapatkan id kemudian di delete
### 8. CREATE : Endpoint : POST /api/siswa
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 9. DELETE : Endpoint : DELETE /api/siswa/:id
DELETE http://localhost:3000/api/siswa/1

### 9a. Validation DELETE : Endpoint : DELETE /api/siswa/:id
//"value" must be a number
DELETE http://localhost:3000/api/siswa/a

### 9b. Validation DELETE : Endpoint : DELETE /api/siswa/:id
//"errors": "Siswa is not found"
DELETE http://localhost:3000/api/siswa/1000
```

- UNIT TEST

```
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
      .get('/api/siswa/1000')
    //status akan menjadi 400
    console.log("TIDAK KETEMU :", result.body);
    expect(result.status).toBe(200);
    //errors akan terdefinisi dan di kirimkan alasan errornya
    expect(result.body.errors).toBeDefined();
  });

})

```

### 15. PUT Data /id (UPDATE)

- Perintah SQL : `'UPDATE tabel SET kolom=?', [data]`

- API SPEC
  `//docs/siswa.md`

UPDATE : Endpoint : PUT /api/siswa/:id

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Silmi-Rev",
    "last_name": "Ayra-Rev",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
}
```

- ROUTING

```
//5. UPDATE : Endpoint : PUT /api/siswa/:id
SiswaRouter.put('/:id', async (req, res, next) => {

  // Validasi data req.body dan req params.id
  const dataIn = {
    "id": req.params.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "phone": req.body.phone
  }
  const { error } = updateSiswaValidation.validate(dataIn);
  if (error) {
    console.log(`Validation Error: ${error.message}`);
    return res
      .status(400)
      .json({
        errors: error.details[0].message
      })
  }

  try {
    //ambil id dari request params
    const { id } = req.params;
    //Perintah Query SQL ke database >> 'SELECT * FROM tabel WHERE kolom = ?' , [data]
    let rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id])
    //tampilkan di log
    console.log(`GET DATA: ${JSON.stringify(rows)}`, rows.length);
    //check data jika ada
    if (rows.length !== 1) {
      return res
        //pesan errors
        .json({
          errors: "Siswa is not found"
        })
    }

    //update data dengan perintah query SQL >> UPDATE tabel SET kolom = value
    await query('UPDATE tbsiswa set first_name = ?, last_name = ?  WHERE id = ? ', [dataIn.first_name, dataIn.last_name, dataIn.id])
    //setelah selesai update ambil datanya kembali
    rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id])
    console.log(`PUT DATA: ${JSON.stringify(rows)}`);
    //kirim response 201 dan response body json row ke 0
    res.status(201).json({ data: rows[0] });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
})
```

- .REST

```
//insert data untuk mendapatkan id
### 8. CREATE : Endpoint : POST /api/siswa
POST http://localhost:3000/api/siswa
Content-Type: application/json

{
"first_name": "Edy",
"last_name": "Kholid",
"email": "edy@gmail.com",
"phone": "8787878787"
}

### 10. UPDATE : Endpoint : PUT /api/siswa/:id
PUT http://localhost:3000/api/siswa/66
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

### 10a. Validation UPDATE : Endpoint : PUT /api/siswa/:id
//"id" must be a number
PUT http://localhost:3000/api/siswa/a
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

### 10b. Validation UPDATE : Endpoint : PUT /api/siswa/:id
//"first_name" is not allowed to be empty
PUT http://localhost:3000/api/siswa/1
Content-Type: application/json

{
"first_name": "",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

### 10c. Validation UPDATE : Endpoint : PUT /api/siswa/:id
//"errors": "Siswa is not found"
PUT http://localhost:3000/api/siswa/1000
Content-Type: application/json

{
"first_name": "Silmi-Rev",
"last_name": "Ayra-Rev",
"email": "silmi@gmail.com",
"phone": "32423423434"
}

```

- UNIT TEST

```
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
```

## 16 KESIMPULAN TEST

```
 PASS  test/siswa.test.js (5.801 s)
  TEST READ ALL
    √ READ : Endpoint : GET /api/siswa (980 ms)
  TEST READ by id
    √ READ : Endpoint : GET /api/siswa/:id (320 ms)
    √ should reject if request is invalid (299 ms)
    √ should reject if request is not exist (337 ms)
  TEST CREATE
    √ CREATE : Endpoint : POST /api/siswa (207 ms)
    √ should reject if request is invalid (69 ms)
  TEST DELETE by id
    √ DELETE : Endpoint : DELETE /api/siswa/:id (315 ms)
    √ should reject if request is invalid (233 ms)
    √ should reject if request is not exist (298 ms)
  TEST UPDTAE by id
    √ UPDATE : Endpoint : PUT /api/siswa/:id (387 ms)
    √ should reject if request is invalid (227 ms)
    √ should reject if request is not exist (224 ms)
    √ should reject if request is invalid (208 ms)
```
