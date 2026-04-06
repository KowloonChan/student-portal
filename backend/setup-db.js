const fs = require("fs");
const path = require("path");
const pool = require("./config/db"); // Uses your existing connection

const setupDatabase = async () => {
  try {
    console.log("Reading SQL schema file...");

    const sqlFilePath = path.join(__dirname, "seed.sql");
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });

    console.log("Executing queries to build tables...");

    await pool.query(sqlQuery);

    console.log("✅ Database tables initialized successfully!");
  } catch (error) {
    console.error("❌ Error setting up the database:", error.message);
  } finally {
    await pool.end();
  }
};

setupDatabase();
