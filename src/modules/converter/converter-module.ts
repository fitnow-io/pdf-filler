import { HttpModule, Module } from '@nestjs/common';

import { ConverterService } from './converter-service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'https://api.cloudconvert.com/v1/',
      }),
    }),
  ],
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
