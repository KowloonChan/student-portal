const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_portal",
  password: "Pg34954785",
  port: 5432,
});

module.exports = pool;
