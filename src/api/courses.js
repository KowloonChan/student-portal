// export const fetchCoursesApi = async (search = '') => {
//   // GET /api/courses?search=... [cite: 100, 101]
//   return [
//     { courseId: "INFO2050", courseName: "Computer Security", description: "Systems Development: Computer Security" }
//   ];
// };

// export const fetchStudentGradesApi = async (courseId) => {
//   // GET /api/courses/:courseId/grades [cite: 105]
//   return {
//     courseId: courseId,
//     studentId: "101",
//     grade: "92",
//     status: "Published"
//   };
// };

// src/api/courses.js
import { apiFetch } from './client';
export const fetchStudentGradesApi = async (courseId) => {
  // 1. 模拟网络延迟 (500ms)
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. 模拟后端返回的 JSON 数据 
  // 注意：字段名需严格匹配合约中的 courseId, studentId, grade, status 
  const mockGradeResponse = {
    courseId: courseId,       // 动态匹配传入的 ID 
    studentId: "101",        // 模拟当前登录学生 ID 
    grade: "92",             // 模拟分数 
    status: "Published"      // 成绩状态 
  };

  return mockGradeResponse;

  /* // --- 随后对接真实 Server 时，只需取消下方代码注释并删除上方 mock 逻辑 ---
  // return await apiFetch(`/courses/${courseId}/grades`); 
  */
};
export const fetchAllCoursesApi = async (search = '') => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 400));

  // 模拟后端返回的数据格式 [cite: 104]
  const MOCK_COURSES = [
    { 
      courseId: "PROG2590", 
      courseName: "Data Analytics, AI, and Machine Learning", 
      description: "26W-Sec1: Advanced analytics and AI models." 
    },
    { 
      courseId: "PROG2436", 
      courseName: "Programming Mobile Applications I", 
      description: "26W-Sec1: Fundamentals of mobile app development." 
    },
    { 
      courseId: "INFO2050", 
      courseName: "Systems Development: Computer Security", 
      description: "26W-Sec1: Core principles of secure systems." 
    },
    { 
      courseId: "PROG2070", 
      courseName: "Programming: Software Quality Assurance", 
      description: "26W-Sec1: Testing methodologies and QA standards." 
    },
    { 
      courseId: "PROG3271", 
      courseName: "Open Source Web Programming", 
      description: "26W-Sec1: Web development using open-source stacks." 
    }
  ];

  // 简单的搜索过滤逻辑
  const filtered = MOCK_COURSES.filter(c => 
    c.courseName.toLowerCase().includes(search.toLowerCase()) || 
    c.courseId.toLowerCase().includes(search.toLowerCase())
  );

  return filtered;

  // 以后对接时：return await apiFetch(`/courses?search=${search}`); [cite: 100, 102]
};