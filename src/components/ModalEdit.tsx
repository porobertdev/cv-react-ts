import { useModalEdit } from '@/contexts/ModalContext';
import { useResume } from '@/contexts/ResumeContext';
import type { FormDataTypes, FormDataTypesUnion, ResumeType } from '@/schemas/schemas';
import { CirclePlus } from 'lucide-react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';
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
import { Form } from './ui/form';

export interface ModalEditProps<TFormValues extends FieldValues> {
  readonly formData: {
    form: UseFormReturn<TFormValues>;
    key: keyof ResumeType;
    resetFields: Partial<TFormValues>;
  };
  readonly children: React.ReactNode;
}

export default function ModalEdit<TFormValues extends FieldValues>({
  formData,
  children,
}: ModalEditProps<TFormValues>) {
  const { resumeData, updateResumeData } = useResume();
  const { isEditing, setIsEditing, editIndex, setEditIndex, isModalOpen, setIsModalOpen } =
    useModalEdit();

  // const resetFields = DEFAULT_RESUME_DATA[formKey];
  const { form, key: formKey, resetFields } = formData;

  // Trigger validation on edit to ensure prefilled values are validated
  /* useEffect(() => {
    if (isEditing && editIndex !== null) {
      form.trigger(); // Trigger validation for all fields
    }
  }, [isEditing, editIndex, form]); */

  const handleSubmit = (data: FormDataTypesUnion) => {
    // add an ID
    data = {
      ...data,
      id: crypto.randomUUID(),
    };

    if ('currentlyStudying' in data && data.currentlyStudying) {
      data.endDate = 'Present';
    }

    if ('currentlyWorking' in data && data.currentlyWorking) {
      data.endDate = 'Present';
    }

    console.log('🚀 ~ handleSubmit ~ APPENDED =>:', data);

    if (isEditing) {
      // update existing item
      // updateResumeData({ [formKey]: [...resumeData[formKey].splice(editIndex, 1), data] });

      if (resumeData[formKey]) {
        updateResumeData({
          [formKey]: [
            // filter() messes up the indexes, which cause the edited item to be appended
            ...resumeData[formKey].map((item: FormDataTypes, index: number) => {
              if (index === editIndex) {
                return data;
              } else {
                return item;
              }
            }),
          ],
        });
      }
    } else if (Array.isArray(resumeData[formKey])) {
      updateResumeData({ [formKey]: [...resumeData[formKey], data] });
    } else {
      // about & contact are just an obj
      updateResumeData({ [formKey]: data });
    }

    console.log(
      '🚀 ~ handleSubmit ~ resumeData:',
      resumeData,
      'formKey',
      formKey,
      form.control._defaultValues,
    );

    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(false);
    form.reset();
  };

  // Reset modal form when opening for add
  const handleAdd = () => {
    form.reset({
      ...resetFields,
    });
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    console.log('🚀 ~ handleDelete ~ index:', index);

    if (Array.isArray(resumeData[formKey])) {
      updateResumeData({
        [formKey]: resumeData[formKey].filter((item: FormDataTypes, i: number) => i !== index),
      });
    } else {
      updateResumeData({ [formKey]: form.getValues()[formKey] });
    }
  };

  return (
    <>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
              {/*  */}
              {/* FORM FIELDS */}
              {children}

              <AlertDialogFooter>
                {isEditing && (
                  <AlertDialogAction
                    className="bg-destructive"
                    onClick={() => editIndex !== null && handleDelete(editIndex)}
                  >
                    Delete
                  </AlertDialogAction>
                )}
                <AlertDialogCancel
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                    setEditIndex(null);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={!form.formState.isValid || !form.formState.isDirty}
                >
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
