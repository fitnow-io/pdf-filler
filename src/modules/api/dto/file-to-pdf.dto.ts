import { ApiProperty } from '@nestjs/swagger';
import { FormatGoogleDocxDto } from './format-google-docs.dto';

export class FileToPdfDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'DOCX File' })
  file: any;

  @ApiProperty({ type: () => FormatGoogleDocxDto })
  body: FormatGoogleDocxDto;
}
