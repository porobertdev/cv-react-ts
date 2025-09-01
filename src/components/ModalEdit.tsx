import { useResume } from '@/contexts/ResumeContext';
import type { FormDataTypes, ResumeType } from '@/schemas/schemas';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  type FieldValues,
  type UseFormReturn,
  type UseFormWatch,
} from 'react-hook-form';
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

interface ModalEditProps {
  readonly formData: {
    form: UseFormReturn;
    key: keyof ResumeType;
    // form: UseFormWatch<FieldValues>;
    resetFields: FormDataTypes;
  };
  readonly children: React.ReactNode;
}

export default function ModalEdit({ formData, children }: ModalEditProps) {
  const { resumeData, updateResumeData } = useResume();

  const { form, key: formKey, resetFields } = formData;
  console.log('🚀 ~ ModalEdit ~ form:', form);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const formKey = Object.keys(form.control._defaultValues)[0];

  // Trigger validation on edit to ensure prefilled values are validated
  /* useEffect(() => {
    if (isEditing && editIndex !== null) {
      form.trigger(); // Trigger validation for all fields
    }
  }, [isEditing, editIndex, form]); */

  const handleSubmit = (data: FormDataTypes) => {
    console.log('🚀 ~ handleSubmit ~ data:', data, 'editIndex:', editIndex);

    // add an ID
    data = {
      ...data,
      id: crypto.randomUUID(),

      // endDate: data.currentlyWorking ? '' : data.endDate,
    };

    /* if (editIndex !== null) {
      update(editIndex, data);
    } else {
      console.log('🚀 ~ handleSubmit ~ appending =>:', formFields);

      append(data);
    } */

    console.log('🚀 ~ handleSubmit ~ APPENDED =>:', data);

    if (Array.isArray(resumeData[formKey])) {
      updateResumeData({ [formKey]: [...resumeData[formKey], data] });
    } else {
      updateResumeData({ [formKey]: data });
    }

    console.log(
      '🚀 ~ handleSubmit ~ resumeData:',
      resumeData,
      'formKey',
      formKey,
      form.control._defaultValues,
    );

    setIsModalOpen(false);
    setEditIndex(null);
    setIsEditing(false);
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

  const handleEdit = (index: number) => {
    let data;

    setIsEditing(true);
    setEditIndex(index);

    // const data = formFields[index];
    if (Array.isArray(resumeData[formKey])) {
      data = resumeData[formKey][index];
    } else {
      data = resumeData[formKey];
    }

    form.reset({
      ...data,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    // remove(index);
    updateResumeData({ [formKey]: form.getValues()[formKey] });

    if (Array.isArray(resumeData[formKey])) {
      updateResumeData({
        [formKey]: resumeData[formKey].filter((item: FormDataTypes, i: number) => i !== index),
      });
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
                <AlertDialogAction type="submit" disabled={!form.formState.isValid}>
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
