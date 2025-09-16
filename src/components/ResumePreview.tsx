import { useResume } from '@/contexts/ResumeContext';
import Template from './templates/Template';

export default function ResumePreview() {
  const { resumeData } = useResume();

  return <Template name={resumeData.settings?.name} />;
}
