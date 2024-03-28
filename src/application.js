//src/application.js
import express from "express";

export const app = express();

app.use(express.json());

//2. Contoh Endpoint API
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});