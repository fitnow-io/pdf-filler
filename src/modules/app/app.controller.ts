import { Controller, Get, Header } from '@nestjs/common';
import { templateDocx } from 'src/utils';
import { converter } from 'src/utils/converter';
import { ConverterService } from '../converter/converter-service';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { AppLogger } from '../logger/app-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly googleDocs: GoogleDocsService,
    private readonly converter: ConverterService,
    private readonly logger: AppLogger,
  ) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="filename.pdf"')
  async get() {
    const doc = await this.googleDocs.readDoc(
      '1hl9E2DJwnJGVJcz4W1-rvLe34DrvKhxCMH5UZwgBKDQ',
    );
    const preparedDoc = templateDocx(doc, {
      contract_number: '123456',
    });
    try {
      const result = await this.converter.docxToPdf(preparedDoc);
      return result;
    } catch (e) {
      this.logger.error('E', e);
      throw e;
    }
  }
}
