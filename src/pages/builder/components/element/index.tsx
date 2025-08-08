import { Flex, Icon, Text } from '@chakra-ui/react';
import type { ElementType } from 'react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import type { Element } from '../../types/element.type';
import { useColorModeValue } from '../../../../components/ui/color-mode';

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
      isPreview: true,
    });
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.400');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const iconColor = useColorModeValue('gray.500', 'gray.400');
  const hoverTextColor = useColorModeValue('blue.600', 'blue.300');
  const hoverIconColor = useColorModeValue('blue.500', 'blue.400');

  return (
    <Flex
      maxW={'26rem'}
      bg={bgColor}
      borderRadius="lg"
      border={'1px solid'}
      borderColor={borderColor}
      cursor="grab"
      _active={{ cursor: 'grabbing' }}
      _hover={{
        borderColor: hoverBorderColor,
        shadow: 'md',
        '& .drag-icon': { color: hoverIconColor },
        '& .drag-text': { color: hoverTextColor },
      }}
      transition="all 0.2s"
      padding={'1rem'}
      gap={'1rem'}
      alignItems={'center'}
      draggable
      onDragStart={handleDragStart}
    >
      <Icon as={icon} boxSize={5} color={iconColor} className="drag-icon" transition="color 0.2s" />
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={textColor}
        className="drag-text"
        transition="color 0.2s"
      >
        {name}
      </Text>
    </Flex>
  );
}
