import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorFormat } from "../types/error-code.type";

export class DtoValidationException extends HttpException {
  constructor(errorFormat: ErrorFormat) {
    super({ errorCode: "DTO_VALIDATION_FAILED", message: "Falha na validação. Verifique os campos informados.", errorFormat: errorFormat }, HttpStatus.BAD_REQUEST);
  }
}
