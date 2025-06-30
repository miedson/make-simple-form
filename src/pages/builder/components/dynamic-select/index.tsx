import { createListCollection, Portal, Select } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';

type DynamicSelectProps = {
  label: string;
  placeholder: string;
  disabled: boolean;
  options: OptionType[];
};

export function DynamicSelect({ label, placeholder, disabled, options }: DynamicSelectProps) {
  const optionsCollection = createListCollection<OptionType>({
    items: options,
  });

  return (
    <Select.Root disabled={disabled} collection={optionsCollection} size="sm" width="full">
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
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
  );
}
