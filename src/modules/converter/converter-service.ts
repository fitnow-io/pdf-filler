import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Auth as GoogleAuth, google } from 'googleapis';
import CloudConvert from 'cloudconvert';
import { Readable } from 'stream';
import {
  CloudConvertConfigType,
  CLOUD_CONVERT_CONFIG_KEY,
} from '../app-config/modules';

@Injectable()
export class ConverterService implements OnModuleInit {
  private readonly client: CloudConvert;
  private readonly googleAuth: GoogleAuth.GoogleAuth;
  private credentials: GoogleAuth.CredentialBody;

  async onModuleInit() {
    this.credentials = await this.googleAuth.getCredentials();
  }

  constructor(
    @Inject(CLOUD_CONVERT_CONFIG_KEY)
    config: CloudConvertConfigType,
  ) {
    this.client = new CloudConvert(config.apiKey);
    this.googleAuth = new GoogleAuth.GoogleAuth();
  }
  async docxToPdf(file: Buffer): Promise<Buffer> {
    const job = await this.client.jobs.create({
      tasks: {
        import: {
          operation: 'import/upload',
        },
        export: {
          operation: 'export/google-cloud-storage',
          bucket: 'fitnow-contracts',
          client_email: this.credentials.client_email,
          private_key: this.credentials.private_key,
          input: 'import',
          project_id: 'excellent-nexus-271309',
        },
      },
    });
    const importTask = job.tasks.find((t) => t.id === 'import');
    await this.client.tasks.upload(importTask, this.bufferToStream(file));
    await this.client.jobs.wait(job.id);
    return file;
  }

  private bufferToStream(data: Buffer): Readable {
    const readable = new Readable();
    readable._read = () => {
      return;
    }; // _read is required but you can noop it
    readable.push(data);
    readable.push(null);
    return readable;
  }
}
