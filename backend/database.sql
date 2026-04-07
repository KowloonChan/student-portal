DROP TABLE IF EXISTS documents, grades, courses, users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'INFO2050'
    course_name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id),
    student_id INT REFERENCES users(id),
    grade VARCHAR(10) NOT NULL,
    status VARCHAR(50) DEFAULT 'Published'
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    document_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    admin_comments TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);