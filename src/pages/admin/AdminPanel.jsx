import { useEffect, useState } from 'react';
import { fetchPendingDocumentsApi, updateDocumentStatusApi } from '../../api/admin';
import { Eye, Download, User, MessageSquare, X, Check, AlertCircle } from 'lucide-react';

export default function AdminPanel() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null); // 控制弹窗的数据

  useEffect(() => {
    fetchPendingDocumentsApi().then(setDocuments); 
  }, []);

  const handleAction = async (docId, status) => {
    try {
      // 这里的 status 和 comments 对应后端 PUT 接口 [cite: 135]
      await updateDocumentStatusApi(docId, status, "Processed by admin");
      setDocuments(documents.filter(d => d.documentId !== docId));
      setSelectedDoc(null);
      alert(`Document ${status}!`); 
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Pending Approvals</h1>
      
      <div className="grid gap-4">
        {documents.map(doc => (
          <div key={doc.documentId} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:border-indigo-300 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-500">
                <User size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">{doc.studentName}</p>
                <p className="text-sm text-slate-500">{doc.documentType} • {new Date(doc.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedDoc(doc)}
              className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
            >
              <Eye size={18} className="mr-2" /> Review
            </button>
          </div>
        ))}
        {documents.length === 0 && <p className="text-slate-500 italic">No pending documents to review.</p>}
      </div>

      {/* 审批弹窗 (Modal) */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Document Review</h3>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>

            <div className="p-6 space-y-6">
              {/* 用户信息 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Uploader</p>
                  <p className="text-lg font-bold text-slate-800">{selectedDoc.studentName}</p>
                  <p className="text-sm text-slate-500">ID: {selectedDoc.studentId}</p>
                </div>
                <a 
                  href={selectedDoc.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
                >
                  <Download size={16} className="mr-2" /> Download File
                </a>
              </div>

              {/* 学生留言 */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold mb-2 flex items-center">
                  <MessageSquare size={12} className="mr-1" /> STUDENT COMMENT
                </p>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{selectedDoc.studentComment || 'No comment provided.'}"
                </p>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="px-6 py-4 bg-slate-50 border-t flex space-x-3">
              <button 
                onClick={() => handleAction(selectedDoc.documentId, 'rejected')}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-bold transition-colors"
              >
                <AlertCircle size={18} className="mr-2" /> Reject
              </button>
              <button 
                onClick={() => handleAction(selectedDoc.documentId, 'approved')}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold transition-colors"
              >
                <Check size={18} className="mr-2" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}