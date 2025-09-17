'use-client';

import { useResume } from '@/contexts/ResumeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Settings,
  Sparkles,
  User2,
} from 'lucide-react';
import ActionPanel from './ActionPanel';
import AutoSaveBadge from './AutoSaveBadge';
import AboutForm from './forms/AboutForm';
import ContactForm from './forms/ContactForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import SettingsForm from './forms/SettingsForm';
import SkillsForm from './forms/SkillsForm';
import { Card, CardContent, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const tabItems = [
  {
    value: 'about',
    label: 'About',
    icon: (
      <User2
        className="!h-full !w-full"
        // size={20} width={20} height={20}
      />
    ),
  },
  { value: 'contact', label: 'Contact', icon: <Mail className="!h-full !w-full" /> },

  { value: 'experience', label: 'Experience', icon: <Briefcase className="!h-full !w-full" /> },
  { value: 'education', label: 'Education', icon: <GraduationCap className="!h-full !w-full" /> },
  { value: 'skills', label: 'Skills', icon: <Sparkles className="!h-full !w-full" /> },
  { value: 'projects', label: 'Projects', icon: <FolderGit2 className="!h-full !w-full" /> },
  { value: 'settings', label: 'Settings', icon: <Settings className="!h-full !w-full" /> },
];

function TabTitle(props: { title: string }) {
  return (
    <>
      <AutoSaveBadge />
      <CardTitle className="mb-4 text-left text-3xl">{props.title}</CardTitle>
      <Separator className="mb-8" />
    </>
  );
}

export default function ControlPanel() {
  const { activeEditTab, setActiveEditTab } = useResume();

  const isMobile = useIsMobile();

  return (
    <Tabs
      defaultValue={activeEditTab}
      orientation="vertical"
      className="w-full"
      onValueChange={(tab) => setActiveEditTab(tab)}
      //  activationMode='automatic'
    >
      <div className="flex h-screen flex-col gap-4 md:flex-row">
        {!isMobile && (
          <div className="flex flex-col gap-4">
            <TabsList className="h-max w-full justify-center gap-2 bg-white px-2 py-2 shadow-sm md:flex-col md:gap-6">
              {tabItems.map(({ value, label, icon }) => (
                <TabsTrigger
                  key={value}
                  className="hover:bg-primary hover:text-accent data-[state=active]:bg-primary! data-[state=active]:text-accent! h-10 w-10 rounded-full p-2 transition-all duration-200 hover:scale-110"
                  value={value}
                >
                  <Tooltip>
                    <TooltipTrigger>{icon}</TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
              ))}
            </TabsList>
            <ActionPanel />
          </div>
        )}

        {/* TAB CONTENT */}
        <Card className="h-screen w-full text-left">
          {/* <CardHeader>
          </CardHeader> */}
          <ScrollArea>
            <CardContent className="h-[30rem]">
              <TabsContent value="about">
                <TabTitle title="About" />
                <AboutForm />
              </TabsContent>

              <TabsContent value="contact">
                <TabTitle title="Contact" />
                <ContactForm />
              </TabsContent>

              <TabsContent value="experience">
                <TabTitle title="Experience" />
                <ExperienceForm />
              </TabsContent>

              <TabsContent value="education">
                <TabTitle title="Education" />
                <EducationForm />
              </TabsContent>

              <TabsContent value="skills">
                <TabTitle title="Skills" />
                <SkillsForm />
              </TabsContent>

              <TabsContent value="projects">
                <TabTitle title="Projects" />
                <ProjectsForm />
              </TabsContent>

              <TabsContent value="settings">
                <TabTitle title="Settings" />
                <SettingsForm />
              </TabsContent>
            </CardContent>
          </ScrollArea>
        </Card>

        <div className="fixed bottom-0 flex w-full flex-col gap-4 md:hidden">
          <TabsList className="h-max w-full justify-center gap-2 bg-white px-2 py-2 shadow-sm md:flex-col md:gap-6">
            {tabItems.map(({ value, icon }) => (
              <TabsTrigger
                key={value}
                className="hover:bg-primary hover:text-accent data-[state=active]:bg-primary! data-[state=active]:text-accent! h-10 w-10 rounded-full p-2 transition-all duration-200 hover:scale-110"
                value={value}
              >
                {icon}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
}
