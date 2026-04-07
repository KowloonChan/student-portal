const fs = require("fs");
const path = require("path");
const pool = require("./config/db"); // Uses your existing connection

const setupDatabase = async () => {
  try {
    console.log("Reading SQL schema files...");

    // 1. Read the table structure file
    const databaseFilePath = path.join(__dirname, "database.sql");
    const databaseQuery = fs.readFileSync(databaseFilePath, {
      encoding: "utf-8",
    });

    // 2. Read the mock data file
    const seedFilePath = path.join(__dirname, "seed.sql");
    const seedQuery = fs.readFileSync(seedFilePath, { encoding: "utf-8" });

    console.log("Executing queries to build tables...");
    await pool.query(databaseQuery); // MUST run first!

    console.log("Executing queries to seed data...");
    await pool.query(seedQuery); // Run second!

    console.log("✅ Database tables initialized and seeded successfully!");
  } catch (error) {
    console.error("❌ Error setting up the database:", error.message);
  } finally {
    await pool.end();
  }
};

setupDatabase();
