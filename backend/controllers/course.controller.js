exports.searchCourses = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    // TODO (Person 1): Replace mock with: const courses = await Course.find({ name: { $regex: searchQuery } });

    // --- MOCK LOGIC START ---
    const mockCourses = [
      {
        courseId: "INFO2050",
        courseName: "Computer Security",
        description: "Systems Development: Computer Security",
      },
      {
        courseId: "PROG1020",
        courseName: "Logic and Programming",
        description: "Intro to programming",
      },
    ];

    const filtered = searchQuery
      ? mockCourses.filter((c) =>
          c.courseName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : mockCourses;

    res.status(200).json(filtered);
    // --- MOCK LOGIC END ---
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
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
