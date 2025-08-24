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
  const [resumeData, setResumeData] = useState<Partial<ResumeType>>({});
  console.log('🚀 ~ App ~ resumeData:', resumeData);

  // const updateResumeData = (data) => setResumeData({ ...resumeData, ...data });
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
