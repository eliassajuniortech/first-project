export class InvalidPhoneError extends Error {
  constructor(message = "The phone number provided is invalid.") {
    super(message);
    this.name = "InvalidPhoneError";
  }
}
