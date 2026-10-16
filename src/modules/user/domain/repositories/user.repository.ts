import { User } from "../user.entity";

export abstract class UserRepository {
  public abstract findUserByEmail(email: string): Promise<User | null>;
  public abstract save(user: User): Promise<void>;
}
