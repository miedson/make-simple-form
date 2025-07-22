import { Field, HStack, RadioGroup, VStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import type { DynamicProps } from '../../types/dynamic-props';

export function DynamicRadio({
  label,
  name,
  preview,
  options,
  disabled,
  required,
}: DynamicProps) {
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
                    <RadioGroup.Item
                      key={option.value}
                      value={option.value ?? ''}
                      disabled={disabled}
                    >
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
