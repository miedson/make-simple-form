import { Field, Input, VStack } from '@chakra-ui/react';

type DynamicRadioProps = {
  label: string;
  name: string;
  placeholder: string;
};

export function DynamicInput({ label, placeholder, name }: DynamicRadioProps) {
  return (
    <VStack w={'full'}>
      <Field.Root orientation="vertical">
        <Field.Label>{label}</Field.Label>
        <Input placeholder={placeholder} name={name} />
      </Field.Root>
    </VStack>
  );
}
