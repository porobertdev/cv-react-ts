import { ResumeContext } from '@/App';
import { ContactSchema, type ContactType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SocialDropdown } from './SocialDropdown';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import { link } from 'fs';

import {
  CirclePlus,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Trash,
  Twitter,
  type LucideIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const platformLinks = [
  { name: 'Linkedin', icon: Linkedin, url: 'https://www.linkedin.com/in/[username]' },
  { name: 'Website', icon: Globe, url: 'https://example.com' },
  { name: 'Github', icon: Github, url: 'https://github.com/[username]' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/[username]' },

  //   https://www.facebook.com/profile.php?id=61556976400457
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/[username]' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/[username]' },
];

// const socialLinks = PlatformEnum;
// console.log('🚀 ~ socialLinks:', socialLinks.enum);
export default function AboutForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  const { contact } = resumeData;

  // const [isInputHovered, setIsInputHovered] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      ...contact,
    },
    mode: 'onChange',
  });

  const { fields, replace, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });
  console.log('🚀 ~ AboutForm ~ fields:', fields);

  const handleFormChange = () => {
    updateResumeData({ ...resumeData, contact: form.getValues() });
  };

  const updateSocialLinks = (link) => {
    replace([...fields, link]);
  };

  /**
   * TODO: implement delete
   */
  const deleteSocialLink = (link) => {
    // setSocialLinks(socialLinks.filter((item) => item.name !== link.name));
  };

  return (
    <Form {...form}>
      <form onChange={handleFormChange} className="flex flex-col gap-6">
        <div className="flex gap-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                  {!ContactSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone
                  {!ContactSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="socialLinks"
          control={form.control}
          render={({ field }) => {
            console.log('🚀 ~ field:', field);
            return (
              <FormItem className="w-full">
                <FormLabel>
                  Social Links
                  {!ContactSchema.shape[field.name].safeParse(undefined).success && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>

                {fields.map((link, index) => (
                  <FormField
                    name={`socialLinks.${link.name}`}
                    control={form.control}
                    key={link.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl
                        // className='hover:bg-red-500'
                        // onMouseOver={() => setIsInputHovered(!isInputHovered)}
                        // onMouseLeave={() => setIsInputHovered(!isInputHovered)}
                        >
                          <div className="flex items-center justify-center">
                            {/* <SocialDropdown /> */}
                            <Button variant="link" type="button" className='hover:scale-120'>
                              <a href={`https://${link.url.split('/')[2]}`} target="_blank">
                                <link.icon />
                              </a>
                            </Button>
                            <Input
                              type="text"
                              {...field}
                              placeholder={link.url}
                              onChange={(e) => {
                                link.url = e.target.value;
                                form.setValue(`socialLinks.${index}.url`, e.target.value);
                              }}
                            />

                            {/* {isInputHovered && (
                              <Button variant="outline" type="button" className="ml-4">
                                <Trash className="text-destructive cursor-pointer" />
                              </Button>
                            )} */}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* ADD MORE */}
        {fields.length !== platformLinks.length && (
          <div className="flex items-center justify-center">
            <SocialDropdown
              socialLinks={platformLinks.filter(
                (platform) => !fields.map((item) => item.name).includes(platform.name),
              )}
              updateSocialLinks={updateSocialLinks}
            />
          </div>
        )}
      </form>
    </Form>
  );
}
