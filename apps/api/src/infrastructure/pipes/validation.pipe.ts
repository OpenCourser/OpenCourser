import { UsePipes, PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private validationSchema: ZodSchema) {}

  async transform(value: unknown): Promise<unknown> {
    const result = await this.validationSchema.spa(value);
    const { success } = result;

    if (!success) {
      throw new BadRequestException(result.error);
    }

    return result.data;
  }
}

export const Validation = (schema: ZodSchema) => UsePipes(new ValidationPipe(schema));
