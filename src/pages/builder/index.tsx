import { Flex } from '@chakra-ui/react';
import { BuilderBody } from './components/body';
import { BuilderHeader } from './components/header';

export function BuilderPage() {
  return (
    <Flex h={'100vh'} flexDir={'column'} overflow={'hidden'}>
      <BuilderHeader />
      <BuilderBody />
    </Flex>
  );
}
