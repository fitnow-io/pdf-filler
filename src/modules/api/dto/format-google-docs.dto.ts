import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class FormatGoogleDocxDto {
  @ApiProperty({
    description: 'Google Document ID',
    example: '1QY0WtdpuJiZY2qWAw7BchyHpB1Xk6mN7_dTdMbj8eCQ',
  })
  @IsString()
  @IsNotEmpty()
  docId: string;

  @ApiPropertyOptional({
    type: () => Object,
    example: {
      name: 'Alex',
    },
  })
  @IsObject()
  @IsOptional()
  data: Record<string, string | number>;

  @ApiPropertyOptional({
    description: 'Use docx-templates in addition to docxtemplater',
  })
  @IsBoolean()
  @IsOptional()
  extended?: boolean;
}
