import { Field, Textarea, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import type { DynamicProps } from '../../types/dynamic-props';

export function DynamicTextarea({
  label,
  name,
  placeholder,
  disabled,
  required,
  preview,
}: DynamicProps) {
  const formContext = preview ? undefined : useFormContext();
  return (
    <VStack w={'full'}>
      <Field.Root
        orientation="vertical"
        required={required}
        disabled={disabled}
        invalid={formContext ? !!formContext?.formState.errors[name]?.message : false}
      >
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
        {formContext ? (
          <Textarea {...formContext?.register(name)} placeholder={placeholder} />
        ) : (
          <Textarea name={name} placeholder={placeholder} />
        )}
      </Field.Root>
    </VStack>
  );
}
