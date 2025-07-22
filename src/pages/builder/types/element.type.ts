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
  isView?: boolean;
  parentId?: string; 
  columns?: string | null;
  elements?: Element[];
};

export type AvailableTypes = 'input' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file' | 'date' | 'container';
