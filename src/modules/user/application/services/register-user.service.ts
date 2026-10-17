import { Injectable } from "@nestjs/common";
import { HashingRepository } from "../../../../infrastructure/security/hashing/hashing.repository";
import { UploadRepository } from "../../../../infrastructure/upload/upload.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/user.entity";
import { Email } from "../../domain/values-objects/email.vo";
import { Phone } from "../../domain/values-objects/phone.vo";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error";
import { CreateUserInput } from "../types/create-user.type";

@Injectable()
export class RegisterUserService {
  private readonly userRepository: UserRepository;
  private readonly hashingRepository: HashingRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(userRepository: UserRepository, hashingRepository: HashingRepository, uploadRepository: UploadRepository) {
    this.userRepository = userRepository;
    this.hashingRepository = hashingRepository;
    this.uploadRepository = uploadRepository;
  }

  public async execute(input: CreateUserInput, file?: Express.Multer.File): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(input.email);
    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const id = crypto.randomUUID();
    const email = Email.setValue(input.email);
    const password = await this.hashingRepository.hash(input.password);
    const phone = input.phone ? Phone.setValue(input.phone) : null;
    const avatar = file ? await this.uploadRepository.save(id, file) : null;
    const now = new Date();

    const user = User.create(id, input.firstName, input.lastName, email, password, phone, avatar, now, now);

    await this.userRepository.save(user);
    return user;
  }
}
