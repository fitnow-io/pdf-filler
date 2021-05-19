import { Injectable } from '@nestjs/common';
import { FormatterService } from '../formatter/formatter.service';

@Injectable()
export class ApiService {
  constructor(private readonly formatterService: FormatterService) {}

  async googleDocsToPdf(
    docId: string,
    data?: Record<string, any>,
    extended = false,
  ) {
    const doc = await this.formatterService.googleDocsToPdf(
      docId,
      data,
      extended,
    );
    return doc;
  }

  async bufferToPdf(
    buffer: Buffer,
    data?: Record<string, any>,
    extended = false,
  ) {
    const doc = await this.formatterService.bufferToPdf(buffer, data, extended);
    return doc;
  }

  async bufferToDocx(
    buffer: Buffer,
    data?: Record<string, any>,
    extended = false,
  ) {
    const doc = await this.formatterService.bufferToDocx(
      buffer,
      data,
      extended,
    );
    return doc;
  }

  async googleDocsToDocx(
    docId: string,
    data?: Record<string, any>,
    extended = false,
  ) {
    const doc = await this.formatterService.googleDocsToDocx(
      docId,
      data,
      extended,
    );
    return doc;
  }
}
