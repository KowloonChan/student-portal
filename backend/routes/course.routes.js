const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// TODO (Person 3): Add verifyToken middleware to these routes once ready
// Example: router.get('/', verifyToken, courseController.searchCourses);

// GET /api/courses
router.get("/", courseController.searchCourses);

// GET /api/courses/:courseId/grades
router.get("/:courseId/grades", courseController.getGradesByCourse);

module.exports = router;
