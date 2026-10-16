import { Global, Module } from "@nestjs/common";
import { SupabaseService } from "./supabase/supabase.service";
import { UploadRepository } from "./upload.repository";
import { UploadService } from "./upload.service";

@Module({
  providers: [
    SupabaseService,
    {
      provide: UploadRepository,
      useClass: UploadService,
    },
  ],
  exports: [UploadRepository],
})
@Global()
export class UploadModule {}
