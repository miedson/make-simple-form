import { Checkbox, CheckboxGroup, Field, Fieldset, Stack } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
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

  const optionsController =
    formContext &&
    useController({
      control: formContext?.control,
      name,
    });

  return formContext ? (
    <Fieldset.Root w={'full'}>
      <Field.Root required={required}>
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
      </Field.Root>
      <CheckboxGroup
        invalid={formContext ? !!formContext.formState.errors[name]?.message : false}
        value={optionsController?.field.value}
        onValueChange={optionsController?.field.onChange}
        name={optionsController?.field.name}
      >
        <Fieldset.Content>
          {options.map((item) => (
            <Checkbox.Root key={item.value} value={item.value}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{item.label}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  ) : (
    <Field.Root w={'full'} required={required} disabled={disabled}>
      <Field.Label>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Stack w="full" align="start">
        {options.map((option) => (
          <Checkbox.Root key={option.value} size="sm" disabled={disabled}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
          </Checkbox.Root>
        ))}
      </Stack>
    </Field.Root>
  );
}
