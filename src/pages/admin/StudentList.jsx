import { useEffect, useState } from 'react';
import { fetchAllStudentsApi } from '../../api/admin';
import { Users, Mail, Calendar, Search } from 'lucide-react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllStudentsApi().then(setStudents);
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.userId.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center">
          <Users className="mr-2 text-indigo-600" /> Student Directory
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or ID..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div key={student.userId} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                {student.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-slate-800">{student.name}</h3>
                <p className="text-xs text-slate-500">ID: {student.userId}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center">
                <Mail size={14} className="mr-2" /> {student.email}
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-2" /> Joined: {student.joinDate}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {student.major}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}