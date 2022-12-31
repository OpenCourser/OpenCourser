import { z } from 'zod';

export const testValidationSchema = z
  .object({
    id: z.number().min(0).max(100),
    name: z.string().min(1).max(16),
  })
  .required();

export type TestDto = z.infer<typeof testValidationSchema>;
