## BELAJAR NODE JS EXPRESS => PAGING

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

### 5. Membuat EndPoint GET dengan paging

1. Endpoint : GET /api/siswa?page=1&size=10
   `SELECT * FROM table_name LIMIT ${limit} OFFSET ${offset}`
2. Endpoint : GET /api/siswa/search?page=1&size=10&first_name=edy
   `SELECT * FROM table_name WHERE 1=1 AND column_name1 LIKE '%${searchTerm1}%' LIMIT ${limit} OFFSET ${offset}`

### 6. Konfigurasi Mysql

`npm install mysql2`

```
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "147.139.169.55",
    user: "root",
    password: "super-password1",
    database: "dbsekolah",
    connectTimeout: 60000
  },
```

```
//src/util/db.js
import mysql from "mysql2/promise";
import { config } from "./config.js";


export async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);
  await connection.end();
  return results;
}
```

### 7. Routing Endpoint

```
//src/application.js
export const app = express();

..................

//4. Jalankan Router Siswa >> middleware router
router.use("/siswa", SiswaRouter)

app.use("/api", router)
```

1. GET Tanpa Limit >> GET http://localhost:3000/api/siswa

Response :

```json
{
  "data": [
    {
      "page": 1,
      "size": 10,
      "offset": 0
    }
  ]
}
```

- Routing

```
//src/siswa.js
import express from "express";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

//1. GET : Endpoint : GET /api/siswa
SiswaRouter.get("/", async (req, res, next) => {
  console.log('Request URL:', req.url);
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  res.status(200).json({ data: [{ page, size, offset }] });
});
```

- Unit Test

```
import supertest from "supertest";
import { app } from "../application.js";

describe("GET /api/siswa", () => {
  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body.data);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
```

2. GET Dengan Limit >> GET http://localhost:3000/api/siswa?page=2&size=5

Response :

```json
{
  "data": [
    {
      "page": 2,
      "size": 5,
      "offset": 5
    }
  ]
}
```

- Routing >> sama seperti no 1
- Unit Test

```
describe("GET /api/siswa?page=2&size=5", () => {
  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa?page=2&size=5")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body.data);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
```

3. GET Dengan Limit dan Syarat >> GET http://localhost:3000/api/siswa/search?page=1&limit=10&searchTerm1=test1&searchTerm2=test2&searchTerm3=test3

Response :

```json
{
  "data": [
    {
      "page": 1,
      "size": 10,
      "offset": 0,
      "searchTerm1": "test1",
      "searchTerm2": "test2",
      "searchTerm3": "test3"
    }
  ]
}
```

- Routing

```
//2. GET : Endpoint : GET /api/siswa/search
SiswaRouter.get("/search", async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;
    const searchTerm1 = req.query.searchTerm1;
    const searchTerm2 = req.query.searchTerm2;
    const searchTerm3 = req.query.searchTerm3;

  res.status(200).json({ data: [{ page, size, offset,searchTerm1,searchTerm2,searchTerm3 }] });
});
```

- Unit Test

```
describe("GET /api/siswa?page=1&size=10", function () {
  it("responds with data with paging and search terms", async function () {
    const response = await supertest(app)
      .get(
        "/api/siswa/search?page=1&limit=10&searchTerm1=test1&searchTerm2=test2&searchTerm3=test3"
      )
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(response.body);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();
    // Memeriksa apakah setiap item dalam respons mengandung setidaknya satu kata kunci pencarian
    response.body.data.forEach((item) => {
      expect(
        item.searchTerm1.includes("test1") ||
          item.searchTerm2.includes("test2") ||
          item.searchTerm3.includes("test3")
      ).toBeTruthy();
    });
  });
});
```

### 8. Test Koneksi Mysql

- Util-test

```
//test/util-test.js
import { query } from "../src/util/db.js";

//a. Delete data
export const deleteAllTestSiswa = async () => {
  await query('DELETE FROM tbsiswa')
  console.log(`Delete All Test data`)
}


//b. Insert data 50
export const insertManyTestSiswa = async () => {
  let data = {}
  for (let i = 0; i < 50; i++) {
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

- Unit Test

```
//test/db.test.js
import { query } from "../src/util/db.js";
import { deleteAllTestSiswa, insertTestSiswa } from "./util-test.js";

