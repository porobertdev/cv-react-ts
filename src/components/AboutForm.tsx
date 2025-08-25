import { ResumeContext } from '@/App';
import { AboutSchema, type AboutType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar } from './ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function AboutForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  const { about } = resumeData;

  const [fileSrc, setFileSrc] = useState();

  const form = useForm<z.infer<typeof AboutSchema>>({
    resolver: zodResolver(AboutSchema),
    defaultValues: {
      ...about,
    },
    mode: 'onChange',
  });

  const schemaKeys = Object.keys(AboutSchema.shape) as (keyof AboutType)[];
  console.log('🚀 ~ AboutForm ~ AboutSchema:', AboutSchema);
  console.log('🚀 ~ AboutForm ~ schemaKeys:', schemaKeys);

  const handleFormChange = () => {
    updateResumeData({ about: form.getValues() });
  };

  return (
    <Form {...form}>
      <form onChange={handleFormChange} className="flex flex-col gap-6">
        <FormField
          name="profilePic"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Profile Pic
                  {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <div className="flex gap-4 justify-center items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={fileSrc} />
                    <AvatarFallback className="bg-muted-foreground w-full text-white flex justify-center items-center">
                      Pic
                    </AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        console.log('🚀 ~ AboutForm ~ file:', file);
                        field.onChange(file); // store the File object in RHF
                        const src = URL.createObjectURL(file);
                        console.log('🚀 ~ AboutForm ~ src:', src);
                        setFileSrc(src);

                        console.log('🚀 ~ AboutForm ~ form:', form.getValues());
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      // className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
                      // className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex gap-4">
          <FormField
            name="fName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name{' '}
                  {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name{' '}
                  {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City
                  {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country{' '}
                  {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="intro"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Intro
                {AboutSchema.shape[field.name].safeParse(undefined).success && (
                  <span className="text-destructive">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
