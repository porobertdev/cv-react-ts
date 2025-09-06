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
import { GithubIcon, Globe, PlusCircle, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardList from '../CardList';
import ModalEdit from '../ModalEdit';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

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

export default function ProjectsForm() {
  const { resumeData } = useResume();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { projects } = resumeData;

  const form = useForm<ProjectType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      ...projects?.[0],
    },
    mode: 'onChange',
  });

  const { handleEdit } = useModalEdit({ form, key: 'projects' });

  // TODO: use useFieldArray hook?
  const formValues = form.getValues();
  console.log('🚀 ~ ProjectsForm ~ formValues:', formValues);

  const addTechnology = (tech: string) => {
    form.setValue('technologies', [...(formValues.technologies || []), tech]);

    console.log('🚀 ~ ProjectsForm ~ formValues:', formValues);
  };

  const removeTechnology = (tech: string) => {
    form.setValue(
      'technologies',
      formValues.technologies?.filter((t) => t !== tech),
    );

    // trigger form re-rendering to show the updated list of tech tags
    form.trigger();
  };

  useEffect(() => {
    form.reset(projects?.[0]);
  }, [resumeData, form, projects]);

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
                  onClick: () => handleEdit(index, { form, key: 'projects' }),
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
            /*
             if it's empty, then we get 'undefined' as first item,
             and renders an empty div, failing form validation too.
            */
            technologies: ['React'],
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
          render={() => (
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
          render={() => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <FormField
                  name="technologies.0"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Card className="bg-inherit shadow-none border-none p-0">
                          <CardContent className="flex items-center p-0 gap-4 max-w-full">
                            <div className="flex gap-2 flex-wrap">
                              {formValues.technologies &&
                                formValues.technologies?.map((tech: string) => (
                                  <Badge
                                    variant="secondary"
                                    className="py-2 rounded-lg shadow-md border-1 border-gray-300"
                                    key={tech}
                                    onClick={() => removeTechnology(tech)}
                                  >
                                    {tech}
                                    <Button className='p-0! m-0! bg-inherit text-black hover:bg-inherit hover:text-primary h-max'>
                                      <XIcon  />
                                    </Button>
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
