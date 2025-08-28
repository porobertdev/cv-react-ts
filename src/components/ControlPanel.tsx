'use-client';

import type { ResumeType } from '@/schemas/schemas';
import AboutForm from './AboutForm';
import ContactForm from './ContactForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import { Card, CardContent, CardHeader } from './ui/card';
import { Sidebar, SidebarContent, SidebarHeader } from './ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
    <Card className="h-max">
      <CardHeader />
      <CardContent>
        <Tabs defaultValue="skills">
          <TabsList className="mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AboutForm />
          </TabsContent>
          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceForm />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
