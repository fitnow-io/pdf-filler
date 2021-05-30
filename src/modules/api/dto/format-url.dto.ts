import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class FormatUrlDto {
  @ApiProperty({
    example:
      'http://www.formaempresa.org/assets_ods/investigacion_producto/lorem-ipsum.docx',
    format: 'url',
    description: 'Docx File URL',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ type: () => Object, example: { name: 'Alex' } })
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
