export class InvalidEmailError extends Error {
  constructor(message = "The e-mail address provided is invalid.") {
    super(message);
    this.name = "InvalidEmailError";
  }
}
