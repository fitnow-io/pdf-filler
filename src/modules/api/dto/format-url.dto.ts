import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class FormatUrlDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @IsOptional()
  data: Record<string, string | number>;

  @IsBoolean()
  @IsOptional()
  extended?: boolean;
}
