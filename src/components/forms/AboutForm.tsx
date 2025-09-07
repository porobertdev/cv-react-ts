import { useResume } from '@/contexts/ResumeContext';
import { AboutSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar } from '../ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function AboutForm() {
  const { resumeData, updateResumeData } = useResume();

  const { about } = resumeData;

  const [fileSrc, setFileSrc] = useState<string | File | undefined>(about?.profilePic);

  const form = useForm<z.infer<typeof AboutSchema>>({
    resolver: zodResolver(AboutSchema),
    defaultValues: {
      ...about,
    },
    mode: 'onChange',
  });

  // const schemaKeys = Object.keys(AboutSchema.shape) as (keyof AboutType)[];

  const handleFormChange = () => {
    updateResumeData({ about: form.getValues() });
  };

  useEffect(() => {
    form.reset(about);
  }, [resumeData, about, form]);

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
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={fileSrc} />
                    <AvatarFallback className="bg-muted-foreground flex w-full items-center justify-center text-white">
                      Pic
                    </AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] as Blob;
                        console.log('🚀 ~ AboutForm ~ file:', file);
                        field.onChange(file); // store the File object in RHF

                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = reader.result as string;
                          setFileSrc(base64);
                          form.setValue('profilePic', base64);
                          updateResumeData({ about: { ...form.getValues(), profilePic: base64 } });
                        };
                        reader.readAsDataURL(file);
                        console.log('🚀 ~ AboutForm ~ form:', form.getValues());
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

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

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Position
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
          name="intro"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Intro
                {!AboutSchema.shape[field.name].safeParse(undefined).success && (
                  <span className="text-destructive">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
