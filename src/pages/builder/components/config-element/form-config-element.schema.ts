import { z } from 'zod';

export const movedElementValidationSchema = z.object({
  label: z.string().nonempty({ message: 'Informe um titulo para o campo' }),
  placeholder: z.string().nullable(),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .refine(
      (options) => options.every((option) => option.label.length > 0 && option.value.length > 0),
      {
        message: 'Todas as opções devem ter descrição e valor preenchidos.',
      }
    )
    .optional(),
  multiple: z.boolean().optional(),
  required: z.boolean().optional(),
});

export type MovedElementValidationData = z.infer<typeof movedElementValidationSchema>;
