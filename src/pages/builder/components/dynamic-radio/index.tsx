import { HStack, RadioGroup, VStack, Text, Fieldset } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';
import { Controller, useFormContext } from 'react-hook-form';

type DynamicRadioProps = {
  label?: string;
  name: string;
  preview: boolean;
  options: OptionType[];
  disabled: boolean;
};

export function DynamicRadio({ label, name, preview, options, disabled }: DynamicRadioProps) {
  const formContext = preview ? undefined : useFormContext();
  return (
    formContext ? (<Fieldset.Root invalid={!!formContext?.formState.errors.value}>
      <Fieldset.Legend>{label}</Fieldset.Legend>
      <Controller
        name={name}
        control={formContext?.control}
        render={({ field }) => (
          <RadioGroup.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value)
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
    </Fieldset.Root>) : (
      <Fieldset.Root invalid={false}>
        <Fieldset.Legend>{label}</Fieldset.Legend>
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
      </Fieldset.Root>
    )
  );
}
