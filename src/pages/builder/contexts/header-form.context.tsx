import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useDataFormLocalStorage } from '../hooks/use-local-storage';
import type { FormData } from '../types/form-data.type';
import { useDragDropContext } from './drag-drop.context';
import { appURL, formService } from '../../../api/api';
import { toaster } from '../../../components/ui/toaster';
import {
  PublishSuccessModal,
  type PublishSuccessModalRef,
} from '../components/publish-sucess-modal';

type DataFormPreview = Pick<FormData, 'name' | 'description' | 'updated' | 'published'>;

type HeaderFormContextType = {
  formData: FormData | undefined;
  setFormData: (formData: FormData) => void;
  formDataPreview: DataFormPreview | undefined;
  setFormDataPreview: (formData: DataFormPreview) => void;
  save: (formData: FormData) => void;
  publish: () => void;
  isLoading: boolean;
};

const HeaderFormContext = createContext<HeaderFormContextType>({} as HeaderFormContextType);

export function FormContexProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>();
  const [formDataPreview, setFormDataPreview] = useState<DataFormPreview>();
  const { localStorageFormData, updateFormLocalStore } = useDataFormLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { elements } = useDragDropContext();
  const modalRef = useRef<PublishSuccessModalRef>(null);

  useEffect(() => {
    if (localStorageFormData) {
      setFormData(localStorageFormData);
    }
  }, []);

  useEffect(() => {
    if (formData) setFormData({ ...formData, updated: false });
  }, [elements]);

  const save = (data: FormData) => {
    const updated = true;
    const newOrUpdatedFormData =
      formData && formData.id
        ? { ...formData, ...data, elements, updated }
        : { ...data, id: crypto.randomUUID(), elements, updated, published: false };

    setIsLoading(true);
    formService
      .create(newOrUpdatedFormData)
      .then(() => {
        setFormData(newOrUpdatedFormData);
        setFormDataPreview(newOrUpdatedFormData);
        updateFormLocalStore(newOrUpdatedFormData);
        toaster.create({
          title: 'Sucesso',
          type: 'success',
          description: 'Salvo com sucesso',
        });
      })
      .catch((error) =>
        toaster.create({
          title: 'Error',
          type: 'error',
          description: error.response.data.message ?? 'Não foi possivel criar o formulário',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const publish = () => {
    if (formData && formData.updated && formData.id) {
      setIsLoading(true);
      formService
        .publish(formData.id)
        .then((id) => {
          setUrl(`${appURL}/form/${id}`);
          modalRef.current?.open();
          // setFormData(undefined);
          // setFormDataPreview(undefined);
          // localStorage.removeItem('form');
        })
        .catch((error) =>
          toaster.create({
            title: 'Error',
            type: 'error',
            description: error.response.data.message ?? 'Não foi possivel publicar o formulário',
          })
        )
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <HeaderFormContext.Provider
      value={{
        formData,
        setFormData,
        formDataPreview,
        setFormDataPreview,
        save,
        publish,
        isLoading,
      }}
    >
      {children}
      <PublishSuccessModal ref={modalRef} url={url} />
    </HeaderFormContext.Provider>
  );
}

export const useHeaderFormContext = () => useContext(HeaderFormContext);