//TEST KONEKSI DB
describe('TEST DATABASE', () => {

 //a.Insert data(10)
 beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertTestSiswa();
  })
  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  })

  it('Koneksi databse >> query SELECT ', async () => {

   //Select semua data dari tabel tbsiswa
    const rows = await query('SELECT * FROM tbsiswa')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    // Memeriksa panjang array
    expect(rows.length).toBeGreaterThan(0);
    // Memeriksa apakah objek mengandung nilai tertentu
    expect(rows[0]).toEqual(expect.objectContaining({ "first_name": "test-Insert" }));
  })

})
```

### 8. GET Data ALL (READ)

- GET /api/siswa

```json
[
  {
    "id": 370,
    "first_name": "test 0",
    "last_name": "test 0",
    "email": "test0@gmail.com",
    "phone": "0809000000"
  },
  {
    "id": 371,
    "first_name": "test 1",
    "last_name": "test 1",
    "email": "test1@gmail.com",
    "phone": "0809000001"
  },
  {
    "id": 372,
    "first_name": "test 2",
    "last_name": "test 2",
    "email": "test2@gmail.com",
    "phone": "0809000002"
  },
  {
    "id": 373,
    "first_name": "test 3",
    "last_name": "test 3",
    "email": "test3@gmail.com",
    "phone": "0809000003"
  },
  {
    "id": 374,
    "first_name": "test 4",
    "last_name": "test 4",
    "email": "test4@gmail.com",
    "phone": "0809000004"
  },
  {
    "id": 375,
    "first_name": "test 5",
    "last_name": "test 5",
    "email": "test5@gmail.com",
    "phone": "0809000005"
  },
  {
    "id": 376,
    "first_name": "test 6",
    "last_name": "test 6",
    "email": "test6@gmail.com",
    "phone": "0809000006"
  },
  {
    "id": 377,
    "first_name": "test 7",
    "last_name": "test 7",
    "email": "test7@gmail.com",
    "phone": "0809000007"
  },
  {
    "id": 378,
    "first_name": "test 8",
    "last_name": "test 8",
    "email": "test8@gmail.com",
    "phone": "0809000008"
  },
  {
    "id": 379,
    "first_name": "test 9",
    "last_name": "test 9",
    "email": "test9@gmail.com",
    "phone": "0809000009"
  }
]
```

- GET /api/siswa?page=2&size=5

```json
{
  "data": [
    {
      "id": 395,
      "first_name": "test 5",
      "last_name": "test 5",
      "email": "test5@gmail.com",
      "phone": "0809000005"
    },
    {
      "id": 396,
      "first_name": "test 6",
      "last_name": "test 6",
      "email": "test6@gmail.com",
      "phone": "0809000006"
    },
    {
      "id": 397,
      "first_name": "test 7",
      "last_name": "test 7",
      "email": "test7@gmail.com",
      "phone": "0809000007"
    },
    {
      "id": 398,
      "first_name": "test 8",
      "last_name": "test 8",
      "email": "test8@gmail.com",
      "phone": "0809000008"
    },
    {
      "id": 399,
      "first_name": "test 9",
      "last_name": "test 9",
      "email": "test9@gmail.com",
      "phone": "0809000009"
    }
  ]
}
```

- Endpoint

```
//src/siswa.js
import express from "express";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

//1. GET : Endpoint : GET /api/siswa
SiswaRouter.get("/", async (req, res, next) => {
  console.log('Request URL:', req.url);
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  //Perintah SQL
  // Query untuk mengambil data dengan paging
  const SQLQuery = `SELECT * FROM tbsiswa LIMIT ${size} OFFSET ${offset}`;
  try {
    //Perintah Query SQL ke database >> SELECT * FROM tabel
    const rows = await query(SQLQuery)
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    //kirim status 200 dan data >> array object rows
    res.status(200).json({ 'data': rows })
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

```

- Unit Test

```
import supertest from "supertest";
import { app } from "../application.js";
import {
  deleteAllTestSiswa,
  insertManyTestSiswa,
} from "../../test/util-test.js";

describe("1. GET /api/siswa", () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body.data);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThanOrEqual(10);
  });
});

