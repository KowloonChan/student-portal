const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Require a valid token to search courses
router.get("/", verifyToken, courseController.searchCourses);

// Require a valid token to view grades
router.get(
  "/:courseId/grades",
  verifyToken,
  courseController.getGradesByCourse,
);

module.exports = router;
