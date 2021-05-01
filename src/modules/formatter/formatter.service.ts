import { Injectable } from '@nestjs/common';
import { templateDocx } from 'src/utils';
import { ConverterService } from '../converter/converter-service';
import { GoogleDocsService } from '../google-docs/google-docs.service';

@Injectable()
export class FormatterService {
  constructor(
    private readonly googledDocsService: GoogleDocsService,
    private readonly converterService: ConverterService,
  ) {}

  async googleDocsToPdf(
    docId: string,
    data: Record<string, any>,
  ): Promise<Buffer> {
    const doc = await this.googledDocsService.readDoc(docId);
    const preparedDoc = templateDocx(doc, data);
    const pdf = await this.converterService.docxToPdf(preparedDoc);
    return pdf;
  }
}
