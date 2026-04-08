import { Search } from 'lucide-react';

export default function CourseSearch() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search Courses</h1>
      
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter course name or code..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Search Result Card based on provided Course Data.
          Matches the "Systems Development: Computer Security" entry.
        */}
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <h3 className="font-bold text-lg">Computer Security</h3>
          <p className="text-sm text-gray-500 mb-4">CS-101</p>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View Details & Grades
          </button>
        </div>
      </div>
    </div>
  );
}