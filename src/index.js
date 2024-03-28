//src/index.js
import express from "express";

export const app = express();

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});