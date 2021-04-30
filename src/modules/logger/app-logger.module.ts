import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggingConfigType, LOGGING_CONFIG_KEY } from '../app-config/modules';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [LOGGING_CONFIG_KEY],
      useFactory: (config: LoggingConfigType) => config,
    }),
  ],
})
export class AppLogerModule {}
