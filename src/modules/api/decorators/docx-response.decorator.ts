import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const DocxResponse = (status = HttpStatus.CREATED) => {
  return ApiResponse({
    status,
    content: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  });
};
