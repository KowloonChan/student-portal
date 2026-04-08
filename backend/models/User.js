const db = require("../config/db");

module.exports = {
  findUserByEmail: async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },

  createUser: async (email, passwordHash, role) => {
    const result = await db.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
      [email, passwordHash, role],
    );
    return result.rows[0];
  },

  updateProfile: async (studentId, firstName, lastName, contactEmail) => {
    const result = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
      [firstName, lastName, contactEmail, studentId],
    );
    return result.rows[0];
  },

  getAllStudents: async () => {
    const result = await db.query(
      "SELECT id, first_name, last_name, email FROM users WHERE role = 'Student'",
    );
    return result.rows;
  },
};
