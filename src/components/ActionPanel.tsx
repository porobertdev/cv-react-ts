import { useResume } from '@/contexts/ResumeContext';
import { DownloadIcon, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ActionPanel() {
  const { pdf, resetData } = useResume();

  return (
    <Card className="p-2 mb-8">
      <CardContent className="p-0 flex flex-col gap-4">
        <Button
          variant="secondary"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => pdf.print()}
        >
          <Tooltip>
            <TooltipTrigger>
              <DownloadIcon />
            </TooltipTrigger>
            <TooltipContent className="mb-4">
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        </Button>
        <Button variant="secondary" className="w-10 h-10 rounded-full" onClick={() => resetData()}>
          <Tooltip>
            <TooltipTrigger>
              <RotateCcw />
            </TooltipTrigger>
            <TooltipContent className="mb-4">
              <p>Reset resume data</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </CardContent>
    </Card>
  );
}
