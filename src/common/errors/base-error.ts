import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(
    status: HttpStatus,
    message: string,
    description?: string,
    context?: any,
  ) {
    super(
      {
        message,
        description,
        context,
      },
      status,
    );
  }
}
