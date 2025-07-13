import { createListCollection, Field, Portal, Select, VStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import type { OptionType } from '../../types/options.type';

type DynamicSelectProps = {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  preview: boolean;
  options: OptionType[];
};

export function DynamicSelect({
  label,
  name,
  placeholder,
  disabled,
  required,
  preview,
  options,
}: DynamicSelectProps) {
  const formContext = preview ? undefined : useFormContext();
  const optionsCollection = createListCollection<OptionType>({
    items: options,
  });

  return (
    <VStack w={'full'}>
      <Field.Root
        required={required}
        invalid={formContext ? !!formContext?.formState.errors[name]?.message : false}
        disabled={disabled}
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
              <Select.Root
                collection={optionsCollection}
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  console.log(value);
                  return field.onChange(value);
                }}
                onInteractOutside={() => field.onBlur()}
                size="sm"
                width="full"
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {optionsCollection.items.map((option) => (
                        <Select.Item item={option} key={option.value}>
                          {option.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
        ) : (
          <Select.Root disabled={disabled} collection={optionsCollection} size="sm" width="full">
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {optionsCollection.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      </Field.Root>
    </VStack>
  );
}

