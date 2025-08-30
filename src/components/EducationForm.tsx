import { ResumeContext } from '@/App';
import { EducationSchema, type EducationType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Pencil, Trash } from 'lucide-react';
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
import { Card, CardContent, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

export default function EducationForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Main form for displaying education entries
  const form = useForm<{
    education: EducationType[];
  }>({
    resolver: zodResolver(
      z.object({
        education: z.array(EducationSchema),
      }),
    ),
    defaultValues: {
      education: resumeData.education || [],
    },
    mode: 'onChange',
  });

  // Form for adding/editing education in modal
  const modalForm = useForm<EducationType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyStudying: false,
    },
    mode: 'onChange', // Validate immediately for editing
  });

  const {
    fields: educationFields,
    append,
    update,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  // Sync form with resumeData changes
  useEffect(() => {
    form.reset({
      education: resumeData.education || [],
    });
  }, [resumeData.education, form]);

  // Trigger validation on edit to ensure prefilled values are validated
  useEffect(() => {
    if (isEditing && editIndex !== null) {
      modalForm.trigger(); // Trigger validation for all fields
    }
  }, [isEditing, editIndex, modalForm]);

  // Reset modal form when opening for add
  const handleAdd = () => {
    modalForm.reset({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyStudying: false,
    });
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  // Handle edit button click
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    const education = educationFields[index];
    modalForm.reset({
      ...education,
      startDate: education.startDate || '',
      endDate: education.endDate || '',
      currentlyStudying: education.currentlyStudying ?? !education.endDate,
    });
    setIsModalOpen(true);
  };

  // Handle form submission for add/edit
  const handleSubmit = async (data: EducationType) => {
    try {
      // Validate form data against schema
      const parsedData = await EducationSchema.parseAsync({
        ...data,
        endDate: data.currentlyStudying ? '' : data.endDate,
      });
      const formattedData: EducationType = {
        ...parsedData,
        id: data.id || crypto.randomUUID(),
      };
      if (isEditing && editIndex !== null) {
        update(editIndex, formattedData);
      } else {
        append(formattedData);
      }
      // Update context with the latest education entries
      updateResumeData({ education: form.getValues().education });
      modalForm.reset();
      setIsEditing(false);
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle delete
  const handleDelete = (index: number) => {
    remove(index);
    updateResumeData({ education: form.getValues().education });
  };

  // Format date for display
  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* EDUCATION LIST */}
      <ScrollArea className="h-60 mb-8">
        {educationFields.map((edu: EducationType, index: number) => (
          <div key={edu.id || `edu-${index}`}>
            <div className="flex justify-between items-center">
              <Card
                className="px-4 py-2 rounded-sm flex-row justify-between cursor-pointer hover:bg-muted w-full"
                onClick={() => handleEdit(index)}
              >
                <CardContent className="text-sm p-0 flex gap-12 items-center w-full">
                  <CardTitle className="text-md flex items-center">{edu.institution}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </CardContent>
              </Card>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" type="button" size="icon" className="ml-4">
                    <Trash className="text-destructive cursor-pointer" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this education entry?
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
          </div>
        ))}
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
            <AlertDialogTitle>{isEditing ? 'Edit Education' : 'Add Education'}</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...modalForm}>
            <form onSubmit={modalForm.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
              <FormField
                control={modalForm.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Institution <span className="text-destructive">*</span>
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
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Degree <span className="text-destructive">*</span>
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
                name="fieldOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Field of Study <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center">
                <FormField
                  control={modalForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Start Date <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={modalForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        End Date{' '}
                        {!modalForm.watch('currentlyStudying') && (
                          <span className="text-destructive">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={modalForm.watch('currentlyStudying')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={modalForm.control}
                name="currentlyStudying"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) modalForm.setValue('endDate', '');
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm">Currently studying</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={modalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    modalForm.reset();
                    setIsEditing(false);
                    setEditIndex(null);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!modalForm.formState.isValid}>
                  {isEditing ? 'Update' : 'Add'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
