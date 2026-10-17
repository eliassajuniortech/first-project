import { HttpException, HttpStatus } from "@nestjs/common";

export class DtoValidationException extends HttpException {
  constructor(errorFormat: { label: string; message: string[] }[]) {
    super({ errorCode: "DTO_VALIDATION_FAILED", message: "Validation failed. Please check the provided fields.", errorFormat: errorFormat }, HttpStatus.BAD_REQUEST);
  }
}
