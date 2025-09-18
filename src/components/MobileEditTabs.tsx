import ModalProvider from '@/contexts/ModalContext';
import ActionPanel from './ActionPanel';
import ControlPanel from './ControlPanel';
import ResumePreview from './ResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function MobileEditTabs() {
  return (
    <Tabs defaultValue="edit" orientation="horizontal" className="fixed top-0 w-full">
      <TabsList className="h-full w-full flex-col gap-4 bg-inherit p-2 md:p-0">
        <div className="bg-card flex w-full">
          <div className="w-full">
            <TabsTrigger value="edit" className="w-full p-2">
              Edit
            </TabsTrigger>
          </div>
          <div className="w-full">
            <TabsTrigger value="preview" className="w-full p-2">
              Preview
            </TabsTrigger>
          </div>
        </div>

        <TabsContent value="edit" className="w-full bg-none">
          <ModalProvider>
            <ControlPanel />
          </ModalProvider>
        </TabsContent>
        <TabsContent value="preview" className='flex flex-col gap-4'>
            <ActionPanel />
            <ResumePreview />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
}
