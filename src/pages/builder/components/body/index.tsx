import { Flex } from '@chakra-ui/react';
import { Column } from '../column';
import { Element } from '../element';
import { Type, ChevronDown, Circle, AlignLeft, CheckSquare } from 'lucide-react';
import { AreaCanvas } from '../area-canvas';
import { ViewingArea } from '../viewing-area';

export function BuilderBody() {
  return (
    <Flex h={'full'} minH={0} bg={'gray.50'}>
      <Column
        heading="Elementos do Formulário"
        description="Arraste os elementos para o canvas para construir seu formulário"
        flex={1}
      >
        <Element name="Campo de texto" icon={Type} type="input" />
        <Element name="Lista de opções" icon={ChevronDown} type="select" />
        <Element name="Escolha única" icon={Circle} type="radio" />
        <Element name="Múltiplas escolhas" icon={CheckSquare} type="checkbox" />
        <Element name="Texto longo" icon={AlignLeft} type="textarea" />
      </Column>
      <Column
        heading="Canvas do Formulário"
        description="Arraste elementos aqui para construir seu formulário"
        flex={1}
      >
        <AreaCanvas />
      </Column>
      <Column
        heading="Visualização"
        description="Visualização ao vivo do seu formulário"
        bg={'white'}
        flex={1}
      >
        <ViewingArea />
      </Column>
    </Flex>
  );
}
