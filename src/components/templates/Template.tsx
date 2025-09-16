import { useResume } from '@/contexts/ResumeContext';
import { ScrollArea } from '../ui/scroll-area';
import ClassicTemplate from './ClassicTemplate';
import DefaultTemplate from './DefaultTemplate';

interface Template {
  name: 'default' | 'classic';
}

const templates = {
  default: DefaultTemplate,
  classic: ClassicTemplate,
};

export default function Template({ name }: Template) {
  const { resumeData, pdf } = useResume();

  const Template = templates[name];

  return (
    <ScrollArea>
      <div className="mr-4 h-[5rem] origin-top scale-95">
        <div className="p-0.5 shadow-2xl">
          <div ref={pdf.ref}>
            <style>
              {`@page { size: A4 portrait; margin: 0; }
      @media print {
        html, body {
          height: 100%;
          overflow: visible !important;
        }
        
      }`}
            </style>
            <Template {...resumeData} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
