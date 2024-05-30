export default class CustomError extends Error {
  status: number;

  isPublic: boolean;

  constructor(name: string, message: string, status: number, isPublic: boolean, error?: Error) {
    super(message);
    this.name = name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    if (error) {
      this.stack = `${this.stack} \nCaused by:\n ${error.stack}`;
    }
  }
}
