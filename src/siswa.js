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