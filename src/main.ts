import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Software Developer Challenge')
    .setDescription('REST APIs for Software Developer Challenge')
    .setVersion('1.0')
    .addTag('Status')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger/', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
