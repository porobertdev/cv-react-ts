import { useResume } from '@/contexts/ResumeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { DownloadIcon, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ActionPanel() {
  const { pdf, resetData } = useResume();
  const isMobile = useIsMobile();

  return (
    <Card className="p-2 md:mb-8 md:flex  m-auto w-full md:m-0">
      <CardContent className="flex justify-center gap-4 p-0 md:flex-col">
        <Button
          variant="secondary"
          className="h-12 w-12 cursor-pointer rounded-full md:h-10 md:w-10"
          onClick={() => pdf.print()}
        >
          {/* don't show tooltip on mobile */}
          {!isMobile ? (
            <Tooltip>
              <TooltipTrigger>
                <DownloadIcon className={cn(isMobile && 'h-full! w-full!')} />
              </TooltipTrigger>
              <TooltipContent className="mb-4">
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DownloadIcon className={cn(isMobile && 'h-full! w-full!')} />
          )}
        </Button>

        <Button
          variant="secondary"
          className="h-12 w-12 rounded-full md:h-10 md:w-10"
          onClick={() => resetData()}
        >
          {/* don't show tooltip on mobile */}

          {!isMobile ? (
            <Tooltip>
              <TooltipTrigger>
                <RotateCcw className={cn(isMobile && 'h-full! w-full!')} />
              </TooltipTrigger>
              <TooltipContent className="mb-4">
                <p>Reset resume data</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <RotateCcw className={cn(isMobile && 'h-full! w-full!')} />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
