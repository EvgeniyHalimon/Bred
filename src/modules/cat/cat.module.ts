import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CatsController } from './cat.controller';
import { catsProviders } from './cat.providers';
import { CatsService } from './cat.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}
