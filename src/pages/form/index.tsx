import { Button, Flex, Text } from '@chakra-ui/react';
import { useRenderElement } from '../builder/hooks/use-render-element';
import { useEffect, useState } from 'react';
import type { FormData } from '../builder/types/form-data.type';
import { formService, responseService, type Responses } from '../../api/api';
import { useParams } from 'react-router-dom';
import { HeaderForm } from '../builder/components/header-form';
import { toaster } from '../../components/ui/toaster';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSchema } from '../builder/components/element/elements.schema';
import { Asterisk } from 'lucide-react';
import { z } from 'zod';

export function FormPage() {
  const { renderElement } = useRenderElement();
  const [formData, setFormData] = useState<FormData>();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const [schema, setSchema] = useState<z.ZodObject<object, "strip", object> | undefined>();

  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
  });

  const { handleSubmit, formState: { errors } } = formMethods;

  useEffect(() => {
    if (id) {
      formService
        .findById(id)
        .then((response) => {
          if (response && response.elements?.length) {
            setFormData(response);
            setSchema(generateSchema(response.elements));
          }
        })
        .catch((error) =>
          toaster.create({
            title: 'Erro',
            description: error.response.data.message ?? 'Não encontrado.',
            type: 'error',
          })
        );
    }
  }, []);

  const handleSave = (data: Record<string, string | string[]>) => {
    const responses: Responses[] = data ? Object.entries(data)
      .map(([id, value]) => {
        const element = formData?.elements?.find(element => element.id === id);
        return element && {
          element_id: element.id,
          question: element.label,
          response: Array.isArray(value) ? element.options?.find(opt => opt.value === value[0]) : value
        }
      }) : [];
    setIsLoading(true)
    if (id) {
      responseService.save(id, responses)
        .then(() => toaster.create({
          title: 'Sucesso',
          description: 'Respostas salvas com sucesso',
          type: 'success'
        })).catch((error) => {
          toaster.create({
            title: 'Erro',
            description: error.response.data.message ?? 'Erro ao salvar respostas',
            type: 'error',
          })
        }).finally(() => setIsLoading(false));
    }
  };

  return (
    formData &&
    schema && (
      <Flex
        w={'full'}
        h={'100vh'}
        paddingInline={'10rem'}
        paddingBlock={'0.5rem'}
        justifyContent={'center'}
      >
        <FormProvider {...formMethods}>
          <Flex w={'60rem'} flexDir={'column'} >
            <form onSubmit={handleSubmit(handleSave)} noValidate >
              <Flex flexDir={'column'} gap={'1rem'}>
                <HeaderForm formData={formData} />
                <Flex flexDir={'column'} gap={'1rem'}>
                  {formData.elements?.map((element) => (
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
                </Flex>
                {Object.keys(errors).length > 0 &&
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
                }
                <Flex>
                  <Button type="submit" loading={isLoading}>Enviar</Button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </FormProvider>
      </Flex>
    )
  );
}
