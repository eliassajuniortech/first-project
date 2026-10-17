import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { InvalidPhoneError } from "../../domain/errors/invalid-phone.error";

@Catch(InvalidPhoneError)
export class InvalidPhoneFilter implements ExceptionFilter {
  public catch(exception: InvalidPhoneError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    return response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: "INVALID_PHONE",
      message: exception.message,
    });
  }
}
