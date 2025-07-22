import { useDeepCompareCallback } from 'use-deep-compare';
import { DynamicCheckbox } from '../components/dynamic-checkbox';
import { DynamicInput } from '../components/dynamic-input';
import { DynamicRadio } from '../components/dynamic-radio';
import { DynamicSelect } from '../components/dynamic-select';
import { DynamicTextarea } from '../components/dynamic-textarea';
import type { AvailableTypes, Element } from '../types/element.type';
import { FileUploadElement } from '../components/file-upload-element';
import { ContainerElement } from '../components/container-element';
import type { JSX } from '@emotion/react/jsx-runtime';
import { DateElement } from '../components/date';

export function useRenderElement() {
  const renderElement = useDeepCompareCallback((element: Element) => {
    const props = {
      label: element.label ?? '',
      name: element.id ?? '',
      placeholder: element.placeholder ?? '',
      preview: element.isPreview ?? false,
      disabled: element?.isPreview ?? false,
      required: element.required ?? false,
      view: element.isView ?? false,
      options: element.options ?? [],
    };

    const elementsList: Record<AvailableTypes, JSX.Element> = {
      input: <DynamicInput key={element.id} {...props} />,
      select: <DynamicSelect key={element.id} {...props} />,
      radio: <DynamicRadio key={element.id} {...props} />,
      checkbox: <DynamicCheckbox key={element.id} {...props} />,
      textarea: <DynamicTextarea key={element.id} {...props} />,
      file: <FileUploadElement key={element.id} {...props} />,
      date: <DateElement key={element.id} {...props} />,
      container: <ContainerElement key={element.id} elementId={element.id} columns={element.columns} {...props} />
    };

    return elementsList[element?.type] ?? null;
  }, []);

  return { renderElement };
}
