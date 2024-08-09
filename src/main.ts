// nest
import { NestFactory } from '@nestjs/core';

// module
import { AppModule } from './app.module';

// config
import { config } from './config';

// pipe
import { CustomValidationPipe } from './shared/CustomValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(config.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
