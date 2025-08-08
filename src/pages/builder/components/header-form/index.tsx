import { Flex, Box, Text } from '@chakra-ui/react';
import type { FormData } from '../../types/form-data.type';
import type { ReactNode } from 'react';

export function HeaderForm({ formData, children }: { formData: FormData; children: ReactNode }) {
  return (
    <Flex
      flexDir={'column'}
      gap={'1rem'}
      padding={'1rem'}
      borderRadius={8}
      border={'1px solid'}
      borderColor={'gray.200'}
      position={'relative'}
      alignItems={'center'}
      mb={'1rem'}
    >
      <Flex minW={'10rem'} maxW={'60rem'} flexDir={'column'} alignItems={'center'} gap={'1rem'}>
        <Box
          w={'full'}
          height={'10px'}
          position={'absolute'}
          bg={'blue.500'}
          top={0}
          left={0}
          borderTopRadius={8}
        />
        <Text fontSize={'lg'} fontWeight={'medium'}>
          {formData?.name}
        </Text>
        <Text fontSize={'sm'} fontWeight={'light'}>
          {formData?.description}
        </Text>
      </Flex>
      {children}
      <Box
        w={'full'}
        height={'10px'}
        position={'absolute'}
        bg={'blue.500'}
        bottom={0}
        borderBottomRadius={8}
      />
    </Flex>
  );
}
