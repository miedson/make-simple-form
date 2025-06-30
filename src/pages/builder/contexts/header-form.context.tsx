import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useDataFormLocalStorage } from '../hooks/use-local-storage';
import type { FormData } from '../types/form-data.type';
import { useDragDropContext } from './drag-drop.context';
import { formService } from '../../../api/api';
import { toaster } from '../../../components/ui/toaster';

type DataFormPreview = Pick<FormData, 'name' | 'description' | 'updated'>;

type HeaderFormContextType = {
  formData: FormData | undefined;
  setFormData: (formData: FormData) => void;
  formDataPreview: DataFormPreview | undefined;
  setFormDataPreview: (formData: DataFormPreview) => void;
  save: (formData: FormData) => void;
  isLoading: boolean;
};

const HeaderFormContext = createContext<HeaderFormContextType>({} as HeaderFormContextType);

export function FormContexProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>();
  const [formDataPreview, setFormDataPreview] = useState<DataFormPreview>();
  const { localStorageFormData, updateFormLocalStore } = useDataFormLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const { elements } = useDragDropContext();

  useEffect(() => {
    localStorageFormData && setFormData(localStorageFormData);
  }, []);

  const save = (data: FormData) => {
    const updated = true;
    const newOrUpdatedFormData =
      formData && formData.id
        ? { ...formData, ...data, elements, updated }
        : { ...data, id: crypto.randomUUID(), updated };

    setIsLoading(true);
    formService.create(newOrUpdatedFormData)
      .then(() => {
        setFormData(newOrUpdatedFormData);
        setFormDataPreview(newOrUpdatedFormData);
        updateFormLocalStore(newOrUpdatedFormData);
        toaster.create({
          title: 'Sucesso',
          type: 'success',
          description: 'Salvo com sucesso'
        });
      }).catch((error) => toaster.create({
        title: 'Error',
        type: 'error',
        description: error.response.data.message ?? 'Não foi possivel criar o formulário'
      }))
      .finally(() => setIsLoading(false));
  };

  return (
    <HeaderFormContext.Provider
      value={{ formData, setFormData, formDataPreview, setFormDataPreview, save, isLoading }}
    >
      {children}
    </HeaderFormContext.Provider>
  );
}

export const useHeaderFormContext = () => useContext(HeaderFormContext);
