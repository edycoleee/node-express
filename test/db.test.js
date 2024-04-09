//test/db.test.js
import { query } from "../src/util/db.js";

//TEST KONEKSI DB
describe('TEST DATABASE', () => {
  it('Koneksi databse >> query SELECT ', async () => {
    const dataTest = {
      "id": 1,
      "first_name": "Silmi",
      "last_name": "Ayra",
      "email": "silmi@gmail.com",
      "phone": "32423423434"
    }
    //Select semua data dari tabel tbsiswa
    const rows = await query('SELECT * FROM tbsiswa')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    // Memeriksa panjang array
    expect(rows.length).toBeGreaterThan(0);
    // Memeriksa isi array
    expect(rows).toEqual(expect.arrayContaining([dataTest]));
  })

})