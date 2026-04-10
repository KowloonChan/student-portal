const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_portal",
  password: "your_password_here", // CHANGE THIS to your actual password
  port: 5432,
});

module.exports = pool;
