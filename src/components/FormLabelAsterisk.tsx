import { ResumeSchema, type ResumeType } from '@/schemas/schemas';
import type { ReactNode } from 'react';
import { FormLabel } from './ui/form';

interface FormLabelAsteriskProps<K extends keyof typeof ResumeSchema.shape> {
  schema: (typeof ResumeSchema.shape)[K];
  fieldName: keyof ResumeType[K];
  children: ReactNode;
}

export default function FormLabelAsterisk<K extends keyof typeof ResumeSchema.shape>(
  props: FormLabelAsteriskProps<K>,
) {
  const { schema, fieldName, children } = props;

  return (
    <FormLabel>
      {children}

      {/* success = is optional; safeParse is the new .isOptional(); */}
      {!schema.shape?.[fieldName]?.safeParse(undefined).success && (
        <span className="text-destructive">*</span>
      )}
    </FormLabel>
  );
}
