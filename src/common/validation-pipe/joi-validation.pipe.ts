import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private joiSchema: Joi.ObjectSchema<any>) {}

  public transform(value: unknown) {
    const result = this.joiSchema.validate(value);

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
