import { Flex, Icon, Text } from '@chakra-ui/react';
import type { ElementType } from 'react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import type { Element } from '../../types/element.type';

type ElementProps = {
  icon: ElementType;
  name: string;
  type: Element['type'];
};

export function Element({ name, icon, type }: ElementProps) {
  const { setMovedElement } = useDragDropContext();

  const handleDragStart = () => {
    setMovedElement({
      id: crypto.randomUUID(),
      type,
    });
  };

  return (
    <Flex
      maxW={'20rem'}
      bg={'white'}
      borderRadius="lg"
      border={'1px solid'}
      borderColor={'gray.200'}
      cursor="grab"
      padding={'1rem'}
      gap={'1rem'}
      draggable
      onDragStart={handleDragStart}
    >
      <Icon
        as={icon}
        boxSize={5}
        color={'gray.500'}
        className="drag-icon"
        transition="color 0.2s"
      />
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={'gray.700'}
        className="drag-text"
        transition="color 0.2s"
      >
        {name}
      </Text>
    </Flex>
  );
}
