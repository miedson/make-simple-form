import { Checkbox, For, Stack, Text } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';

type DynamicCheckboxProps = {
  label: string;
  options: OptionType[];
  disabled: boolean
};

export function DynamicCheckbox({ label, options, disabled }: DynamicCheckboxProps) {
  return (
    <Stack w={'full'} align={'start'}>
      {label && (
        <Text fontSize={'sm'} lineHeight={'1.25rem'} fontWeight={'medium'} textAlign={'center'}>
          {label}
        </Text>
      )}
      <For each={options}>
        {(option) => (
          <Checkbox.Root size={'sm'} key={option.value} disabled={disabled}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
    </Stack>
  );
}
