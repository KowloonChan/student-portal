const db = require("./db");

module.exports = {
  logEvent: async (userId, action) => {
    await db.query(
      "INSERT INTO audit_logs (user_id, action) VALUES ($1, $2)",
      [userId, action]
    );
  }
};
