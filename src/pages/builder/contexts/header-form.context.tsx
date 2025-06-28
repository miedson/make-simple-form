import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useDataFormLocalStorage } from '../hooks/use-local-storage';
import type { FormData } from '../types/form-data.type';
import { useDragDropContext } from './drag-drop.context';

type DataFormPreview = Pick<FormData, 'name' | 'description' | 'updated'>;

type HeaderFormContextType = {
  formData: FormData | undefined;
  setFormData: (formData: FormData) => void;
  formDataPreview: DataFormPreview | undefined;
  setFormDataPreview: (formData: DataFormPreview) => void;
  save: (formData: FormData) => void;
};

const HeaderFormContext = createContext<HeaderFormContextType>({} as HeaderFormContextType);

export function FormContexProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>();
  const [formDataPreview, setFormDataPreview] = useState<DataFormPreview>();
  const { localStorageFormData, updateFormLocalStore } = useDataFormLocalStorage();
  const { elements } = useDragDropContext();

  useEffect(() => {
    localStorageFormData && setFormData(localStorageFormData);
  }, []);

  const save = (data: FormData) => {
    const updated = true
    const newOrUpdatedFormData = formData && formData.id
      ? { ...formData, ...data, updated }
      : { ...data, id: crypto.randomUUID(), elements, updated };

    setFormData(newOrUpdatedFormData);
    setFormDataPreview(newOrUpdatedFormData);
    updateFormLocalStore(newOrUpdatedFormData);
  }

  return (
    <HeaderFormContext.Provider value={{ formData, setFormData, formDataPreview, setFormDataPreview, save }}>
      {children}
    </HeaderFormContext.Provider>
  );
}

export const useHeaderFormContext = () => useContext(HeaderFormContext);
