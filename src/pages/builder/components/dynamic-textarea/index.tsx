import { Field, Textarea, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type DynamicTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  preview: boolean;
};

export function DynamicTextarea({
  label,
  name,
  placeholder,
  disabled,
  required,
  preview,
}: DynamicTextareaProps) {
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
