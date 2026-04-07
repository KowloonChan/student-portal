import { useEffect, useState } from 'react';
// import { fetchStudentGradesApi } from '../../api/courses';

export default function Grades() {
  const [gradeInfo, setGradeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 假设我们查看 INFO2050 课程 [cite: 104]
    // fetchStudentGradesApi('INFO2050')
    //   .then(data => {
    //     setGradeInfo(data); 
    //     setLoading(false);
    //   })
    //   .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Loading grades...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Course Grade</h2>
      {gradeInfo && (
        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm text-slate-500">Course ID: {gradeInfo.courseId}</p>
            <p className="font-bold text-lg">Score: {gradeInfo.grade}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {gradeInfo.status}
          </span>
        </div>
      )}
    </div>
  );
}