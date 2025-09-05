import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import { ProjectSchema, type ProjectType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon, Globe, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardList from './CardList';
import ModalEdit from './ModalEdit';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

const popularTechnologies: string[] = [
  // Web Development (Frontend)
  'React',
  'Vue.js',
  'Angular',
  'Svelte',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Bootstrap',
  'Sass',
  'Vite',
  'Webpack',
  'Next.js',
  'Nuxt.js',
  'Gatsby',

  // Web Development (Backend)
  'Node.js',
  'Express.js',
  'Django',
  'Flask',
  'FastAPI',
  'Ruby on Rails',
  'Spring Boot',
  'ASP.NET Core',
  'PHP',
  'Laravel',
  'NestJS',

  // Databases
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'SQLite',
  'Firebase',
  'Supabase',
  'Redis',
  'MariaDB',

  // Mobile Development
  'React Native',
  'Flutter',
  'Swift',
  'Kotlin',
  'Ionic',
  'Capacitor',

  // Desktop Development
  'Electron',
  'Qt',
  'Tauri',

  // Game Development
  'Unity',
  'Unreal Engine',
  'Godot',
  'Phaser',
  'Three.js',

  // Data Science & Machine Learning
  'Python',
  'Pandas',
  'NumPy',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Jupyter Notebook',
  'R',

  // DevOps & Cloud
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud Platform',
  'Terraform',
  'Ansible',
  'Git',
  'GitHub Actions',
  'Jenkins',

  // Other Tools & Languages
  'Rust',
  'Go',
  'C#',
  'C++',
  'Java',
  'Ruby',
  'Elixir',
  'Haskell',
  'Arduino',
  'Raspberry Pi',
];

export default function ProjectsForm(props) {
  const { resumeData, updateResumeData } = useResume();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { projects } = resumeData;

  const form = useForm<ProjectType>({
    defaultValues: {
      ...(projects
        ? projects[0]
        : {
            name: '',
            description: 'aaaaaaa',
            links: {
              git: '',
              live: '',
            },
            technologies: [],
          }),
    },
    resolver: zodResolver(ProjectSchema),
    mode: 'onChange',
  });

  const { handleEdit } = useModalEdit(form, 'projects');

  // TODO: use useFieldArray hook?
  const formValues = form.getValues();
  console.log('🚀 ~ ProjectsForm ~ formValues:', formValues);

  const addTechnology = (tech: string) => {
    // form.setValue('technologies', [...(formValues.technologies || []), tech]);
    form.reset({
      name: '',
      description: 'aaaaaaa',
      links: {
        git: '',
        live: '',
      },
      technologies: [],
    });

    console.log('🚀 ~ ProjectsForm ~ formValues:', formValues);
    // setIsEditing(false);
  };

  /* const editProject = (index: number) => {
    setIsEditing(true);
    const project = projects[index];
    console.log('🚀 ~ editProject ~ project:', project);
    form.reset(project);
    setEditIndex(index);
    setIsModalOpen(true);
}; */

  useEffect(() => {
    form.reset(projects);
  }, [resumeData]);

  return (
    <>
      {!projects || projects.length === 0 || projects[0].name === '' ? (
        <p className="mb-4">You have no projects. Add one below.</p>
      ) : (
        // PROJECTS LIST
        <ScrollArea>
          {projects.map((project: ProjectType, index: number) => (
            <div key={project.id || `project-${index}`} className="mb-4">
              <CardList
                {...{
                  onClick: () => handleEdit(index, form, 'projects'),
                  title: project.name,
                  content: <span className="text-xs text-muted-foreground"></span>,
                  // footer: (
                  //   <Button variant="ghost" onClick={() => handleEdit(index)}>
                  //     <Pencil />
                  //   </Button>
                  // ),
                }}
              />
            </div>
          ))}
        </ScrollArea>
      )}

      <ModalEdit
        formData={{
          form: form,
          key: 'projects',
          resetFields: {
            name: '',
            description: '',
            links: {
              git: '',
              live: '',
            },
            technologies: [],
          },
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="YouTube Clone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            console.log('🚀 ~ field:', field);

            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    {...field}
                    placeholder="A full-stack project built with React and Express."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* LINKS */}
        <FormField
          control={form.control}
          name="links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <FormField
                    name="links.git"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel>
                          <GithubIcon size={20} />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="https://www.github.com/youtube-clone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="links.live"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel>
                          {' '}
                          <Globe size={20} />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="https://www.youtube-clone.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TECHNOLOGIES */}
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <FormField
                  name="technologies.0"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Card className="bg-muted">
                          <CardContent className="flex items-center gap-4 max-w-full">
                            <div className="flex gap-2 flex-wrap">
                              {formValues.technologies.length > 0 &&
                                formValues.technologies?.map((tech: string) => (
                                  <Badge
                                    //  variant='secondary'

                                    className="py-2 rounded-lg bg-white text-primary shadow-md border-1 border-gray-300"
                                    key={tech}
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                  {/* <Input
                                    type="text"
                                    {...field}
                                    // onChange={() => {}}
                                    placeholder="Type"
                                  /> */}
                                  <Button size="icon">
                                    <PlusCircle />
                                  </Button>
                                </PopoverTrigger>

                                {/* CONTENT */}
                                <PopoverContent>
                                  <Command>
                                    <CommandInput placeholder="Select technology..." />
                                    <CommandList>
                                      <CommandEmpty>No results found.</CommandEmpty>
                                      <CommandGroup>
                                        {popularTechnologies
                                          .filter((tech: string) => {
                                            console.log('zzzzzz', field.value);
                                            return !formValues.technologies?.includes(tech);
                                          })
                                          .map((tech: string) => (
                                            <CommandItem
                                              key={tech}
                                              onSelect={(value) => {
                                                addTechnology(value);

                                                setIsPopoverOpen(false);
                                              }}
                                            >
                                              {tech}
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </CardContent>
                        </Card>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </ModalEdit>
    </>
  );
}
