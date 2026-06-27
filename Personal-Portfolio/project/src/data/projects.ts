export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  status: 'In Progress' | 'Completed' | 'Planned';
}

export const projects: Project[] = [
  // Add your projects here. Example:
  {
     id: 'proj-001',
     name: 'Student-Marks-Manager',
     description: 'This application allows students to securely create an account, manage semester-wise academic records, calculate SGPA and CGPA automatically, and track their complete academic journey through an interactive dashboard.',
     technologies: ['Java Spring Boot', 'HTML', 'CSS', 'JavaScript', 'Mongodb Atlas'],
     githubUrl: 'https://github.com/Aditya70-creator/Student-Marks-Manager',
     liveDemoUrl: 'https://student-marks-manager-1.onrender.com',
     status: 'Completed',
  },

  {
     id: 'proj-002',
     name: 'Metadata Extractor',
     description: 'A lightweight Java utility that extracts structured metadata from images and videos without loading entire media files into memory. ',
     technologies: ['Java Spring Boot', 'MAVEN'],
     githubUrl: 'https://github.com/Aditya70-creator/Metadata-Extractor',
     liveDemoUrl: '',
     status: 'Completed',
  },
];
