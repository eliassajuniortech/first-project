import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtRepository } from "./domain/repositories/jwt.repository";
import { JwtRepositoryAdapter } from "./infrastructure/jwt/jwt.repository.adapter";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: {
          expiresIn: configService.get<number>("ACCESS_TOKEN_EXPIRES_IN"),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: JwtRepository,
      useClass: JwtRepositoryAdapter,
    },
  ],
  exports: [JwtRepository],
})
export class AuthModule {}
