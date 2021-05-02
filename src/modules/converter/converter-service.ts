import { Inject, Injectable } from '@nestjs/common';
import {
  pipe,
  gotenberg,
  convert,
  office,
  please,
  set,
  filename,
} from 'gotenberg-js-client';
import {
  GotenbergConfigType,
  GOTENBERG_CONFIG_KEY,
} from '../app-config/modules';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class ConverterService {
  constructor(
    @Inject(GOTENBERG_CONFIG_KEY)
    private readonly config: GotenbergConfigType,
    private readonly logger: AppLogger,
  ) {}

  async docxToPdf(file: Buffer): Promise<Buffer> {
    const toPdf = pipe(
      gotenberg(this.config.baseUrl),
      convert,
      office,
      set(filename('result.pdf')),
      please,
    );
    const pdf = await toPdf(['file.docx', file]);
    this.logger.info('PDF Stream ready');
    return await this.streamToBuffer(pdf);
  }

  streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const data: Uint8Array[] = [];
      stream.on('data', (bytes) => data.push(bytes));
      stream.on('end', () => {
        resolve(Buffer.concat(data));
      });
      stream.on('error', reject);
    });
  }
}
