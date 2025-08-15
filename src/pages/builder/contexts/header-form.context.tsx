import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { appURL, formService } from '../../../api/api';
import { toaster } from '../../../components/ui/toaster';
import { ConfirmMessageModal, type ConfirmMessageModalRef } from '../components/alert-message-modal';
import {
  PublishSuccessModal,
  type PublishSuccessModalRef,
} from '../components/publish-sucess-modal';
import { useLocalStorage } from '../hooks/use-local-storage';
import type { FormData } from '../types/form-data.type';
import { useDragDropContext } from './drag-drop.context';

type DataFormPreview = Pick<
  FormData,
  'name' | 'description' | 'updated' | 'published' | 'itemsPerPage'
>;

type HeaderFormContextType = {
  formData: FormData | undefined;
  setFormData: (formData: FormData) => void;
  formDataPreview: DataFormPreview | undefined;
  setFormDataPreview: (formData: DataFormPreview) => void;
  save: (formData: FormData) => void;
  newForm: () => void
  publish: () => void;
  isLoading: boolean;
};

const HeaderFormContext = createContext<HeaderFormContextType>({} as HeaderFormContextType);

export function FormContexProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>();
  const [formDataPreview, setFormDataPreview] = useState<DataFormPreview>();
  const { getLocalStorageData, updateLocalStore, clean } = useLocalStorage<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { elements } = useDragDropContext();
  const modalRef = useRef<PublishSuccessModalRef>(null);
  const confirmMessagemodalRef = useRef<ConfirmMessageModalRef>(null);

  useEffect(() => {
    const localStorageData = getLocalStorageData('form');
    if (localStorageData) {
      setFormData(localStorageData);
    }
  }, []);

  useEffect(() => {
    if (formData) {
      setFormData({ ...formData, updated: false });
      const localStorageData = getLocalStorageData('form');
      const isUpdated = JSON.stringify(localStorageData) !== JSON.stringify(formData);
      setFormDataPreview({ ...formData, updated: !isUpdated })
    }
  }, [elements]);

  const save = (data: FormData) => {
    const newOrUpdatedFormData =
      formData && formData.id
        ? { ...formData, ...data, elements, updated: true }
        : { ...data, id: crypto.randomUUID(), elements, updated: true, published: false };

    setIsLoading(true);
    formService
      .create(newOrUpdatedFormData)
      .then(() => {
        setFormData(newOrUpdatedFormData);
        setFormDataPreview(newOrUpdatedFormData);
        updateLocalStore('form', newOrUpdatedFormData);
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

  const newForm = () => {
    const localStorageData = getLocalStorageData('form');
    if (localStorageData) confirmMessagemodalRef.current?.open();
  }

  const publish = () => {
    if (formData && formData.updated && formData.id) {
      setIsLoading(true);
      formService
        .publish(formData.id)
        .then((id) => {
          setUrl(`${appURL}/form/${id}`);
          modalRef.current?.open();
          const updatedFormData = { ...formData, published: true };
          setFormData(updatedFormData);
          updateLocalStore('form', updatedFormData);
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
        newForm,
        publish,
        isLoading,
      }}
    >
      {children}
      <PublishSuccessModal ref={modalRef} url={url} />
      <ConfirmMessageModal
        ref={confirmMessagemodalRef}
        description={'Todos os dados do formulário atual serão perdidos!'}
        labelButtonConfirm={'Sim'}
        labelButtonCancel={'Não'}
        onConfirm={() => {
          setFormData(undefined);
          setFormDataPreview(undefined);
          clean('form');
          confirmMessagemodalRef.current?.close();
        }}
        onCancel={() => confirmMessagemodalRef.current?.close()}
      />
    </HeaderFormContext.Provider>
  );
}

export const useHeaderFormContext = () => useContext(HeaderFormContext);
