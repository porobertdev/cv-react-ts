import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import { formatDate } from '@/lib/utils';
import { EducationSchema, type EducationType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CardList from './CardList';
import ModalEdit from './ModalEdit';
import { Checkbox } from './ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

export default function EducationForm() {
  const { resumeData, updateResumeData } = useResume();
  const { education } = resumeData;

  // Main form for displaying education entries
  const form = useForm(
    // <{education: EducationType[];}>
    {
      resolver: zodResolver(EducationSchema),
      defaultValues: education[0] || [
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
          currentlyStudying: false,
        },
      ],
      mode: 'onChange',
    },
  );

  const { handleEdit } = useModalEdit(form, 'education');

  useEffect(() => {
    form.reset(education);
  }, [resumeData]);

  // Reset modal form when opening for add
  const handleAdd = () => {
    form.reset({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyStudying: false,
    });
    /* setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(true); */
  };

  // Handle edit button click
  /* const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    const education = educationFields[index];
    form.reset({
      ...education,
      startDate: education.startDate || '',
      endDate: education.endDate || '',
      currentlyStudying: education.currentlyStudying ?? !education.endDate,
    });
    setIsModalOpen(true);
  }; */

  // Handle form submission for add/edit
  /* const handleSubmit = async (data: EducationType) => {
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
      form.reset();
      setIsEditing(false);
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  }; */

  return (
    <>
      {/* EDUCATION LIST */}
      <ScrollArea className="h-60 mb-8">
        <div className="flex flex-col gap-4">
          {education.map((edu: EducationType, index: number) => (
            <div key={edu.id || `edu-${index}`}>
              <CardList
                {...{
                  onClick: () => handleEdit(index, form, 'education'),
                  title: edu.institution,
                  content: (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(edu.startDate)} -{' '}
                      {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                    </span>
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
        </div>
      </ScrollArea>

      <ModalEdit
        formData={{
          form: form,
          key: 'education',
          resetFields: {
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            currentlyWorking: false,
          },
        }}
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
            control={form.control}
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
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  End Date{' '}
                  {!form.watch('currentlyStudying') && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={form.watch('currentlyStudying')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="currentlyStudying"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) form.setValue('endDate', '');
                  }}
                />
              </FormControl>
              <FormLabel className="text-sm">Currently studying</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
      </ModalEdit>
    </>
  );
}
