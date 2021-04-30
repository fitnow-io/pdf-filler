import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import FormData from 'form-data';
import {
  CloudConvertConfigType,
  CLOUD_CONVERT_CONFIG_KEY,
} from '../app-config/modules';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class ConverterService {
  constructor(
    @Inject(CLOUD_CONVERT_CONFIG_KEY)
    private readonly config: CloudConvertConfigType,
    private readonly http: HttpService,
    private readonly logger: AppLogger,
  ) {}

  async docxToPdf(file: Buffer): Promise<Buffer> {
    const formData = new FormData();
    formData.append(
      'json',
      JSON.stringify({
        apikey: this.config.apiKey,
        inputformat: 'docx',
        outputformat: 'pdf',
        input: 'upload',
        wait: true,
        download: 'true',
      }),
    );
    formData.append('file', file.toString('base64'));

    try {
      const { data } = await this.http
        .post('convert', formData, {
          responseType: 'arraybuffer',
          headers: formData.getHeaders(),
        })
        .toPromise();
      const response = Buffer.from(data);
      this.logger.info('Complete!', response);
      return response;
    } catch (error: unknown) {
      const axiosError: AxiosError = error as any;
      this.logger.error('Converter Api Error', {
        response: axiosError?.response?.data,
      });
      throw error;
    }
  }
}
