import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment } from 'environment/environment.dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const options = new DocumentBuilder()
    .setTitle('Kaboom')
    .setDescription('All the kaboom API entrypoints.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(environment.ports.app);
}
bootstrap();
