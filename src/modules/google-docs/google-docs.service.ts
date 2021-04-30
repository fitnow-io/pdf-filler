import { Injectable } from '@nestjs/common';
import { google, Auth as GoogleAuth, drive_v3, docs_v1 } from 'googleapis';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class GoogleDocsService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/drive'];
  private readonly drive: drive_v3.Drive;
  private readonly docs: docs_v1.Docs;

  constructor(private readonly logger: AppLogger) {
    const auth = new GoogleAuth.GoogleAuth({
      scopes: this.SCOPES,
    });
    this.drive = google.drive({
      version: 'v3',
      auth,
    });
    this.docs = google.docs({
      version: 'v1',
      auth,
    });
  }

  async readDoc(fileId: string) {
    const { data } = await this.drive.files.export(
      {
        fileId,
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      {
        responseType: 'stream',
      },
    );
    return new Promise<Buffer>(async (resolve) => {
      const buffers = [];
      data.on('data', (data) => {
        buffers.push(data);
      });
      data.on('end', async () => {
        const buffer = Buffer.concat(buffers);
        resolve(buffer);
      });
    });
  }
}
