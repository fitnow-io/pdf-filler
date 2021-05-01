import { Module } from '@nestjs/common';
import { ConverterModule } from '../converter/converter-module';
import { GoogleDocsModule } from '../google-docs/google-docs.module';
import { FormatterService } from './formatter.service';

@Module({
  imports: [GoogleDocsModule, ConverterModule],
  providers: [FormatterService],
  exports: [FormatterService],
})
export class FormatterModule {}
