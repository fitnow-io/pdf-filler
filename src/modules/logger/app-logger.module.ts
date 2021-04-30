import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggingConfigType, LOGGING_CONFIG_KEY } from '../app-config/modules';
import { AppLogger } from './app-logger.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [LOGGING_CONFIG_KEY],
      useFactory: (config: LoggingConfigType) => config,
    }),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLogerModule {}
