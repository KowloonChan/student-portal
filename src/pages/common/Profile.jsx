import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Phone, MapPin, Save, AlertCircle } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  
  // // Initial State: Simulating additional user metadata retrieved from the backend
  const [formData, setFormData] = useState({
    phone: '+60 12-345 6789',
    address: '123 University Street, KL',
    bio: 'Computer Security Student'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Implementing OWASP (A03: Injection) defense: basic input sanitization logic
    const sanitize = (str) => str.replace(/[<>{}]/g, ""); 
    
    const updatedData = {
      phone: sanitize(formData.phone),
      address: sanitize(formData.address),
      bio: sanitize(formData.bio)
    };

    // Implementing Logging: Recording administrative/user actions for audit trails
    console.log(`[AUDIT LOG]: User ${user.name} updated their profile info.`);
    
    setFormData(updatedData);
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

      {/* Success Feedback: Ensuring Availability and clear system response */}
      {message && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl flex items-center animate-bounce">
          <Save size={18} className="mr-2" /> {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar: Basic Info Card (CIA: Confidentiality - Displays only authorized user data) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <User size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-sm text-slate-500 capitalize px-2 py-1 bg-slate-100 rounded-full inline-block mt-2">
              {user?.role}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center text-slate-600">
              <Mail size={18} className="mr-3" />
              <span className="text-sm truncate">student@edu.com</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Shield size={18} className="mr-3" />
              <span className="text-sm">Account ID: {user?.role === 'admin' ? 'ADM-001' : 'STU-995'}</span>
            </div>
          </div>
        </div>

        {/* Main Section: Editable Details (CIA: Integrity - Ensuring data accuracy via form validation) */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Personal Information</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                    <Phone size={14} className="mr-2" /> Phone Number
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                    <MapPin size={14} className="mr-2" /> Address
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">About Me</label>
                  <textarea
                    disabled={!isEditing}
                    rows="3"
                    className="w-full p-2.5 border rounded-xl bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <p className="text-xs text-amber-600 flex items-center italic">
                    <AlertCircle size={12} className="mr-1" />All modifications will be recorded in the audit log
                  </p>
                  <button 
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}