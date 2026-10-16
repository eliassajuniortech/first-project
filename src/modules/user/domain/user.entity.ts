import { Email } from "./value-objects/email.vo";
import { Phone } from "./value-objects/phone.vo";

export class User {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: Email;
  private readonly password: string;
  private readonly phone: Phone | null;
  private readonly avatar: string | null;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(id: string, firstName: string, lastName: string, email: Email, password: string, phone: Phone | null, avatar: string | null, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create(id: string, firstName: string, lastName: string, email: Email, password: string, phone: Phone | null, avatar: string | null, createdAt: Date, updatedAt: Date) {
    return new User(id, firstName, lastName, email, password, phone, avatar, createdAt, updatedAt);
  }

  public getId(): string {
    return this.id;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public getEmail(): Email {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
  public getPhone(): Phone | null {
    return this.phone;
  }
  public getAvatar(): string | null {
    return this.avatar;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
