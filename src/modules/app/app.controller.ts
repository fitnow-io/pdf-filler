import { Controller, Get, Header } from '@nestjs/common';
import { templateDocx } from 'src/utils';
import { ConverterService } from '../converter/converter-service';
import { GoogleDocsService } from '../google-docs/google-docs.service';

@Controller()
export class AppController {
  constructor(
    private readonly googleDocs: GoogleDocsService,
    private readonly converter: ConverterService,
  ) {}

  @Get()
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="filename.docx"')
  async get() {
    const doc = await this.googleDocs.readDoc(
      '1hl9E2DJwnJGVJcz4W1-rvLe34DrvKhxCMH5UZwgBKDQ',
    );
    const preparedDoc = templateDocx(doc, {
      contract_number: '123456',
    });
    return this.converter.docxToPdf(preparedDoc);
  }
}
