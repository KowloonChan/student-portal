-- ==========================================
-- 1. SEED USERS (5 Records)
-- Password for all users is: password123
-- ==========================================
INSERT INTO users (first_name, last_name, email, password_hash, role) 
VALUES 
('Alice', 'Smith', 'admin@college.edu', '$2b$10$2H/R.a.t3p/A.E/k.7.8.9.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6', 'Admin'),
('John', 'Doe', 'student@college.edu', '$2b$10$2H/R.a.t3p/A.E/k.7.8.9.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6', 'Student'),
('Jane', 'Wong', 'jwong@college.edu', '$2b$10$2H/R.a.t3p/A.E/k.7.8.9.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6', 'Student'),
('Marcus', 'Johnson', 'mjohnson@college.edu', '$2b$10$2H/R.a.t3p/A.E/k.7.8.9.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6', 'Student'),
('Elena', 'Rodriguez', 'erodriguez@college.edu', '$2b$10$2H/R.a.t3p/A.E/k.7.8.9.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6', 'Student');

-- ==========================================
-- 2. SEED COURSES (5 Records)
-- ==========================================
INSERT INTO courses (course_id, course_name, description) 
VALUES 
('INFO2050', 'Computer Security', 'Systems Development: Computer Security and Threat Modeling.'),
('PROG1020', 'Logic and Programming', 'Introduction to core programming concepts and logical problem solving.'),
('DBAS3010', 'Database Management', 'Advanced PostgreSQL, relational database design, and optimization.'),
('WEBD2000', 'Frontend Development', 'Building dynamic user interfaces using React and modern JavaScript.'),
('SYSD3000', 'Systems Architecture', 'Designing scalable and robust software application architectures.');

-- ==========================================
-- 3. SEED GRADES (5 Records)
-- Note: Student IDs are 2 (John), 3 (Jane), 4 (Marcus), 5 (Elena)
-- ==========================================
INSERT INTO grades (course_id, student_id, grade, status) 
VALUES 
(1, 2, '92', 'Published'),  -- John got a 92 in Computer Security
(2, 2, '88', 'Published'),  -- John got an 88 in Logic and Programming
(1, 3, '95', 'Published'),  -- Jane got a 95 in Computer Security
(3, 4, '76', 'Published'),  -- Marcus got a 76 in Database Management
(4, 5, '--', 'Hidden');     -- Elena's Frontend Dev grade is hidden

-- ==========================================
-- 4. SEED DOCUMENTS (5 Records)
-- ==========================================
INSERT INTO documents (student_id, file_path, file_type, document_type, status, admin_comments) 
VALUES 
(2, '/uploads/john_medical_note.pdf', 'pdf', 'certification', 'pending', ''),
(2, '/uploads/john_profile_pic.jpg', 'jpg', 'profile_picture', 'approved', 'Looks good!'),
(3, '/uploads/jane_transcript.pdf', 'pdf', 'course_material', 'rejected', 'Please upload a clearer, unblurred copy.'),
(4, '/uploads/marcus_coop_form.pdf', 'pdf', 'certification', 'pending', ''),
(5, '/uploads/elena_id_scan.png', 'png', 'profile_picture', 'approved', 'Verified.');