interface OpenAuthErrorOptions {
  status: number;
  message: string;
  code: OpenAuthErrorCodes;
}

export enum OpenAuthErrorCodes {
  VALIDATION_ERROR,
}

export class OpenAuthError {
  public status: number;
  public message: string;
  public code: OpenAuthErrorCodes;

  constructor(options: OpenAuthErrorOptions) {
    this.status = options.status;
    this.message = options.message;
    this.code = options.code;
  }
}
