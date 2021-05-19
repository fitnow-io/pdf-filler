import { Injectable } from '@nestjs/common';
import { templateDocx, templateDocxExtended } from 'src/utils';
import { ConverterService } from '../converter/converter-service';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { AppLogger } from '../logger/app-logger.service';
import * as util from 'util';
import { pipeline } from 'stream';

const pump = util.promisify(pipeline);

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
    extended = false,
  ): Promise<Buffer> {
    const doc = await this.googledDocsService.readDoc(docId);
    let preparedDoc = templateDocx(doc, data);
    if (extended) {
      preparedDoc = await templateDocxExtended(preparedDoc, data);
    }
    const pdf = await this.converterService.docxToPdf(preparedDoc);
    return pdf;
  }

  async bufferToPdf(
    doc: Buffer,
    data: Record<string, any>,
    extended = false,
  ): Promise<Buffer> {
    let preparedDoc = templateDocx(doc, data);
    if (extended) {
      preparedDoc = await templateDocxExtended(preparedDoc, data);
    }
    const pdf = await this.converterService.docxToPdf(preparedDoc);
    return pdf;
  }

  async bufferToDocx(
    doc: Buffer,
    data: Record<string, any>,
    extended = false,
  ): Promise<Buffer> {
    let preparedDoc = templateDocx(doc, data);
    if (extended) {
      preparedDoc = await templateDocxExtended(preparedDoc, data);
    }
    return preparedDoc;
  }

  async googleDocsToDocx(
    docId: string,
    data: Record<string, any>,
    extended = false,
  ): Promise<Buffer> {
    const doc = await this.googledDocsService.readDoc(docId);
    let preparedDoc = templateDocx(doc, data);
    if (extended) {
      preparedDoc = await templateDocxExtended(preparedDoc, data);
    }
    return preparedDoc;
  }
}
