import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppLogerModule } from '../logger/app-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, AppLogerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
