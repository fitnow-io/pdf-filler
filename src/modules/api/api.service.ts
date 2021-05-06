import { Injectable } from '@nestjs/common';
import { FormatterService } from '../formatter/formatter.service';

@Injectable()
export class ApiService {
  constructor(private readonly formatterService: FormatterService) {}

  async googleDocsToPdf(docId: string, data?: Record<string, any>) {
    const doc = await this.formatterService.googleDocsToPdf(docId, data);
    return doc;
  }

  async googleDocsToDocx(docId: string, data?: Record<string, any>) {
    const doc = await this.formatterService.googleDocsToDocx(docId, data);
    return doc;
  }
}
