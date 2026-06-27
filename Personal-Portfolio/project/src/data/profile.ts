export const profile = {
  name: 'Aditya Mitra',
  role: 'B.Tech CSE Student',
  bio: 'Passionate about building systems that matter. I explore the intersection of software engineering, cybersecurity, and artificial intelligence — crafting tools that are both powerful and purposeful.',
  email: 'mitraaditya644@gmail.com',
  phone: '+91 XXXXX XXXXX',
  location: 'India',
  linkedin: 'https://www.linkedin.com/in/aditya-mitra-708913380',
  github: 'https://github.com/Aditya70-creator',
  instagram: 'https://www.instagram.com/aditya_mitra__07',
  discord: 'arrowadi0251',
  careerInterests: [
    'Software Engineering',
    'Backend Development',
    'AI Development',
    'Open Source',
  ],
  currentLearning: [
    'DSA',
    'Computer Networks',
    'LINUX',
  ],
  skills: [
    'Java',
    'Python',
    'C',
    'C++',
    'SQL',
    'JavaScript',
    'HTML',
    'CSS',
    'Git',
    'GitHub',
    'Linux',
  ],
  skillCategories: [
    {
      label: 'LANGUAGES',
      color: '#00e5ff',
      skills: ['Java', 'Python', 'C', 'C++', 'JavaScript'],
    },
    {
      label: 'WEB',
      color: '#00ff41',
      skills: ['HTML', 'CSS', 'SQL'],
    },
    {
      label: 'TOOLS & OS',
      color: '#bf5af2',
      skills: ['Git', 'GitHub', 'Linux'],
    },
  ],
};

export type Profile = typeof profile;
export type SkillCategory = (typeof profile.skillCategories)[number];
