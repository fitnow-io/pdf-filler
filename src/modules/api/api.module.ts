import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { FormatterModule } from '../formatter/formatter.module';

@Module({
  imports: [FormatterModule],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
