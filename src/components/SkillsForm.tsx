import { ResumeContext } from '@/App';
import { SkillLevelEnum, SkillSchema, SkillTypeEnum, type SkillType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
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
    const skillData = { ...data, id: data.id || crypto.randomUUID() };
    if (editIndex !== null) {
      update(editIndex, skillData);
    } else {
      append(skillData);
    }

    updateResumeData({ ...resumeData, skills: [...form.getValues().skills] });
    setIsModalOpen(false);
    setEditIndex(null);
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
    const skill = skillFields[index];
    modalForm.reset(skill);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    remove(index);
    updateResumeData({ ...resumeData, skills: [...form.getValues().skills] });
  };

  return (
    <>
      {/* SKILL LIST */}
      <ScrollArea className="h-60 mb-8">
        <div className="flex flex-col gap-4">
          {Object.values(SkillTypeEnum.enum).map((type) => (
            <Card key={type}>
              <CardHeader className="text-left">
                <CardTitle>{type}</CardTitle>
              </CardHeader>
              <CardContent>
                {skillFields
                  .filter((skill: SkillType) => skill.type === type)
                  .map((skill: SkillType, index: number) => (
                    <div key={skill.id || `skill-${index}`}>
                      <div className="flex justify-between items-center">
                        <Card
                          className="px-0 py-2 rounded-none border-none shadow-none flex-row justify-between cursor-pointer hover:bg-muted w-full"
                          onClick={() => handleEdit(index)}
                        >
                          <CardHeader className="p-0">
                            <CardTitle className="text-sm">{skill.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm p-0 flex gap-12 items-center">
                            <span>{skill.proficiency}</span>
                          </CardContent>
                        </Card>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="ml-4">
                              <Trash className="text-destructive cursor-pointer" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this skill?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(index)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <Separator />
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

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
