//src/siswa.js
import express from "express";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

// 1. Search Siswa API
SiswaRouter.get('/', async (req, res, next) => {
    try {
        const rows = await query('SELECT * FROM tbsiswa')
        console.log(`GET DATA:${JSON.stringify(rows)}`);
        res.status(200).json(rows)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
})

//2. Get Siswa API by ID
SiswaRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id])
        console.log(`GET DATA: ${JSON.stringify(rows)}`);
        res.status(200).json(rows)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
})

//3. Create Siswa API
SiswaRouter.post('/', async (req, res, next) => {
    try {
        // Data valid, lanjutkan proses
        const { first_name, last_name, email, phone } = req.body;
        const insertId = await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', [first_name, last_name, email, phone]);
        console.log(insertId);
        //const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [insertId]);
        //console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
        res.status(201).send('ADD NEW SISWA');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
})

//4. Remove Siswa API
SiswaRouter.delete('/:id', (req, res, next) => {
    res.send("DELETE SISWA")
})

//5. Update Siswa API
SiswaRouter.put('/:id', (req, res, next) => {
    res.send("UPDATE SISWA")
})