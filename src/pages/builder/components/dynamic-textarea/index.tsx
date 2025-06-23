import { Field, Textarea, VStack } from '@chakra-ui/react';

type DynamicTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
};

export function DynamicTextarea({ label, placeholder, name }: DynamicTextareaProps) {
  return (
    <VStack>
      <Field.Root orientation="vertical">
        <Field.Label>{label}</Field.Label>
        <Textarea size="xl" placeholder={placeholder} name={name} />
      </Field.Root>
    </VStack>
  );
}
