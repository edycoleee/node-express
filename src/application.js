//src/application.js
import express from "express";
import { SiswaRouter } from "./siswa.js";

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

//3. Contoh Endpoint API >> POST /api/pasien >> Req Body >> Res Body
router.post('/pasien', (req, res, next) => {
    res.json({
        message: 'POST Data Pasien Sukses',
        data: req.body
    })
})

//Jalankan siswa router sebagai middleware router
router.use("/siswa", SiswaRouter)

app.use("/api", router)

