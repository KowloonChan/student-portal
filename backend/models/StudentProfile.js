const db = require("./db");

module.exports = {
  getProfileByUserId: async (userId) => {
    const result = await db.query(
      "SELECT * FROM student_profiles WHERE user_id = $1",
      [userId]
    );
    return result.rows[0];
  },

  updateProfile: async (userId, data) => {
    const { first_name, last_name, contact_email, program } = data;

    await db.query(
      `UPDATE student_profiles 
       SET first_name = $1, last_name = $2, contact_email = $3, program = $4
       WHERE user_id = $5`,
      [first_name, last_name, contact_email, program, userId]
    );

    return { message: "Profile updated" };
  }
};
