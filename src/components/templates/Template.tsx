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
  const { resumeData } = useResume();

  const Template = templates[name];

  return (
    <ScrollArea>
      <div className="scale-95 origin-top mr-4 h-[5rem]">
        <div className="shadow-2xl p-0.5">
          <Template {...resumeData} />
        </div>
      </div>
    </ScrollArea>
  );
}
