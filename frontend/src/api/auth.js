// src/api/auth.js
import { apiFetch } from "./client";

export const loginApi = async (email, password) => {
  // Calls POST /api/auth/login on your backend
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  console.log(response);

  // The backend controller returns { message, token, user }
  return response;
};
