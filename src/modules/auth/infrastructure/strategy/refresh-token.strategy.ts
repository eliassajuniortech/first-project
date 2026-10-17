import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../../domain/repositories/types/payload.type";

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

  public async validate(payload: Payload): Promise<{ id: string; email: string }> {
    return { id: payload.sub, email: payload.email };
  }
}
