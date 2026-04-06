const Course = require("../models/Course");
const Grade = require("../models/Grade"); // Make sure to import the Grade model!

exports.searchCourses = async (req, res) => {
  try {
    // 1. Get the search term from the URL
    const searchQuery = req.query.search || "";

    // 2. Pass it to the Postgres function
    const courses = await Course.getCourses(searchQuery);

    // 3. Map snake_case from Postgres to camelCase for the React frontend
    const formattedCourses = courses.map((course) => ({
      courseId: course.course_id,
      courseName: course.course_name,
      description: course.description,
    }));

    res.status(200).json(formattedCourses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

exports.getGradesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Get the real studentId from the verified JWT token
    const studentId = req.user.userId;

    // Ask the Database for the real grade
    const gradeRecord = await Grade.getGradeForStudent(courseId, studentId);

    // If the student isn't enrolled or doesn't have a grade yet
    if (!gradeRecord) {
      return res.status(200).json({
        courseId: courseId,
        studentId: studentId,
        grade: "--",
        status: "Not Available",
      });
    }

    // Return the real grade to the React Modal
    res.status(200).json({
      courseId: courseId,
      studentId: studentId,
      grade: gradeRecord.grade,
      status: gradeRecord.status,
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ message: "Error fetching grades" });
  }
};
