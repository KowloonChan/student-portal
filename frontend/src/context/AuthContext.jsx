import { createContext, useState, useContext } from 'react';
import { setAuthToken, clearAuthToken } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 这里的 login 直接接收后端返回的 token 和 user 对象 
  const login = (token, userData) => {
    setAuthToken(token); // 存入 api/client.js 的内存变量
    setUser(userData);   // 存入 React 状态供页面使用
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
// import { createContext, useState, useEffect, useContext } from 'react';
// import { jwtDecode } from 'jwt-decode'; // 确保执行了 npm install jwt-decode

// // 1. 创建 Context 对象
// const AuthContext = createContext();

// // 2. 创建 Provider 组件
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 页面加载时检查本地存储是否有 Token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         // 简单的过期检查 (CIA: Availability & Integrity)
//         if (decoded.exp * 1000 < Date.now()) {
//           console.warn("Token expired");
//           logout();
//         } else {
//           setUser(decoded);
//         }
//       } catch (error) {
//         console.error("Invalid token", error);
//         logout();
//       }
//     }
//     setLoading(false);
//   }, []);

//   // 登录函数
//   const login = (token) => {
//     // localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     console.log(decoded);
    
//     setUser(decoded);
//   };

//   // 登出函数
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   // 将状态和方法暴露给子组件
//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // 3. 导出自定义 Hook (这是你报错的地方，确保这里有 export)
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };