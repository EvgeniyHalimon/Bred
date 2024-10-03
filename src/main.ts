// libraries
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

// module
import { AppModule } from './app.module';

// config
import { config } from './config';

// pipe
import { CustomValidationPipe } from './shared/CustomValidationPipe';

// exception filter
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({ origin: '*' });
  app.useLogger(app.get(Logger));
  //remove before deploy
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bred API')
    .setDescription('The Bred API v1')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
    explorer: true,
  });

  await app.listen(config.SERVER_PORT);
}
bootstrap();
