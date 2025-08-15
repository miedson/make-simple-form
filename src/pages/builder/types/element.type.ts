export type Element = {
  id: string;
  type: AvailableTypes;
  label?: string | null;
  name?: string;
  placeholder?: string | null;
  options?: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  isPreview?: boolean;
  multiple?: boolean;
};

export type AvailableTypes = 'input' | 'select' | 'radio' | 'checkbox' | 'textarea';
