import {
  Body,
  Controller,
  Header,
  Inject,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { FastifyRequest as Request } from 'fastify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiBearerGuard } from 'src/guards';
import { Logger } from 'winston';
import { ApiService } from './api.service';
import { DocxResponse, PdfResponse } from './decorators';
import { FileToPdfDto, FormatGoogleDocxDto } from './dto';
import { FormatUrlDto } from './dto/format-url.dto';

@ApiBearerAuth()
@ApiTags('api')
@UseGuards(ApiBearerGuard)
@Controller('api/v1')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiExcludeEndpoint()
  @Post('googledocs')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  @PdfResponse()
  googleDocs(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToPdf(body.docId, body.data);
  }

  @Post('googledocs-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  @PdfResponse()
  googleDocsToPdf(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToPdf(
      body.docId,
      body.data,
      body.extended,
    );
  }

  @ApiOperation({
    description: 'Fills and converts docx file to PDF located by provided URL',
  })
  @Post('url-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  @PdfResponse()
  urlToPdf(@Body() body: FormatUrlDto) {
    return this.apiService.urlToPdf(body.url, body.data, body.extended);
  }

  @ApiOperation({
    description:
      'Fills and converts Google Docs file to DOCX located by provided URL',
  })
  @Post('googledocs-to-docx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="result.docx"')
  @DocxResponse()
  googleDocsToDocx(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToDocx(
      body.docId,
      body.data,
      body.extended,
    );
  }

  @ApiOperation({
    description: 'Fills and converts Google Docs file to PDF',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: () => FileToPdfDto })
  @Post('file-to-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  @PdfResponse()
  async fileToPdf(@Req() req: Request) {
    const data = await req.file();
    const body = plainToClass(
      FormatGoogleDocxDto,
      JSON.parse((data.fields.body as any).value as any),
    );
    const doc = await data.toBuffer();
    return this.apiService.bufferToPdf(doc, body.data, body.extended);
  }

  @ApiOperation({
    description: 'Fills and converts Google Docs file to DOCX',
  })
  @ApiBody({ type: () => FileToPdfDto })
  @Post('file-to-docx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="result.docx"')
  @ApiResponse({
    type: 'file',
  })
  @DocxResponse()
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
