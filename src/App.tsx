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
  });
  console.log('🚀 ~ App ~ resumeData:', resumeData);

  const updateResumeData = (data: Partial<ResumeType>) =>
    setResumeData((prevData) => ({ ...prevData, ...data }));

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      <Toaster position="top-center" />
      <SidebarProvider>
        <ControlPanel />
      </SidebarProvider>
    </ResumeContext.Provider>
  );
}

export default App;
