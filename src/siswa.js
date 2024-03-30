//src/siswa.js
import { log } from "console";
import express from "express";
import { v4 as uuid } from 'uuid';

export const SiswaRouter = express.Router();

//MOCKUP DATA OBYEK
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

// 1. Search Siswa API
SiswaRouter.get('/', (req, res, next) => {
  res.json({ data: dbDataSiswa })
})

//2. Get Siswa API
SiswaRouter.get('/:id', (req, res, next) => {
  //Fungsi Get Siswa by ID
  const dtSiswa = getdbSiswaId(req.params.id)
  //Jika data Kosong kirim pesan error
  if (!dtSiswa || dtSiswa.length === 0) {
    return res.status(404).json({ "errors": "Siswa is not found" })
  }
  //Jika data tdk kosong kirim respon datanya
  res.json({ data: dtSiswa })
})

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

//Get Siswa by ID
const getdbSiswaId = (id) => {
  //return dbDataSiswa.find((siswa) => siswa.id === parseInt(id))
  return dbDataSiswa.find((siswa) => siswa.id === id)
}