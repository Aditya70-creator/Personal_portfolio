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
  // {
  //   id: 'proj-001',
  //   name: 'Project Name',
  //   description: 'A short description of what this project does.',
  //   technologies: ['Python', 'JavaScript'],
  //   githubUrl: 'https://github.com/aditya-mitra/project',
  //   liveDemoUrl: '',
  //   status: 'In Progress',
  // },
];
