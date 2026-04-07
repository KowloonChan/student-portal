// src/api/students.js
import { apiFetch } from "./client";

export const updateProfileApi = async (profileData) => {
  // Calls PUT /api/students/profile
  // profileData must be { firstName, lastName, contactEmail }
  return await apiFetch("/students/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

export const uploadDocumentApi = async (file, type, comment) => {
  // Calls POST /api/documents/upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("documentType", type);
  formData.append("studentComment", comment); // Backend will currently ignore this field

  // client.js knows NOT to set 'Content-Type': 'application/json' when it sees FormData
  return await apiFetch("/documents/upload", {
    method: "POST",
    body: formData,
  });
};