describe("2. GET /api/siswa?page=2&size=5", () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa?page=2&size=5")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThanOrEqual(5);
  });
});
```

### 9. GET Data ALL bersyarat (READ)

- GET /api/siswa/search?page=1&limit=10&first_name=test
  Response :

```json
{
  "data": [
    {
      "id": 350,
      "first_name": "test 0",
      "last_name": "test 0",
      "email": "test0@gmail.com",
      "phone": "0809000000"
    },
    {
      "id": 351,
      "first_name": "test 1",
      "last_name": "test 1",
      "email": "test1@gmail.com",
      "phone": "0809000001"
    },
    {
      "id": 352,
      "first_name": "test 2",
      "last_name": "test 2",
      "email": "test2@gmail.com",
      "phone": "0809000002"
    },
    {
      "id": 353,
      "first_name": "test 3",
      "last_name": "test 3",
      "email": "test3@gmail.com",
      "phone": "0809000003"
    },
    {
      "id": 354,
      "first_name": "test 4",
      "last_name": "test 4",
      "email": "test4@gmail.com",
      "phone": "0809000004"
    },
    {
      "id": 355,
      "first_name": "test 5",
      "last_name": "test 5",
      "email": "test5@gmail.com",
      "phone": "0809000005"
    },
    {
      "id": 356,
      "first_name": "test 6",
      "last_name": "test 6",
      "email": "test6@gmail.com",
      "phone": "0809000006"
    },
    {
      "id": 357,
      "first_name": "test 7",
      "last_name": "test 7",
      "email": "test7@gmail.com",
      "phone": "0809000007"
    },
    {
      "id": 358,
      "first_name": "test 8",
      "last_name": "test 8",
      "email": "test8@gmail.com",
      "phone": "0809000008"
    },
    {
      "id": 359,
      "first_name": "test 9",
      "last_name": "test 9",
      "email": "test9@gmail.com",
      "phone": "0809000009"
    }
  ]
}
```

- Endpoint

```
//2. GET : Endpoint : GET /api/siswa/search
SiswaRouter.get("/search", async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;

    // Query untuk mengambil data dengan paging
    // Buat query untuk mengambil data dengan paging dan pencarian bersyarat
    let SQLQuery = `SELECT * FROM tbsiswa WHERE 1=1`;

    // Tambahkan kondisi WHERE berdasarkan searchTerm yang diberikan
    if (first_name) {
      SQLQuery += ` AND first_name LIKE '%${first_name}%'`;
    }
    if (last_name) {
      SQLQuery += ` AND last_name LIKE '%${last_name}%'`;
    }
    if (email) {
      SQLQuery += ` AND email LIKE '%${email}%'`;
    }

    SQLQuery += ` LIMIT ${size} OFFSET ${offset}`;

    try {
      //Perintah Query SQL ke database >> SELECT * FROM tabel
      const rows = await query(SQLQuery)
      //tampilkan di log
      console.log(`GET DATA:${JSON.stringify(rows)}`);
      //kirim status 200 dan data >> array object rows
      res.status(200).json({ 'data': rows })
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
});
```

- Unit Test

```
describe.skip("3. GET /api/siswa/search?page=1&limit=10&first_name=test",  () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("responds with data with paging and search terms", async function () {
    const response = await supertest(app)
      .get(
        "/api/siswa/search?page=1&limit=10&first_name=test"
      )
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(response.body);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();
    // Memeriksa apakah setiap item dalam respons mengandung setidaknya satu kata kunci pencarian
    response.body.data.forEach((item) => {
      expect(
        item.first_name.includes("test") ||
          item.last_name.includes("test") ||
          item.email.includes("test")
      ).toBeTruthy();
    });
  });
});

```
