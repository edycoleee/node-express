//test/util-test.js

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
    console.log(`Insert Test ${i} data`)
  }
}

//b. Insert data 1
export const insertTestSiswa = async () => {
  const data = {
    first_name: `test-Insert`,
    last_name: `test-Insert`,
    email: `testinsert@gmail.com`,
    phone: `08090000000`
  }
  console.log(`Insert Test 1 data`)
}

//c. Delete data
export const deleteAllTestSiswa = async () => {
  console.log(`Delete Test data`)
}