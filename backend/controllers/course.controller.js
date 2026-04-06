const Course = require("../models/Course"); // Import Person 1's DB Model

exports.searchCourses = async (req, res) => {
  try {
    // 1. Get the search term from the URL (default to empty string if none provided)
    const searchQuery = req.query.search || "";

    // 2. Pass it to the Postgres function
    const courses = await Course.getCourses(searchQuery);

    // 3. Return the real database results to the frontend!
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

exports.getGradesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // TODO (Person 3): Get studentId from the verified JWT token (e.g., req.user.id)
    const mockStudentId = "101";

    // TODO (Person 1): Replace with DB query: const grade = await Grade.findOne({ courseId, studentId });

    res.status(200).json({
      courseId: courseId,
      studentId: mockStudentId,
      grade: "92",
      status: "Published",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades" });
  }
};
