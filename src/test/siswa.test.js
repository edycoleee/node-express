import supertest from "supertest";
import { app } from "../application.js";
import {
  deleteAllTestSiswa,
  insertManyTestSiswa,
} from "../../test/util-test.js";

describe("1. GET /api/siswa", () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body.data);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThanOrEqual(10);
  });
});

describe("2. GET /api/siswa?page=2&size=5", () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("should respond with paging", async () => {
    const response = await supertest(app)
      .get("/api/siswa?page=2&size=5")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("BODY :", response.body);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();

    // Memeriksa apakah panjang respons tidak melebihi batas yang ditentukan
    expect(response.body.data.length).toBeGreaterThanOrEqual(5);
  });
});

describe.skip("3. GET /api/siswa/search?page=1&limit=10&first_name=test",  () => {
  //a.Insert data(10)
  beforeEach(async () => {
    await deleteAllTestSiswa();
    await insertManyTestSiswa();
    //karena insert datanya banyak maka timout 500ms default >> 30000ms
  }, 30000);

  //d.Delete data
  afterEach(async () => {
    await deleteAllTestSiswa();
  });

  it("responds with data with paging and search terms", async function () {
    const response = await supertest(app)
      .get(
        "/api/siswa/search?page=1&limit=10&first_name=test"
      )
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(response.body);
    // Memeriksa apakah respons adalah array
    expect(Array.isArray(response.body.data)).toBeTruthy();
    // Memeriksa apakah setiap item dalam respons mengandung setidaknya satu kata kunci pencarian
    response.body.data.forEach((item) => {
      expect(
        item.first_name.includes("test") ||
          item.last_name.includes("test") ||
          item.email.includes("test")
      ).toBeTruthy();
    });
  });
});
