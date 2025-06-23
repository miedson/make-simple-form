import { createListCollection, Portal, Select } from '@chakra-ui/react';
import type { OptionType } from '../../types/options.type';

type DynamicSelectProps = {
  label: string;
  placeholder: string;
  options: OptionType[];
};

export function DynamicSelect({ label, placeholder, options }: DynamicSelectProps) {
  const optionsCollection = createListCollection<OptionType>({
    items: options,
  });

  return (
    <Select.Root collection={optionsCollection} size="sm" width="320px">
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
