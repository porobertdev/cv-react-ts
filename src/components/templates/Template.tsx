import { ResumeContext } from '@/App';
import { useContext } from 'react';
import DefaultTemplate from './DefaultTemplate';

interface Template {
  name: 'default';
}

const templates = {
  default: DefaultTemplate,
};

export default function Template({ name }: Template) {
  const { resumeData } = useContext(ResumeContext);

  const Template = templates[name];

  return (
    <div className="shadow-2xl p-0.5">
      <Template {...resumeData} />
    </div>
  );
}
