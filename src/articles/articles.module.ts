// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// schema
import { Article } from './schema/article.schema';

//controllers
import { ArticlesController } from './articles.controller';

// service
import { ArticlesService } from './articles.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
