import { z } from 'zod';

export const getMovedElementValidationSchema = (type?: string) => {
  return z
    .object({
      label: z.string().optional(),
      placeholder: z.string().nullable().optional(),
      options: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        )
        .optional(),
      required: z.boolean().optional(),
      isColumns: z.boolean().optional(),
      columns: z.string().min(1).max(2).optional(),
    })
    .superRefine((data, ctx) => {
      const isContainer = type === 'container';

      if (isContainer) {
        if (data.isColumns && (data.columns === undefined || data.columns === null)) {
          ctx.addIssue({
            path: ['columns'],
            code: z.ZodIssueCode.custom,
            message: 'O número de colunas é obrigatório quando "Colunas" está ativado.',
          });
        }
        return;
      }

      if (!data.label || data.label.trim() === '') {
        ctx.addIssue({
          path: ['label'],
          code: z.ZodIssueCode.custom,
          message: 'Informe um título para o campo.',
        });
      }

      if (['select', 'radio', 'checkbox'].includes(type ?? '') && !data.options?.length) {
        ctx.addIssue({
          path: ['options'],
          code: z.ZodIssueCode.custom,
          message: 'Preencha ao menos uma opção.',
        });
      }
    });
};

export type MovedElementValidationData = z.infer<ReturnType<typeof getMovedElementValidationSchema>>;