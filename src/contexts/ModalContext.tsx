import type { ResumeType } from '@/schemas/schemas';
import { createContext, useContext, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useResume } from './ResumeContext';

interface ModalContextProps {
  // initial state
  isEditing: boolean;
  editIndex: number | null;
  isModalOpen: boolean;
  handleEdit: (index: number, form: UseFormReturn, formKey: keyof ResumeType) => void;

  // setters
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProviderProps {
  // readonly formData?: ModalEditProps;
  readonly children: React.ReactNode;
}

interface ModalEditHookProps {
  form?: UseFormReturn<FormData>;
  key?: keyof ResumeType;
  // resetFields: FormDataTypes,
}
const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalEdit = (props?: ModalEditHookProps) => {
  const ctx = useContext(ModalContext);
  console.log('🚀 ~ useModalEdit ~ ctx:', ctx);
  if (!ctx) throw new Error('useModalEdit must be used inside ModalProvider');

  const { form, key } = props ?? {};

  if (form) {
    console.log('🚀 ~ useModalEdit ~ form:', form);

    return {
      ...ctx,
      // thanks stupid Copilot for  idea
      handleEdit: (index: number) => ctx.handleEdit(index, form, key),
    };
  } else {
    return ctx;
  }
};

export default function ModalProvider({ children }: ModalProviderProps) {
  const { resumeData } = useResume();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEdit = (index: number, form: UseFormReturn, formKey: keyof ResumeType) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditIndex(index);
    let data;

    if (Array.isArray(resumeData[formKey])) {
      data = resumeData[formKey][index];
    } else {
      data = resumeData[formKey];
    }

    form.reset({
      ...data,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        isEditing,
        setIsEditing,
        editIndex,
        setEditIndex,
        handleEdit,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
