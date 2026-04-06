const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// 1. 将 Token 存在内存变量中，JS 插件很难直接读取它
let memoryToken = null;

// 提供一个函数供登录时设置 Token
export const setAuthToken = (token) => {
  memoryToken = token;
};

// 提供一个函数供登出时清除 Token
export const clearAuthToken = () => {
  memoryToken = null;
};

export const apiFetch = async (endpoint, options = {}) => {
  // 2. 从内存变量读取 Token (落实 CIA: Confidentiality)
  const token = memoryToken;
  
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // 按照后端要求注入 [cite: 96]
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (!response.ok) {
    if (response.status === 401) {
      // 自动清除内存并跳转到登录，防止 Broken Access Control
      clearAuthToken();
      window.location.href = '/login'; 
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }
  
  return response.status === 204 ? null : await response.json();
};