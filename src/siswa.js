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
