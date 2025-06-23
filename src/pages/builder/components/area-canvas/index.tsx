import { Center, Flex, Icon, Text } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { ConfigElement, type ConfigElementRef } from '../config-element';

export function AreaCanvas() {
  const { movedElement, elements, addElement } = useDragDropContext();
  const configElementRef = useRef<ConfigElementRef>(null);
  const { renderElement } = useRenderElement();

  const handleOnDrop = () => {
    if (movedElement) {
      addElement(movedElement);
      configElementRef.current?.open();
    }
  };

  return (
    <>
      <Flex
        padding={'1rem'}
        border="2px dashed"
        borderColor={'gray.300'}
        borderRadius="lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
      >
        {!elements.length ? (
          <Center w={'full'} h="300px" flexDirection="column" color="gray.500">
            <Icon as={Plus} boxSize={12} mb={4} opacity={0.5} />
            <Text fontSize="lg" fontWeight="medium" mb={2} textAlign={'center'}>
              Comece a construir seu formulário
            </Text>
            <Text fontSize="sm" textAlign="center" maxW="300px">
              Arraste elementos da barra lateral para criar seu formulário personalizado
            </Text>
          </Center>
        ) : (
          <Flex w={'full'} minH={'18.75rem'} flexDir={'column'} gap={'1rem'}>
            {elements.map((element) => renderElement(element))}
          </Flex>
        )}
      </Flex>
      <ConfigElement ref={configElementRef} />
    </>
  );
}
