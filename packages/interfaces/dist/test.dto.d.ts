import { z } from 'zod';
export declare const testValidationSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
}, {
    id: number;
    name: string;
}>;
export type TestDto = z.infer<typeof testValidationSchema>;
