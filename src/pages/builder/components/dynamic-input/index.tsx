import { Field, Input, VStack, type InputProps } from '@chakra-ui/react';

type DynamicRadioProps = {
  label: string;
  disabled: boolean;
} & InputProps;

export function DynamicInput({ label, disabled, ...props }: DynamicRadioProps) {
  return (
    <VStack w={'full'}>
      <Field.Root orientation="vertical" disabled={disabled}>
        <Field.Label>{label}</Field.Label>
        <Input {...props} />
      </Field.Root>
    </VStack>
  );
}
