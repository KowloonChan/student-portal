import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard,BookOpen, FileText, Upload,Users, User, ShieldCheck, LogOut } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Define all available menu items and assign their authorized roles.
  // Role names follow the backend contract: "Student" and "Admin".
  const allMenuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} />, roles: ['Student', 'Admin'] },
    { name: 'Upload Docs', path: '/upload', icon: <Upload size={20} />, roles: ['Student'] },
    { name: 'Admin Panel', path: '/admin', icon: <ShieldCheck size={20} />, roles: ['Admin'] },
    { name: 'Manage Students', path: '/students', icon: <Users size={20} />, roles: ['Admin'] },
    { name: 'Browse Courses', path: '/courses', icon: <BookOpen size={20} />, roles: ['Student'] },
    { name: 'Profile', path: '/profile', icon: <User size={20} />, roles: ['Student', 'Admin'] },
];

  // 2. Filter menu items based on the currently logged-in user's role.
  // This implements CIA: Confidentiality by preventing unauthorized UI access.
  const filteredMenuItems = allMenuItems.filter(item => 
    item.roles.includes(user?.role)
  );
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-xl">
        <div className="p-6 text-xl font-bold border-b border-slate-700 flex items-center">
          <span className="bg-indigo-500 p-1.5 rounded-lg mr-2">EP</span>
          EduPortal
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700 transition-all duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-white">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold mr-3">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-semibold text-slate-700 text-lg capitalize">
            {location.pathname.split('/')[1] || 'Dashboard'}
          </h2>
          <div className="text-sm text-slate-500">
            System Status: <span className="text-green-500 font-medium">Secure</span>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}