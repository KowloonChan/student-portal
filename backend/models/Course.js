const db = require("../config/db");

module.exports = {
  getCourses: async (search) => {
    const result = await db.query(
      "SELECT * FROM courses WHERE course_name ILIKE $1",
      [`%${search}%`],
    );
    return result.rows;
  },
};
