import { Body, Controller, Header, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { FormatGoogleDocxDto } from './dto';

@Controller('api/v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('googledocs')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  googleDocs(@Body() body: FormatGoogleDocxDto) {
    return this.apiService.googleDocs(body.docId, body.data);
  }
}
