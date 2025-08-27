import { ResumeContext } from '@/App';
import { ContactSchema, type ContactType, type PlatformType } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useFieldArray, useForm, type FieldArrayWithId } from 'react-hook-form';
import { z } from 'zod';
import { SocialDropdown } from './SocialDropdown';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import {
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

export interface SocialLink {
  platform: PlatformType;
  icon: LucideIcon;
  url: string;
}

type SocialLinkField = FieldArrayWithId<ContactType, 'socialLinks', 'id'>;

const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/[username]' },
  { platform: 'Website', icon: Globe, url: 'https://example.com' },
  { platform: 'GitHub', icon: Github, url: 'https://github.com/[username]' },
  { platform: 'Twitter', icon: Twitter, url: 'https://twitter.com/[username]' },

  //   https://www.facebook.com/profile.php?id=61556976400457
  { platform: 'Facebook', icon: Facebook, url: 'https://facebook.com/[username]' },
  { platform: 'Instagram', icon: Instagram, url: 'https://instagram.com/[username]' },
];

// const socialLinks = PlatformEnum;
// console.log('🚀 ~ socialLinks:', socialLinks.enum);
export default function AboutForm() {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const { contact } = resumeData;

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      ...contact,
    },
    mode: 'onChange',
  });

  /*
  ReactHookForm has built-in API for dealing with inputs that hold arrays. By using this API, we can avoid declaring new states.
  */
  const {
    fields: formLinkFields,
    replace,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });
  console.log('🚀 ~ AboutForm ~ fields:', formLinkFields);

  const handleFormChange = () => {
    updateResumeData({ ...resumeData, contact: form.getValues() });
  };

  const updateSocialLinks = (link: SocialLink) => {
    console.log('🚀 ~ updateSocialLinks ~ link:', link);
    replace([...formLinkFields, link]);
  };

  const deleteSocialLink = (index: number) => {
    remove(index);
    handleFormChange();
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

                {formLinkFields.map((link: SocialLinkField, index) => (
                  <FormField
                    name={`socialLinks.${index}.url`}
                    control={form.control}
                    key={link.platform}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl
                        // className='hover:bg-red-500'
                        // onMouseOver={() => setIsInputHovered(!isInputHovered)}
                        // onMouseLeave={() => setIsInputHovered(!isInputHovered)}
                        >
                          <div className="flex items-center justify-center">
                            {/* <SocialDropdown /> */}
                            <Button variant="link" type="button" className="hover:scale-120">
                              <a href={`https://${link.url.split('/')[2]}`} target="_blank">
                                <link.icon />
                              </a>
                            </Button>
                            <Input type="text" {...field} placeholder={link.url} />

                            <Button
                              variant="outline"
                              type="button"
                              className="ml-4"
                              onClick={() => deleteSocialLink(index)}
                            >
                              <Trash className="text-destructive cursor-pointer" />
                            </Button>
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
        {formLinkFields.length !== socialLinks.length && (
          <div className="flex items-center justify-center">
            <SocialDropdown
              socialLinks={socialLinks.filter(
                (link) => !formLinkFields.map((item) => item.platform).includes(link.platform),
              )}
              updateSocialLinks={updateSocialLinks}
            />
          </div>
        )}
      </form>
    </Form>
  );
}
