export abstract class UploadRepository {
  public abstract save(id: string, file: Express.Multer.File): Promise<string>;
  public abstract remove(path: string): Promise<void>;
}
