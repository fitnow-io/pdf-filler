import { Body, Controller, Header, Post, UseGuards } from '@nestjs/common';
import { ApiBearerGuard } from 'src/guards';
import { ApiService } from './api.service';
import { FormatGoogleDocxDto } from './dto';

@UseGuards(ApiBearerGuard)
@Controller('api/v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

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
    return this.apiService.googleDocsToPdf(body.docId, body.data);
  }

  @Post('googledocs-to-docx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="result.docx"')
  googleDocsToDocx(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocsToDocx(body.docId, body.data);
  }
}
