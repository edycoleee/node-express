//src/siswa.js
import express from "express";
import { query } from "./util/db.js";

export const SiswaRouter = express.Router();

// 1. Search Siswa API
SiswaRouter.get('/', async (req, res, next) => {
    try {
        const rows = await query('SELECT * FROM tbsiswa')
        console.log(`GET DATA:${JSON.stringify(rows)}`);
        res.status(200).json({ 'data': rows })
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
        res.status(200).json({ 'data': rows[0] })
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
        const results = await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', [first_name, last_name, email, phone]);
        const id = results.insertId
        //console.log(results.insertId);
        const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id]);
        console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
        res.status(201).send({ 'data': rows[0] });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
})

//4. Remove Siswa API
SiswaRouter.delete('/:id', async (req, res, next) => {
    try {

        const { id } = req.params;
        //check data jika ada

        //delete data
        const result = await query('DELETE FROM tbsiswa WHERE id = ?', [id]);
        let message = 'Error in delete';
        if (result.affectedRows) {
            message = 'Deleted Successfully';
        }
        console.log(`DELETE DATA: ${id}`);
        return res.status(200).send(message);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
})

//5. Update Siswa API
SiswaRouter.put('/:id',async  (req, res, next) => {
    console.log(req.params,req.body);
    try {
        const { id } = req.params

        const { first_name, last_name, email, phone } = req.body;
        await query('UPDATE tbsiswa SET first_name=?, last_name=? ,email=? ,phone=? WHERE id=?', [first_name, last_name, email, phone,id]);
        
        const rows = await query('SELECT * FROM tbsiswa WHERE id = ?', [id]);
        console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
        
        res.status(201).send({ 'data': rows[0] });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }

})