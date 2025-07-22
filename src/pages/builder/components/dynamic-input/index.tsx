import { Field, Input, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type DynamicRadioProps = {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  preview: boolean;
};

export function DynamicInput({
  label,
  name,
  placeholder,
  disabled,
  required,
  preview,
}: DynamicRadioProps) {
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
          <Input {...formContext?.register(name)} placeholder={placeholder} />
        ) : (
          <Input name={name} placeholder={placeholder} />
        )}
      </Field.Root>
    </VStack>
  );
}
