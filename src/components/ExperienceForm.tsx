import { ResumeContext } from '@/App';
import { ExperienceSchema, type ExperienceType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';
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
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

export default function ExperienceForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Main form for displaying jobs
  const form = useForm<z.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      jobs: resumeData.experience?.jobs || [],
    },
    mode: 'onChange',
  });

  // Form for adding/editing jobs in modal
  const modalForm = useForm<ExperienceType>({
    resolver: zodResolver(ExperienceSchema.shape.jobs.element),
    defaultValues: {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorking: false,
    },
    mode: 'onChange',
  });

  const {
    fields: jobFields,
    append,
    update,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'jobs',
  });

  // Sync form with resumeData changes
  useEffect(() => {
    form.reset({ jobs: resumeData.experience?.jobs || [] });
  }, [resumeData.experience?.jobs, form]);

  // Trigger validation on edit to ensure prefilled values are validated
  useEffect(() => {
    if (isEditing && editIndex !== null) {
      modalForm.trigger(); // Trigger validation for all fields
    }
  }, [isEditing, editIndex, modalForm]);

  // Reset modal form when opening for add
  const handleAdd = () => {
    modalForm.reset({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorking: false,
    });
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  // Handle edit button click
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    const job = jobFields[index];
    modalForm.reset({
      ...job,
      startDate: job.startDate || '',
      endDate: job.endDate || '',
      currentlyWorking: job.currentlyWorking ?? !job.endDate,
    });
    setIsModalOpen(true);
  };

  // Handle form submission for add/edit
  const handleSubmit = async (data: ExperienceType) => {
    try {
      // Validate form data against schema
      await ExperienceSchema.shape.jobs.element.parseAsync(data);
      const formattedData = {
        ...data,
        endDate: data.currentlyWorking ? '' : data.endDate,
        id: data.id || crypto.randomUUID(),
      };
      if (isEditing && editIndex !== null) {
        update(editIndex, formattedData);
      } else {
        append(formattedData);
      }
      // Update context with the latest jobs
      updateResumeData({ experience: { jobs: form.getValues().jobs } });
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
    updateResumeData({ experience: { jobs: form.getValues().jobs } });
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
      {/* EXPERIENCE LIST */}
      <ScrollArea className="h-60 mb-8">
        {jobFields.map((job: ExperienceType, index: number) => (
          <div key={job.id || `job-${index}`}>
            <Card className="px-0 py-2 rounded-none border-none justify-between flex-row">
              <CardContent className="text-sm flex gap-4 items-center w-full">
                <CardTitle className="text-md flex items-center">{job.company}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {formatDate(job.startDate)} -{' '}
                  {job.currentlyWorking ? 'Present' : formatDate(job.endDate)}
                </span>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="ghost" onClick={() => handleEdit(index)}>
                  <Pencil />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(index)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
            <Separator />
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
            <AlertDialogTitle>{isEditing ? 'Edit Job' : 'Add Job'}</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...modalForm}>
            <form onSubmit={modalForm.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
              <FormField
                control={modalForm.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Title <span className="text-destructive">*</span>
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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company <span className="text-destructive">*</span>
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-destructive">*</span>
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
                        {!modalForm.watch('currentlyWorking') && (
                          <span className="text-destructive">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={modalForm.watch('currentlyWorking')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={modalForm.control}
                name="currentlyWorking"
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
                    <FormLabel className="text-sm">Currently working in this role</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={modalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
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
