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

@Injectable()
export class ConverterService {
  constructor(
    @Inject(GOTENBERG_CONFIG_KEY)
    private readonly config: GotenbergConfigType,
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
    return await this.streamToBuffer(pdf);
  }

  streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve) => {
      const data: Uint8Array[] = [];
      stream.on('data', (bytes) => data.push(bytes));
      stream.on('end', () => {
        resolve(Buffer.concat(data));
      });
    });
  }
}
