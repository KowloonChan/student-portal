// src/api/courses.js
import { apiFetch } from "./client";

export const fetchStudentGradesApi = async (courseId) => {
  // Calls GET /api/courses/:courseId/grades
  // The token is automatically sent by client.js to prove WHICH student is asking
  return await apiFetch(`/courses/${courseId}/grades`);
};

export const fetchAllCoursesApi = async (search = "") => {
  // Calls GET /api/courses?search=...
  // Your backend Postgres ILIKE query handles the filtering
  return await apiFetch(`/courses?search=${search}`);
};
