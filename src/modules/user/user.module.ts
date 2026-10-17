import { forwardRef, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./adapter/in/user.controller";
import { UserRepositoryAdapter } from "./adapter/out/persistence/user.repository.adapter";
import { RegisterUserService } from "./application/services/register-user.service";
import { UserRepository } from "./domain/repositories/user.repository";
import { InvalidEmailFilter } from "./infrastructure/filter/invalid-email.filter";
import { InvalidPhoneFilter } from "./infrastructure/filter/invalid-phone.filter";
import { UserAlreadyExistsFilter } from "./infrastructure/filter/user-already-exists.filter";

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
