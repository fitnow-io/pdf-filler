import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FormatGoogleDocxDto } from 'src/modules/api/dto';

export const createSwagger = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('PDF Filler')
    .setDescription('PDF Filler API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [FormatGoogleDocxDto],
  });
  SwaggerModule.setup('/api/v1/docs', app, document);
  return;
};
