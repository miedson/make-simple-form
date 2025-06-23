import { z } from 'zod';

export const movedElementValidationSchema = z.object({
  label: z.string().nullable(),
  name: z.string().nullable(),
  placeholder: z.string().nullable(),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  required: z.boolean().optional(),
});

export type MovedElementValidationData = z.infer<typeof movedElementValidationSchema>;
