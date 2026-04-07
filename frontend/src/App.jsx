import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Grades from './pages/student/Grades';
import Upload from './pages/student/Upload';
import AdminPanel from './pages/admin/AdminPanel';
import Profile from './pages/common/Profile';
import Dashboard from './pages/common/Dashboard';
import StudentList from './pages/admin/StudentList';
import CourseList from './pages/student/CourseList';
// 路由守卫：未登录直接踢回 /login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. 登录页面：作为主入口 */}
          <Route path="/login" element={<Login />} />

          {/* 2. 受保护的路由：必须登录后才能访问 */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* 登录后的默认首页：自动根据角色分流 */}
            <Route index element={<Dashboard />} />
            
            {/* 学生功能 */}
            <Route path="grades" element={<Grades />} />
            <Route path="upload" element={<Upload />} />
            <Route path="courses" element={<CourseList />} />
            
            {/* 管理员功能 */}
            <Route path="admin" element={<AdminPanel />} />

            <Route path="profile" element={<Profile />} />
            <Route path="students" element={<StudentList />} /> 
          </Route>

          {/* 3. 捕获所有未定义路由，返回首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}



export default App;