import { ValidationPipe } from "@nestjs/common";
import { DtoValidationException } from "../exceptions/dto-validation.exception";

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,

      exceptionFactory: (errors) => {
        const errorFormat = errors.map((error) => ({
          label: error.property,
          message: Object.values(error.constraints ?? {}),
        }));
        return new DtoValidationException(errorFormat);
      },
    });
  }
}
