import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtRepository } from "../../domain/repositories/jwt.repository";
import { Payload } from "../../domain/repositories/types/payload.type";

@Injectable()
export class JwtRepositoryAdapter implements JwtRepository {
  private readonly jwtService: JwtService;
  private readonly configService: ConfigService;

  constructor(jwtService: JwtService, configService: ConfigService) {
    this.jwtService = jwtService;
    this.configService = configService;
  }

  public async generateAccessToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      expiresIn: this.configService.get<number>("ACCESS_TOKEN_EXPIRES_IN"),
    });
  }
  public async generateRefreshToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<number>("REFRESH_TOKEN_EXPIRES_IN"),
    });
  }
}
