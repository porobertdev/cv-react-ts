import { ResumeContext } from '@/App';
import { SkillLevelEnum, SkillSchema, SkillTypeEnum, type SkillType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import CardList from './CardList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export default function SkillsForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<{
    skills: SkillType[];
  }>({
    resolver: zodResolver(
      z.object({
        skills: z.array(SkillSchema),
      }),
    ),
    defaultValues: {
      skills: resumeData.skills || [],
    },
    mode: 'onChange',
  });

  const {
    fields: skillFields,
    remove,
    append,
    update,
  } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const modalForm = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      name: '',
      proficiency: 'Beginner',
      type: 'Technical',
    },
    mode: 'onChange',
  });

  // Sync form with resumeData changes
  useEffect(() => {
    form.reset({
      skills: resumeData.skills || [],
    });
  }, [resumeData.skills, form]);

  // Trigger validation when editing
  useEffect(() => {
    if (editIndex !== null) {
      modalForm.trigger();
    }
  }, [editIndex, modalForm]);

  const handleSubmit = (data: SkillType) => {
    console.log('🚀 ~ handleSubmit ~ data:', data, editIndex);
    console.log('🚀 ~ SkillsForm ~ skillFields:', skillFields);
    const skillData = { ...data, id: data.id || crypto.randomUUID() };
    if (editIndex !== null) {
      update(editIndex, skillData);
    } else {
      append(skillData);
    }

    updateResumeData({ ...resumeData, skills: [...form.getValues().skills] });
    setIsModalOpen(false);
    setEditIndex(null);
    setIsEditing(false);
    modalForm.reset();
  };

  const handleAdd = () => {
    modalForm.reset({
      name: '',
      proficiency: 'Beginner',
      type: 'Technical',
    });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    console.log('🚀 ~ handleEdit ~ index:', index);
    const skill = skillFields[index];
    modalForm.reset(skill);
    setEditIndex(index);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = (index: number) => {
    remove(index);
    updateResumeData({ ...resumeData, skills: [...form.getValues().skills] });
    setIsEditing(false);
  };

  return (
    <>
      {/* SKILL LIST */}
      <div className="flex flex-col gap-4">
        {Object.values(SkillTypeEnum.enum).map((type) => (
          <>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{type}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {skillFields
                    .filter((skill: SkillType) => skill.type === type)
                    .map((skill: SkillType) => {
                      const index = skillFields.findIndex((item) => item.name === skill.name);

                      return (
                        <div key={skill.id || `skill-${index}`}>
                          {/* <div className="flex justify-between items-center"> */}
                          <CardList
                            {...{
                              onClick: () => handleEdit(index),
                              title: skill.name,
                              content: (
                                <span className="text-xs text-muted-foreground italic text-left">
                                  {skill.proficiency}
                                </span>
                              ),
                              // footer: (
                              //   <Button variant="ghost" onClick={() => handleEdit(index)}>
                              //     <Pencil />
                              //   </Button>
                              // ),
                            }}
                          />
                          {/* </div> */}
                        </div>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <div className="">
                <CardTitle className="text-lg text-left mb-4">{type}</CardTitle>
                <Separator className="mb-8" />
              </div> */}
          </>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer" onClick={handleAdd}>
            <CirclePlus />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{editIndex !== null ? 'Edit Skill' : 'Add Skill'}</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...modalForm}>
            <form onSubmit={modalForm.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
              <FormField
                control={modalForm.control}
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
                control={modalForm.control}
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
                control={modalForm.control}
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
              <AlertDialogFooter>
                {isEditing && (
                  <AlertDialogAction
                    className="bg-destructive"
                    onClick={() => editIndex !== null && handleDelete(editIndex)}
                  >
                    Delete
                  </AlertDialogAction>
                )}
                <AlertDialogCancel
                  onClick={() => {
                    modalForm.reset();
                    setEditIndex(null);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!modalForm.formState.isValid}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
