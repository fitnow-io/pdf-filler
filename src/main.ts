import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ErrorsInterceptor } from './common';
import {
  CommonConfigType,
  COMMON_CONFIG_KEY,
} from './modules/app-config/modules';
import { AppModule } from './modules/app/app.module';
import { AppLogger } from './modules/logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const appLogger: AppLogger = app.get(AppLogger);
  app.useGlobalInterceptors(new ErrorsInterceptor(appLogger));

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.register(require('fastify-multipart'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
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
