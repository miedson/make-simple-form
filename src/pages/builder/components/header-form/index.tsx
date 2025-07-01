import { Flex, Box, Text } from '@chakra-ui/react';
import type { FormData } from '../../types/form-data.type';

export function HeaderForm({ formData }: { formData: FormData }) {
  return (
    <Flex
      flexDir={'column'}
      gap={'1rem'}
      padding={'1rem'}
      borderRadius={8}
      border={'1px solid'}
      borderColor={'gray.200'}
      position={'relative'}
    >
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
  );
}
