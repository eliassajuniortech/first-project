import { forwardRef, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./adapter/user.controller";
import { RegisterUserService } from "./application/services/register-user.service";
import { UserRepository } from "./domain/repositories/user.repository";
import { InvalidEmailFilter } from "./infrastructure/filters/invalid-email.filter";
import { InvalidPhoneFilter } from "./infrastructure/filters/invalid-phone.filter";
import { UserAlreadyExistsFilter } from "./infrastructure/filters/user-already-exists.filter";
import { UserRepositoryAdapter } from "./infrastructure/persistences/user.repository.adapter";

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [
    RegisterUserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryAdapter,
    },

    // Custom filters:
    {
      provide: APP_FILTER,
      useClass: UserAlreadyExistsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InvalidEmailFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InvalidPhoneFilter,
    },
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
