import { Button, Flex } from '@chakra-ui/react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useHeaderFormContext } from '../../contexts/header-form.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { HeaderForm } from '../header-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { generateSchema } from '../element/elements.schema';

export function ViewingArea() {
  const { elements } = useDragDropContext();
  const { renderElement } = useRenderElement();
  const { formDataPreview } = useHeaderFormContext();

  const [schema, setSchema] = useState<any>();

  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
  });

  useEffect(() => {
    setSchema(generateSchema(elements ?? []));
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Flex as={'form'} w={'full'} flexDir={'column'} gap={'1rem'} mb={'1rem'}>
        {formDataPreview?.name && (
          <>
            <HeaderForm formData={formDataPreview} />
            <Flex flexDir={'column'} gap={'1rem'}>
              {elements.map((element) => (
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
              <Button disabled>Enviar</Button>
            </Flex>
          </>
        )}
      </Flex>
    </FormProvider>
  );
}
