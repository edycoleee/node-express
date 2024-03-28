//src/application.js
import express from "express";

export const app = express();

app.use(express.json());

//2. Contoh Endpoint API >> GET / >> Response Text
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});

//3. Contoh Endpoint API >> GET /oby >> Response Object 
const dtpasien1 = {
    nama: "Edy",
    alamat: "Semarang"
}
app.get('/oby', (req, res, next) => {
    res.json({
        message: 'GET Data Pasien Sukses',
        data: dtpasien1
    })
})
