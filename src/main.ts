import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('API News')
  .setDescription('API for managing news. Includes endpoints for retrieving news, creating bookmarks, and performing other news-related operations.')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('news')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
