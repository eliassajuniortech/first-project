import { HttpException, HttpStatus } from "@nestjs/common";

export class RateLimitException extends HttpException {
  constructor() {
    super({ errorCode: "TOO_MANY_REQUESTS", message: "Muitas solicitações. Tente novamente mais tarde." }, HttpStatus.TOO_MANY_REQUESTS);
  }
}
