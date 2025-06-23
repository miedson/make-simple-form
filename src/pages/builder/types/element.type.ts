export type Element = {
  id: string;
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'textarea';
  label?: string | null;
  name?: string | null;
  placeholder?: string | null;
  options?: {
    label: string;
    value: string;
  }[];
  required?: boolean;
};
