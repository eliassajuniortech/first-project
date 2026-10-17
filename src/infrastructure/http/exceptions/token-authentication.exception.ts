import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenAuthenticationException extends HttpException {
  constructor(type: "access" | "refresh") {
    super({ errorCode: `INVALID_${type.toLocaleUpperCase()}_TOKEN`, message: "Invalid or expired token." }, HttpStatus.UNAUTHORIZED);
  }
}
