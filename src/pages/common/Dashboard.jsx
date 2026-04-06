import { useAuth } from '../../context/AuthContext';
import { 
  Users, ShieldAlert, FileCheck, TrendingUp, 
  Clock, AlertTriangle, ShieldCheck 
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // --- Admin 视图的内容 ---
  const AdminOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-blue-600" />} title="Total Students" value="128" color="bg-blue-50" />
        <StatCard icon={<ShieldAlert className="text-red-600" />} title="Security Threats Blocked" value="12" color="bg-red-50" />
        <StatCard icon={<FileCheck className="text-green-600" />} title="System Integrity" value="100%" color="bg-green-50" />
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <Clock className="mr-2 text-slate-400" size={18} /> Recent Admin Activities
        </h3>
        <div className="space-y-4 text-sm">
          <ActivityItem text="Admin deleted student account S088" time="2 mins ago" />
          <ActivityItem text="New security policy applied to Upload module" time="1 hour ago" />
          <ActivityItem text="System backup completed successfully" time="5 hours ago" />
        </div>
      </div>
    </div>
  );

  // --- Student 视图的内容 ---
  const StudentOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-indigo-100">Your student portal is secure and up to date.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-indigo-500" size={18} /> Academic Summary
          </h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-slate-900">3.85</p>
              <p className="text-sm text-slate-500">Current GPA</p>
            </div>
            <div className="text-right text-sm text-green-600 font-medium">
              +0.2 from last sem
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-green-500" size={18} /> Security Status
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div> 2FA Enabled
            </li>
            <li className="flex items-center text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div> Last login: Today, 09:15 AM
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Real-time system status and information.</p>
      </div>

      {user?.role === 'Admin' ? <AdminOverview /> : <StudentOverview />}
    </div>
  );
}

// 辅助子组件：统计卡片
function StatCard({ icon, title, value, color }) {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-white rounded-xl shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}

// 辅助子组件：动态项
function ActivityItem({ text, time }) {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <span className="text-slate-700">{text}</span>
      <span className="text-xs text-slate-400 font-mono">{time}</span>
    </div>
  );
}