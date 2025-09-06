import type { FormDataTypes } from '@/schemas/schemas';
import { createContext, useContext, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useResume } from './ResumeContext';

interface ModalContextProps {
  // initial state
  isEditing: boolean;
  editIndex: number | null;
  isModalOpen: boolean;
  handleEdit: <K extends keyof FormDataTypes>(index: number, form: FormDataProps<K>) => void;

  // setters
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProviderProps {
  // readonly formData?: ModalEditProps;
  readonly children: React.ReactNode;
}

interface FormDataProps<K extends keyof FormDataTypes> {
  form?: UseFormReturn<FormDataTypes[K]>;
  key?: K;
  // resetFields: FormDataTypes,
}
const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalEdit = <K extends keyof FormDataTypes>(props?: FormDataProps<K>) => {
  //
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalEdit must be used inside ModalProvider');

  const { form, key } = props ?? {};

  if (form) {
    console.log('🚀 ~ useModalEdit ~ form:', form);

    return {
      ...ctx,
      // thanks stupid Copilot for  idea
      handleEdit: (index: number) => ctx.handleEdit(index, { form, key }),
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

  const handleEdit: ModalContextProps['handleEdit'] = <K extends keyof FormDataTypes>(
    index: number,
    formData: FormDataProps<K>,
  ) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditIndex(index);
    let data;

    const { form, key } = formData;

    if (form && key) {
      if (Array.isArray(resumeData[key])) {
        data = resumeData[key][index];
      } else {
        data = resumeData[key];
      }

      form.reset({
        ...data,
      });
    }
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
