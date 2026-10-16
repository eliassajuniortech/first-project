import { Global, Module } from "@nestjs/common";
import { HashingRepository } from "./hashing/hashing.repository";
import { HashingService } from "./hashing/hashing.service";

@Module({
  providers: [
    {
      provide: HashingRepository,
      useClass: HashingService,
    },
  ],
  exports: [HashingRepository],
})
@Global()
export class SecurityModule {}
