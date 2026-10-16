import isEmail from "validator/lib/isEmail";
import { InvalidEmailError } from "../errors/invalid-email.error";

export class Email {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static setValue(value: string): Email {
    const normalized = value.trim();

    if (!isEmail(normalized)) {
      throw new InvalidEmailError();
    }
    return new Email(normalized);
  }

  public getValue(): string {
    return this.value;
  }
}
