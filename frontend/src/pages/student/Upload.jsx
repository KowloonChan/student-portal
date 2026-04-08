import { useState } from 'react';
import { uploadDocumentApi } from '../../api/students';
import { FileUp, MessageSquare, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Define allowed file types (MIME Types)
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      // 1. Validate file type (Preventative Security)
      if (!ALLOWED_TYPES.includes(selected.type)) {
        setStatus({ 
          type: 'error', 
          msg: 'Invalid file type. Only PDF, JPG, and PNG are allowed.' 
        });
        setFile(null);
        e.target.value = ''; // Clear input
        return;
      }

      // 2. Validate file size (Prevent DoS)
      if (selected.size > 2 * 1024 * 1024) {
        setStatus({ type: 'error', msg: 'File size must be less than 2MB.' });
        setFile(null);
        e.target.value = ''; // Clear input
        return;
      }

      // Validation passed
      setFile(selected);
      setStatus({ type: '', msg: '' });
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    try {
      // Based on the backend contract, uploading files requires binary data, type, and comment
      const response = await uploadDocumentApi(file, "certification", comment);
      setStatus({ type: 'success', msg: response.message });
      setFile(null);
      setComment('');
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Upload failed, please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Submit Document</h1>
        <p className="text-slate-500">Upload your academic certifications for admin review.</p>
      </div>
      
      {/* File Selection Area */}
      <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
        file ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-300'
      }`}>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png" 
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <FileUp size={48} className="mx-auto text-slate-400 mb-4" />
          <p className="text-slate-700 font-medium">{file ? file.name : 'Click to select a file'}</p>
          <p className="text-xs text-slate-400 mt-2">Allowed: PDF, JPG, PNG (Max 2MB)</p>
        </label>
      </div>

      {/* Comment Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 flex items-center">
          <MessageSquare size={16} className="mr-2" /> Message to Administrator
        </label>
        <textarea 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] bg-white transition-all"
          placeholder="e.g. Please find my AWS certification attached."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Status Feedback */}
      {status.msg && (
        <div className={`p-4 rounded-xl flex items-center ${
          status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} className="mr-2" /> : <AlertCircle size={20} className="mr-2" />}
          <span className="text-sm font-medium">{status.msg}</span>
        </div>
      )}

      {/* Submit Button */}
      <button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100"
      >
        {isUploading ? <Loader2 className="animate-spin mr-2" /> : null}
        {isUploading ? 'Uploading...' : 'Confirm and Submit'}
      </button>
    </div>
  );
}