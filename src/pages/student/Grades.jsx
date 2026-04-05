export default function Grades() {
  const grades = [
    { id: 1, course: 'Computer Security', score: 'A' },
    { id: 2, course: 'Machine Learning', score: 'B+' },
    { id: 2, course: 'Programming Mobile Applications I', score: 'A+' },
    { id: 2, course: 'Quality Assurance', score: 'B' },
    { id: 2, course: 'Open Source', score: 'A' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Grades</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Course Name</th>
              <th className="p-4">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(g => (
              <tr key={g.id} className="border-b">
                <td className="p-4">{g.course}</td>
                <td className="p-4 font-semibold text-blue-600">{g.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}