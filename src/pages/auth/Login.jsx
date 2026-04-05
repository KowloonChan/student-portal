import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // 模拟 JWT：这些字符串经过了 Base64 编码，jwt-decode 可以解析出里面的 role
  const MOCK_STUDENT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWHVhbnl1Iiwicm9sZSI6InN0dWRlbnQiLCJleHAiOjI1MjQ2MDg4MDB9.none";
  const MOCK_ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjI1MjQ2MDg4MDB9.none";

  const handleSubmit = (e) => {
    e.preventDefault();

    // 模拟后端验证逻辑
    if (email === 'student@edu.com' && password === '123456') {
      login(MOCK_STUDENT_TOKEN);
      console.log("Logged in as Student");
      navigate('/', { replace: true });
    } 
    else if (email === 'admin@edu.com' && password === 'admin123') {
      login(MOCK_ADMIN_TOKEN);
      console.log("Logged in as Admin");
      navigate('/', { replace: true });
    } 
    else {
      alert("Invalid credentials! Try student@edu.com/123456 or admin@edu.com/admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">EduPortal</h1>
          <p className="text-slate-500 mt-2">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="student@edu.com"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transform active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-xs text-amber-800 font-medium mb-1">Testing Credentials:</p>
          <p className="text-xs text-amber-700">Student: student@edu.com / 123456</p>
          <p className="text-xs text-amber-700">Admin: admin@edu.com / admin123</p>
        </div>
      </div>
    </div>
  );
}