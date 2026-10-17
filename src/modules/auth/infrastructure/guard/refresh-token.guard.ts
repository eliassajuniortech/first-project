import { AuthGuard } from "@nestjs/passport";
import { TokenAuthenticationException } from "../../../../infrastructure/http/exceptions/token-authentication.exception";
import { AuthenticatedUser } from "../types/authenticated-user.type";

export class RefreshTokenGuard extends AuthGuard("refresh_token") {
  public handleRequest<TUser = AuthenticatedUser>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new TokenAuthenticationException("refresh");
    }
    return user;
  }
}
