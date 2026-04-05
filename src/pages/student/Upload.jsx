import { useState } from 'react';
import { FileUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const validateFile = (selectedFile) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // 落实 OWASP 校验：防止上传超大文件导致 DoS，或上传非法后缀文件 
    if (!allowedTypes.includes(selectedFile.type)) {
      return '仅支持 PDF, JPG, PNG 格式。';
    }
    if (selectedFile.size > maxSize) {
      return '文件大小不能超过 2MB。';
    }
    return '';
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const errMsg = validateFile(selected);
      if (errMsg) {
        setError(errMsg);
        setFile(null);
      } else {
        setError('');
        setFile(selected);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Upload Profile Documents</h1>
      
      <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
        file ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
      }`}>
        <input 
          type="file" id="file-upload" className="hidden" 
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <FileUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">点击或拖拽文件到此处上传</p>
          <p className="text-xs text-gray-400 mt-2">支持 PDF, JPG, PNG (Max 2MB)</p>
        </label>
      </div>

      {error && (
        <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle size={20} className="mr-2" /> {error}
        </div>
      )}

      {file && (
        <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle2 size={20} className="mr-2" /> 已选择: {file.name}
        </div>
      )}

      <button 
        disabled={!file}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
      >
        Confirm and Upload
      </button>
    </div>
  );
}