import { useResume } from '@/contexts/ResumeContext';
import { ScrollArea } from '../ui/scroll-area';
import DefaultTemplate from './DefaultTemplate';

interface Template {
  name: 'default';
}

const templates = {
  default: DefaultTemplate,
};

export default function Template({ name }: Template) {
  const { resumeData, pdf } = useResume();

  const Template = templates[name];

  return (
    <ScrollArea>
      <div className="scale-95 origin-top mr-4 h-[5rem]">
        <div className="shadow-2xl p-0.5">
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
