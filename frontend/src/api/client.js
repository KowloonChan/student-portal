const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// 1. Store Token in a memory variable. 
// This makes it significantly harder for malicious JS plugins/scripts to access via XSS compared to localStorage.
let memoryToken = null;

// Sets the authentication token in memory upon successful login
export const setAuthToken = (token) => {
  memoryToken = token;
};

// Clears the authentication token from memory upon logout
export const clearAuthToken = () => {
  memoryToken = null;
};


// Enhanced fetch wrapper for API requests.
// Implements centralized security headers and error handling.
export const apiFetch = async (endpoint, options = {}) => {
// 2. Retrieve Token from memory (Implementing CIA: Confidentiality)
  const token = memoryToken;

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  // Handle error responses
  if (!response.ok) {
    // 401 Unauthorized handling
    if (response.status === 401) {
      // Clear the token variable and redirect to login page, in order to prevent Broken Access Control
      clearAuthToken();
      window.location.href = "/login";
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }
  // Return null for 204 No Content, otherwise parse JSON
  return response.status === 204 ? null : await response.json();
};
