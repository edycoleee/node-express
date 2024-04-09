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
    return res
      .status(400)
      .json({
        error: error.details[0].message
      })
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