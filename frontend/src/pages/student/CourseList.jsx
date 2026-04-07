import { useEffect, useState } from 'react';
import { fetchAllCoursesApi, fetchStudentGradesApi } from '../../api/courses';
import { BookOpen, Search, X, Award, Info, Loader2 } from 'lucide-react';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null); // 存储查到的成绩
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingGrade, setIsFetchingGrade] = useState(false);

  useEffect(() => {
    fetchAllCoursesApi(searchTerm).then(setCourses);
  }, [searchTerm]);

  const handleViewGrade = async (courseId) => {
    setIsFetchingGrade(true);
    setIsModalOpen(true);
    try {
      // 调用后端合约接口 
      const data = await fetchStudentGradesApi(courseId);
      setSelectedGrade(data);
    } catch (err) {
      console.error("Failed to fetch grade");
    } finally {
      setIsFetchingGrade(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Courses</h1>
      
      {/* 课程卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.courseId} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BookOpen size={20}/></div>
              <span className="text-xs font-mono text-slate-400">{course.courseId}</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{course.courseName}</h3>
            <p className="text-sm text-slate-500 mb-6">{course.description}</p>
            
            <button 
              onClick={() => handleViewGrade(course.courseId)}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Check My Grade →
            </button>
          </div>
        ))}
      </div>

      {/* 成绩显示弹窗 (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <button onClick={() => setIsModalOpen(false)} className="float-right text-slate-400 hover:text-slate-600"><X /></button>
              
              {isFetchingGrade ? (
                <div className="py-12 flex flex-col items-center">
                  <Loader2 className="animate-spin text-indigo-600 mb-2" />
                  <p className="text-sm text-slate-500">Securely retrieving grade...</p>
                </div>
              ) : (
                <div className="py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={40} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Your Grade</h2>
                  <p className="text-slate-500 text-sm mb-6">{selectedGrade?.courseId}</p>
                  
                  <div className="text-5xl font-black text-indigo-600 mb-2">
                    {selectedGrade?.grade}<span className="text-lg text-slate-400">/100</span>
                  </div>
                  
                  <p className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
                    selectedGrade?.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    Status: {selectedGrade?.status}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-slate-50 p-4 text-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}