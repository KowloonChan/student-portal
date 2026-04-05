const db = require("./db");

module.exports = {
  getGradeForStudent: async (enrollmentId) => {
    const result = await db.query(
      "SELECT * FROM grades WHERE enrollment_id = $1",
      [enrollmentId]
    );
    return result.rows[0];
  }
};
