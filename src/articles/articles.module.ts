// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// schema
import { Article } from './schema/article.schema';

// service
import { ArticlesService } from './articles.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  providers: [ArticlesService],
})
export class ArticlesModule {}
