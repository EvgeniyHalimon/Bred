import { Module } from '@nestjs/common';
import { Article } from './schema/article.schema';
import { ArticlesService } from './articles.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  providers: [ArticlesService],
})
export class ArticlesModule {}
