export const updateProfileApi = async (profileData) => {
  // PUT /api/students/profile [cite: 112]
  // profileData 需包含 firstName, lastName, contactEmail [cite: 115]
  console.log("Updating profile:", profileData);
  return { message: "Profile updated successfully" };
};

export const uploadDocumentApi = async (file, type, comment) => {
  // POST /api/documents/upload [cite: 117]
  const formData = new FormData();
  formData.append('file', file); // 二进制文件数据 [cite: 122]
  formData.append('documentType', type); // 证件类型 [cite: 123]
  formData.append('studentComment', comment); // 新增：学生留言

  // 模拟后端返回 201 Created 响应 [cite: 124]
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      message: "File uploaded successfully. Pending admin review.",
      document: { documentId: "505", fileName: file.name, status: "pending" }
    }), 1000);
  });

  // 对接时：return await apiFetch('/documents/upload', { method: 'POST', body: formData });
};