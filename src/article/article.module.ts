// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// schema
import { Article } from './article.schema';

//controllers
import { ArticlesController } from './article.controller';

// service
import { ArticlesService } from './article.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
