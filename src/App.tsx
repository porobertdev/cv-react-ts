import './App.css';
import ControlPanel from './components/ControlPanel';
import ResumePreview from './components/ResumePreview';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/sonner';
import ModalProvider from './contexts/ModalContext';
import { ResumeProvider } from './contexts/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <Toaster position="top-center" />
      <div className="fixed top-8 flex w-screen justify-start gap-4">
        <SidebarProvider className="h-screen w-1/2 flex-col text-left">
          <ModalProvider>
            <ControlPanel />
          </ModalProvider>
        </SidebarProvider>
        <ResumePreview />
      </div>
    </ResumeProvider>
  );
}

export default App;
