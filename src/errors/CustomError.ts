import httpStatus from 'http-status';

export class CustomError extends Error {
  errorCode?: number;
  reasonCode: string;

  constructor(message: string, errorCode?: number, reasonCode?: string) {
    super();

    this.message = message;

    if (this.errorCode) {
      this.errorCode = errorCode;
    } else {
      this.errorCode = httpStatus.BAD_REQUEST;
    }

    this.errorCode = errorCode;
    this.reasonCode = reasonCode;
  }
}
