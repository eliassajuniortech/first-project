import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { UserAlreadyExistsError } from "../../application/errors/user-already-exists.error";

@Catch(UserAlreadyExistsError)
export class UserAlreadyExistsFilter implements ExceptionFilter {
  public catch(exception: UserAlreadyExistsError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    return response.status(HttpStatus.CONFLICT).json({
      errorCode: "USER_ALREADY_EXISTS",
      message: exception.message,
    });
  }
}
