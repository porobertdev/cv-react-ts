import { useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import MobileEditTabs from './components/MobileEditTabs';
import ResumePreview from './components/ResumePreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from './components/ui/alert-dialog';
import { Button } from './components/ui/button';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/sonner';
import ModalProvider from './contexts/ModalContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { useIsMobile } from './hooks/use-mobile';

function App() {
  const isMobile = useIsMobile();
  const [alertIsOpen, setAlertIsOpen] = useState<boolean>(true);

  return (
    <ResumeProvider>
      <Toaster position="top-center" />

      {!isMobile ? (
        <div className="fixed top-8 flex w-screen justify-start gap-4">
          <SidebarProvider className="h-screen w-1/2 flex-col text-left">
            <ModalProvider>
              <ControlPanel />
            </ModalProvider>
          </SidebarProvider>
          <ResumePreview />
        </div>
      ) : (
        <>
          <MobileEditTabs />
          <AlertDialog open={alertIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription className="text-lg">
                  For the best experience, we recommend using the{' '}
                  <span className="font-bold">desktop version</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button size='lg' asChild>
                  <AlertDialogAction onClick={() => setAlertIsOpen(false)}>
                    Continue
                  </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* <Alert>
            <AlertDescription>
              askdksakd
            </AlertDescription>
          </Alert> */}
        </>
      )}
    </ResumeProvider>
  );
}

export default App;
