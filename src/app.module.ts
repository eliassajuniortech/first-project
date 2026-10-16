import { BadRequestException, HttpStatus, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { SecurityModule } from "./infrastructure/security/security.module";
import { UploadModule } from "./infrastructure/upload/upload.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    SecurityModule,
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,

        exceptionFactory: (errors) => {
          const errorFormat = errors.map((error) => ({
            label: error.property,
            message: Object.values(error.constraints ?? []),
          }));

          return new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            errorCode: "VALIDATION_ERROR",
            message: "Validation failed. Please check the provided fields.",
            errorFormat: errorFormat,
          });
        },
      }),
    },
  ],
})
export class AppModule {}
