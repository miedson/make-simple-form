import { HStack, RadioGroup, VStack, Text } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';

type DynamicRadioProps = {
  label?: string;
  options: OptionType[];
  disabled: boolean;
};

export function DynamicRadio({ label, options, disabled }: DynamicRadioProps) {
  return (
    <VStack alignItems={'start'} w={'full'}>
      {label && (
        <Text fontSize={'sm'} lineHeight={'1.25rem'} fontWeight={'medium'} textAlign={'center'}>
          {label}
        </Text>
      )}
      <RadioGroup.Root defaultValue="1">
        <HStack gap="6">
          {options.map((option) => (
            <RadioGroup.Item key={option.value} value={option.value ?? ''} disabled={disabled}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </HStack>
      </RadioGroup.Root>
    </VStack>
  );
}
