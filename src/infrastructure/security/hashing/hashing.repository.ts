export abstract class HashingRepository {
  public abstract hash(password: string): Promise<string>;
  public abstract verify(hash: string, password: string): Promise<boolean>;
}
