import { AuthGuard } from "@nestjs/passport";
import { TokenAuthenticationException } from "../../../../infrastructure/http/exceptions/token-authentication.exception";
import { AuthenticatedUser } from "../types/authenticated-user.type";

export class AccessTokenGuard extends AuthGuard("access_token") {
  public handleRequest<TUser = AuthenticatedUser>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new TokenAuthenticationException("access");
    }
    return user;
  }
}
