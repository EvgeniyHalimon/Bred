// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// schema
import Reaction from './reaction.schema';
import { CommentsModule } from 'src/comment/comment.module';
import { ArticlesModule } from 'src/article/article.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reaction]),
    CommentsModule,
    ArticlesModule,
  ],
})
export class ReactionsModule {}
