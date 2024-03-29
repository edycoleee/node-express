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

```
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

```
//src/index.js
import { app } from "./application.js";

//1. Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

- endpoint GET http://localhost:3000/

```
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

```
###
GET http://localhost:3000/

###
```

- melakukan pengetesan dengan unit test

```
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

```
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

### 6. GET Data ALL (READ)

### 7. GET Data /id (READ)

### 8. POST Data (CREATE)

### 9. DELETE Data /id (DELETE)

### 10. PUT Data /id (UPDATE)
