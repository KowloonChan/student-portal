const db = require("./db");

module.exports = {
  getEnrollment: async (studentId, courseId) => {
    const result = await db.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [studentId, courseId]
    );
    return result.rows[0];
  }
};
