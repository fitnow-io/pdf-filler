import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import modules from './modules';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: modules,
      isGlobal: true,
      envFilePath: '/var/app/.env',
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
