import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //ADDED
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //ADDED
  app.enableCors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true, // if sending cookies or auth headers
  });

  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('A starter kit for NestJS authentication with MongoDB.')
    .setVersion('1.0')
    .addBearerAuth() // This enables JWT authorization in Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // This sets up the Swagger UI at /api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
