import { isMobilePhone } from "validator";
import { InvalidPhoneError } from "../errors/invalid-phone.error";

export class Phone {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static setValue(value: string): Phone {
    const normalized = value.trim();

    if (!isMobilePhone(normalized, "pt-BR")) {
      throw new InvalidPhoneError();
    }
    return new Phone(normalized);
  }

  public getValue(): string {
    return this.value;
  }
}
