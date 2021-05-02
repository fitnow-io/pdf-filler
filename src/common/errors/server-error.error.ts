import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-error';

export class ServerError extends BaseHttpException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
}
