import sql from "mssql";
import * as dotenv from "dotenv";
dotenv.config();
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  dialect: "mssql",
  dialectOptions: {
    instanceName: "SQLEXPRESS",
  },
  server: "localhost",
  //   pool: {
  //     max: 10,
  //     min: 0,
  //     idleTimeoutMillis: 30000
  //   },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const connectDb = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    const con = await sql.connect(sqlConfig);
    console.log("database connected...");
      // const result = await sql.query`select * from mytable where id = ${value}`
  } catch (err) {
    console.log("Failed to connect database...", err.message);
  }
};

