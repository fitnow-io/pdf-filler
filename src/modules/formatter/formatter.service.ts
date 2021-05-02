import { Injectable } from '@nestjs/common';
import { templateDocx } from 'src/utils';
import { ConverterService } from '../converter/converter-service';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class FormatterService {
  constructor(
    private readonly googledDocsService: GoogleDocsService,
    private readonly converterService: ConverterService,
    private readonly logger: AppLogger,
  ) {}

  async googleDocsToPdf(
    docId: string,
    data: Record<string, any>,
  ): Promise<Buffer> {
    this.logger.info('Generate doc request');
    const doc = await this.googledDocsService.readDoc(docId);
    this.logger.info('Read document');
    const preparedDoc = templateDocx(doc, data);
    this.logger.info('Prepared document');
    const pdf = await this.converterService.docxToPdf(preparedDoc);
    this.logger.info('Document converted');
    return pdf;
  }
}
