//test/db.test.js
import { query } from "../src/util/db.js";
import { deleteAllTestSiswa, insertTestSiswa } from "./util-test.js";

//TEST KONEKSI DB
describe('TEST DATABASE', () => {

 //a.Insert data(10)
 beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertTestSiswa();
  })
  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  })

  it('Koneksi databse >> query SELECT ', async () => {

   //Select semua data dari tabel tbsiswa
    const rows = await query('SELECT * FROM tbsiswa')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    // Memeriksa panjang array
    expect(rows.length).toBeGreaterThan(0);
    // Memeriksa apakah objek mengandung nilai tertentu
    expect(rows[0]).toEqual(expect.objectContaining({ "first_name": "test-Insert" }));
  })

})