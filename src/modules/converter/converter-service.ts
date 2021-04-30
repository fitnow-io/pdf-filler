import { Inject, Injectable } from '@nestjs/common';
import {
  CloudConvertConfigType,
  CLOUD_CONVERT_CONFIG_KEY,
} from '../app-config/modules';

@Injectable()
export class ConverterService {
  constructor(
    @Inject(CLOUD_CONVERT_CONFIG_KEY)
    private readonly config: CloudConvertConfigType,
  ) {}

  async docxToPdf(file: Buffer): Promise<Buffer> {
    return file;
  }
}
