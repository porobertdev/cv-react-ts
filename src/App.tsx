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
      fName: '',
      lName: '',
      city: '',
      country: '',
      intro: '',
    },
    contact: {
      email: '',
      phone: '',
      socialLinks: [],
    },
    experience: {
      jobs: [
        /* {
        id: '',
        jobTitle: '',
        company: '',
        location: '',
        startDate: new Date(),
        endDate: '',
        isCurrent: false,
        description: '',
      }, */
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
        {
          id: '',
          jobTitle: 'Software Developer',
          company: 'PxlSpark',
          location: 'Remote',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-08-01'),
          isCurrent: false,
          description: 'This was a fucking super awesome duper super job. Working for myself, duh!',
        },
      ],
    },
    education: [
      {
        institution: 'The Almighty University',
        degree: 'graduate',
        fieldOfStudy: 'IT',
        startDate: '2020-07-19',
        endDate: '2024-06-10',
        description: 'Very cool university.',
        currentlyStudying: false,
      },
    ],
    skills: [
      {
        name: 'React',
        proficiency: 'Beginner',
        type: 'Technical',
      },
    ],
    projects: [
      {
        name: 'Resume Builder',
        description:
          'A plain web app that can generate resumes featuring templates, live preview and an intuitive interface.',
        links: {
          git: 'https://github.com/porobertdev/cv-odin-react-ts',
          live: 'https://resumebuilder.porobert.dev',
        },
        technologies: ['React', 'TypeScript', 'Shadcn/ui', 'React Hook Form'],
      },
    ],
  });
  console.log('🚀 ~ App ~ resumeData:', resumeData);

  const updateResumeData = (data: Partial<ResumeType>) =>
    setResumeData((prevData) => ({ ...prevData, ...data }));

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      <Toaster position="top-center" />
      <SidebarProvider className='w-1/3 h-screen'>
        <ControlPanel />
      </SidebarProvider>
    </ResumeContext.Provider>
  );
}

export default App;
