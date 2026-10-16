export class UserAlreadyExistsError extends Error {
  constructor(message = "This email address is already in use.") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}
