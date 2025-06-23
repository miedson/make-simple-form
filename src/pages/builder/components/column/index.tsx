import { Flex, Text, Heading, type FlexProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ColumnProps = {
  heading: string;
  description: string;
  children: ReactNode;
} & Pick<FlexProps, 'bg' | 'backgroundColor'>;

export function Column({ heading, description, children, ...props }: ColumnProps) {
  return (
    <Flex
      flexDir={'column'}
      flex={1}
      p={6}
      gap={2}
      borderRight={'1px solid'}
      borderColor={'gray.200'}
      {...props}
    >
      <Flex flexDir={'column'} mb={'1rem'}>
        <Heading size={'md'} color={'gray.700'}>
          {heading}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
}
