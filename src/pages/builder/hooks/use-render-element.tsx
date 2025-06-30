import { useDeepCompareCallback } from 'use-deep-compare';
import { DynamicCheckbox } from '../components/dynamic-checkbox';
import { DynamicInput } from '../components/dynamic-input';
import { DynamicRadio } from '../components/dynamic-radio';
import { DynamicSelect } from '../components/dynamic-select';
import { DynamicTextarea } from '../components/dynamic-textarea';
import type { Element } from '../types/element.type';

export function useRenderElement() {
  const renderElement = useDeepCompareCallback((element: Element) => {
    const props = {
      label: element.label ?? '',
      name: element.name ?? '',
      placeholder: element.placeholder ?? '',
      isPreview: element.isPreview,
      disabled: element?.isPreview ?? false,
      options: element.options ?? [],
    };

    const elementsList = {
      input: <DynamicInput key={element.id} {...props} />,
      select: <DynamicSelect key={element.id} {...props} />,
      radio: <DynamicRadio key={element.id} {...props} />,
      checkbox: <DynamicCheckbox key={element.id} {...props} />,
      textarea: <DynamicTextarea key={element.id} {...props} />,
    };

    return elementsList[element?.type] ?? null;
  }, []);

  return { renderElement };
}
