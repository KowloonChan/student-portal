import { UserPlus, Trash2, Shield } from 'lucide-react';
import { useState } from 'react';
import AddStudentModal from './AddStudentModal';
export default function AdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([
    { id: 'S001', name: 'Xuanyu Wang', email: 'xy@edu.com', status: 'Active' }
  ]);

 const handleAddStudent = (newStudent) => {
    // 实际项目中这里会使用 fetch 发送 POST 请求 [cite: 25]
    const studentWithStatus = { ...newStudent, status: 'Active' };
    setStudents([...students, studentWithStatus]);
    alert(`Student ${newStudent.name} added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 text-indigo-600" /> User Management
        </h1>
        <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        <UserPlus size={18} className="mr-2" /> Add New Student
      </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Student ID</th>
              <th className="p-4 font-medium text-gray-600">Full Name</th>
              <th className="p-4 font-medium text-gray-600">Email</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="p-4 font-mono text-sm">{s.id}</td>
                <td className="p-4">{s.name}</td>
                <td className="p-4 text-gray-600">{s.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {s.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddStudent} 
      />
    </div>
  );
}