//src/index.js
import { app } from "./application.js";

//1. Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});