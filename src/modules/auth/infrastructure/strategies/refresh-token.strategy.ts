import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../../domain/types/payload.type";
import { AuthenticatedUser } from "../types/authenticated-user.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh_token") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.refresh_token;
        },
      ]),
      secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET")!,
      ignoreExpiration: false,
    });
  }

  public async validate(payload: Payload): Promise<AuthenticatedUser> {
    return { id: payload.sub, email: payload.email };
  }
}
