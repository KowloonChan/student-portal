import { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Core validation logic to enforce Data Integrity (CIA Pillar).
  // Ensures that only valid data reaches the backend services.
  const validate = () => {
    let newErrors = {};
    
    // Student ID validation (Expected format: S followed by 3 digits, e.g., S001)
    if (!/^S\d{3}$/.test(formData.id)) {
      newErrors.id = 'ID format must be "S" followed by 3 digits (e.g., S001)';
    }

    // Full Name validation (Sanitization to prevent XSS/Injection and check for invalid characters)
    if (formData.name.length < 2 || /[<>{}[\]]/.test(formData.name)) {
      newErrors.name = 'Invalid name or contains illegal characters';
    }

    // Email format validation via standard Regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Implementing Logging: Recording administrative actions for audit trails.
      // This ensures accountability for system changes.
      console.log(`[AUDIT LOG]: Admin attempting to add student: ${formData.id}`);
      onAdd(formData);
      setFormData({ id: '', name: '', email: '' }); // Reset form state
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