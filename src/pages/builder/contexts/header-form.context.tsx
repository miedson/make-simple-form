import { createContext, useContext, useState, type ReactNode } from 'react';

type FormData = {
  name: string;
  description: string | null;
};

type FormContexType = {
  formData: FormData | undefined;
  setFormData: (data: FormData) => void;
};

const FormContext = createContext<FormContexType>({} as FormContexType);

export function FormContexProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>();

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
}

export const useHeaderFormContext = () => useContext(FormContext);
