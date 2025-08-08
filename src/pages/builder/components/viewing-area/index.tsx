import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useHeaderFormContext } from '../../contexts/header-form.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { generateSchema } from '../element/elements.schema';
import { FooterForm } from '../footer-form';
import { HeaderForm } from '../header-form';
import { usePagination } from '../../hooks/use-pagination';
import type { Element } from '../../types/element.type';

export function ViewingArea() {
  const { elements } = useDragDropContext();
  const { renderElement } = useRenderElement();
  const { formDataPreview } = useHeaderFormContext();

  const [schema, setSchema] = useState<z.ZodObject<z.ZodRawShape> | undefined>();

  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
  });

  useEffect(() => {
    setSchema(generateSchema(elements ?? []));
  }, []);

  const { paginatedData, pagination } = usePagination<Element>({
    data: elements,
    itemsPerPage: Number(formDataPreview?.itemsPerPage),
  });

  return (
    <FormProvider {...formMethods}>
      <Flex as={'form'} w={'full'} flexDir={'column'} gap={'1rem'} mb={'1rem'}>
        {formDataPreview?.name && (
          <HeaderForm formData={formDataPreview}>
            <Flex w={'full'} flexDir={'column'} gap={'1rem'}>
              {paginatedData.map((element) => (
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
              <FooterForm preview={true} pagination={pagination} />
            </Flex>
          </HeaderForm>
        )}
      </Flex>
    </FormProvider>
  );
}
