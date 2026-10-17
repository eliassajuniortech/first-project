import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../../../infrastructure/database/database.service";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/user.entity";
import { Email } from "../../domain/values-objects/email.vo";
import { Phone } from "../../domain/values-objects/phone.vo";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  private readonly databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.databaseService.user.findUnique({ where: { email: email } });
    if (!user) {
      return null;
    }
    const phone = user.phone ? Phone.setValue(user.phone) : null;

    return User.create(user.id, user.firstName, user.lastName, Email.setValue(user.email), user.password, phone, user.avatar, user.createdAt, user.updatedAt);
  }

  public async save(user: User): Promise<void> {
    await this.databaseService.user.create({
      data: {
        id: user.getId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail().getValue(),
        password: user.getPassword(),
        phone: user.getPhone()?.getValue() ?? null,
        avatar: user.getAvatar(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });
  }
}
