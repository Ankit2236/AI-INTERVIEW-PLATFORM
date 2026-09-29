import api from './api';

const DEFAULT_PARSED_RESUME = {
  fileName: 'Alex_Johnson_Software_Engineer_Resume.pdf',
  fileSize: '1.4 MB',
  uploadDate: new Date().toISOString(),
  candidateName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  skills: ['Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'Microservices', 'REST APIs', 'Docker', 'Git', 'AWS'],
  education: [
    { degree: 'B.S. in Computer Science', institution: 'Stanford University', year: '2020 - 2024' }
  ],
  experience: [
    { role: 'Software Engineering Intern', company: 'TechCorp Solutions', duration: 'Jun 2023 - Dec 2023', details: 'Built RESTful microservices in Java Spring Boot and automated deployment with Docker.' }
  ],
  projects: [
    { name: 'AI Interview Practice Platform', tech: 'React, Spring Boot, OpenAI', description: 'Real-time AI interview simulator with speech evaluation and analytics.' },
    { name: 'E-Commerce Microservices Engine', tech: 'Java, Kafka, Redis', description: 'Distributed inventory management system processing 10k orders/min.' }
  ],
  certifications: ['AWS Certified Developer Associate', 'Oracle Certified Professional Java SE 17']
};

export const uploadAndParseResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.data) {
      localStorage.setItem('interview_ai_resume', JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    console.warn('Backend resume service unavailable. Simulating AI resume parsing in Demo Mode.', err);
  }

  // Simulate parsing pipeline delay
  await new Promise((res) => setTimeout(res, 1800));

  const parsedData = {
    ...DEFAULT_PARSED_RESUME,
    fileName: file ? file.name : DEFAULT_PARSED_RESUME.fileName,
    fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : DEFAULT_PARSED_RESUME.fileSize,
    uploadDate: new Date().toISOString()
  };

  localStorage.setItem('interview_ai_resume', JSON.stringify(parsedData));
  return parsedData;
};

export const getStoredResume = () => {
  const resumeStr = localStorage.getItem('interview_ai_resume');
  if (resumeStr) {
    try {
      return JSON.parse(resumeStr);
    } catch (e) {
      return DEFAULT_PARSED_RESUME;
    }
  }
  return DEFAULT_PARSED_RESUME;
};

export const deleteStoredResume = () => {
  localStorage.removeItem('interview_ai_resume');
};
