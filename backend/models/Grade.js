const db = require("../config/db");

module.exports = {
  getGradeForStudent: async (courseCode, studentId) => {
    const result = await db.query(
      `SELECT g.* FROM grades g 
       JOIN courses c ON g.course_id = c.id 
       WHERE c.course_id = $1 AND g.student_id = $2`,
      [courseCode, studentId],
    );
    return result.rows[0];
  },
};
