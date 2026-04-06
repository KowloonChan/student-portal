export const fetchPendingDocumentsApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      documentId: "505",
      studentId: "101",
      studentName: "John Doe",
      documentType: "certification",
      uploadDate: "2026-04-04T14:30:00Z",
      fileUrl: "http://localhost:5000/uploads/aws_cert.pdf", // 后端提供的下载地址 
      studentComment: "这是我上个月获得的 AWS 云计算认证，请查收。", // 模拟学生上传时的留言
      status: "pending"
    }
  ];
};

export const updateDocumentStatusApi = async (docId, status, comments) => {
  // PUT /api/admin/documents/:documentId/status [cite: 132]
  return await apiFetch(`/admin/documents/${docId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, comments }) // [cite: 135]
  });
};


export const fetchAllStudentsApi = async () => {
  // 模拟从后端获取所有学生列表
  await new Promise(resolve => setTimeout(resolve, 500));

  // 以后对接时改为：return await apiFetch('/admin/students');
  return [
    { userId: "101", name: "Xuanyu Wang", email: "student@edu.com", major: "Computer Security", joinDate: "2026-01-15" },
    { userId: "102", name: "Alice Smith", email: "alice@edu.com", major: "Machine Learning", joinDate: "2026-02-10" },
    { userId: "103", name: "Bob Johnson", email: "bob@edu.com", major: "Data Science", joinDate: "2026-02-20" },
  ];
};