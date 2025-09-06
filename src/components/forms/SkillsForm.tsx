import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import { SkillLevelEnum, SkillSchema, SkillTypeEnum, type SkillType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CardList from '../CardList';
import ModalEdit from '../ModalEdit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export default function SkillsForm() {
  const { resumeData } = useResume();
  const { skills } = resumeData;

  const form = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: skills?.[0],
    mode: 'onChange',
  });

  const { handleEdit } = useModalEdit({ form, key: 'skills' });

  useEffect(() => {
    form.reset(skills?.[0]);
  }, [resumeData, form, skills]);

  return (
    <>
      {/* SKILL LIST */}
      <div className="flex flex-col gap-4">
        {Object.values(SkillTypeEnum.enum).map((type) => (
          <Accordion type="single" collapsible key={type}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{type}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {skills &&
                  skills.length > 0 &&
                  skills
                    .filter((skill: SkillType) => skill.type === type)
                    .map((skill: SkillType) => {
                      const index = skills.findIndex((item) => item.name === skill.name);

                      return (
                        <div key={skill.id || `skill-${index}`}>
                          {/* <div className="flex justify-between items-center"> */}
                          <CardList
                            {...{
                              onClick: () => handleEdit(index, { form, key: 'skills' }),
                              title: skill.name,
                              content: (
                                <span className="text-xs text-muted-foreground italic text-left">
                                  {skill.proficiency}
                                </span>
                              ),
                            }}
                          />
                          {/* </div> */}
                        </div>
                      );
                    })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      <ModalEdit
        formData={{
          form: form,
          key: 'skills',
          resetFields: {
            name: '',
            proficiency: 'Beginner',
            type: 'Technical',
          },
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Proficiency <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {field.value || 'Select proficiency'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {Object.values(SkillLevelEnum.enum).map((level) => (
                        <DropdownMenuItem key={level} onSelect={() => field.onChange(level)}>
                          {level}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {field.value || 'Select skill type'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {Object.values(SkillTypeEnum.enum).map((type) => (
                        <DropdownMenuItem key={type} onSelect={() => field.onChange(type)}>
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </ModalEdit>
    </>
  );
}
