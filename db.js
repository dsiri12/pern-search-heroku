const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: +process.env.PG_PORT, // + => convert string to number type
//   database: process.env.PG_DATABASE,
// };

const dbURLForDev = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
console.log(dbURLForDev)
// postgresql://dba:test123@localhost:5432/perntodo

const dbURLForProd = process.env.DATABASE_URL //heroku addons


const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? dbURLForProd : dbURLForDev
});

module.exports = pool;