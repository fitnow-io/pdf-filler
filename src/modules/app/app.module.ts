import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { ConverterModule } from '../converter/converter-module';
import { GoogleDocsModule } from '../google-docs/google-docs.module';
import { AppLogerModule } from '../logger/app-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, AppLogerModule, GoogleDocsModule, ConverterModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
