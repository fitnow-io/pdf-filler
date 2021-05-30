import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const PdfResponse = (status = HttpStatus.CREATED) => {
  return ApiResponse({
    status,
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  });
};
