import { Injectable } from '@nestjs/common';
import { FormatterService } from '../formatter/formatter.service';

@Injectable()
export class ApiService {
  constructor(private readonly formatterService: FormatterService) {}

  async googleDocs(docId: string, data?: Record<string, any>) {
    const doc = await this.formatterService.googleDocsToPdf(docId, data);
    return doc;
  }
}
