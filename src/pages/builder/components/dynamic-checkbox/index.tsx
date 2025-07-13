import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Field, Stack, Text } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';

type DynamicCheckboxProps = {
  label: string;
  name: string;
  options: OptionType[];
  disabled: boolean;
  required: boolean;
  preview: boolean;
};

export function DynamicCheckbox({
  label,
  name,
  options,
  disabled,
  required,
  preview,
}: DynamicCheckboxProps) {
  const formContext = preview ? undefined : useFormContext();

  return formContext ? (
    <Field.Root
      required={required}
      invalid={!!formContext.formState.errors[name]?.message}
      disabled={disabled}
    >
      <Field.Label>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Controller
        name={name}
        control={formContext.control}
        render={({ field }) => {
          const currentValue: string[] = field.value ?? [];

          const handleChange = (value: string) => {
            const newValue = currentValue.includes(value)
              ? currentValue.filter((v) => v !== value)
              : [...currentValue, value];
            field.onChange(newValue);
          };

          return (
            <Stack w="full" align="start">
              {options.map((option) => (
                <Checkbox.Root
                  key={option.value}
                  size="sm"
                  checked={currentValue.includes(option.value ?? '')}
                  onCheckedChange={() => handleChange(option.value ?? '')}
                  disabled={disabled}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{option.label}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Stack>
          );
        }}
      />
      {/* <Field.ErrorText>{formContext.formState.errors[name]?.message as string}</Field.ErrorText> */}
    </Field.Root>
  ) : (
    <Stack w="full" align="start">
      {label && (
        <Text fontSize="sm" lineHeight="1.25rem" fontWeight="medium" textAlign="center">
          {label}
        </Text>
      )}
      {options.map((option) => (
        <Checkbox.Root key={option.value} size="sm" disabled={disabled}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>{option.label}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  );
}
