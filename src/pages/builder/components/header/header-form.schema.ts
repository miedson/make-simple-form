import { z } from 'zod';

export const headerFormSchema = z.object({
  name: z.string().nonempty({ message: 'Informe um nome para o formulário' }),
  description: z.string().nullable(),
});

export type HeaderFormData = z.infer<typeof headerFormSchema>;
