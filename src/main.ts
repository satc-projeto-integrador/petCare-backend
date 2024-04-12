import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix('api')
    .enableVersioning({ type: VersioningType.URI })
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .enableCors();
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API Estoque')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
