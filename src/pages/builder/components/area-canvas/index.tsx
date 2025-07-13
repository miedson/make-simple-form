import { Center, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useColorModeValue } from '../../../../components/ui/color-mode';
import { useDragDropContext } from '../../contexts/drag-drop.context';
import { useRenderElement } from '../../hooks/use-render-element';
import { ConfigElement, type ConfigElementRef } from '../config-element';

export function AreaCanvas() {
  const [dragOver, setDragOver] = useState(false);
  const { movedElement, elements, addElement, removeElementById } = useDragDropContext();
  const configElementRef = useRef<ConfigElementRef>(null);
  const { renderElement } = useRenderElement();

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const dragBorderColor = useColorModeValue('blue.400', 'blue.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const dragBgColor = useColorModeValue('blue.50', 'blue.900');
  const emptyBgColor = useColorModeValue('gray.50', 'gray.700');
  const borderHoverColor = useColorModeValue('blue.600', 'transparent');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleOnDrop = () => {
    if (movedElement) {
      addElement(movedElement);
      configElementRef.current?.open();
      setDragOver(false);
    }
  };

  return (
    <>
      <Flex
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        padding={'1rem'}
        border="2px dashed"
        borderColor={dragOver ? dragBorderColor : borderColor}
        bg={dragOver ? dragBgColor : !elements.length ? emptyBgColor : bgColor}
        borderRadius="lg"
        onDrop={handleOnDrop}
        transition="all 0.2s"
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
            {elements.map((element) => (
              <Flex
                key={element.id}
                w={'full'}
                border="2px dashed"
                borderColor={'transparent'}
                _hover={element.isPreview ? { borderColor: borderHoverColor } : {}}
                p={'0.5rem'}
                borderRadius="lg"
                transition="all 0.2s"
                position={'relative'}
                className="group"
              >
                {element.isPreview && (
                  <IconButton
                    aria-label="Remover elemento"
                    size="sm"
                    bg={'red.600'}
                    position="absolute"
                    top="-2"
                    right="-2"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    onClick={() => removeElementById(element.id)}
                    transition="opacity 0.2s"
                    zIndex={1}
                  >
                    <X size={16} />
                  </IconButton>
                )}
                {renderElement(element)}
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
      <ConfigElement ref={configElementRef} />
    </>
  );
}
