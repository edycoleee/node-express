//src/util/db.js
import mysql from "mysql2/promise";
import { config } from "../application/config.js";

export async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);
  await connection.end();
  return results;
}