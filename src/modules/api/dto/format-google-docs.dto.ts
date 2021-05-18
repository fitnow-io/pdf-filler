import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class FormatGoogleDocxDto {
  @IsString()
  @IsNotEmpty()
  docId: string;

  @IsObject()
  @IsOptional()
  data: Record<string, string | number>;

  @IsBoolean()
  @IsOptional()
  extended?: boolean;
}
