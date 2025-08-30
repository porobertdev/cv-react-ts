import { createContext, useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/sonner';
import type { ResumeType } from './schemas/schemas';

export interface ResumeContextType {
  resumeData: Partial<ResumeType>;
  updateResumeData: (data: Partial<ResumeType>) => void;
}

export const ResumeContext = createContext<ResumeContextType>({});

function App() {
  const [resumeData, setResumeData] = useState<Partial<ResumeType>>({
    about: {
      profilePic: undefined,
      fName: 'Jane',
      lName: 'Doe',
      city: 'Berlin',
      country: 'Germany',
      intro: 'A passionate full-stack developer with a love for clean code and intuitive UI.',
    },
    contact: {
      email: 'jane.doe@example.com',
      phone: '+491234567890',
      socialLinks: [
        {
          platform: 'LinkedIn',
          url: 'https://www.linkedin.com/in/janedoe',
          username: 'janedoe',
        },
        {
          platform: 'GitHub',
          url: 'https://github.com/janedoe',
          username: 'janedoe',
        },
        {
          platform: 'Website',
          url: 'https://janedoe.dev',
        },
      ],
    },
    experience: {
      jobs: [
        {
          id: '1',
          jobTitle: 'Frontend Developer',
          company: 'CodeCrafters GmbH',
          location: 'Berlin, Germany',
          startDate: '2024-04-01',
          endDate: '2025-07-31',
          currentlyWorking: false,
          description:
            'Developed scalable web applications using React and improved performance by 30%.',
        },
        {
          id: '2',
          jobTitle: 'Software Engineering Intern',
          company: 'TechNova AG',
          location: 'Munich, Germany',
          startDate: '2023-06-01',
          endDate: '2023-12-31',
          currentlyWorking: false,
          description:
            'Worked on internal tools and gained hands-on experience in CI/CD and RESTful APIs.',
        },
        {
          id: '3',
          jobTitle: 'Freelance Developer',
          company: 'Self-Employed',
          location: 'Remote',
          startDate: '2022-01-01',
          endDate: '2023-05-01',
          currentlyWorking: false,
          description:
            'Built web solutions for clients using modern technologies like Next.js and Tailwind CSS.',
        },
      ],
    },
    education: [
      {
        institution: 'University of Digital Sciences',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2019-10-01',
        endDate: '2023-09-15',
        currentlyStudying: false,
        description: 'Focused on software engineering, algorithms, and user experience design.',
      },
    ],
    skills: [
      {
        name: 'React',
        proficiency: 'Advanced',
        type: 'Technical',
      },
      {
        name: 'TypeScript',
        proficiency: 'Intermediate',
        type: 'Technical',
      },
      {
        name: 'Problem Solving',
        proficiency: 'Expert',
        type: 'Soft',
      },
      {
        name: 'German',
        proficiency: 'Advanced',
        type: 'Language',
      },
    ],
    projects: [
      {
        name: 'MyPortfolio',
        description:
          'A modern, responsive portfolio website showcasing projects, blog posts, and contact options.',
        links: {
          live: 'https://janedoe.dev',
          git: 'https://github.com/janedoe/myportfolio',
        },
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      },
      {
        name: 'TaskZen',
        description:
          'A minimalist task management app with drag-and-drop support and persistent state syncing.',
        links: {
          live: 'https://taskzen.app',
          git: 'https://github.com/janedoe/taskzen',
        },
        technologies: ['React', 'Redux', 'Firebase', 'Framer Motion'],
      },
    ],
  });
  console.log('🚀 ~ App ~ resumeData:', resumeData);

  const updateResumeData = (data: Partial<ResumeType>) =>
    setResumeData((prevData) => ({ ...prevData, ...data }));

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      <Toaster position="top-center" />
      <SidebarProvider className="w-1/3 h-screen">
        <ControlPanel />
      </SidebarProvider>
    </ResumeContext.Provider>
  );
}

export default App;
