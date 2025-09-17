import ModalProvider from '@/contexts/ModalContext';
import ActionPanel from './ActionPanel';
import ControlPanel from './ControlPanel';
import ResumePreview from './ResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function MobileEditTabs() {
  return (
    <Tabs defaultValue="edit" orientation="horizontal" className="fixed top-0 w-full">
      <TabsList className="h-full w-full flex-col gap-4 bg-inherit p-2 md:p-0">
        <div className="bg-card flex w-full gap-4">
          <div className="w-full">
            <TabsTrigger value="edit" className="w-full">
              Edit
            </TabsTrigger>
          </div>
          <div className="w-full">
            <TabsTrigger value="preview" className="w-full">
              Preview
            </TabsTrigger>
          </div>
          <ActionPanel />
        </div>

        <TabsContent value="edit" className="w-full bg-none">
          <ModalProvider>
            <ControlPanel />
          </ModalProvider>
        </TabsContent>
        <TabsContent value="preview">
          <ResumePreview />
        </TabsContent>
    </TabsList>
    </Tabs>
  );
}
