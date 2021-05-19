import {
  Body,
  Controller,
  Header,
  Inject,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FastifyRequest as Request } from 'fastify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiBearerGuard } from 'src/guards';
import { Logger } from 'winston';
import { ApiService } from './api.service';
import { FormatGoogleDocxDto } from './dto';
import { FormatUrlDto } from './dto/format-url.dto';

@UseGuards(ApiBearerGuard)
@Controller('api/v1')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('googledocs')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  googleDocs(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToPdf(body.docId, body.data);
  }

  @Post('googledocs-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  googleDocsToPdf(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToPdf(
      body.docId,
      body.data,
      body.extended,
    );
  }

  @Post('url-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  urlToPdf(@Body() body: FormatUrlDto) {
    return this.apiService.urlToPdf(body.url, body.data, body.extended);
  }

  @Post('googledocs-to-docx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="result.docx"')
  googleDocsToDocx(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToDocx(
      body.docId,
      body.data,
      body.extended,
    );
  }

  @Post('file-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  async fileToPdf(@Req() req: Request) {
    const data = await req.file();
    const body = plainToClass(
      FormatGoogleDocxDto,
      JSON.parse((data.fields.body as any).value as any),
    );
    const doc = await data.toBuffer();
    return this.apiService.bufferToPdf(doc, body.data, body.extended);
  }

  @Post('file-to-docx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="result.docx"')
  async fileToDocx(@Req() req: Request) {
    const data = await req.file();
    const body = plainToClass(
      FormatGoogleDocxDto,
      JSON.parse((data.fields.body as any).value as any),
    );
    const doc = await data.toBuffer();
    return this.apiService.bufferToDocx(doc, body.data, body.extended);
  }
}
