import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./adapter/in/auth.controller";
import { LoginService } from "./application/services/login.service";
import { JwtRepository } from "./domain/repositories/jwt.repository";
import { JwtRepositoryAdapter } from "./infrastructure/jwt/jwt.repository.adapter";
import { AccessTokenStrategy } from "./infrastructure/strategy/access-token.strategy";
import { RefreshTokenStrategy } from "./infrastructure/strategy/refresh-token.strategy";

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: {
          expiresIn: Number(configService.get<number>("ACCESS_TOKEN_EXPIRES_IN")),
        },
      }),
    }),
  ],
  providers: [
    LoginService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: JwtRepository,
      useClass: JwtRepositoryAdapter,
    },
  ],
  controllers: [AuthController],
  exports: [JwtRepository],
})
export class AuthModule {}
