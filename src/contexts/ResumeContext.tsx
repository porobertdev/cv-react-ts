import { DEFAULT_RESUME_DATA } from '@/constants/constants';
import type { ResumeType } from '@/schemas/schemas';
import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, useContext } from 'react';

export interface ResumeContextType {
  resumeData: Partial<ResumeType>;
  updateResumeData: (data: Partial<ResumeType>) => void;
}

interface ResumeProviderProps {
  children: React.ReactNode;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
};

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useLocalStorage<Partial<ResumeType>>(
    'resumeData',
    DEFAULT_RESUME_DATA,
  );

  console.log('🚀 ~ ResumeProvider ~ resumeData:', resumeData);

  // useEffect(() => setLocalData(resumeData), [resumeData]);

  const updateResumeData = (data: Partial<ResumeType>) => {
    setResumeData((prevData) => ({ ...prevData, ...data }));
  };
  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
