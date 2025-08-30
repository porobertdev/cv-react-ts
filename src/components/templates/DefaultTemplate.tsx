import type { ResumeType } from '@/schemas/schemas';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

export default function DefaultTemplate(data: ResumeType) {
  const { about, contact, experience, education, skills, projects } = data;

  return (
    <Card className="p-0 flex-row gap-0 default-template rounded-none">
      {/* LEFT */}
      <Card className="w-1/2 p-0 border-none shadow-none gap-0">
        {/* TOP */}
        <CardHeader className="p-0 h-max gap-0">
          <img src={about?.profilePic} alt="profile pic" />
        </CardHeader>
        {/* BOTTOM */}
        <CardFooter className="bg-card-foreground items-start text-card !h-full">
          <CardContent className="p-4 mt-10">
            <div className="flex flex-col gap-8">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                <p>
                  E-mail: <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
                </p>
                <p>
                  Tel: <a href={`tel:${contact?.phone}`}>{contact?.phone}</a>
                </p>
                {contact?.phone}
                {/* links */}
                {contact?.socialLinks?.map((link) => (
                  <p key={link.platform}>
                    {link.platform}:
                    <br />
                    <a href={link.url}>{link.url}</a>
                  </p>
                ))}
              </div>

              <div className="text-left">
                <h2 className="text-3xl font-bold mb-4">References</h2>
              </div>

              <div className="text-left">
                <h2 className="text-3xl font-bold mb-4">Skills</h2>

                <ul className="list-disc px-4">
                  {skills?.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </CardFooter>
      </Card>

      {/* RIGHT */}
      <Card className="w-full text-left p-0 border-none bg-muted shadow-none px-4 py-8 rounded-none">
        <CardHeader className="flex flex-col gap-8">
          <h1 className="text-6xl mt-10 font-bold">
            {about.fName} {about.lName}
          </h1>

          {about.position && (
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-xl font-light">{about.position.toUpperCase()}</h2>
              <Separator className="h-1.5! bg-card-foreground" />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-14">
          <div className="summary flex gap-12">
            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Personal Summary</h2>
              <p>{about.intro}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Main Competencies</h3>
              <ul className="list-disc px-4">
                {skills?.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="experience">
            <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>

            <div className="jobs-list flex flex-col gap-8">
              {experience.jobs.map((job) => (
                <div key={job.jobTitle} className="flex gap-12">
                  <div className="w-1/2 flex flex-col gap-4">
                    <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                    <p className="italic">
                      {job.company}
                      <br />
                      {job.startDate} - {job.endDate}
                      <br />
                    </p>
                  </div>
                  {/* job tasks */}
                  <p>{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="education">
            <h2 className="text-3xl font-bold mb-4">Academic Background</h2>

            <div className="jobs-list flex flex-col gap-8">
              {education.map((item) => (
                <div key={item.institution} className="flex gap-12">
                  <div className="w-1/2 flex flex-col gap-4">
                    <h3 className="text-xl font-bold">{item.institution}</h3>
                    <p className="italic">
                      {item.fieldOfStudy}
                      <br />
                      {item.startDate} - {item.endDate}
                      <br />
                    </p>
                  </div>
                  {/* job tasks */}
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
