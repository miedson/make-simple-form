import { Button, Flex } from '@chakra-ui/react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useHeaderFormContext } from '../../contexts/header-form.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { HeaderForm } from '../header-form';

export function ViewingArea() {
  const { elements } = useDragDropContext();
  const { renderElement } = useRenderElement();
  const { formDataPreview } = useHeaderFormContext();

  return (
    <Flex w={'full'} flexDir={'column'} gap={'1rem'} mb={'1rem'}>
      {formDataPreview?.name && <HeaderForm formData={formDataPreview} />}
      <Flex flexDir={'column'} gap={'1rem'}>
        {elements.map((element) => (
          <Flex
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
      {formDataPreview && <Button>Enviar</Button>}
    </Flex>
  );
}
