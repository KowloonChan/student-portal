const isAdmin = (req, res, next) => {
  // req.user is populated by verifyToken middleware
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access Denied: Admin Rights Required" });
  }
};

const isOwnerOrAdmin = (req, res, next) => {
  const userIdFromToken = req.user.userId;
  const requestedStudentId = req.params.studentId || req.body.studentId;

  // Students can only see their own data; Admins can see everything
  if (req.user.role === "Admin" || userIdFromToken == requestedStudentId) {
    next();
  } else {
    return res
      .status(403)
      .json({
        message: "Access Denied: You cannot access other students' records",
      });
  }
};

module.exports = { isAdmin, isOwnerOrAdmin };
