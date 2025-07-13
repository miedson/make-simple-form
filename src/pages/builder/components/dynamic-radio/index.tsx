import { Field, HStack, RadioGroup, VStack } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';
import { Controller, useFormContext } from 'react-hook-form';

type DynamicRadioProps = {
  label?: string;
  name: string;
  preview: boolean;
  options: OptionType[];
  disabled: boolean;
  required: boolean;
};

export function DynamicRadio({
  label,
  name,
  preview,
  options,
  disabled,
  required,
}: DynamicRadioProps) {
  const formContext = preview ? undefined : useFormContext();
  return (
    <VStack w={'full'}>
      <Field.Root
        invalid={formContext ? !!formContext?.formState.errors[name]?.message : false}
        disabled={disabled}
        required={required}
      >
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
        {formContext ? (
          <Controller
            name={name}
            control={formContext?.control}
            render={({ field }) => (
              <RadioGroup.Root
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value);
                }}
              >
                <HStack gap="6">
                  {options.map((option) => (
                    <RadioGroup.Item key={option.value} value={option.value ?? ''} disabled={disabled}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            )}
          />
        ) : (
          <RadioGroup.Root defaultValue="1">
            <HStack gap="6">
              {options.map((option) => (
                <RadioGroup.Item key={option.value} value={option.value ?? ''} disabled={disabled}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        )}
      </Field.Root>
    </VStack>
  );
}
