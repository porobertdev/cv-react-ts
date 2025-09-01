import type { ModalEditProps } from '@/components/ModalEdit';
import { createContext, useContext, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useResume } from './ResumeContext';

interface ModalContextProps {
  // initial state
  isEditing: boolean;
  editIndex: number | null;
  isModalOpen: boolean;
  handleEdit: (index: number) => void;

  // setters
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProviderProps {
  // readonly formData?: ModalEditProps;
  readonly children: React.ReactNode;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalEdit = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalEdit must be used inside ModalProvider');
  return ctx;
};

export default function ModalProvider({ 
  // formData,
   children }: ModalProviderProps) {
  console.log('🚀 ~ ModalProvider ~ formData:', formData);
  const { resumeData, updateResumeData } = useResume();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { form, key: formKey, resetFields } = formData;

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
