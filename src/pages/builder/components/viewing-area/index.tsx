import { Flex, Text } from '@chakra-ui/react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { useHeaderFormContext } from '../../contexts/header-form.context';

export function ViewingArea() {
  const { elements } = useDragDropContext();
  const { renderElement } = useRenderElement();
  const { formData } = useHeaderFormContext();

  return (
    <Flex w={'full'} minH={'18.75rem'} flexDir={'column'} gap={'1rem'}>
      <Text fontSize={'lg'} fontWeight={'medium'}>
        {formData?.name}
      </Text>
      <Text fontSize={'sm'} fontWeight={'light'}>
        {formData?.description}
      </Text>
      {elements.map((element) => renderElement(element))}
    </Flex>
  );
}
