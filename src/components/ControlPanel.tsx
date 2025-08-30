'use-client';

import type { ResumeType } from '@/schemas/schemas';
import { Briefcase, FolderGit2, GraduationCap, Mail, Sparkles, User2 } from 'lucide-react';
import AboutForm from './AboutForm';
import ContactForm from './ContactForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Sidebar, SidebarContent, SidebarHeader } from './ui/sidebar';
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

export default function ControlPanel(props) {
  return (
    /*     <Sidebar
    className=' px-4'
    >
      <SidebarHeader title="Sidebar Title" />
      <SidebarContent>
        <AboutForm />
      </SidebarContent>
    </Sidebar> */
    <Tabs
      defaultValue="about"
      orientation="vertical"
      className="w-full"
      //  activationMode='automatic'
    >
      <div className="flex gap-8  h-max">
        <TabsList className="mb-8 flex-col justify-center  gap-6 bg-white h-max">
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

        {/* TAB CONTENT */}
        <Card className="h-max w-full">
          {/* <CardHeader>
          </CardHeader> */}
          <CardContent>
            <TabsContent value="about">
              <CardTitle className="text-3xl text-left mb-4">About</CardTitle>
              <Separator className="mb-8" />
              <AboutForm />
            </TabsContent>
            <TabsContent value="contact">
              <CardTitle className="text-3xl text-left mb-4">Contact</CardTitle>
              <Separator className="mb-8" />
              <ContactForm />
            </TabsContent>
            <TabsContent value="experience">
              <CardTitle className="text-3xl text-left mb-4">Experience</CardTitle>
              <Separator className="mb-8" />

              <ExperienceForm />
            </TabsContent>
            <TabsContent value="education">
              <CardTitle className="text-3xl text-left mb-4">Education</CardTitle>
              <Separator className="mb-8" />
              <EducationForm />
            </TabsContent>
            <TabsContent value="skills">
              <CardTitle className="text-3xl text-left mb-4">Skills</CardTitle>
              <Separator className="mb-8" />
              <SkillsForm />
            </TabsContent>
            <TabsContent value="projects">
              <CardTitle className="text-3xl text-left mb-4">Projects</CardTitle>
              <Separator className="mb-8" />
              <ProjectsForm />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}
