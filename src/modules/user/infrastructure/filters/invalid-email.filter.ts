import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { InvalidEmailError } from "../../domain/errors/invalid-email.error";

@Catch(InvalidEmailError)
export class InvalidEmailFilter implements ExceptionFilter {
  public catch(exception: InvalidEmailError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    return response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: "INVALID_EMAIL",
      message: exception.message,
    });
  }
}
