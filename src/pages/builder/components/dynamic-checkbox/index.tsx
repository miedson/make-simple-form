import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Field, Stack, VStack } from '@chakra-ui/react';
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

  return (
    <VStack w={'full'}>
      <Field.Root
        required={required}
        invalid={formContext ? !!formContext.formState.errors[name]?.message : false}
        disabled={disabled}
      >
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
        {formContext ? (
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
        ) : (
          <Stack w="full" align="start">
            {options.map((option) => (
              <Checkbox.Root key={option.value} size="sm" disabled={disabled}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{option.label}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Stack>
        )}
      </Field.Root>
    </VStack>
  );
}
