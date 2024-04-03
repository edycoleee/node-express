import { query } from "../src/util/db";

export const removeAllTestSiswa = async () => {
    //await query('DELETE FROM tbsiswa WHERE first_name = ?', ['test'])
    await query('DELETE FROM tbsiswa WHERE first_name = ?')
}

export const createTestSiswa = async () => {
    const dataInsert = ["test","test","test@gmail.com","080900000" ]
    await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
}

export const createManyTestSiswa = async () => {
    for (let i = 0; i < 15; i++) {
        const dataInsert = [`test ${i}`,`test ${i}`,`test${i}@gmail.com`,`080900000${i}` ]
    await query('INSERT INTO tbsiswa (first_name,last_name,email,phone) VALUES (?, ?, ?,?)', dataInsert);
    }
}

export const getTestSiswa = async () => {
    await query('SELECT * FROM tbsiswa WHERE first_name = ?','test')
}