const db = require("../config/db");

module.exports = {
  getGradeForStudent: async (courseId, studentId) => {
    const result = await db.query(
      "SELECT * FROM grades WHERE course_id = $1 AND student_id = $2",
      [courseId, studentId],
    );
    return result.rows[0];
  },
};
