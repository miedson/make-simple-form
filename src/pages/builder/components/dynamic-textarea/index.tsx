import { Field, Textarea, VStack } from '@chakra-ui/react';

type DynamicTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
};

export function DynamicTextarea({ label, placeholder, name, disabled }: DynamicTextareaProps) {
  return (
    <VStack w={'full'}>
      <Field.Root orientation="vertical" disabled={disabled}>
        <Field.Label>{label}</Field.Label>
        <Textarea size="xl" placeholder={placeholder} name={name} />
      </Field.Root>
    </VStack>
  );
}
