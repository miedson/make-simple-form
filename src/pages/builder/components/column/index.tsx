import { Flex, Text, Heading, type FlexProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ColumnProps = {
  heading: string;
  description: string;
  children: ReactNode;
} & FlexProps;

export function Column({ heading, description, children, ...props }: ColumnProps) {
  return (
    <Flex
      flexDir={'column'}
      borderRight={'1px solid'}
      borderColor={'gray.200'}
      {...props}
    >
      <Flex
        padding={'1rem'}
        flexDir={'column'}
      >
        <Heading size={'md'} color={'gray.700'}>
          {heading}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Flex>
      <Flex
        paddingBlock={3}
        paddingInline={6}
        gap={2}
        flexDir={'column'}
        overflow={'auto'}
      >{children}
      </Flex>
    </Flex>
  );
}
