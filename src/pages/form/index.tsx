import { Button, Flex } from '@chakra-ui/react';
import { useRenderElement } from '../builder/hooks/use-render-element';
import { useEffect, useState } from 'react';
import type { FormData } from '../builder/types/form-data.type';
import { formService } from '../../api/api';
import { useParams } from 'react-router-dom';
import { HeaderForm } from '../builder/components/header-form';
import { toaster } from '../../components/ui/toaster';

export function FormPage() {
  const { renderElement } = useRenderElement();
  const [formData, setFormData] = useState<FormData>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    id &&
      formService
        .findById(id)
        .then((response) => {
          response && setFormData(response);
        })
        .catch((error) =>
          toaster.create({
            title: 'Erro',
            description: error.response.data.message ?? 'Não encontrado.',
            type: 'error',
          })
        );
  }, []);

  return (
    formData && (
      <Flex
        w={'full'}
        h={'100vh'}
        paddingInline={'10rem'}
        paddingBlock={'0.5rem'}
        justifyContent={'center'}
      >
        <Flex w={'60rem'} flexDir={'column'} gap={'1rem'}>
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
          <Flex>
            <Button>Enviar</Button>
          </Flex>
        </Flex>
      </Flex>
    )
  );
}
