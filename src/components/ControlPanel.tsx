'use-client';

import { Briefcase, FolderGit2, GraduationCap, Mail, Sparkles, User2 } from 'lucide-react';
import ActionPanel from './ActionPanel';
import AutoSaveBadge from './AutoSaveBadge';
import AboutForm from './forms/AboutForm';
import ContactForm from './forms/ContactForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
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
        className="!w-full !h-full"
        // size={20} width={20} height={20}
      />
    ),
  },
  { value: 'contact', label: 'Contact', icon: <Mail className="!w-full !h-full" /> },
  { value: 'experience', label: 'Experience', icon: <Briefcase className="!w-full !h-full" /> },
  { value: 'education', label: 'Education', icon: <GraduationCap className="!w-full !h-full" /> },
  { value: 'skills', label: 'Skills', icon: <Sparkles className="!w-full !h-full" /> },
  { value: 'projects', label: 'Projects', icon: <FolderGit2 className="!w-full !h-full" /> },
];

function TabTitle(props: { title: string }) {
  return (
    <>
      <AutoSaveBadge />
      <CardTitle className="text-3xl text-left mb-4">{props.title}</CardTitle>
      <Separator className="mb-8" />
    </>
  );
}

export default function ControlPanel() {
  return (
    /*     <Sidebar
    className=' px-4'
    >
      <SidebarHeader title="Sidebar Title" />
      <SidebarContent>
        <AboutForm />
      </SidebarContent>
    </Sidebar> */
    <>
      {/*    <Card className="p-2 mb-8">
        <CardContent className="p-0">
          <Button
            // variant='secondary'
            className="w-10 h-10 "
          >
            <DownloadIcon />
          </Button>
        </CardContent>
      </Card> */}
      <Tabs
        defaultValue="about"
        orientation="vertical"
        className="w-full"
        //  activationMode='automatic'
      >
        <div className="flex gap-4 h-screen">
          <div className="flex flex-col gap-4">
            <TabsList className="px-2 py-2 shadow-sm justify-center flex-col gap-6 bg-white h-max">
              {tabItems.map(({ value, label, icon }) => (
                <TabsTrigger
                  key={value}
                  className="p-2 w-10 h-10 rounded-full hover:bg-primary hover:text-accent transition-all duration-200 data-[state=active]:bg-primary! data-[state=active]:text-accent! hover:scale-110"
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

          {/* TAB CONTENT */}
          <Card className="w-full">
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
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </Tabs>
    </>
  );
}
