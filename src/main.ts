import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CommonConfigType,
  COMMON_CONFIG_KEY,
} from './modules/app-config/modules';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config: CommonConfigType = app.get(COMMON_CONFIG_KEY);
  const PORT = config.port;
  const logger: Logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App start listening on http://0.0.0.0:${PORT}`);
  });
}
bootstrap();
