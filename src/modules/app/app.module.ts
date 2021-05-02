import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from 'src/common';
import { ApiModule } from '../api/api.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { AuthModule } from '../auth/auth.module';
import { ConverterModule } from '../converter/converter-module';
import { GoogleDocsModule } from '../google-docs/google-docs.module';
import { AppLogerModule } from '../logger/app-logger.module';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    AppLogerModule,
    GoogleDocsModule,
    ConverterModule,
    ApiModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
