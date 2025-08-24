'use-client';

import type { ResumeType } from '@/schemas/schemas';
import AboutForm from './AboutForm';
import { Card, CardContent, CardHeader } from './ui/card';
import { Sidebar, SidebarContent, SidebarHeader } from './ui/sidebar';

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
        <AboutForm />
      </CardContent>
    </Card>
  );
}
