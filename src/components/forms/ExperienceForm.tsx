import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import { formatDate } from '@/lib/utils';
import { ExperienceSchema, type ExperienceType } from '@/schemas/schemas';
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

export default function ExperienceForm() {
  const { resumeData } = useResume();

  const { experience } = resumeData;

  // Main form for displaying jobs
  const form = useForm<ExperienceType>({
    // <ExperienceType>
    resolver: zodResolver(ExperienceSchema),
    defaultValues: experience?.[0],
    mode: 'onChange',
  });

  const { handleEdit } = useModalEdit({ form, key: 'experience' });

  useEffect(() => {
    form.reset(experience?.[0]);
  }, [resumeData, form, experience]);

  return (
    <>
      {/* EXPERIENCE LIST */}
      <ScrollArea className="mb-8 h-80">
        <div className="flex flex-col gap-4">
          {resumeData.experience?.map((job: ExperienceType, index: number) => (
            <div key={job.id || `job-${index}`}>
              <CardList
                {...{
                  onClick: () => {
                    handleEdit(index, { form, key: 'experience' });
                  },
                  title: job.company,
                  content: (
                    <span className="text-muted-foreground text-left text-xs italic">
                      {formatDate(job.startDate)} -{' '}
                      {job.currentlyWorking ? 'Present' : formatDate(job.endDate)}
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

      {/* ADD/EDIT MODAL */}
      <ModalEdit
        formData={{
          form: form,
          key: 'experience',
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
          control={form.control}
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
          control={form.control}
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
                  {!form.watch('currentlyWorking') && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={form.watch('currentlyWorking')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="currentlyWorking"
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
              <FormLabel className="text-sm">Currently working in this role</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
      </ModalEdit>
    </>
  );
}
