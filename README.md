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
ExpressJS pertama kali dibuat tahun 2010, dan karena sangat populer, ExpressJS sekarang sudah menjadi hal yang wajib dikuasai ketika kita akan membuat Web menggunakan NodeJS

Application

Saat kita membuat web menggunakan ExpressJS, kita akan membuat object Application
Application adalah object utama dalam library ExpressJS

Application secara default tidak berjalan, jika kita ingin menjalankan Application nya, kita perlu menggunakan method listen(port)
Dimana port adalah nomor port yang ingin kita gunakan untuk menjalankan web nya
Pastikan port yang kita pilih tidak bentrok dengan aplikasi lain

#### JALANKAN SERVER NODEJS DENGAN EXPRESS

```
//src/index.js
import express from "express";

//a. membuat object app dari express
export const app = express();

//b. Jalankan server
const PORT = process.env.PORT || 3000;

//c. listen request app pada port >> 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

`npm run dev`

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

```

3. Endpoint POST http://localhost:3000/api/pasien > Request+Body => Response json Object
   Response Body Success :

```json

```

Untuk pertama kita buat :

#### 1. Endpoint GET http://localhost:3000/ > Request => Response send String

- Memisahkan index.js dan application.js ,untuk memudahkan pengetesan dengan unit test

```
//src/index.js
import { app } from "./application.js";

//variabel PORT
const PORT = process.env.PORT || 3000;

//c. Jalankan server liste port >> 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

- endpoint GET http://localhost:3000/

```
//src/application.js
import express from "express";

//a. membuat object app dari express
export const app = express();

//b. jalankan middleware json express
app.use(express.json());

//1. Contoh Endpoint API
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});
```

- melakukan pengetesan dengan request.rest

```
### TEST request GET ke http://localhost:3000/
GET http://localhost:3000/

```

- melakukan pengetesan dengan unit test

```
//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application');

//a. fungsi testing dengan describe >> it
describe('TEST GET http://localhost:3000/', () => {
  it('Mendapatkan return Hello World', async () => {
    //b. lakukan request "/" dan tangkap hasilnya ke variable response
    const response = await request(app).get('/');
    //c. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //d. Periksa isi response seharusnya 'Hello World!'
    expect(response.text).toBe('Hello World!');
  });
});

//jalankan test
//npx jest app.test.js
```

## 4. Basic Routing

### 2. Endpoint GET http://localhost:3000/oby > Request => Response json Object

- end point GET http://localhost:3000/oby

```
//src/application.js
import express from "express";

//a. membuat object app dari express
export const app = express();

//b. jalankan middleware json express
app.use(express.json());

//1. Contoh Endpoint API
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
###
GET http://localhost:3000/oby
```

- unit test

```
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

```
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

```
###
POST http://localhost:3000/api/pasien
Content-Type: application/json

{
  "nama" : "Silmi",
  "alamat": "Karangawen"
}
```

- unit test

```
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

### 5. Membuat EndPoint CRUD Dokumentasi

Dokumentasi pada file `.\docs\siswa.md` >> CRUD

```
1. READ : Endpoint : GET /api/siswa
2. READ : Endpoint : GET /api/siswa/:id
3. CREATE : Endpoint : POST /api/siswa
4. DELETE : Endpoint : DELETE /api/siswa/:id
5. UPDATE : Endpoint : PUT /api/siswa/:id
```

### 6. Setting MYSQL

### 6. SETTING MYSQL

- Membuat database / Schema dbsiswa

```
CREATE SCHEMA `dbsekolah` ;
```

- Membuat table tbsiswa

```
USE dbsekolah

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
DB_NAME=dbsiswa
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
    database: "dbsiswa",
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
```

### 8. Membuat Joi Validasi

- Joi Validasi

```
1. READ : Endpoint : GET /api/siswa

2. READ : Endpoint : GET /api/siswa/:id

3. CREATE : Endpoint : POST /api/siswa

4. DELETE : Endpoint : DELETE /api/siswa/:id

5. UPDATE : Endpoint : PUT /api/siswa/:id

```

### 9. GET Data ALL (READ)

### 10. GET Data /id (READ)

### 12. POST Data (CREATE)

### 13. DELETE Data /id (DELETE)

### 14. PUT Data /id (UPDATE)
