import { HttpException, HttpStatus } from "@nestjs/common";

export class RateLimitException extends HttpException {
  constructor() {
    super({ errorCode: "TOO_MANY_REQUESTS", message: "Too many requests. Please try again later." }, HttpStatus.TOO_MANY_REQUESTS);
  }
}
