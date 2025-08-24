import { z } from 'zod';

// enums
export const PlatformEnum = z.enum([
  'Twitter',
  'LinkedIn',
  'GitHub',
  'Facebook',
  'Instagram',
  'Website',
]);
export const SkillLevelEnum = z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']);
export const SkillTypeEnum = z.enum(['Technical', 'Soft', 'Language', 'Other']);

export const AboutSchema = z.object({
  profilePic: z.string().url().optional(),
  fName: z.string().min(1, 'First name is required').max(50),
  lName: z.string().min(1, 'Last name is required').max(50),
  city: z.string().min(1).max(50).optional(),
  country: z.string().min(1).max(50).optional(),
  intro: z.string().min(1).max(300).optional(),
});

export const ContactSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  socialLinks: z
    .array(
      z.object({
        platform: PlatformEnum.optional(),
        url: z.string().url('invalid URL'),
        username: z.string().min(1, 'Username is required').max(50).optional(),
      }),
    )
    .optional(),
});

export const ExperienceSchema = z.object({
  id: z.string().uuid().optional(),
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  company: z.string().min(1, 'Company name is required').max(100),
  location: z.string().min(1).max(100).optional(),
  startDate: z.date().min(new Date('1900-01-01'), 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().max(1000).optional(),
});

export const EducationSchema = z.object({
  id: z.string().uuid().optional(),
  institution: z.string().min(1, 'Institution name is required').max(100),
  degree: z.string().min(1, 'Degree is required').max(100),
  fieldOfStudy: z.string().min(1, 'Field of study is required').max(100),
  startDate: z.date().min(new Date('1900-01-01'), 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().max(1000).optional(),
});

export const SkillSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Skill name is required').max(50),
  proficiency: SkillLevelEnum.optional(),
  type: SkillTypeEnum.optional(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(1000).optional(),
  links: z.object({
    live: z.string().url().optional(),
    git: z.string().url().optional(),
  }),
  technologies: z.array(z.string().min(1).max(50)).optional(),
});

export const ResumeSchema = z.object({
  about: AboutSchema,
  contact: ContactSchema.optional(),
  experiences: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
});

export type AboutType = z.infer<typeof AboutSchema>;
export type ContactType = z.infer<typeof ContactSchema>;
export type ExperienceType = z.infer<typeof ExperienceSchema>;
export type EducationType = z.infer<typeof EducationSchema>;
export type SkillType = z.infer<typeof SkillSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ResumeType = z.infer<typeof ResumeSchema>;
export type PlatformType = z.infer<typeof PlatformEnum>;
