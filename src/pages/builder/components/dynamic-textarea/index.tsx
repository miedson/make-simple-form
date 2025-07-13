import { Controller, useFormContext } from 'react-hook-form';
import { Field, Textarea, VStack } from '@chakra-ui/react';

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

  return formContext ? (
    <VStack w="full">
      <Field.Root
        orientation="vertical"
        required={required}
        disabled={disabled}
        invalid={!!formContext.formState.errors[name]?.message}
      >
        <Field.Label>
          {label}
          {required && <Field.RequiredIndicator />}
        </Field.Label>
        <Controller
          name={name}
          control={formContext.control}
          render={({ field }) => (
            <Textarea
              {...field}
              size="xl"
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        />
        {/* <Field.ErrorText>{formContext.formState.errors[name]?.message as string}</Field.ErrorText> */}
      </Field.Root>
    </VStack>
  ) : (
    <VStack w="full">
      <Field.Root orientation="vertical" disabled={disabled}>
        <Field.Label>{label}</Field.Label>
        <Textarea size="xl" placeholder={placeholder} name={name} disabled={disabled} />
      </Field.Root>
    </VStack>
  );
}
