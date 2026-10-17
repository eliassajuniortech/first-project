import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenAuthenticationException extends HttpException {
  constructor(type: "access" | "refresh") {
    super({ errorCode: `INVALID_${type.toLocaleUpperCase()}_TOKEN`, message: "Token inválido ou expirado." }, HttpStatus.UNAUTHORIZED);
  }
}
