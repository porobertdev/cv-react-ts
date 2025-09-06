import type { ResumeType } from '@/schemas/schemas';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

export default function DefaultTemplate(data: ResumeType) {
  const { about, contact, experience, education, skills } = data;
  console.log('🚀 ~ DefaultTemplate ~ experience:', experience);

  return (
    <Card className="default-template flex-row gap-0 rounded-none p-0">
      {/* LEFT */}
      <Card className="w-1/2 gap-0 border-none p-0 shadow-none">
        {/* TOP */}
        <CardHeader className="h-max gap-0 p-0">
          <img src={about?.profilePic} alt="profile pic" />
        </CardHeader>
        {/* BOTTOM */}
        <CardFooter className="bg-card-foreground text-card !h-full items-start">
          <CardContent className="mt-10 p-4">
            <div className="flex flex-col gap-8">
              <div className="text-left">
                <h2 className="mb-4 text-3xl font-bold">Contact</h2>
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
                <h2 className="mb-4 text-3xl font-bold">References</h2>
              </div>

              <div className="text-left">
                <h2 className="mb-4 text-3xl font-bold">Skills</h2>

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
      <Card className="bg-muted w-full rounded-none border-none p-0 px-4 py-8 text-left shadow-none">
        <CardHeader className="flex flex-col gap-8">
          <h1 className="mt-10 text-6xl font-bold">
            {about.fName} {about.lName}
          </h1>

          {about.position && (
            <div className="flex w-full flex-col gap-4">
              <h2 className="text-xl font-light">{about.position.toUpperCase()}</h2>
              <Separator className="bg-card-foreground h-1.5!" />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-14">
          <div className="summary flex gap-12">
            <div className="flex w-1/2 flex-col gap-4">
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
            <h2 className="mb-4 text-3xl font-bold">Professional Experience</h2>

            <div className="jobs-list flex flex-col gap-8">
              {experience?.map((job) => (
                <div key={job.jobTitle} className="flex gap-12">
                  <div className="flex w-1/2 flex-col gap-4">
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
            <h2 className="mb-4 text-3xl font-bold">Academic Background</h2>

            <div className="jobs-list flex flex-col gap-8">
              {education.map((item) => (
                <div key={item.institution} className="flex gap-12">
                  <div className="flex w-1/2 flex-col gap-4">
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
