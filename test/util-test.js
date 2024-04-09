//test/util-test.js

import { query } from "../src/util/db";

//a. Delete data
export const deleteAllTestSiswa = async () => {
  await query('DELETE FROM tbsiswa')
  console.log(`Delete All Test data`)
}


//a. Insert data 10
export const insertManyTestSiswa = async () => {
  let data = {}
  for (let i = 0; i < 10; i++) {
    data = {
      first_name: `test ${i}`,
      last_name: `test ${i}`,
      email: `test${i}@gmail.com`,
      phone: `080900000${i}`
    }
    let dataInsert = Object.values(data);
    await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  }
  console.log(`Insert Test 10 data`)

}

//b. Insert data 1
export const insertTestSiswa = async () => {
  const data = {
    first_name: `test-Insert`,
    last_name: `test-Insert`,
    email: `testinsert@gmail.com`,
    phone: `08090000000`
  }
  let dataInsert = Object.values(data);
  await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
  console.log(`Insert Test 1 data`)
}

//d. Select All data
export const selectAllTestSiswa = async () => {
  const rows = await query('SELECT * FROM tbsiswa ')
  console.log(`Select All Test data`)
  return rows
}