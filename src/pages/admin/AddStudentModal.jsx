import { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // 核心校验逻辑：落实 Integrity (完整性) [cite: 19]
  const validate = () => {
    let newErrors = {};
    
    // ID 校验 (假设格式为 S + 3位数字)
    if (!/^S\d{3}$/.test(formData.id)) {
      newErrors.id = 'ID 格式应为 S 开头加三位数字 (如 S001)';
    }

    // 姓名校验 (防止 XSS/注入，简单限制长度和非法字符) 
    if (formData.name.length < 2 || /[<>{}[\]]/.test(formData.name)) {
      newErrors.name = '姓名无效或包含非法字符';
    }

    // 邮箱校验
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 落实 Logging：记录管理员添加行为 
      console.log(`[AUDIT LOG]: Admin attempting to add student: ${formData.id}`);
      onAdd(formData);
      setFormData({ id: '', name: '', email: '' }); // 重置
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <UserPlus className="mr-2 text-indigo-600" /> Add New Student
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g. S001"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value.toUpperCase()})}
            />
            {errors.id && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.id}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="student@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4"
          >
            Create Student Account
          </button>
        </form>
      </div>
    </div>
  );
}