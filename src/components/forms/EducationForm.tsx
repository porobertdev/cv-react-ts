import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import { formatDate } from '@/lib/utils';
import { EducationSchema, type EducationType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CardList from '../CardList';
import ModalEdit from '../ModalEdit';
import { Checkbox } from '../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

export default function EducationForm() {
  const { resumeData } = useResume();
  const { education } = resumeData;

  // Main form for displaying education entries
  const form = useForm<EducationType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: education?.[0],
    mode: 'onChange',
  });

  const { handleEdit } = useModalEdit({ form, key: 'education' });

  useEffect(() => {
    form.reset(education?.[0]);
  }, [resumeData, form, education]);

  return (
    <>
      {/* EDUCATION LIST */}
      <ScrollArea className="mb-8 h-60">
        <div className="flex flex-col gap-4">
          {education?.map((edu: EducationType, index: number) => (
            <div key={edu.id || `edu-${index}`}>
              <CardList
                {...{
                  onClick: () => handleEdit(index, { form, key: 'education' }),
                  title: edu.institution,
                  content: (
                    <span className="text-muted-foreground text-xs">
                      {formatDate(edu.startDate)} -{' '}
                      {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  ),
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
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            currentlyStudying: false,
            description: '',
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
        <div className="flex items-center gap-4">
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
            <FormItem className="flex items-center gap-2">
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
