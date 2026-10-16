import { Injectable } from "@nestjs/common";
import { ImageUploadError } from "./errors/image-upload.error";
import { SupabaseService } from "./supabase/supabase.service";
import { UploadRepository } from "./upload.repository";

@Injectable()
export class UploadService implements UploadRepository {
  private readonly supabaseService: SupabaseService;

  constructor(supabaseService: SupabaseService) {
    this.supabaseService = supabaseService;
  }

  public async save(id: string, file: Express.Multer.File): Promise<string> {
    const client = this.supabaseService.getClient();

    const extension = file.mimetype.split("/")[1];
    const path = `${id}/${crypto.randomUUID()}.${extension}`;

    const { error } = await client.storage.from("avatars").upload(path, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
    });

    if (error) {
      throw new ImageUploadError();
    }
    return path;
  }

  public async remove(path: string): Promise<void> {
    const client = this.supabaseService.getClient();

    const { error } = await client.storage.from("avatars").remove([path]);
    if (error) {
      throw new ImageUploadError();
    }
  }
}
