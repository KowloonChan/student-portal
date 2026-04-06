// export const loginApi = async (email, password) => {
//   // 目前返回后端合约中的 Mock 数据 [cite: 96]
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({
//       message: "Login successful",
//       token: "eyJhbGciOiJIUzI1NiIsInR5c...",
//       user: { userId: "101", role: "Student" } // 注意 role 是首字母大写
//     }), 800);
//   });
//   // 对接时：return await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
// };
export const loginApi = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // 这两个是完整的、标准的 Mock Token 示例
  const STUDENT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDEiLCJyb2xlIjoiU3R1ZGVudCJ9.none";
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDEiLCJyb2xlIjoiQWRtaW4ifQ.none";

  if (email === 'admin@edu.com' && password === 'admin123') {
    return {
      token: ADMIN_TOKEN,
      user: { userId: "001", role: "Admin", name: "System Admin" } // 
    };
  } 
  
  if (email === 'student@edu.com' && password === '123456') {
    return {
      token: STUDENT_TOKEN,
      user: { userId: "101", role: "Student", name: "Xuanyu Wang" } // 
    };
  }

  throw new Error("Invalid credentials");
};