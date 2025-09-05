import { DEFAULT_RESUME_DATA } from '@/constants/constants';
import type { ResumeType } from '@/schemas/schemas';
import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export interface ResumeContextType {
  resumeData: Partial<ResumeType>;
  updateResumeData: (data: Partial<ResumeType>) => void;
  pdf: {
    ref: React.RefObject<HTMLDivElement | null>;
    print: () => void;
  };
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
};

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeData, setResumeData] = useLocalStorage<Partial<ResumeType>>(
    'resumeData',
    DEFAULT_RESUME_DATA,
  );
  console.log('🚀 ~ ResumeProvider ~ resumeData:', resumeData);

  // PDF download
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    contentRef,
    documentTitle: `CV_${resumeData.about?.fName}_${resumeData.about?.lName}`,
  });

  const updateResumeData = (data: Partial<ResumeType>) => {
    setResumeData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        pdf: {
          ref: contentRef,
          print,
        },
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
