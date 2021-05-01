import { Module } from '@nestjs/common';
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
  providers: [AppService],
})
export class AppModule {}
