import type { ResumeType } from '@/schemas/schemas';
import { Link } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

export default function ClassicTemplate(data: ResumeType) {
  const { about, contact, experience, education, skills, projects } = data;

  return (
    <Card className="rounded-none border-none p-4 shadow-none">
      <CardHeader className="justify-center gap-4">
        <h1 className="text-center text-4xl">
          {about?.fName} {about?.lName}
        </h1>

        {/* contact */}
        <div className="flex gap-4 text-sm">
          <p>
            <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
          </p>
          <p>
            <a href={`tel:${contact?.phone}`}>{contact?.phone}</a>
          </p>{' '}
        </div>

        {/* social links */}
        <ul className="flex justify-center gap-4 text-sm">
          {contact?.socialLinks?.map((link) => (
            <li key={link.platform}>
              <a href={link.url} className="flex items-center gap-1">
                <Link width={15} height={15} className="text-primary" />
                {link.platform}
              </a>
            </li>
          ))}
        </ul>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 text-left">
        {/* experience */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Experience</h2>
            <Separator className="bg-foreground" />
          </div>

          {experience?.map((exp) => (
            <div key={exp.id || exp.company} className="flex flex-col gap-2">
              {/* company & dates */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="font-bold">{exp.company}</p>
                  <p className="text-sm italic">{exp.jobTitle}</p>
                </div>

                <div className="flex flex-col text-center text-sm">
                  <p className="font-bold">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="italic">{exp.location}</p>
                </div>
              </div>

              {/* job info */}
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* projects */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Projects</h2>
            <Separator className="bg-foreground" />
          </div>

          {projects?.map((proj) => (
            <div key={proj.id || proj.name}>
              {/* company & dates */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="font-bold">{proj.name}</p>
                  <p className="italic">{proj.type}</p>
                </div>

                <div className="flex gap-4 text-sm">
                  <a href={proj.links.live} className="flex items-center gap-1 font-bold">
                    <Link width={15} height={15} className="text-primary" />
                    Live
                  </a>
                  {/* github */}
                  <a href={proj.links.git} className="flex items-center gap-1 font-bold">
                    <Link width={15} height={15} className="text-primary" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* project info */}
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </div>

        {/* technical skills */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Technical Skills</h2>
          <Separator className="bg-foreground" />

          <ul className="text-sm">
            {[...new Set(skills?.map((skill) => skill.type))].map((type) => (
              <li key={type}>
                <span className="font-bold">{type}:</span>{' '}
                {skills
                  ?.filter((item) => item.type === type)
                  .map((skill) => skill.name)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </div>

        {/* education */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Education</h2>
          <Separator className="bg-foreground" />

          {education?.map((edu) => (
            <div className="flex justify-between" key={edu.id || edu.institution}>
              <div>
                <p className="font-bold">{edu.institution}</p>
                <p className="text-sm italic">{edu.degree}</p>
              </div>

              <div>
                <p className="text-sm font-bold">
                  {edu.startDate} - {edu.endDate}
                </p>

                {/* TODO: implement GDPA property?? */}
                {/* <p className="italic"></p> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
