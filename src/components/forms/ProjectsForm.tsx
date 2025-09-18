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
import { ProjectSchema, ProjectTypeEnum, type ProjectType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon, Globe, PlusCircle, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardList from '../CardList';
import ModalEdit from '../ModalEdit';
import { SortableItem } from '../SortableItem';
import { SortableList } from '../SortableList';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
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
  const formValues = form.watch();
  console.log('🚀 ~ ProjectsForm ~ formValues:', formValues);
  const { technologies } = formValues;

  const addTechnology = (tech: string) => {
    form.setValue('technologies', [...(technologies || []), tech]);
  };

  const removeTechnology = (tech: string) => {
    form.setValue(
      'technologies',
      technologies?.filter((t) => t !== tech),
    );
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
                  content: (
                    <span className="text-muted-foreground text-xs italic">{project.type}</span>
                  ),
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

        {/* PROJECT TYPE */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {field.value || 'Select type'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {Object.values(ProjectTypeEnum.enum).map((type) => (
                        <DropdownMenuItem key={type} onSelect={() => field.onChange(type)}>
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
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
                <Card className="border-none bg-inherit p-0 shadow-none">
                  <CardContent className="flex max-w-full items-center gap-4 p-0">
                    {technologies && (
                      <SortableList
                        items={technologies}
                        onChange={(newOrder) => form.setValue('technologies', newOrder)}
                        strategy="horizontal"
                      >
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <SortableItem key={tech} id={tech}>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 rounded-lg border-1 border-gray-300 py-2 shadow-md"
                              >
                                {tech}
                                <Button
                                  type="button"
                                  className="hover:text-primary m-0 h-max bg-inherit p-0 text-black hover:bg-inherit"
                                  onClick={() => removeTechnology(tech)}
                                >
                                  <XIcon />
                                </Button>
                              </Badge>
                            </SortableItem>
                          ))}

                          {/* Add button */}
                          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                              <Button size="icon">
                                <PlusCircle />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <Command>
                                <CommandInput placeholder="Select technology..." />
                                <CommandList>
                                  <CommandEmpty>No results found.</CommandEmpty>
                                  <CommandGroup>
                                    {popularTechnologies
                                      .filter((tech) => !technologies?.includes(tech))
                                      .map((tech) => (
                                        <CommandItem
                                          key={tech}
                                          onSelect={() => {
                                            addTechnology(tech);
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
                      </SortableList>
                    )}
                  </CardContent>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </ModalEdit>
    </>
  );
}
