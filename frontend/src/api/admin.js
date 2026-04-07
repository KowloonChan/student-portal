// src/api/admin.js
import { apiFetch } from "./client";

export const fetchPendingDocumentsApi = async () => {
  return await apiFetch("/admin/documents/pending");
};

export const updateDocumentStatusApi = async (docId, status, comments) => {
  return await apiFetch(`/admin/documents/${docId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status, comments }),
  });
};

// Now officially hitting the real backend!
export const fetchAllStudentsApi = async () => {
  return await apiFetch("/admin/students");
};
