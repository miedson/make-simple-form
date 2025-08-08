import { EmptyState, Flex, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Asterisk, FileX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { formService, responseService, type Responses } from '../../api/api';
import { toaster } from '../../components/ui/toaster';
import { generateSchema } from '../builder/components/element/elements.schema';
import { FooterForm } from '../builder/components/footer-form';
import { HeaderForm } from '../builder/components/header-form';
import { useLocalStorage } from '../builder/hooks/use-local-storage';
import { usePagination } from '../builder/hooks/use-pagination';
import { useRenderElement } from '../builder/hooks/use-render-element';
import type { Element } from '../builder/types/element.type';
import type { FormData } from '../builder/types/form-data.type';

export function FormPage() {
  const { renderElement } = useRenderElement();
  const [formData, setFormData] = useState<FormData>();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { getLocalStorageData, updateLocalStore } = useLocalStorage<Record<string, string>>();
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const [schema, setSchema] = useState<z.ZodObject<z.ZodRawShape> | undefined>();

  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = formMethods;

  useEffect(() => {
    const subscription = watch((values) => {
      updateLocalStore('responses', values);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const { paginatedData, pagination } = usePagination<Element>({
    data: formData?.elements ?? [],
    itemsPerPage,
  });

  useEffect(() => {
    if (id) {
      formService
        .findById(id)
        .then((response) => {
          if (response && response.elements?.length) {
            setFormData(response);
            setSchema(generateSchema(response.elements));
            setItemsPerPage(Number(response.itemsPerPage));
            const localStorageData = getLocalStorageData('responses');
            if (localStorageData)
              Object.entries(localStorageData).map(([name, value]) => setValue(name, value));
          }
        })
        .catch((error) =>
          toaster.create({
            description: error.response?.data?.message ?? 'Não encontrado.',
            type: 'error',
          })
        );
    }
  }, []);

  const handleSave = (data: Record<string, string | string[]>) => {
    const responses: Responses[] = data
      ? Object.entries(data).map(([id, value]) => {
          const element = formData?.elements?.find((element) => element.id === id);
          const response = element?.options?.length
            ? [value]
                .flatMap((v) => v)
                .map((v) => {
                  const { label, value } = element?.options?.find((e) => e.value == v) ?? {};
                  return { description: label, value };
                })
            : value;

          return {
            element_id: element?.id ?? '',
            question: element?.label,
            response,
          };
        })
      : [];

    setIsLoading(true);

    if (id) {
      responseService
        .save(id, responses)
        .then(() => {
          toaster.create({
            description: 'Respostas salvas com sucesso',
            type: 'success',
          });
        })
        .catch((error) => {
          toaster.create({
            description: error.response.data.message ?? 'Erro ao salvar respostas',
            type: 'error',
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return formData && schema ? (
    <Flex w={'full'} paddingInline={'10rem'} paddingBlock={'0.5rem'} justifyContent={'center'}>
      <FormProvider {...formMethods}>
        <Flex w={'full'} flexDir={'column'}>
          <HeaderForm formData={formData}>
            <Flex w={'full'} flexDir={'column'} mb={'1rem'}>
              <form onSubmit={handleSubmit(handleSave)} noValidate>
                <Flex w={'full'} flexDir={'column'} gap={'1rem'}>
                  {paginatedData &&
                    paginatedData.map((element) => (
                      <Flex
                        key={element.id}
                        w={'full'}
                        padding={'1rem'}
                        borderRadius={8}
                        border={'1px solid'}
                        borderColor={'gray.200'}
                      >
                        {renderElement(element)}
                      </Flex>
                    ))}
                  {Object.keys(errors).length > 0 && (
                    <Flex
                      w={'full'}
                      h={'3rem'}
                      bg={'red.100'}
                      p={'0.5rem'}
                      borderRadius={8}
                      alignItems={'center'}
                      justifyContent={'center'}
                      color={'red.500'}
                    >
                      <Asterisk />
                      <Text>Verifique os campos obrigatórios não preenchidos</Text>
                    </Flex>
                  )}
                  <FooterForm preview={false} isLoading={isLoading} pagination={pagination} />
                </Flex>
              </form>
            </Flex>
          </HeaderForm>
        </Flex>
      </FormProvider>
    </Flex>
  ) : (
    <EmptyState.Root size={'lg'}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FileX />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Formulário não existe ou não encontrado</EmptyState.Title>
          <EmptyState.Description>
            Verifique se o formulário existe e se o mesmo foi publicado.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
